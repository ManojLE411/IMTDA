import React, { useState, useEffect } from 'react';
import { InternshipTrack } from '@/types/internship.types';
import { FormLayout, ImageUpload } from '@/components/ui';

interface InternshipFormProps {
  initialData?: Partial<InternshipTrack>;
  onSave: (track: InternshipTrack) => void;
  onCancel: () => void;
}

export const InternshipForm: React.FC<InternshipFormProps> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<InternshipTrack>>({
    title: '',
    duration: '',
    mode: 'Online',
    skills: [],
    description: '',
    image: '',
    ...initialData
  });

  const [skillsString, setSkillsString] = useState('');

  useEffect(() => {
    setFormData({
      title: '',
      duration: '',
      mode: 'Online',
      skills: [],
      description: '',
      image: '',
      ...initialData
    });
    if (initialData?.skills) {
      setSkillsString(initialData.skills.join(', '));
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillsString(e.target.value);
  };

  const handleImageChange = (base64: string) => {
    setFormData((prev) => ({ ...prev, image: base64 }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.description) {
      const updatedTrack = {
        ...formData,
        skills: skillsString.split(',').map(s => s.trim()).filter(s => s.length > 0)
      } as InternshipTrack;
      onSave(updatedTrack);
    }
  };

  return (
    <FormLayout
      title={formData.id ? 'Edit Internship Track' : 'Create New Track'}
      isEdit={!!formData.id}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      submitLabel="Save Internship"
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
              placeholder="e.g. AI & Machine Learning"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
            <input
              type="text"
              name="duration"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.duration || ''}
              onChange={handleChange}
              placeholder="e.g. 2 Months"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mode</label>
            <select
              name="mode"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.mode || 'Online'}
              onChange={handleChange}
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        <ImageUpload
          value={formData.image}
          onChange={handleImageChange}
          id="internship-image-upload"
          replaceId="internship-image-upload-replace"
          label="Featured Image"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Key Skills (Comma separated)</label>
          <input
            type="text"
            value={skillsString}
            onChange={handleSkillsChange}
            placeholder="React, Node.js, TypeScript"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            rows={4}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={formData.description || ''}
            onChange={handleChange}
            placeholder="Brief description of the program..."
          />
        </div>

    </FormLayout>
  );
};

export default InternshipForm;