'use client';

import { ProductCard } from '@/components';
import { Product } from '@/types';
import Link from 'next/link';
import { FiArrowRight, FiTruck, FiShield, FiRotateCcw } from 'react-icons/fi';

// Mock data - replace with API calls
const FEATURED_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Linen Shirt',
    slug: 'premium-linen-shirt',
    description: 'Comfortable and breathable',
    longDescription: 'A timeless linen shirt perfect for any season',
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.5,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop',
    images: [],
    category: { id: '1', name: 'Shirts', slug: 'shirts', description: '', image: '' },
    inStock: true,
    stock: 45,
    tags: ['linen', 'casual', 'summer'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Elegant Black Blazer',
    slug: 'elegant-black-blazer',
    description: 'Perfect for formal occasions',
    longDescription: 'A sophisticated blazer for elevated styling',
    price: 159.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviews: 92,
    image: 'https://images.unsplash.com/photo-1591047139829-c91a6be3979d?w=500&h=600&fit=crop',
    images: [],
    category: { id: '2', name: 'Blazers', slug: 'blazers', description: '', image: '' },
    inStock: true,
    stock: 28,
    tags: ['blazer', 'formal', 'elegant'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Minimalist White Tee',
    slug: 'minimalist-white-tee',
    description: 'Essential wardrobe basic',
    longDescription: 'Versatile white t-shirt for everyday wear',
    price: 39.99,
    rating: 4.6,
    reviews: 256,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop',
    images: [],
    category: { id: '3', name: 'T-Shirts', slug: 't-shirts', description: '', image: '' },
    inStock: true,
    stock: 120,
    tags: ['tee', 'casual', 'basic'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Tailored Trousers',
    slug: 'tailored-trousers',
    description: 'Perfect fit and comfort',
    longDescription: 'Professional tailored trousers for work and beyond',
    price: 119.99,
    originalPrice: 179.99,
    rating: 4.7,
    reviews: 84,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=600&fit=crop',
    images: [],
    category: { id: '4', name: 'Trousers', slug: 'trousers', description: '', image: '' },
    inStock: true,
    stock: 35,
    tags: ['trousers', 'formal', 'tailored'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-primary-100 to-primary-50 overflow-hidden flex items-center">
        <div className="container-custom w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-900 mb-6 leading-tight">
              Timeless Style,<br />
              <span className="text-accent-600">Modern Design</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl">
              Discover our curated collection of fashion essentials that combine elegance with everyday
              wearability.
            </p>
            <Link href="/shop" className="btn btn-accent inline-flex items-center gap-2">
              Shop Now <FiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-accent-600 rounded-full opacity-10 blur-3xl" />
      </section>

      {/* Features Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid-features">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent-100">
                  <FiTruck className="h-6 w-6 text-accent-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Shipping</h3>
                <p className="text-gray-600">Free worldwide shipping on orders over $100</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent-100">
                  <FiShield className="h-6 w-6 text-accent-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Checkout</h3>
                <p className="text-gray-600">Safe and encrypted payment processing</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent-100">
                  <FiRotateCcw className="h-6 w-6 text-accent-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Returns</h3>
                <p className="text-gray-600">30-day return policy for peace of mind</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-sm font-medium text-accent-600 uppercase tracking-wider mb-2">
                Collection
              </p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">
                Featured Pieces
              </h2>
            </div>
            <Link href="/shop" className="text-sm font-medium text-accent-600 hover:text-accent-700">
              View All →
            </Link>
          </div>

          <div className="grid-products">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary-900 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            New Season, New Style
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Explore our latest collection and discover pieces that elevate your everyday style.
          </p>
          <Link href="/shop?sort=newest" className="btn btn-accent inline-flex items-center gap-2">
            Explore New Arrivals <FiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <p className="text-sm font-medium text-accent-600 uppercase tracking-wider mb-2">
            Shop By Category
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-12">
            Find Your Style
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Women', href: '/shop?category=women' },
              { name: 'Men', href: '/shop?category=men' },
              { name: 'Accessories', href: '/shop?category=accessories' },
              { name: 'Sale', href: '/shop?sale=true' },
            ].map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="group relative h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 transition-all duration-300 flex items-center justify-center"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-accent-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-700 mt-2">Shop Now →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
