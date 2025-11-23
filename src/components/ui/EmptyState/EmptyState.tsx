/**
 * EmptyState Component
 * Reusable empty state component for loading and empty states
 */

import React from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import styles from './EmptyState.module.css';

export interface EmptyStateProps {
  type?: 'empty' | 'loading';
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'empty',
  title,
  message,
  icon,
  action,
  className = '',
}) => {
  const classes = [styles.container, className].filter(Boolean).join(' ');

  const defaultIcon = type === 'loading' ? (
    <Loader2 className={styles.loadingIcon} />
  ) : (
    icon || <AlertCircle className={styles.icon} />
  );

  const defaultTitle = title || (type === 'loading' ? 'Loading...' : 'No items found');
  const defaultMessage = message || (type === 'loading' 
    ? 'Please wait while we load the content.' 
    : 'There are no items to display at the moment.');

  return (
    <div className={classes}>
      <div className={styles.content}>
        {defaultIcon}
        <h3 className={styles.title}>{defaultTitle}</h3>
        <p className={styles.message}>{defaultMessage}</p>
        {action && <div className={styles.action}>{action}</div>}
      </div>
    </div>
  );
};

