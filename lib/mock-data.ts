import type { Product, Order } from './types'

// All images: neutral/monochromatic editorial fashion — no bright colours
export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'architectural-wool-coat',
    name: 'Architectural Wool Coat',
    description:
      'A structured silhouette in virgin wool. Clean lines and precise tailoring define this modern classic.',
    price: 1850,
    images: [
      // Neutral gray structured coat, editorial
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=85&fit=crop',
      // Monochrome fashion editorial
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=85&fit=crop',
    ],
    category: 'outerwear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: { XS: 3, S: 5, M: 4, L: 2, XL: 1 },
    featured: true,
    badge: 'Editorial Pick',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    slug: 'organic-silk-midi-dress',
    name: 'Organic Silk Midi Dress',
    description:
      'Fluid drape in certified organic silk. Naturally dyed in a palette drawn from the earth.',
    price: 920,
    images: [
      // Cream/ivory silk dress, minimal background
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=85&fit=crop',
      // Neutral fashion editorial portrait
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=85&fit=crop',
    ],
    category: 'dresses',
    sizes: ['XS', 'S', 'M', 'L'],
    stock: { XS: 2, S: 6, M: 5, L: 3 },
    featured: true,
    badge: null,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    slug: 'raw-edge-cashmere-knit',
    name: 'Raw Edge Cashmere Knit',
    description:
      'Grade-A Mongolian cashmere. Intentionally unfinished edges for an artisanal, deconstructed aesthetic.',
    price: 650,
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=85&fit=crop',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=85&fit=crop',
    ],
    category: 'knitwear',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: { S: 8, M: 10, L: 7, XL: 4 },
    featured: false,
    badge: 'New Arrival',
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    slug: 'cashmere-wrap-coat',
    name: 'Cashmere Wrap Coat',
    description:
      'Pure cashmere in a generous wrap silhouette. Monogramming available on request.',
    price: 2450,
    images: [
      'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&q=85&fit=crop',
      'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800&q=85&fit=crop',
    ],
    category: 'outerwear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: { XS: 2, S: 3, M: 4, L: 2, XL: 1 },
    featured: true,
    badge: null,
    created_at: new Date().toISOString(),
  },
]

export const MOCK_ORDERS: Order[] = [
  {
    id: 'demo-order-001',
    stripe_payment_intent_id: 'pi_demo_001',
    status: 'confirmed',
    shipping_address: {
      full_name: 'Julianne Sterling',
      email: 'julianne@example.com',
      address_line1: '42 Bedford Avenue',
      city: 'Brooklyn',
      state: 'NY',
      postal_code: '11211',
      country: 'US',
    },
    items: [
      {
        product_id: '1',
        product_name: 'Architectural Wool Coat',
        product_image:
          'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=85&fit=crop',
        size: 'S',
        quantity: 1,
        price_at_purchase: 1850,
      },
      {
        product_id: '2',
        product_name: 'Organic Silk Midi Dress',
        product_image:
          'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=85&fit=crop',
        size: 'M',
        quantity: 1,
        price_at_purchase: 920,
      },
    ],
    subtotal: 2770,
    shipping_cost: 0,
    total: 2770,
    created_at: new Date().toISOString(),
  },
  {
    id: 'demo-order-002',
    stripe_payment_intent_id: 'pi_demo_002',
    status: 'shipped',
    shipping_address: {
      full_name: 'Margaux Delacroix',
      email: 'margaux@example.com',
      address_line1: '128 Rue du Faubourg Saint-Honoré',
      city: 'Paris',
      state: '',
      postal_code: '75008',
      country: 'FR',
    },
    items: [
      {
        product_id: '4',
        product_name: 'Cashmere Wrap Coat',
        product_image:
          'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=800&q=85&fit=crop',
        size: 'M',
        quantity: 1,
        price_at_purchase: 2450,
      },
    ],
    subtotal: 2450,
    shipping_cost: 25,
    total: 2475,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-order-003',
    stripe_payment_intent_id: 'pi_demo_003',
    status: 'pending',
    shipping_address: {
      full_name: 'Suki Watanabe',
      email: 'suki@example.com',
      address_line1: '1-2-3 Omotesando',
      city: 'Tokyo',
      state: '',
      postal_code: '150-0001',
      country: 'JP',
    },
    items: [
      {
        product_id: '3',
        product_name: 'Raw Edge Cashmere Knit',
        product_image:
          'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=85&fit=crop',
        size: 'S',
        quantity: 2,
        price_at_purchase: 650,
      },
    ],
    subtotal: 1300,
    shipping_cost: 25,
    total: 1325,
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
]
