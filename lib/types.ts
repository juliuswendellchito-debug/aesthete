export interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: number
  images: string[]
  category: string
  sizes: string[]
  stock: Record<string, number>
  featured: boolean
  badge?: string | null
  created_at: string
}

export interface CartItem {
  product: Product
  size: string
  quantity: number
}

export interface ShippingAddress {
  full_name: string
  email: string
  address_line1: string
  address_line2?: string
  city: string
  state: string
  postal_code: string
  country: string
}

export interface OrderItem {
  product_id: string
  product_name: string
  product_image: string
  size: string
  quantity: number
  price_at_purchase: number
}

export interface Order {
  id: string
  user_id?: string
  stripe_payment_intent_id: string
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  shipping_address: ShippingAddress
  items: OrderItem[]
  subtotal: number
  shipping_cost: number
  total: number
  created_at: string
}

export interface Profile {
  id: string
  email: string
  full_name: string
  role: 'customer' | 'admin'
  created_at: string
}
