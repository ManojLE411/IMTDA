/**
 * Redux Store Configuration
 * Central store setup with all reducers
 */

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import blogReducer from './slices/blogSlice';
import internshipReducer from './slices/internshipSlice';
import trainingReducer from './slices/trainingSlice';
import employeeReducer from './slices/employeeSlice';
import contactReducer from './slices/contactSlice';
import testimonialReducer from './slices/testimonialSlice';
import serviceReducer from './slices/serviceSlice';
import jobReducer from './slices/jobSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
    internship: internshipReducer,
    training: trainingReducer,
    employee: employeeReducer,
    contact: contactReducer,
    testimonial: testimonialReducer,
    service: serviceReducer,
    job: jobReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

