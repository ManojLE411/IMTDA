import { useState, useEffect } from 'react';
import { ContactMessage } from '../types/contact.types';
import { contactStorage } from '../api/contactStorage';

export const useContactMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMessages = () => {
      try {
        const stored = contactStorage.getAll();
        setMessages(stored);
      } catch (error) {
        console.error('Failed to load contact messages', error);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, []);

  const submitMessage = (message: ContactMessage) => {
    contactStorage.save(message);
    setMessages(prev => [message, ...prev]);
  };

  const deleteMessage = (id: string) => {
    contactStorage.delete(id);
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const markAsRead = (id: string) => {
    contactStorage.updateStatus(id, 'Read');
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'Read' } : m));
  };

  const markAsReplied = (id: string) => {
    contactStorage.updateStatus(id, 'Replied');
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'Replied' } : m));
  };

  return {
    messages,
    loading,
    submitMessage,
    deleteMessage,
    markAsRead,
    markAsReplied,
  };
};

