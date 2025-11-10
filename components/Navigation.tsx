'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cart } = useCart();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/packages', label: 'Packages' },
    { href: '/cart', label: 'Cart' }
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-green text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Side Navigation */}
      <nav
        className={`
          fixed top-0 left-0 h-full bg-white shadow-xl z-40
          transition-transform duration-300 ease-in-out
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          w-64 border-r-4 border-green
        `}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="mb-8">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <Image
                src="/images/Logo Kawaii Kanteloupe.png"
                alt="Kawaii Kantaloupe"
                width={200}
                height={200}
                className="w-full h-auto"
                priority
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <ul className="flex-1 space-y-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                    block px-6 py-3 rounded-full font-semibold
                    transition-all duration-300
                    ${
                      isActive(item.href)
                        ? 'bg-green text-white shadow-lg'
                        : 'bg-peach-light text-text-dark hover:bg-green hover:text-white hover:shadow-md'
                    }
                  `}
                >
                  {item.label}
                  {item.href === '/cart' && cart.itemCount > 0 && (
                    <span className="ml-2 inline-block bg-pink text-white text-xs px-2 py-1 rounded-full">
                      {cart.itemCount}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Footer Info */}
          <div className="mt-8 text-center text-sm text-text-dark">
            <p className="font-semibold">Kawaii Kantaloupe</p>
            <p className="text-xs mt-1">Handmade with love</p>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}
