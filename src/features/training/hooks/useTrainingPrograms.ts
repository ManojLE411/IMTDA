import { useState, useEffect } from 'react';
import { TrainingProgram } from '../types/training.types';
import { trainingStorage } from '../api/trainingStorage';
import { DEFAULT_TRAINING_PROGRAMS } from '../constants/training.constants';

export const useTrainingPrograms = () => {
  const [programs, setPrograms] = useState<TrainingProgram[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPrograms = () => {
      try {
        const stored = trainingStorage.getAll();
        setPrograms(stored.length > 0 ? stored : DEFAULT_TRAINING_PROGRAMS);
      } catch (error) {
        console.error('Failed to load training programs', error);
        setPrograms(DEFAULT_TRAINING_PROGRAMS);
      } finally {
        setLoading(false);
      }
    };

    loadPrograms();
  }, []);

  const saveProgram = (program: TrainingProgram) => {
    trainingStorage.save(program);
    setPrograms(prev => {
      const exists = prev.some(p => p.id === program.id);
      return exists 
        ? prev.map(p => p.id === program.id ? program : p)
        : [program, ...prev];
    });
  };

  const deleteProgram = (id: string) => {
    trainingStorage.delete(id);
    setPrograms(prev => prev.filter(p => p.id !== id));
  };

  return {
    programs,
    loading,
    saveProgram,
    deleteProgram,
  };
};

