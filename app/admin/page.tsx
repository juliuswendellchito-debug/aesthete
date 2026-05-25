import { MOCK_ORDERS, MOCK_PRODUCTS } from '@/lib/mock-data'
import type { Order } from '@/lib/types'

export default function AdminDashboard() {
  const orders = MOCK_ORDERS
  const products = MOCK_PRODUCTS

  const confirmedOrders = orders.filter(o => o.status === 'confirmed')
  const todaySales = confirmedOrders.reduce((sum, o) => sum + o.total, 0)
  const avgOrderValue =
    confirmedOrders.length > 0
      ? confirmedOrders.reduce((sum, o) => sum + o.total, 0) / confirmedOrders.length
      : 0

  const stats = [
    { label: "Today's Sales", value: `$${todaySales.toLocaleString()}` },
    { label: 'New Orders', value: orders.length.toString() },
    {
      label: 'Active Shipments',
      value: orders.filter(o => o.status === 'shipped').length.toString(),
    },
    { label: 'Avg. Order Value', value: `$${Math.round(avgOrderValue).toLocaleString()}` },
  ]

  const statusColors: Record<string, string> = {
    pending:   'text-yellow-700 bg-yellow-50',
    confirmed: 'text-green-700 bg-green-50',
    shipped:   'text-blue-700 bg-blue-50',
    delivered: 'text-on-surface bg-surface-container-high',
    cancelled: 'text-error bg-error-container',
  }

  return (
    <div>
      {/* Demo banner */}
      <div className="bg-surface-container-high border-l-2 border-brand-champagne px-4 py-3 mb-8 flex items-center gap-3">
        <span className="text-[10px] tracking-widest uppercase text-on-surface-variant font-semibold">
          Demo Mode
        </span>
        <span className="text-xs text-outline">
          Showing mock data. Connect Supabase to see real orders.
        </span>
      </div>

      <div className="mb-8">
        <h1 className="font-playfair text-3xl mb-1">Dashboard</h1>
        <p className="text-sm text-outline">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white border border-brand-sand p-6">
            <p className="text-[10px] tracking-widest uppercase text-outline mb-2">
              {stat.label}
            </p>
            <p className="font-playfair text-3xl text-on-surface">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Orders table */}
        <div className="md:col-span-2 bg-white border border-brand-sand">
          <div className="px-6 py-4 border-b border-brand-sand">
            <h2 className="text-xs font-semibold tracking-widest uppercase">
              Recent Orders
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-sand bg-surface">
                  {['Order ID', 'Customer', 'Total', 'Status'].map(h => (
                    <th
                      key={h}
                      className="text-left text-[10px] tracking-widest uppercase text-outline px-6 py-3"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low">
                {orders.map((order: Order) => (
                  <tr key={order.id} className="hover:bg-surface transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-outline">
                      #{order.id.slice(0, 12).toUpperCase()}
                    </td>
                    <td className="px-6 py-4">
                      {order.shipping_address?.full_name ?? '—'}
                    </td>
                    <td className="px-6 py-4">${order.total.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] tracking-widest uppercase px-2 py-1 ${
                          statusColors[order.status] ?? ''
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Products */}
        <div className="bg-white border border-brand-sand">
          <div className="px-6 py-4 border-b border-brand-sand">
            <h2 className="text-xs font-semibold tracking-widest uppercase">Products</h2>
          </div>
          <ul className="divide-y divide-surface-container-low">
            {products.map(p => (
              <li key={p.id} className="flex items-center gap-4 px-6 py-4">
                <div className="w-10 h-12 bg-surface-container-high overflow-hidden flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold tracking-wider uppercase truncate">
                    {p.name}
                  </p>
                  <p className="text-sm text-outline">${p.price.toLocaleString()}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
