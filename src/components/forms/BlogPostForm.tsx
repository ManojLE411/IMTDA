import React, { useState, useEffect } from 'react';
import { BlogPost } from '@/types/blog.types';
import { FormLayout, ImageUpload } from '@/components/ui';

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

  const handleImageChange = (base64: string) => {
    setFormData((prev) => ({ ...prev, image: base64 }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.content && formData.author && formData.category) {
      onSave(formData as BlogPost);
    }
  };

  return (
    <FormLayout
      title={formData.id ? 'Edit Post' : 'Create New Post'}
      isEdit={!!formData.id}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      submitLabel="Save Post"
    >
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

        <ImageUpload
          value={formData.image}
          onChange={handleImageChange}
          id="blog-image-upload"
          replaceId="blog-image-upload-replace"
          label="Featured Image"
        />

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

    </FormLayout>
  );
};

export default BlogPostForm;
