/**
 * Card Component
 * Reusable card container with optional header, body, and footer
 */

import React from 'react';
import { motion } from 'framer-motion';
import styles from './Card.module.css';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  padding = 'md',
  onClick,
}) => {
  const paddingClasses = {
    none: styles.paddingNone,
    sm: styles.paddingSm,
    md: styles.paddingMd,
    lg: styles.paddingLg,
  };

  const classes = [
    styles.card,
    paddingClasses[padding],
    hover ? styles.cardHover : '',
    onClick ? styles.cardClickable : '',
    className,
  ].filter(Boolean).join(' ');

  const cardContent = (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );

  if (hover || onClick) {
    return (
      <motion.div
        transition={{ duration: 0.2 }}
        whileHover={hover ? { y: -4 } : undefined}
        whileTap={onClick ? { scale: 0.98 } : undefined}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => (
  <div className={`${styles.header} ${className}`.trim()}>{children}</div>
);

export const CardBody: React.FC<CardBodyProps> = ({ children, className = '' }) => (
  <div className={`${styles.body} ${className}`.trim()}>{children}</div>
);

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => (
  <div className={`${styles.footer} ${className}`.trim()}>{children}</div>
);

