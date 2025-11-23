import { Testimonial } from '@/types/testimonial.types';
import { STORAGE_KEYS } from '@/constants';
import { BaseStorage } from './BaseStorage';

class TestimonialStorage extends BaseStorage<Testimonial> {
  constructor() {
    super(STORAGE_KEYS.TESTIMONIALS);
  }
}

export const testimonialStorage = new TestimonialStorage();

