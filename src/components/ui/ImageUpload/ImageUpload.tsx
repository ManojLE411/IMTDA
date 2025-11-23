/**
 * ImageUpload Component
 * Reusable image upload component with preview
 */

import React, { useRef, useState, useEffect } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';

export interface ImageUploadProps {
  value?: string;
  onChange: (base64: string) => void;
  onRemove?: () => void;
  accept?: string;
  maxSizeMB?: number;
  previewClassName?: string;
  label?: string;
  id?: string;
  replaceId?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
  accept = 'image/*',
  maxSizeMB = 5,
  previewClassName = 'w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-300',
  label = 'Featured Image',
  id = 'image-upload',
  replaceId = 'image-upload-replace',
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(value || null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputReplaceRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImagePreview(value || null);
  }, [value]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
      }
      
      // Validate file size
      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`Image size should be less than ${maxSizeMB}MB.`);
        return;
      }

      setImageFile(file);
      
      // Read file and convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        onChange(base64String);
      };
      reader.onerror = () => {
        alert('Error reading image file.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setImagePreview(null);
    setImageFile(null);
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (fileInputReplaceRef.current) {
      fileInputReplaceRef.current.value = '';
    }
    onRemove?.();
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="space-y-3">
        {imagePreview ? (
          <div className="space-y-3">
            <div className="relative inline-block">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className={previewClassName}
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                title="Remove image"
              >
                <X size={16} />
              </button>
            </div>
            <div>
              <label htmlFor={replaceId} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                <ImageIcon size={16} className="mr-2" />
                Replace Image
                <input 
                  id={replaceId} 
                  ref={fileInputReplaceRef}
                  type="file" 
                  className="sr-only" 
                  accept={accept} 
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
                <label htmlFor={id} className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                  <span>Upload an image</span>
                  <input 
                    id={id} 
                    ref={fileInputRef}
                    name={id} 
                    type="file" 
                    className="sr-only" 
                    accept={accept} 
                    onChange={handleImageChange} 
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to {maxSizeMB}MB</p>
              {imageFile && (
                <p className="text-sm text-green-600 font-semibold mt-2">Selected: {imageFile.name}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

