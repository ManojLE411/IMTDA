/**
 * Base Storage Class
 * Generic storage class to eliminate code duplication
 */

import { StorageService } from '@/services/storage';

export interface Identifiable {
  id: string;
}

export class BaseStorage<T extends Identifiable> {
  protected key: string;

  constructor(storageKey: string) {
    this.key = storageKey;
  }

  getAll(): T[] {
    return StorageService.get<T[]>(this.key) || [];
  }

  save(item: T): void {
    const items = this.getAll();
    const exists = items.some(i => i.id === item.id);
    const updated = exists
      ? items.map(i => i.id === item.id ? item : i)
      : [item, ...items];
    StorageService.set(this.key, updated);
  }

  delete(id: string): void {
    const items = this.getAll();
    const filtered = items.filter(i => i.id !== id);
    StorageService.set(this.key, filtered);
  }

  getById(id: string): T | null {
    const items = this.getAll();
    return items.find(i => i.id === id) || null;
  }
}

