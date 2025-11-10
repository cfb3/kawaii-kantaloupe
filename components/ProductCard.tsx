'use client';

import { useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { Product } from '@/types';
import Button from './Button';
import Card from './Card';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  // Use images array if available, otherwise fall back to single image
  const images = product.images || [product.image];
  const hasMultipleImages = images.length > 1;

  // Update current index when carousel scrolls
  const onSelect = () => {
    if (emblaApi) {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    }
  };

  // Set up carousel event listeners
  if (emblaApi && hasMultipleImages) {
    emblaApi.off('select', onSelect).on('select', onSelect);
  }

  return (
    <Card className="flex flex-col h-full">
      {/* Product Image or Carousel */}
      <div className="relative w-full aspect-square mb-4 rounded-2xl overflow-hidden bg-gray-light">
        {hasMultipleImages ? (
          // Show carousel if multiple images
          <>
            <div className="embla" ref={emblaRef}>
              <div className="embla__container flex">
                {images.map((imageSrc, index) => (
                  <div key={index} className="embla__slide relative w-full h-full flex-[0_0_100%]">
                    <div className="relative w-full aspect-square">
                      <Image
                        src={imageSrc}
                        alt={`${product.name} - Image ${index + 1}`}
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
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-green w-6'
                      : 'bg-white bg-opacity-50'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>

            {/* Swipe Left/Right Navigation Buttons */}
            <button
              onClick={() => emblaApi?.scrollPrev()}
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 transition-all z-10"
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
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 transition-all z-10"
              aria-label="Next image"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.6)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
            >
              <svg className="w-5 h-5 text-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ opacity: 0.7 }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        ) : (
          // Show single image if only one image
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {/* Removed "Coming Soon" overlay since the image already contains that text */}
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-text-dark mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-4 flex-1">{product.description}</p>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-green">
            ${product.price.toFixed(2)}
          </span>
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock || product.isPlaceholder}
            size="small"
          >
            {product.isPlaceholder ? 'Coming Soon' : 'Add to Cart'}
          </Button>
        </div>

        {!product.inStock && !product.isPlaceholder && (
          <p className="text-pink text-sm font-semibold mt-2">Out of Stock</p>
        )}
      </div>
    </Card>
  );
}
