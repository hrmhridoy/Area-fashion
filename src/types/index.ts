// Product Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  category: ProductCategory;
  subcategory?: string;
  sizes?: string[];
  colors?: ColorOption[];
  material?: string;
  careInstructions?: string[];
  inStock: boolean;
  stock: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface ColorOption {
  name: string;
  hex: string;
}

// Cart Types
export interface CartItem {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
  price: number;
  product?: Product;
}

export interface Cart {
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
}

// Order Types
export interface OrderItem {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
  price: number;
  name: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  shippingAddress: Address;
  billingAddress: Address;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
export type PaymentMethod = 'stripe' | 'paypal' | 'bank_transfer';

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  phone?: string;
  addresses: Address[];
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  id?: string;
  type: 'shipping' | 'billing';
  isPrimary: boolean;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface UserPreferences {
  newsletter: boolean;
  smsNotifications: boolean;
  emailNotifications: boolean;
  theme: 'light' | 'dark';
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Filter Types
export interface ProductFilter {
  categories?: string[];
  priceRange?: [number, number];
  colors?: string[];
  sizes?: string[];
  inStock?: boolean;
  sortBy?: 'newest' | 'price-low' | 'price-high' | 'rating' | 'popular';
  searchTerm?: string;
  page?: number;
  limit?: number;
}

// Review Types
export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userImage?: string;
  rating: number;
  title: string;
  comment: string;
  helpful: number;
  verified: boolean;
  createdAt: Date;
}
