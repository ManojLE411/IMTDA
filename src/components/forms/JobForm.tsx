import React, { useState, useEffect } from 'react';
import { Job, JobType, JobLocation } from '@/types/job.types';
import { FormLayout } from '@/components/ui';

interface JobFormProps {
  initialData?: Partial<Job>;
  onSave: (job: Job) => void;
  onCancel: () => void;
}

const jobTypes: JobType[] = ['Full-time', 'Part-time', 'Contract'];
const jobLocations: JobLocation[] = ['Remote', 'On-site', 'Hybrid'];

export const JobForm: React.FC<JobFormProps> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Job>>({
    title: '',
    department: '',
    type: 'Full-time',
    location: 'Remote',
    description: '',
    ...initialData
  });

  useEffect(() => {
    setFormData({
      title: '',
      department: '',
      type: 'Full-time',
      location: 'Remote',
      description: '',
      ...initialData
    });
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.department && formData.type && formData.location) {
      const updatedJob = {
        ...formData,
      } as Job;
      onSave(updatedJob);
    }
  };

  return (
    <FormLayout
      title={formData.id ? 'Edit Job Position' : 'Add New Job Position'}
      isEdit={!!formData.id}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      submitLabel="Save Job Position"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
          <input
            type="text"
            name="title"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={formData.title || ''}
            onChange={handleChange}
            placeholder="e.g., Senior Software Engineer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
          <input
            type="text"
            name="department"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={formData.department || ''}
            onChange={handleChange}
            placeholder="e.g., Engineering, Sales, R&D"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Type *</label>
          <select
            name="type"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={formData.type || 'Full-time'}
            onChange={handleChange}
          >
            {jobTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
          <select
            name="location"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={formData.location || 'Remote'}
            onChange={handleChange}
          >
            {jobLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
        <textarea
          name="description"
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          value={formData.description || ''}
          onChange={handleChange}
          placeholder="Job description, requirements, responsibilities..."
        />
      </div>
    </FormLayout>
  );
};

export default JobForm;

