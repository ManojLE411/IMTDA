/**
 * SectionHeader Component
 * Reusable section header with title and subtitle
 */

import React from 'react';
import styles from './SectionHeader.module.css';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  align = 'left',
  className = '',
}) => {
  const classes = [
    styles.header,
    styles[`align${align.charAt(0).toUpperCase() + align.slice(1)}`],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
};

