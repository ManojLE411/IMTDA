import { useState, useEffect } from 'react';
import { InternshipApplication } from '../types/internship.types';
import { internshipStorage } from '../api/internshipStorage';

export const useInternshipApplication = () => {
  const [applications, setApplications] = useState<InternshipApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApplications = () => {
      try {
        const stored = internshipStorage.getAllApplications();
        setApplications(stored);
      } catch (error) {
        console.error('Failed to load applications', error);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  const applyForInternship = (application: InternshipApplication) => {
    internshipStorage.saveApplication(application);
    setApplications(prev => [application, ...prev]);
  };

  const deleteApplication = (id: string) => {
    internshipStorage.deleteApplication(id);
    setApplications(prev => prev.filter(a => a.id !== id));
  };

  return {
    applications,
    loading,
    applyForInternship,
    deleteApplication,
  };
};

