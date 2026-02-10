/**
 * Currency formatting utility
 */
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Percentage calculation
 */
export const calculateDiscount = (originalPrice: number, discountedPrice: number): number => {
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

/**
 * Generate slug from title
 */
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Truncate text
 */
export const truncateText = (text: string, limit: number = 100): string => {
  return text.length > limit ? `${text.substring(0, limit)}...` : text;
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Format date
 */
export const formatDate = (date: Date | string, format: string = 'short'): string => {
  const d = new Date(date);
  const options: Intl.DateTimeFormatOptions =
    format === 'short'
      ? { year: 'numeric', month: 'short', day: 'numeric' }
      : { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return d.toLocaleDateString('en-US', options);
};

/**
 * Validate email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Get initials from name
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

/**
 * Combine classNames
 */
export const cn = (...classes: (string | undefined | null | boolean)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Check if device is mobile
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * Parse query string
 */
export const parseQueryString = (queryString: string): Record<string, string> => {
  const params = new URLSearchParams(queryString);
  const result: Record<string, string> = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
};

/**
 * Sleep/delay utility (for async operations)
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
