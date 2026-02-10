'use client';

import { Suspense } from 'react';

export default function ShopPage() {
  return (
    <div className="container-custom py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Shop</h1>
        <p className="text-lg text-gray-600">
          Browse our complete collection of fashion pieces
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-4">Filters</h3>
            {/* Placeholder for filters */}
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Categories</p>
                <div className="space-y-2">
                  {['Women', 'Men', 'Accessories'].map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-700">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <Suspense fallback={<div className="text-center py-12">Loading products...</div>}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 rounded-lg animate-pulse" />
              ))}
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
