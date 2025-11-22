import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types/blog.types';
import { Save, X, Image as ImageIcon } from 'lucide-react';

interface BlogPostFormProps {
  initialData?: Partial<BlogPost>;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}

export const BlogPostForm: React.FC<BlogPostFormProps> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    category: '',
    author: '',
    image: '',
    excerpt: '',
    content: '',
    ...initialData
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    setFormData({
      title: '',
      category: '',
      author: '',
      image: '',
      excerpt: '',
      content: '',
      ...initialData
    });
    if (initialData?.image) {
      setImagePreview(initialData.image);
    } else {
      setImagePreview(null);
    }
    setImageFile(null);
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    if (formData.title && formData.content && formData.author && formData.category) {
      onSave(formData as BlogPost);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 animate-slide-up">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{formData.id ? 'Edit Post' : 'Create New Post'}</h2>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.title || ''}
              onChange={handleChange}
              placeholder="Enter post title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.category || ''}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="AI & Tech">AI & Tech</option>
              <option value="Education">Education</option>
              <option value="Company News">Company News</option>
              <option value="Industry Trends">Industry Trends</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
            <input
              type="text"
              name="author"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.author || ''}
              onChange={handleChange}
              placeholder="Author name"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
          <div className="space-y-3">
            {imagePreview ? (
              <div className="space-y-3">
                <div className="relative inline-block">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setImageFile(null);
                      setFormData((prev) => ({ ...prev, image: '' }));
                      // Reset file input
                      const fileInput = document.getElementById('blog-image-upload') as HTMLInputElement;
                      if (fileInput) fileInput.value = '';
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    title="Remove image"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div>
                  <label htmlFor="blog-image-upload-replace" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                    <ImageIcon size={16} className="mr-2" />
                    Replace Image
                    <input 
                      id="blog-image-upload-replace" 
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
                    <label htmlFor="blog-image-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                      <span>Upload an image</span>
                      <input 
                        id="blog-image-upload" 
                        name="blog-image-upload" 
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt (Short Summary)</label>
          <textarea
            name="excerpt"
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={formData.excerpt || ''}
            onChange={handleChange}
            placeholder="Brief summary of the post..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content (Full Article)</label>
          <textarea
            name="content"
            rows={10}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm transition-all"
            value={formData.content || ''}
            onChange={handleChange}
            placeholder="Write your article content here..."
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
            <Save size={18} /> Save Post
          </button>
        </div>
      </form>
    </div>
  );
};

