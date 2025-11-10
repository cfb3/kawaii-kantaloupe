'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import Button from '@/components/Button';
import Card from '@/components/Card';
import CantaloupeDecoration from '@/components/CantaloupeDecoration';
import { CustomerInfo } from '@/types';
import { initEmailJS, sendOrderConfirmation } from '@/utils/emailService';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    notes: '',
    deliveryMethod: 'shipping'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize EmailJS on component mount
  useEffect(() => {
    initEmailJS();
  }, []);

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.items.length === 0) {
      router.push('/cart');
    }
  }, [cart.items.length, router]);

  // Don't render if cart is empty
  if (cart.items.length === 0) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create order object
    const order = {
      orderId: `KK-${Date.now()}`,
      customer: formData,
      items: cart.items,
      total: cart.total,
      createdAt: new Date(),
      status: 'pending' as const
    };

    // Store order in localStorage for confirmation page
    localStorage.setItem('kawaii-kantelope-last-order', JSON.stringify(order));

    // Send order confirmation email (async, doesn't block the flow)
    sendOrderConfirmation(order).then((success) => {
      if (success) {
        console.log('Order confirmation email sent successfully');
      } else {
        console.log('Email not sent (EmailJS may not be configured)');
      }
    });

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Clear cart and redirect to confirmation
    clearCart();
    router.push('/confirmation');
  };

  return (
    <div className="p-8 md:p-12 relative">
      <CantaloupeDecoration />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-8 text-center">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-2xl font-bold text-text-dark mb-6">
                {formData.deliveryMethod === 'direct-sale' ? 'Direct Sale - Customer Information' : 'Shipping Information'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Delivery Method Selection */}
                <div className="bg-peach-light rounded-2xl p-4 mb-6">
                  <label className="block font-semibold text-text-dark mb-3">
                    Sale Type *
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="shipping"
                        checked={formData.deliveryMethod === 'shipping'}
                        onChange={handleChange}
                        className="w-5 h-5 text-green focus:ring-2 focus:ring-green"
                      />
                      <span className="font-medium text-text-dark">Ship to Address</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="direct-sale"
                        checked={formData.deliveryMethod === 'direct-sale'}
                        onChange={handleChange}
                        className="w-5 h-5 text-green focus:ring-2 focus:ring-green"
                      />
                      <span className="font-medium text-text-dark">Direct Sale (In-Person Pickup)</span>
                    </label>
                  </div>
                </div>
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block font-semibold text-text-dark mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-green rounded-2xl focus:outline-none focus:ring-2 focus:ring-green"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block font-semibold text-text-dark mb-2">
                    Email Address {formData.deliveryMethod === 'shipping' ? '*' : '(Optional)'}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required={formData.deliveryMethod === 'shipping'}
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-green rounded-2xl focus:outline-none focus:ring-2 focus:ring-green"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block font-semibold text-text-dark mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-green rounded-2xl focus:outline-none focus:ring-2 focus:ring-green"
                    placeholder="(123) 456-7890"
                  />
                </div>

                {/* Shipping Address Fields - Only show for shipping */}
                {formData.deliveryMethod === 'shipping' && (
                  <>
                    {/* Address */}
                    <div>
                      <label htmlFor="address" className="block font-semibold text-text-dark mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-green rounded-2xl focus:outline-none focus:ring-2 focus:ring-green"
                        placeholder="123 Main Street"
                      />
                    </div>

                    {/* City, State, Zip */}
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="city" className="block font-semibold text-text-dark mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-green rounded-2xl focus:outline-none focus:ring-2 focus:ring-green"
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <label htmlFor="state" className="block font-semibold text-text-dark mb-2">
                          State *
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          required
                          value={formData.state}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-green rounded-2xl focus:outline-none focus:ring-2 focus:ring-green"
                          placeholder="CA"
                          maxLength={2}
                        />
                      </div>
                      <div>
                        <label htmlFor="zipCode" className="block font-semibold text-text-dark mb-2">
                          Zip Code *
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          required
                          value={formData.zipCode}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-green rounded-2xl focus:outline-none focus:ring-2 focus:ring-green"
                          placeholder="12345"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Notes */}
                <div>
                  <label htmlFor="notes" className="block font-semibold text-text-dark mb-2">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-green rounded-2xl focus:outline-none focus:ring-2 focus:ring-green resize-none"
                    placeholder="Any special instructions or requests?"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    fullWidth
                    size="large"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Place Order'}
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card borderColor="pink" hoverable={false} className="sticky top-8">
              <h2 className="text-2xl font-bold text-text-dark mb-6">
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-3 mb-6">
                {cart.items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-light">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-text-dark truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-bold text-green">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t-2 border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>
                    {formData.deliveryMethod === 'direct-sale' ? 'Delivery' : 'Shipping'}
                  </span>
                  <span className="font-semibold">
                    {formData.deliveryMethod === 'direct-sale' ? 'In Person' : 'TBD'}
                  </span>
                </div>
                <div className="border-t-2 border-gray-200 pt-2">
                  <div className="flex justify-between text-xl font-bold text-text-dark">
                    <span>Total</span>
                    <span className="text-green">${cart.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                {formData.deliveryMethod === 'direct-sale'
                  ? 'Direct sale - customer will pick up items in person.'
                  : 'You will receive an email confirmation after placing your order.'
                }
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
