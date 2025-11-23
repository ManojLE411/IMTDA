/**
 * Loading Component
 * Simple loading spinner component
 */

import React from 'react';
import { Loader2 } from 'lucide-react';
import styles from './Loading.module.css';

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
  fullScreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  text,
  className = '',
  fullScreen = false,
}) => {
  const classes = [
    styles.container,
    fullScreen ? styles.fullScreen : '',
    className,
  ].filter(Boolean).join(' ');

  const sizeClasses = {
    sm: styles.sizeSm,
    md: styles.sizeMd,
    lg: styles.sizeLg,
  };

  return (
    <div className={classes}>
      <div className={styles.content}>
        <Loader2 className={`${styles.spinner} ${sizeClasses[size]}`} />
        {text && <p className={styles.text}>{text}</p>}
      </div>
    </div>
  );
};

