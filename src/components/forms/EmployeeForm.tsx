import React, { useState, useEffect } from 'react';
import { Employee } from '@/types/employee.types';
import { FormLayout, ImageUpload } from '@/components/ui';

interface EmployeeFormProps {
  initialData?: Partial<Employee>;
  onSave: (employee: Employee) => void;
  onCancel: () => void;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Employee>>({
    name: '',
    role: '',
    summary: '',
    skills: [],
    image: '',
    ...initialData
  });

  const [skillsString, setSkillsString] = useState('');

  useEffect(() => {
    setFormData({
      name: '',
      role: '',
      summary: '',
      skills: [],
      image: '',
      ...initialData
    });
    if (initialData?.skills) {
      setSkillsString(initialData.skills.join(', '));
    } else {
      setSkillsString('');
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    if (formData.name && formData.role && formData.summary) {
      const updatedEmployee = {
        ...formData,
        skills: skillsString.split(',').map(s => s.trim()).filter(s => s.length > 0)
      } as Employee;
      onSave(updatedEmployee);
    }
  };

  return (
    <FormLayout
      title={formData.id ? 'Edit Employee' : 'Add New Employee'}
      isEdit={!!formData.id}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      submitLabel="Save Employee"
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
              placeholder="Employee name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
            <input
              type="text"
              name="role"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.role || ''}
              onChange={handleChange}
              placeholder="Job title / Position"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Summary *</label>
          <textarea
            name="summary"
            rows={3}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={formData.summary || ''}
            onChange={handleChange}
            placeholder="Brief description of the employee's role and expertise..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={skillsString}
            onChange={handleSkillsChange}
            placeholder="Enter skills separated by commas (e.g., React, Node.js, TypeScript)"
          />
          <p className="text-xs text-gray-500 mt-1">Separate multiple skills with commas</p>
        </div>

        <ImageUpload
          value={formData.image}
          onChange={handleImageChange}
          id="employee-image-upload"
          replaceId="employee-image-upload-replace"
          label="Photo"
          previewClassName="w-40 h-40 object-cover rounded-lg border-2 border-gray-300"
        />

    </FormLayout>
  );
};

export default EmployeeForm;

