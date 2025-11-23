/**
 * Blog Slice
 * Manages blog posts state and operations
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BlogPost } from '@/types/blog.types';
import { blogStorage } from '@/api/blogStorage';

interface BlogState {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  posts: [],
  loading: true,
  error: null,
};

/**
 * Load blog posts from storage
 */
export const loadBlogPosts = createAsyncThunk('blog/load', async () => {
  return blogStorage.getAll();
});

/**
 * Save blog post
 */
export const saveBlogPost = createAsyncThunk(
  'blog/save',
  async (post: BlogPost, { dispatch }) => {
    blogStorage.save(post);
    dispatch(loadBlogPosts());
    return post;
  }
);

/**
 * Delete blog post
 */
export const deleteBlogPost = createAsyncThunk(
  'blog/delete',
  async (id: string, { dispatch }) => {
    blogStorage.delete(id);
    dispatch(loadBlogPosts());
    return id;
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBlogPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadBlogPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(loadBlogPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load blog posts';
        state.posts = [];
      })
      .addCase(saveBlogPost.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to save blog post';
      })
      .addCase(deleteBlogPost.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete blog post';
      });
  },
});

export const { clearError } = blogSlice.actions;

// Selectors
export const selectBlogPosts = (state: { blog: BlogState }) => state.blog.posts;
export const selectBlogLoading = (state: { blog: BlogState }) => state.blog.loading;
export const selectBlogError = (state: { blog: BlogState }) => state.blog.error;

export default blogSlice.reducer;

