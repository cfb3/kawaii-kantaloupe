import PackageCard from '@/components/PackageCard';
import CantaloupeDecoration from '@/components/CantaloupeDecoration';
import { packages } from '@/data/products';

export default function PackagesPage() {
  return (
    <div className="p-8 md:p-12 relative">
      <CantaloupeDecoration />
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-4">
          Bundle Packages
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          Save money with our special bundle deals!
        </p>
        <div className="inline-block bg-pink text-white px-6 py-3 rounded-full font-bold text-lg">
          Buy More, Save More!
        </div>
      </div>

      {/* Packages Grid */}
      <div className="max-w-6xl mx-auto">
        {packages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((packageProduct) => (
              <PackageCard key={packageProduct.id} packageProduct={packageProduct} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-2xl text-gray-600">
              No package deals available at this time.
            </p>
          </div>
        )}
      </div>

      {/* Benefits Section */}
      <div className="max-w-4xl mx-auto mt-16 space-y-6">
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-green text-center">
          <h2 className="text-3xl font-bold text-text-dark mb-4">
            Why Buy Bundles?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div>
              <div className="text-4xl mb-2">💰</div>
              <h3 className="font-bold text-lg mb-2">Save Money</h3>
              <p className="text-gray-600">
                Get all three blob stickers for less than buying individually!
              </p>
            </div>
            <div>
              <div className="text-4xl mb-2">🎁</div>
              <h3 className="font-bold text-lg mb-2">Complete Set</h3>
              <p className="text-gray-600">
                Get the full collection in one purchase!
              </p>
            </div>
            <div>
              <div className="text-4xl mb-2">✨</div>
              <h3 className="font-bold text-lg mb-2">Perfect Gift</h3>
              <p className="text-gray-600">
                Bundle makes a great gift for blob sticker lovers!
              </p>
            </div>
          </div>
        </div>

        {/* Individual Items Still Available */}
        <div className="bg-peach-light rounded-3xl p-6 text-center">
          <p className="text-lg text-text-dark">
            Prefer to buy individually? Check out our{' '}
            <a href="/shop" className="font-bold text-green hover:underline">
              Shop page
            </a>{' '}
            for single items!
          </p>
        </div>
      </div>
    </div>
  );
}
