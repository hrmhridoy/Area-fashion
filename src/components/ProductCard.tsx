'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { FiHeart, FiShoppingBag, FiStar } from 'react-icons/fi';
import { formatCurrency, calculateDiscount } from '@/lib/utils';
import { useCartStore } from '@/store/cart';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, variant = 'default' }) => {
  const addItem = useCartStore((state) => state.addItem);
  const [isWishlisted, setIsWishlisted] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  if (variant === 'compact') {
    return (
      <Link href={`/product/${product.slug}`}>
        <div className="group card-interactive p-0 overflow-hidden">
          <div className="relative h-48 bg-gray-100 overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {discount > 0 && (
              <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                -{discount}%
              </div>
            )}
          </div>
          <div className="p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{product.category.name}</p>
            <h3 className="font-semibold text-gray-900 line-clamp-2 mb-3 group-hover:text-accent-600 transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-gray-900">{formatCurrency(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
              </div>
              <button
                onClick={handleAddToCart}
                className="p-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors"
              >
                <FiShoppingBag className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/product/${product.slug}`}>
      <div className="group card-interactive h-full flex flex-col overflow-hidden">
        {/* Image Section */}
        <div className="relative h-80 bg-gray-100 overflow-hidden flex-shrink-0">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={false}
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            {discount > 0 && (
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                Sale -{discount}%
              </div>
            )}
            {!product.inStock && (
              <div className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-medium">
                Out of Stock
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className="absolute bottom-4 right-4 p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow opacity-0 group-hover:opacity-100"
          >
            <FiHeart
              className={`w-5 h-5 ${
                isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-700'
              }`}
            />
          </button>
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col gap-3 flex-grow">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              {product.category.name}
            </p>
            <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-accent-600 transition-colors">
              {product.name}
            </h3>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-accent-600 text-accent-600'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">{product.reviews} reviews</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-auto">
            <span className="text-lg font-bold text-gray-900">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="mt-4 w-full btn btn-accent disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <FiShoppingBag className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};
