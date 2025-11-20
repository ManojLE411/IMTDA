import React, { useState, useEffect } from 'react';
import { BlogPost } from '../../types';
import { Save, X } from 'lucide-react';

interface BlogPostFormProps {
  initialData?: Partial<BlogPost>;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    category: '',
    author: '',
    image: '',
    excerpt: '',
    content: '',
    ...initialData
  });

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
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.content && formData.author && formData.category) {
      // Assuming id and date are passed in initialData or handled by parent before this
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="text"
              name="image"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.image || ''}
              onChange={handleChange}
              placeholder="https://..."
            />
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

export default BlogPostForm;
