import React, { useState, useEffect } from 'react';
import { TrainingProgram } from '../types/training.types';
import { Save, X } from 'lucide-react';

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
    <div className="bg-white rounded-xl shadow-lg p-8 animate-slide-up">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{formData.id ? 'Edit Training Program' : 'Create New Program'}</h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={24} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
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

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-imtda-primary text-white rounded-lg font-bold hover:bg-blue-800 flex items-center gap-2 transition-colors shadow-md"
          >
            <Save size={18} /> Save Program
          </button>
        </div>
      </form>
    </div>
  );
};

