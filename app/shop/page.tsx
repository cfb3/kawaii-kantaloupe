'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import CantaloupeDecoration from '@/components/CantaloupeDecoration';
import { blobStickers, tabaSquishy, slime } from '@/data/products';
import { ProductCategory } from '@/types';

export default function ShopPage() {
  const [filter, setFilter] = useState<ProductCategory | 'all'>('all');

  // Combine all products
  const allProducts = [...blobStickers, ...tabaSquishy, ...slime];

  // Filter products based on selected category
  const filteredProducts = filter === 'all'
    ? allProducts
    : allProducts.filter(product => product.category === filter);

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'blob-sticker', label: 'Blob Stickers' },
    { value: 'taba-squishy', label: 'Taba Squishies' },
    { value: 'slime', label: 'Slime' }
  ];

  return (
    <div className="p-8 md:p-12 relative">
      <CantaloupeDecoration />
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-4 text-center">
          Shop All Products
        </h1>
        <p className="text-xl text-gray-600 text-center mb-8">
          Browse our collection of handmade blob stickers and more!
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setFilter(category.value as ProductCategory | 'all')}
              className={`
                px-6 py-3 rounded-full font-semibold transition-all duration-300
                ${filter === category.value
                  ? 'bg-green text-white shadow-lg'
                  : 'bg-white text-text-dark border-3 border-green hover:bg-green hover:text-white'
                }
              `}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-2xl text-gray-600">
              No products found in this category.
            </p>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="max-w-4xl mx-auto mt-16 bg-white rounded-3xl p-8 shadow-lg border-4 border-green text-center">
        <h2 className="text-3xl font-bold text-text-dark mb-4">
          Check Back Often!
        </h2>
        <p className="text-lg text-gray-600">
          New sticker series, taba squishy colors and characters, and slime options are always being added!
        </p>
      </div>
    </div>
  );
}
