/**
 * useContactMessages Hook - Redux Version
 * Compatibility hook that provides the same API as the old hook
 */

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  selectContactMessages,
  selectContactLoading,
  loadContactMessages,
  submitContactMessage,
  deleteContactMessage,
  markMessageAsRead,
  markMessageAsReplied,
} from '@/store/slices/contactSlice';
import { selectIsAuthenticated } from '@/store/slices/authSlice';
import { ContactMessage } from '@/types/contact.types';

/**
 * Hook to manage contact messages
 * @deprecated Consider using Redux hooks directly for better performance
 */
export const useContactMessages = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectContactMessages);
  const loading = useAppSelector(selectContactLoading);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadContactMessages());
    }
  }, [dispatch, isAuthenticated]);

  return {
    messages,
    loading,
    submitMessage: (message: ContactMessage) => {
      dispatch(submitContactMessage(message));
    },
    deleteMessage: (id: string) => {
      dispatch(deleteContactMessage(id));
    },
    markAsRead: (id: string) => {
      dispatch(markMessageAsRead(id));
    },
    markAsReplied: (id: string) => {
      dispatch(markMessageAsReplied(id));
    },
  };
};
