import React, { useState, useEffect } from 'react';
import { Project } from '@/types/common.types';
import { FormLayout, ImageUpload } from '@/components/ui';

interface ProjectFormProps {
  initialData?: Partial<Project>;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

const projectCategories: Project['category'][] = ['AI/ML', 'Web', 'VLSI', 'IoT', 'Data Science'];

export const ProjectForm: React.FC<ProjectFormProps> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    category: 'Web',
    description: '',
    techStack: [],
    image: '',
    ...initialData
  });

  const [techStackString, setTechStackString] = useState('');

  useEffect(() => {
    setFormData({
      title: '',
      category: 'Web',
      description: '',
      techStack: [],
      image: '',
      ...initialData
    });
    if (initialData?.techStack) {
      setTechStackString(initialData.techStack.join(', '));
    } else {
      setTechStackString('');
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTechStackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTechStackString(e.target.value);
  };

  const handleImageChange = (base64: string) => {
    setFormData((prev) => ({ ...prev, image: base64 }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.description && formData.category) {
      const updatedProject = {
        ...formData,
        techStack: techStackString.split(',').map(s => s.trim()).filter(s => s.length > 0)
      } as Project;
      onSave(updatedProject);
    }
  };

  return (
    <FormLayout
      title={formData.id ? 'Edit Project' : 'Add New Project'}
      isEdit={!!formData.id}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      submitLabel="Save Project"
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
            placeholder="Project title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
          <select
            name="category"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={formData.category || 'Web'}
            onChange={handleChange}
          >
            {projectCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
        <textarea
          name="description"
          rows={4}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          value={formData.description || ''}
          onChange={handleChange}
          placeholder="Project description..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Technology Stack</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          value={techStackString}
          onChange={handleTechStackChange}
          placeholder="Enter technologies separated by commas (e.g., React, Node.js, TypeScript)"
        />
        <p className="text-xs text-gray-500 mt-1">Separate multiple technologies with commas</p>
      </div>

      <ImageUpload
        value={formData.image}
        onChange={handleImageChange}
        id="project-image-upload"
        replaceId="project-image-upload-replace"
        label="Project Image"
      />
    </FormLayout>
  );
};

export default ProjectForm;

