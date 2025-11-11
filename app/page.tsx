import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/Button';
import ProductCard from '@/components/ProductCard';
import CantaloupeDecoration from '@/components/CantaloupeDecoration';
import { getFeaturedProducts } from '@/data/products';

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="p-8 md:p-12 relative">
      <CantaloupeDecoration />
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Image
            src="/images/Logo Kawaii Kanteloupe.png"
            alt="Kawaii Kantaloupe"
            width={300}
            height={300}
            className="mx-auto mb-8"
            priority
          />
          <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-6">
            Welcome to Kawaii Kantaloupe!
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Handmade blob stickers, taba squishies, and slime - all made with love by an 11-year-old entrepreneur!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/shop">
              <Button size="large">Shop Now</Button>
            </Link>
            <Link href="/packages">
              <Button size="large" variant="secondary">View Packages</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold text-text-dark mb-8 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-4xl mx-auto text-center bg-white rounded-3xl p-8 shadow-lg border-4 border-pink">
        <h2 className="text-3xl font-bold text-text-dark mb-4">About Kawaii Kantaloupe</h2>
        <p className="text-lg text-gray-600 mb-4">
          Hi! I'm an 11-year-old maker who loves creating adorable handmade items.
          Each product - from blob stickers to taba squishies to slime - is carefully crafted with love and creativity.
        </p>
        <p className="text-lg text-gray-600">
          Blob stickers start at just <span className="font-bold text-green">$3.00</span>,
          taba squishies from <span className="font-bold text-green">$2.00</span>,
          and custom slime from <span className="font-bold text-green">$7.00</span>.
          Check out our bundles to save even more!
        </p>
      </section>
    </div>
  );
}
