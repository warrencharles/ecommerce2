import roseGoldNecklace1 from '@/assets/rose-gold-necklace-1.jpg';
import roseGoldNecklace2 from '@/assets/rose-gold-necklace-2.jpg';
import diamondEarrings1 from '@/assets/diamond-earrings-1.jpg';
import diamondEarrings2 from '@/assets/diamond-earrings-2.jpg';
import goldRing1 from '@/assets/gold-ring-1.jpg';
import goldRing2 from '@/assets/gold-ring-2.jpg';
import silverBracelet1 from '@/assets/silver-bracelet-1.jpg';
import silverBracelet2 from '@/assets/silver-bracelet-2.jpg';
import emeraldEarrings1 from '@/assets/emerald-earrings-1.jpg';
import emeraldEarrings2 from '@/assets/emerald-earrings-2.jpg';
import pearlRing1 from '@/assets/pearl-ring-1.jpg';
import pearlRing2 from '@/assets/pearl-ring-2.jpg';

export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  category: string;
  inStock: boolean;
  featured: boolean;
  materials: string[];
  dimensions?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  role: 'user' | 'admin';
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: string;
  paymentMethod: string;
}

// Mock Products Data
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Rose Gold Pearl Necklace',
    price: 120000,
    images: [roseGoldNecklace1, roseGoldNecklace2],
    description: 'Elegant handcrafted rose gold necklace with freshwater pearls. Perfect for special occasions.',
    category: 'necklaces',
    inStock: true,
    featured: true,
    materials: ['Rose Gold', 'Freshwater Pearls'],
    dimensions: '18 inches'
  },
  {
    id: '2',
    name: 'Diamond Stud Earrings',
    price: 85000,
    images: [diamondEarrings1, diamondEarrings2],
    description: 'Classic diamond stud earrings in 14k white gold setting.',
    category: 'earrings',
    inStock: true,
    featured: true,
    materials: ['White Gold', 'Diamonds'],
    dimensions: '6mm'
  },
  {
    id: '3',
    name: 'Vintage Gold Ring',
    price: 95000,
    images: [goldRing1, goldRing2],
    description: 'Beautiful vintage-inspired gold ring with intricate detailing.',
    category: 'rings',
    inStock: true,
    featured: false,
    materials: ['Yellow Gold'],
    dimensions: 'Size 7'
  },
  {
    id: '4',
    name: 'Silver Chain Bracelet',
    price: 45000,
    images: [silverBracelet1, silverBracelet2],
    description: 'Delicate silver chain bracelet perfect for everyday wear.',
    category: 'bracelets',
    inStock: true,
    featured: false,
    materials: ['Sterling Silver'],
    dimensions: '7.5 inches'
  },
  {
    id: '5',
    name: 'Emerald Drop Earrings',
    price: 150000,
    images: [emeraldEarrings1, emeraldEarrings2],
    description: 'Stunning emerald drop earrings in gold setting.',
    category: 'earrings',
    inStock: true,
    featured: true,
    materials: ['Gold', 'Emeralds'],
    dimensions: '2 inches'
  },
  {
    id: '6',
    name: 'Pearl Statement Ring',
    price: 75000,
    images: [pearlRing1, pearlRing2],
    description: 'Bold statement ring featuring a large freshwater pearl.',
    category: 'rings',
    inStock: false,
    featured: false,
    materials: ['Gold', 'Freshwater Pearl'],
    dimensions: 'Size 6'
  }
];

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'admin',
    email: 'admin@jewelry.com',
    name: 'Admin User',
    role: 'admin'
  },
  {
    id: 'user1',
    email: 'customer@example.com',
    name: 'Jane Doe',
    phone: '+255 123 456 789',
    role: 'user'
  }
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    userId: 'user1',
    items: [
      {
        id: '1',
        productId: '1',
        quantity: 1,
        product: mockProducts[0]
      }
    ],
    total: 120000,
    status: 'delivered',
    createdAt: '2024-01-15',
    shippingAddress: 'Dar es Salaam, Tanzania',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD-002',
    userId: 'user1',
    items: [
      {
        id: '2',
        productId: '2',
        quantity: 2,
        product: mockProducts[1]
      }
    ],
    total: 170000,
    status: 'processing',
    createdAt: '2024-01-20',
    shippingAddress: 'Arusha, Tanzania',
    paymentMethod: 'Mobile Money'
  }
];

export const categories = [
  { id: 'necklaces', name: 'Necklaces', count: 15 },
  { id: 'earrings', name: 'Earrings', count: 12 },
  { id: 'rings', name: 'Rings', count: 18 },
  { id: 'bracelets', name: 'Bracelets', count: 8 }
];

export const formatPrice = (price: number): string => {
  return `TShs ${price.toLocaleString()}`;
};