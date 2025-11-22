import React, { useState, useEffect } from 'react';
import { Employee } from '../types/employee.types';
import { Save, X, Image as ImageIcon } from 'lucide-react';

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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

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
    if (initialData?.image) {
      setImagePreview(initialData.image);
    } else {
      setImagePreview(null);
    }
    setImageFile(null);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB.');
        return;
      }

      setImageFile(file);
      
      // Read file and convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setFormData((prev) => ({ ...prev, image: base64String }));
      };
      reader.onerror = () => {
        alert('Error reading image file.');
      };
      reader.readAsDataURL(file);
    }
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
    <div className="bg-white rounded-xl shadow-lg p-8 animate-slide-up">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{formData.id ? 'Edit Employee' : 'Add New Employee'}</h2>
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
          <div className="space-y-3">
            {imagePreview ? (
              <div className="space-y-3">
                <div className="relative inline-block">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-40 h-40 object-cover rounded-lg border-2 border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setImageFile(null);
                      setFormData((prev) => ({ ...prev, image: '' }));
                      // Reset file input
                      const fileInput = document.getElementById('image-upload') as HTMLInputElement;
                      if (fileInput) fileInput.value = '';
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    title="Remove image"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div>
                  <label htmlFor="image-upload-replace" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                    <ImageIcon size={16} className="mr-2" />
                    Replace Photo
                    <input 
                      id="image-upload-replace" 
                      type="file" 
                      className="sr-only" 
                      accept="image/*" 
                      onChange={handleImageChange} 
                    />
                  </label>
                </div>
              </div>
            ) : (
              <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition-colors">
                <div className="space-y-2 text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label htmlFor="image-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                      <span>Upload a photo</span>
                      <input 
                        id="image-upload" 
                        name="image-upload" 
                        type="file" 
                        className="sr-only" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                  {imageFile && (
                    <p className="text-sm text-green-600 font-semibold mt-2">Selected: {imageFile.name}</p>
                  )}
                </div>
              </div>
            )}
          </div>
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
            <Save size={18} /> Save Employee
          </button>
        </div>
      </form>
    </div>
  );
};

