/**
 * Contact Slice
 * Manages contact messages state and operations
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ContactMessage } from '@/types/contact.types';
import { contactStorage } from '@/api/contactStorage';

interface ContactState {
  messages: ContactMessage[];
  loading: boolean;
  error: string | null;
}

const initialState: ContactState = {
  messages: [],
  loading: true,
  error: null,
};

/**
 * Load contact messages from storage
 */
export const loadContactMessages = createAsyncThunk('contact/load', async () => {
  return contactStorage.getAll();
});

/**
 * Submit contact message
 */
export const submitContactMessage = createAsyncThunk(
  'contact/submit',
  async (message: ContactMessage, { dispatch }) => {
    contactStorage.save(message);
    dispatch(loadContactMessages());
    return message;
  }
);

/**
 * Delete contact message
 */
export const deleteContactMessage = createAsyncThunk(
  'contact/delete',
  async (id: string, { dispatch }) => {
    contactStorage.delete(id);
    dispatch(loadContactMessages());
    return id;
  }
);

/**
 * Mark message as read
 */
export const markMessageAsRead = createAsyncThunk(
  'contact/markAsRead',
  async (id: string, { dispatch }) => {
    contactStorage.updateStatus(id, 'Read');
    dispatch(loadContactMessages());
    return id;
  }
);

/**
 * Mark message as replied
 */
export const markMessageAsReplied = createAsyncThunk(
  'contact/markAsReplied',
  async (id: string, { dispatch }) => {
    contactStorage.updateStatus(id, 'Replied');
    dispatch(loadContactMessages());
    return id;
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadContactMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadContactMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(loadContactMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load contact messages';
      })
      .addCase(submitContactMessage.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to submit message';
      })
      .addCase(deleteContactMessage.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete message';
      })
      .addCase(markMessageAsRead.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to mark message as read';
      })
      .addCase(markMessageAsReplied.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to mark message as replied';
      });
  },
});

export const { clearError } = contactSlice.actions;

// Selectors
export const selectContactMessages = (state: { contact: ContactState }) => state.contact.messages;
export const selectContactLoading = (state: { contact: ContactState }) => state.contact.loading;
export const selectContactError = (state: { contact: ContactState }) => state.contact.error;

export default contactSlice.reducer;

