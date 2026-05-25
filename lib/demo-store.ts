import type { Order } from './types'
import { MOCK_ORDERS } from './mock-data'

// Extend global type so TypeScript knows about our singleton
declare global {
  // eslint-disable-next-line no-var
  var __demoOrders: Map<string, Order> | undefined
}

function createStore(): Map<string, Order> {
  const map = new Map<string, Order>()
  // Pre-populate with demo orders so /admin and /order/demo-order-001 work on first load
  for (const o of MOCK_ORDERS) {
    map.set(o.id, o)
  }
  return map
}

// Survives Next.js hot-module replacement in dev — both API routes and
// server components share the same Node.js process, so the Map is shared.
export const demoOrders: Map<string, Order> =
  globalThis.__demoOrders ?? (globalThis.__demoOrders = createStore())
