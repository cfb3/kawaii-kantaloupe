// Product types
export type ProductCategory = 'blob-sticker' | 'taba-squishy' | 'slime' | 'package';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string; // Primary image (for backward compatibility)
  images?: string[]; // Optional array of images for carousel
  inStock: boolean;
  isPlaceholder?: boolean; // For future products (taba squishies, slime)
  // Slime-specific fields
  slimeType?: string; // e.g., "Bingsu", "Snow", "Jelly", "Clay", or combinations like "Clay and Jelly"
  bigCharms?: string[]; // Optional array of big charm names
  smallCharms?: string[]; // Optional array of small charm names
  clayToppers?: string[]; // Optional array of clay topper names
}

export interface PackageProduct extends Product {
  category: 'package';
  items: string[]; // Array of product IDs included in the package
  originalPrice: number; // Price if items were bought separately
  savings: number; // Amount saved
}

// Cart types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Customer/Order types
export interface CustomerInfo {
  name: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  notes?: string;
  deliveryMethod?: 'shipping' | 'direct-sale'; // For POS system
}

export interface Order {
  orderId: string;
  customer: CustomerInfo;
  items: CartItem[];
  total: number;
  createdAt: Date;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
}

// Decoration blob type (for non-purchasable blobs used for decoration)
export interface DecorationBlob {
  id: string;
  image: string;
  alt: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
}
