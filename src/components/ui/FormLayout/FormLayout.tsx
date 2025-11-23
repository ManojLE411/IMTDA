/**
 * FormLayout Component
 * Reusable form layout with header, cancel button, and save button
 */

import React, { ReactNode } from 'react';
import { X, Save } from 'lucide-react';

export interface FormLayoutProps {
  title: string;
  isEdit?: boolean;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
  children: ReactNode;
  submitLabel?: string;
  submitIcon?: React.ReactNode;
}

export const FormLayout: React.FC<FormLayoutProps> = ({
  title,
  isEdit = false,
  onCancel,
  onSubmit,
  children,
  submitLabel,
  submitIcon = <Save size={18} />,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 animate-slide-up">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{title}</h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={24} />
        </button>
      </div>
      <form onSubmit={onSubmit} className="space-y-6">
        {children}
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
            {submitIcon} {submitLabel || 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

