import { BlogPost } from '../types/blog.types';
import { STORAGE_KEYS } from '@/shared/constants';
import { StorageService } from '@/shared/utils';

class BlogStorage {
  private key = STORAGE_KEYS.BLOG_POSTS;

  getAll(): BlogPost[] {
    return StorageService.get<BlogPost[]>(this.key) || [];
  }

  save(post: BlogPost): void {
    const posts = this.getAll();
    const exists = posts.some(p => p.id === post.id);
    const updated = exists
      ? posts.map(p => p.id === post.id ? post : p)
      : [post, ...posts];
    StorageService.set(this.key, updated);
  }

  delete(id: string): void {
    const posts = this.getAll();
    const filtered = posts.filter(p => p.id !== id);
    StorageService.set(this.key, filtered);
  }

  getById(id: string): BlogPost | null {
    const posts = this.getAll();
    return posts.find(p => p.id === id) || null;
  }
}

export const blogStorage = new BlogStorage();

