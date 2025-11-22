import { useState, useEffect } from 'react';
import { InternshipTrack } from '../types/internship.types';
import { internshipStorage } from '../api/internshipStorage';
import { DEFAULT_INTERNSHIP_TRACKS } from '../constants/internship.constants';

export const useInternships = () => {
  const [tracks, setTracks] = useState<InternshipTrack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTracks = () => {
      try {
        const stored = internshipStorage.getAll();
        setTracks(stored.length > 0 ? stored : DEFAULT_INTERNSHIP_TRACKS);
      } catch (error) {
        console.error('Failed to load internships', error);
        setTracks(DEFAULT_INTERNSHIP_TRACKS);
      } finally {
        setLoading(false);
      }
    };

    loadTracks();
  }, []);

  const saveTrack = (track: InternshipTrack) => {
    internshipStorage.save(track);
    setTracks(prev => {
      const exists = prev.some(t => t.id === track.id);
      return exists 
        ? prev.map(t => t.id === track.id ? track : t)
        : [track, ...prev];
    });
  };

  const deleteTrack = (id: string) => {
    internshipStorage.delete(id);
    setTracks(prev => prev.filter(t => t.id !== id));
  };

  return {
    tracks,
    loading,
    saveTrack,
    deleteTrack,
  };
};

