import { useState, useEffect, useCallback } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectIsAuthenticated } from '@/store/slices/authSlice';
import { Project } from '@/types/common.types';
import { projectApi } from '@/services/projectApi';
import { isValidObjectId } from '@/utils/validation';

export const useProjects = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const allProjects = await projectApi.getAll();
      setProjects(allProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
      setError(error instanceof Error ? error.message : 'Failed to load projects');
      // Keep existing projects on error instead of clearing
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadProjects();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, loadProjects]);

  const saveProject = async (project: Project) => {
    try {
      setError(null);
      const { id, ...projectData } = project;
      // Only update if ID exists and is a valid MongoDB ObjectId
      // Timestamp-based IDs (from Date.now()) are not valid ObjectIds
      if (id && isValidObjectId(id)) {
        await projectApi.update(id, projectData);
      } else {
        await projectApi.create(projectData);
      }
      await loadProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      setError(error instanceof Error ? error.message : 'Failed to save project');
      throw error;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      setError(null);
      await projectApi.delete(id);
      await loadProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete project');
      throw error;
    }
  };

  return {
    projects,
    loading,
    error,
    saveProject,
    deleteProject,
  };
};

