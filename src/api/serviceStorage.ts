import { Service } from '@/types/service.types';
import { STORAGE_KEYS } from '@/constants';
import { BaseStorage } from './BaseStorage';

class ServiceStorage extends BaseStorage<Service> {
  constructor() {
    super(STORAGE_KEYS.SERVICES);
  }
}

export const serviceStorage = new ServiceStorage();

