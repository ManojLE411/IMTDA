import { useState, useEffect } from 'react';
import { BlogPost } from '../types/blog.types';
import { blogStorage } from '../api/blogStorage';
import { DEFAULT_BLOG_POSTS } from '../constants/blog.constants';

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = () => {
      try {
        const stored = blogStorage.getAll();
        setPosts(stored.length > 0 ? stored : DEFAULT_BLOG_POSTS);
      } catch (error) {
        console.error('Failed to load posts', error);
        setPosts(DEFAULT_BLOG_POSTS);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const savePost = (post: BlogPost) => {
    blogStorage.save(post);
    setPosts(prev => {
      const exists = prev.some(p => p.id === post.id);
      return exists 
        ? prev.map(p => p.id === post.id ? post : p)
        : [post, ...prev];
    });
  };

  const deletePost = (id: string) => {
    blogStorage.delete(id);
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  return {
    posts,
    loading,
    savePost,
    deletePost,
  };
};

