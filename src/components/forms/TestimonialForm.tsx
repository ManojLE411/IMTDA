import React, { useState, useEffect } from 'react';
import { Testimonial } from '@/types/testimonial.types';
import { FormLayout, ImageUpload } from '@/components/ui';

interface TestimonialFormProps {
  initialData?: Partial<Testimonial>;
  onSave: (testimonial: Testimonial) => void;
  onCancel: () => void;
}

export const TestimonialForm: React.FC<TestimonialFormProps> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: '',
    title: '',
    quote: '',
    avatar: '',
    ...initialData
  });

  useEffect(() => {
    setFormData({
      name: '',
      title: '',
      quote: '',
      avatar: '',
      ...initialData
    });
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (base64: string) => {
    setFormData((prev) => ({ ...prev, avatar: base64 }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.title && formData.quote) {
      const updatedTestimonial = {
        ...formData,
        avatar: formData.avatar || `https://picsum.photos/50/50?random=${Date.now()}`
      } as Testimonial;
      onSave(updatedTestimonial);
    }
  };

  return (
    <FormLayout
      title={formData.id ? 'Edit Testimonial' : 'Add New Testimonial'}
      isEdit={!!formData.id}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      submitLabel="Save Testimonial"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={formData.name || ''}
            onChange={handleChange}
            placeholder="Client name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title/Position *</label>
          <input
            type="text"
            name="title"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={formData.title || ''}
            onChange={handleChange}
            placeholder="e.g., CEO, TechCorp Solutions"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Quote/Testimonial *</label>
        <textarea
          name="quote"
          rows={4}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          value={formData.quote || ''}
          onChange={handleChange}
          placeholder="Enter the testimonial quote..."
        />
      </div>

      <ImageUpload
        value={formData.avatar}
        onChange={handleImageChange}
        id="testimonial-avatar-upload"
        replaceId="testimonial-avatar-upload-replace"
        label="Avatar (Optional)"
        previewClassName="w-20 h-20 object-cover rounded-full border-2 border-gray-300"
      />

    </FormLayout>
  );
};

export default TestimonialForm;

