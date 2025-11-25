/**
 * Blog Slice
 * Manages blog posts state and operations
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BlogPost } from '@/types/blog.types';
import { blogApi } from '@/services/blogApi';
import { isValidObjectId } from '@/utils/validation';

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
 * Load blog posts from API
 */
export const loadBlogPosts = createAsyncThunk('blog/load', async () => {
  return blogApi.getAll();
});

/**
 * Save blog post
 */
export const saveBlogPost = createAsyncThunk(
  'blog/save',
  async (post: BlogPost, { dispatch }) => {
    const { id, ...postData } = post;
    const savedPost = id && isValidObjectId(id) ? await blogApi.update(id, postData) : await blogApi.create(postData);
    dispatch(loadBlogPosts());
    return savedPost;
  }
);

/**
 * Delete blog post
 */
export const deleteBlogPost = createAsyncThunk(
  'blog/delete',
  async (id: string, { dispatch }) => {
    await blogApi.delete(id);
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
        // Ensure payload is an array
        state.posts = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(loadBlogPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load blog posts';
        console.error('Failed to load blog posts:', action.error);
        // Keep existing posts on error instead of clearing
        if (state.posts.length === 0) {
          state.posts = [];
        }
      })
      .addCase(saveBlogPost.fulfilled, (state, action) => {
        // Post is already updated via loadBlogPosts
      })
      .addCase(saveBlogPost.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to save blog post';
      })
      .addCase(deleteBlogPost.fulfilled, (state) => {
        // Posts are already updated via loadBlogPosts
      })
      .addCase(deleteBlogPost.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete blog post';
      });
  },
});

export const { clearError } = blogSlice.actions;

// Selectors
export const selectBlogPosts = (state: { blog: BlogState }) => state.blog?.posts || [];
export const selectBlogLoading = (state: { blog: BlogState }) => state.blog.loading;
export const selectBlogError = (state: { blog: BlogState }) => state.blog.error;

export default blogSlice.reducer;

