/**
 * Input Component
 * Reusable input field with label, error, and icon support
 */

import React from 'react';
import styles from './Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  fullWidth = true,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

  const inputClasses = [
    styles.input,
    error ? styles.inputError : styles.inputNormal,
    leftIcon ? styles.inputWithLeftIcon : '',
    rightIcon ? styles.inputWithRightIcon : '',
    className,
  ].filter(Boolean).join(' ');

  const containerClasses = fullWidth ? styles.containerFullWidth : styles.container;

  return (
    <div className={containerClasses}>
      {label && (
        <label
          htmlFor={inputId}
          className={styles.label}
        >
          {label}
          {props.required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      <div className={styles.inputWrapper}>
        {leftIcon && (
          <div className={styles.leftIconContainer}>
            {leftIcon}
          </div>
        )}
        
        <input
          id={inputId}
          className={inputClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        
        {rightIcon && (
          <div className={styles.rightIconContainer}>
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <p id={`${inputId}-error`} className={styles.error} role="alert">
          {error}
        </p>
      )}

      {helperText && !error && (
        <p id={`${inputId}-helper`} className={styles.helperText}>
          {helperText}
        </p>
      )}
    </div>
  );
};
