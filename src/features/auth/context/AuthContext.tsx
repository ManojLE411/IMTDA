import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Student } from '../types/auth.types';
import { authStorage } from '../api/authStorage';
import { STORAGE_KEYS } from '@/shared/constants';
import { StorageService } from '@/shared/utils';

interface AuthContextType {
  currentUser: Student | null;
  login: (email: string, password: string) => boolean;
  register: (student: Student) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<Student | null>(null);

  useEffect(() => {
    const savedUser = StorageService.get<Student>(STORAGE_KEYS.CURRENT_USER);
    if (savedUser) {
      setCurrentUser(savedUser);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      StorageService.set(STORAGE_KEYS.CURRENT_USER, currentUser);
    } else {
      StorageService.remove(STORAGE_KEYS.CURRENT_USER);
    }
  }, [currentUser]);

  const login = (email: string, password: string): boolean => {
    const user = authStorage.findByEmailAndPassword(email, password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const register = (student: Student): boolean => {
    if (authStorage.findByEmail(student.email)) {
      return false; // Email exists
    }
    authStorage.save(student);
    setCurrentUser(student);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        register,
        logout,
        isAuthenticated: !!currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

