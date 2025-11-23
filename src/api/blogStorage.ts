import { BlogPost } from '@/types/blog.types';
import { STORAGE_KEYS } from '@/constants';
import { BaseStorage } from './BaseStorage';

class BlogStorage extends BaseStorage<BlogPost> {
  constructor() {
    super(STORAGE_KEYS.BLOG_POSTS);
  }
}

export const blogStorage = new BlogStorage();

