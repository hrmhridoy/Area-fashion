'use client';

import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cart';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch } from 'react-icons/fi';
import { useState } from 'react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = useCartStore((state) => state.getCartCount());

  const navigation = [
    { label: 'Women', href: '/shop?category=women' },
    { label: 'Men', href: '/shop?category=men' },
    { label: 'Accessories', href: '/shop?category=accessories' },
    { label: 'New Arrivals', href: '/shop?sort=newest' },
    { label: 'Sale', href: '/shop?sale=true' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-subtle">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-serif font-bold text-lg">A</span>
            </div>
            <span className="font-serif font-bold text-xl hidden sm:inline">Aria</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-primary-800 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <FiSearch className="w-5 h-5 text-gray-700" />
            </button>

            <Link href="/account" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <FiUser className="w-5 h-5 text-gray-700" />
            </Link>

            <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <FiShoppingCart className="w-5 h-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-accent-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <FiX className="w-5 h-5 text-gray-700" />
              ) : (
                <FiMenu className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden border-t border-gray-100 py-4 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-sm font-medium text-gray-700 hover:text-primary-800 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};
