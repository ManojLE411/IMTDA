import { ContactMessage } from '@/types/contact.types';
import { STORAGE_KEYS } from '@/constants';
import { BaseStorage } from './BaseStorage';
import { StorageService } from '@/services/storage';

class ContactStorage extends BaseStorage<ContactMessage> {
  constructor() {
    super(STORAGE_KEYS.CONTACT_MESSAGES);
  }

  // Override save to always prepend (messages are time-ordered)
  save(message: ContactMessage): void {
    const messages = this.getAll();
    const updated = [message, ...messages];
    StorageService.set(this.key, updated);
  }

  updateStatus(id: string, status: ContactMessage['status']): void {
    const messages = this.getAll();
    const updated = messages.map(m => 
      m.id === id ? { ...m, status } : m
    );
    StorageService.set(this.key, updated);
  }
}

export const contactStorage = new ContactStorage();

