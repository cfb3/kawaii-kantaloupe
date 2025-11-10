'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/Button';
import Card from '@/components/Card';
import CantaloupeDecoration from '@/components/CantaloupeDecoration';
import { Order } from '@/types';

export default function ConfirmationPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Load order from localStorage
    const savedOrder = localStorage.getItem('kawaii-kantelope-last-order');

    if (savedOrder) {
      try {
        const parsedOrder = JSON.parse(savedOrder);
        setOrder(parsedOrder);
      } catch (error) {
        console.error('Error loading order:', error);
        router.push('/');
      }
    } else {
      // No order found, redirect to home
      router.push('/');
    }
  }, [router]);

  if (!order) {
    return (
      <div className="p-8 md:p-12 flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-12 relative">
      <CantaloupeDecoration />
      <div className="max-w-4xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="text-8xl mb-4">🎉</div>
          <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Thank you for your purchase!
          </p>
          <p className="text-lg text-gray-600">
            We've received your order and will process it soon.
          </p>
        </div>

        {/* Order Details */}
        <Card borderColor="green" className="mb-8">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-xl font-bold text-text-dark mb-3">
                Order Information
              </h2>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-semibold">Order ID:</span>{' '}
                  <span className="text-green">{order.orderId}</span>
                </div>
                <div>
                  <span className="font-semibold">Order Date:</span>{' '}
                  {new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                <div>
                  <span className="font-semibold">Status:</span>{' '}
                  <span className="inline-block bg-yellow text-text-dark px-3 py-1 rounded-full text-xs font-bold">
                    {order.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-text-dark mb-3">
                {order.customer.deliveryMethod === 'direct-sale' ? 'Customer Information' : 'Shipping Information'}
              </h2>
              <div className="text-sm space-y-1">
                <p className="font-semibold">{order.customer.name}</p>
                {order.customer.email && <p>{order.customer.email}</p>}
                {order.customer.phone && <p>{order.customer.phone}</p>}
                {order.customer.deliveryMethod === 'direct-sale' ? (
                  <p className="mt-2">
                    <span className="inline-block bg-green text-white px-3 py-1 rounded-full text-xs font-bold">
                      DIRECT SALE - IN PERSON PICKUP
                    </span>
                  </p>
                ) : (
                  <>
                    <p>{order.customer.address}</p>
                    <p>
                      {order.customer.city}, {order.customer.state} {order.customer.zipCode}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="border-t-2 border-gray-200 pt-6">
            <h2 className="text-xl font-bold text-text-dark mb-4">
              Order Items
            </h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-light">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-text-dark">
                      {item.product.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-600">
                      ${item.product.price.toFixed(2)} each
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Total */}
          <div className="border-t-2 border-gray-200 mt-6 pt-6">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-text-dark">Total:</span>
              <span className="text-3xl font-bold text-green">
                ${order.total.toFixed(2)}
              </span>
            </div>
            {order.customer.deliveryMethod === 'shipping' && (
              <p className="text-sm text-gray-600 mt-2">
                (Shipping cost will be calculated and invoiced separately)
              </p>
            )}
          </div>

          {/* Order Notes */}
          {order.customer.notes && (
            <div className="border-t-2 border-gray-200 mt-6 pt-6">
              <h3 className="font-bold text-text-dark mb-2">Order Notes:</h3>
              <p className="text-gray-600 text-sm italic">{order.customer.notes}</p>
            </div>
          )}
        </Card>

        {/* Next Steps */}
        <Card borderColor="pink" className="mb-8">
          <h2 className="text-2xl font-bold text-text-dark mb-4">
            What's Next?
          </h2>
          {order.customer.deliveryMethod === 'direct-sale' ? (
            <div className="space-y-3 text-gray-600">
              <p className="flex items-start gap-2">
                <span className="text-2xl">✅</span>
                <span>
                  <strong>Direct sale completed!</strong> Items have been picked up by the customer.
                </span>
              </p>
              {order.customer.email && (
                <p className="flex items-start gap-2">
                  <span className="text-2xl">📧</span>
                  <span>
                    A receipt has been sent to{' '}
                    <span className="font-semibold">{order.customer.email}</span>
                  </span>
                </p>
              )}
              <p className="flex items-start gap-2">
                <span className="text-2xl">💌</span>
                <span>
                  Thank you for supporting a young entrepreneur!
                </span>
              </p>
            </div>
          ) : (
            <div className="space-y-3 text-gray-600">
              <p className="flex items-start gap-2">
                <span className="text-2xl">📧</span>
                <span>
                  You will receive an order confirmation email at{' '}
                  <span className="font-semibold">{order.customer.email}</span>
                </span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-2xl">💰</span>
                <span>
                  We'll calculate shipping costs and send you a payment request
                </span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-2xl">📦</span>
                <span>
                  Once payment is received, we'll ship your order and send tracking information
                </span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-2xl">💌</span>
                <span>
                  Your handmade items will arrive with love!
                </span>
              </p>
            </div>
          )}
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button size="large">Back to Home</Button>
          </Link>
          <Link href="/shop">
            <Button size="large" variant="secondary">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
