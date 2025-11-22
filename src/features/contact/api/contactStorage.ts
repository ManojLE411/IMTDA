import { ContactMessage } from '../types/contact.types';
import { STORAGE_KEYS } from '@/shared/constants';
import { StorageService } from '@/shared/utils';

class ContactStorage {
  private key = STORAGE_KEYS.CONTACT_MESSAGES;

  getAll(): ContactMessage[] {
    return StorageService.get<ContactMessage[]>(this.key) || [];
  }

  save(message: ContactMessage): void {
    const messages = this.getAll();
    const updated = [message, ...messages];
    StorageService.set(this.key, updated);
  }

  delete(id: string): void {
    const messages = this.getAll();
    const filtered = messages.filter(m => m.id !== id);
    StorageService.set(this.key, filtered);
  }

  updateStatus(id: string, status: ContactMessage['status']): void {
    const messages = this.getAll();
    const updated = messages.map(m => 
      m.id === id ? { ...m, status } : m
    );
    StorageService.set(this.key, updated);
  }

  getById(id: string): ContactMessage | null {
    const messages = this.getAll();
    return messages.find(m => m.id === id) || null;
  }
}

export const contactStorage = new ContactStorage();

