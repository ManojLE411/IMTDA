import React, { useState, useEffect } from 'react';
import { Service } from '@/types/service.types';
import { FormLayout } from '@/components/ui';
import { iconMap, getIcon } from '@/utils/iconMap';

interface ServiceFormProps {
  initialData?: Partial<Service>;
  onSave: (service: Service) => void;
  onCancel: () => void;
}

const availableIcons = Object.keys(iconMap);

export const ServiceForm: React.FC<ServiceFormProps> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Service>>({
    title: '',
    description: '',
    features: [],
    icon: 'Code',
    image: '',
    ...initialData
  });

  const [featuresString, setFeaturesString] = useState('');

  useEffect(() => {
    setFormData({
      title: '',
      description: '',
      features: [],
      icon: 'Code',
      image: '',
      ...initialData
    });
    if (initialData?.features) {
      setFeaturesString(initialData.features.join(', '));
    } else {
      setFeaturesString('');
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeaturesString(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.description && formData.icon) {
      const updatedService = {
        ...formData,
        features: featuresString.split(',').map(s => s.trim()).filter(s => s.length > 0)
      } as Service;
      onSave(updatedService);
    }
  };

  const SelectedIcon = getIcon(formData.icon || 'Code');

  return (
    <FormLayout
      title={formData.id ? 'Edit Service' : 'Add New Service'}
      isEdit={!!formData.id}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      submitLabel="Save Service"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input
            type="text"
            name="title"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={formData.title || ''}
            onChange={handleChange}
            placeholder="Service title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Icon *</label>
          <div className="flex items-center gap-3">
            <select
              name="icon"
              required
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.icon || 'Code'}
              onChange={handleChange}
            >
              {availableIcons.map((iconName) => (
                <option key={iconName} value={iconName}>
                  {iconName}
                </option>
              ))}
            </select>
            <div className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-lg bg-gray-50">
              {SelectedIcon && <SelectedIcon className="w-6 h-6 text-gray-600" />}
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
        <textarea
          name="description"
          rows={3}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          value={formData.description || ''}
          onChange={handleChange}
          placeholder="Service description..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          value={featuresString}
          onChange={handleFeaturesChange}
          placeholder="Enter features separated by commas (e.g., Feature 1, Feature 2, Feature 3)"
        />
        <p className="text-xs text-gray-500 mt-1">Separate multiple features with commas</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (Optional)</label>
        <input
          type="text"
          name="image"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          value={formData.image || ''}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
        {formData.image && (
          <div className="mt-2">
            <img 
              src={formData.image} 
              alt="Service preview" 
              className="w-32 h-32 object-cover rounded-lg border border-gray-300"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}
      </div>
    </FormLayout>
  );
};

export default ServiceForm;

