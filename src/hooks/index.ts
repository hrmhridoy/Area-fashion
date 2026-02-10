'use client';

import { useEffect, useState } from 'react';
import { debounce } from '@/lib/utils';

/**
 * Hook for managing form state
 */
export const useForm = <T extends Record<string, any>>(initialValues: T) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setValues((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValues,
    setErrors,
    setTouching: setTouched,
    handleChange,
    handleBlur,
    resetForm,
    setIsSubmitting,
  };
};

/**
 * Hook for handling async operations
 */
export const useAsync = <T, E = string>(
  asyncFunction: () => Promise<T>,
  immediate = true
) => {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);

  const execute = async () => {
    setStatus('pending');
    setData(null);
    setError(null);
    try {
      const response = await asyncFunction();
      setData(response);
      setStatus('success');
      return response;
    } catch (err) {
      setError(err as E);
      setStatus('error');
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, []);

  return { execute, status, data, error };
};

/**
 * Hook for window size
 */
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = debounce(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 200);

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

/**
 * Hook for local storage
 */
export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, [key]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue, isLoading] as const;
};

/**
 * Hook for debounced value
 */
export const useDebouncedValue = <T,>(value: T, delay: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Hook for click outside element
 */
export const useClickOutside = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, callback]);
};

/**
 * Hook for previous value
 */
export const usePrevious = <T,>(value: T): T | undefined => {
  const ref = React.useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
