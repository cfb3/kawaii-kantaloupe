'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import Button from '@/components/Button';
import Card from '@/components/Card';
import CantaloupeDecoration from '@/components/CantaloupeDecoration';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
  };

  if (cart.items.length === 0) {
    return (
      <div className="p-8 md:p-12 relative">
        <CantaloupeDecoration />
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-6">
            Your Cart
          </h1>
          <Card className="py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-3xl font-bold text-text-dark mb-4">
              Your cart is empty
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Add some adorable blob stickers to get started!
            </p>
            <Link href="/shop">
              <Button size="large">Start Shopping</Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-12 relative">
      <CantaloupeDecoration />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-8 text-center">
          Your Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <Card key={item.product.id} hoverable={false}>
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-light">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-text-dark mb-1">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      ${item.product.price.toFixed(2)} each
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-peach-light text-text-dark font-bold hover:bg-green hover:text-white transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-peach-light text-text-dark font-bold hover:bg-green hover:text-white transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price and Remove */}
                  <div className="text-right flex flex-col justify-between">
                    <div className="text-xl font-bold text-green">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                    <button
                      onClick={() => handleRemove(item.product.id)}
                      className="text-pink hover:text-pink-dark font-semibold text-sm transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </Card>
            ))}

            {/* Continue Shopping */}
            <div className="pt-4">
              <Link href="/shop">
                <Button variant="outline" fullWidth>
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card borderColor="pink" hoverable={false} className="sticky top-8">
              <h2 className="text-2xl font-bold text-text-dark mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cart.itemCount} items)</span>
                  <span className="font-semibold">${cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold">TBD</span>
                </div>
                <div className="border-t-2 border-gray-200 pt-3">
                  <div className="flex justify-between text-xl font-bold text-text-dark">
                    <span>Total</span>
                    <span className="text-green">${cart.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link href="/checkout">
                <Button fullWidth size="large">
                  Proceed to Checkout
                </Button>
              </Link>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Shipping cost will be calculated at checkout
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
