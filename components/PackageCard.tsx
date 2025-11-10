'use client';

import { useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { PackageProduct } from '@/types';
import Button from './Button';
import Card from './Card';
import { useCart } from '@/context/CartContext';
import { getProductById } from '@/data/products';

interface PackageCardProps {
  packageProduct: PackageProduct;
}

export default function PackageCard({ packageProduct }: PackageCardProps) {
  const { addToCart } = useCart();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAddToCart = () => {
    addToCart(packageProduct, 1);
  };

  // Use images array if available, otherwise fall back to single image
  const images = packageProduct.images || [packageProduct.image];

  // Update current index when carousel scrolls
  const onSelect = () => {
    if (emblaApi) {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    }
  };

  // Set up carousel event listeners
  if (emblaApi) {
    emblaApi.off('select', onSelect).on('select', onSelect);
  }

  return (
    <Card className="flex flex-col h-full" borderColor="pink">
      {/* Package Badge */}
      <div className="absolute top-4 right-4 bg-pink text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg z-10">
        BUNDLE DEAL
      </div>

      {/* Package Image Carousel */}
      <div className="relative w-full aspect-square mb-4 rounded-2xl overflow-hidden bg-gray-light">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex">
            {images.map((imageSrc, index) => (
              <div key={index} className="embla__slide relative w-full h-full flex-[0_0_100%]">
                <div className="relative w-full aspect-square">
                  <Image
                    src={imageSrc}
                    alt={`${packageProduct.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-pink w-6'
                    : 'bg-white bg-opacity-50'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Swipe Left/Right Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => emblaApi?.scrollPrev()}
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              className="absolute left-2 top-1/2 -translate-y-1/2 hover:bg-opacity-60 rounded-full p-2 transition-all z-10"
              aria-label="Previous image"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.6)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
            >
              <svg className="w-5 h-5 text-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ opacity: 0.7 }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-opacity-60 rounded-full p-2 transition-all z-10"
              aria-label="Next image"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.6)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
            >
              <svg className="w-5 h-5 text-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ opacity: 0.7 }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Package Info */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-text-dark mb-2">
          {packageProduct.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {packageProduct.description}
        </p>

        {/* Items Included */}
        <div className="mb-4">
          <p className="font-semibold text-text-dark mb-2">Includes:</p>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            {packageProduct.items.map((itemId) => {
              const product = getProductById(itemId);
              return (
                <li key={itemId}>{product?.name || itemId}</li>
              );
            })}
          </ul>
        </div>

        {/* Pricing */}
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold text-pink">
              ${packageProduct.price.toFixed(2)}
            </span>
            <span className="text-lg text-gray-500 line-through">
              ${packageProduct.originalPrice.toFixed(2)}
            </span>
          </div>
          <p className="text-sm text-green font-bold mb-4">
            Save ${packageProduct.savings.toFixed(2)}!
          </p>

          <Button
            onClick={handleAddToCart}
            disabled={!packageProduct.inStock}
            fullWidth
            variant="secondary"
          >
            Add Bundle to Cart
          </Button>

          {!packageProduct.inStock && (
            <p className="text-pink text-sm font-semibold mt-2">Out of Stock</p>
          )}
        </div>
      </div>
    </Card>
  );
}
