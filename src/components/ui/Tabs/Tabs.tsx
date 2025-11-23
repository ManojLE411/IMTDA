/**
 * Tabs Component
 * Reusable tabs component for filtering and navigation
 */

import React from 'react';
import styles from './Tabs.module.css';

export interface Tab {
  id: string;
  label: string;
}

export interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
  variant?: 'default' | 'pills' | 'underline';
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = '',
  variant = 'default',
}) => {
  const classes = [
    styles.tabs,
    styles[variant],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} role="tablist">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab.id)}
            className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

