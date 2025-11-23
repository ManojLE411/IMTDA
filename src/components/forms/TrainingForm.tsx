import React, { useState, useEffect } from 'react';
import { TrainingProgram } from '@/types/training.types';
import { FormLayout } from '@/components/ui';

interface TrainingFormProps {
  initialData?: Partial<TrainingProgram>;
  onSave: (program: TrainingProgram) => void;
  onCancel: () => void;
}

export const TrainingForm: React.FC<TrainingFormProps> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<TrainingProgram>>({
    title: '',
    category: 'Institutional',
    description: '',
    features: [],
    ...initialData
  });

  const [featuresString, setFeaturesString] = useState('');

  useEffect(() => {
    setFormData({
      title: '',
      category: 'Institutional',
      description: '',
      features: [],
      ...initialData
    });
    if (initialData?.features) {
      setFeaturesString(initialData.features.join('\n'));
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeaturesString(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title) {
      const updatedProgram = {
        ...formData,
        features: featuresString.split('\n').map(s => s.trim()).filter(s => s.length > 0)
      } as TrainingProgram;
      onSave(updatedProgram);
    }
  };

  return (
    <FormLayout
      title={formData.id ? 'Edit Training Program' : 'Create New Program'}
      isEdit={!!formData.id}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      submitLabel="Save Program"
    >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Program Title</label>
            <input
              type="text"
              name="title"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.title || ''}
              onChange={handleChange}
              placeholder="e.g. Institutional Training"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.category || 'Institutional'}
              onChange={handleChange}
            >
              <option value="Institutional">Institutional</option>
              <option value="Corporate">Corporate</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description / Subtitle</label>
          <input
             type="text"
            name="description"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={formData.description || ''}
            onChange={handleChange}
            placeholder="Short description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Features / Benefits (One per line)</label>
          <textarea
            rows={6}
            value={featuresString}
            onChange={handleFeaturesChange}
            placeholder="College MoU Partnerships&#10;Faculty Development Programs&#10;Guest Lectures"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

    </FormLayout>
  );
};

export default TrainingForm;