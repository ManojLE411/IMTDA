/**
 * useBlogPosts Hook - Redux Version
 * Compatibility hook that provides the same API as the old hook
 */

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  selectBlogPosts,
  selectBlogLoading,
  loadBlogPosts,
  saveBlogPost,
  deleteBlogPost,
} from '@/store/slices/blogSlice';
import { BlogPost } from '@/types/blog.types';

/**
 * Hook to manage blog posts
 * @deprecated Consider using Redux hooks directly for better performance
 */
export const useBlogPosts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectBlogPosts);
  const loading = useAppSelector(selectBlogLoading);

  useEffect(() => {
    // Load blog posts for all users (public page)
    dispatch(loadBlogPosts());
  }, [dispatch]);

  return {
    posts,
    loading,
    savePost: (post: BlogPost) => {
      dispatch(saveBlogPost(post));
    },
    deletePost: (id: string) => {
      dispatch(deleteBlogPost(id));
    },
  };
};
