import Link from 'next/link'

const navItems = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Orders', href: '/admin/orders' },
  { label: 'Products', href: '/admin/products' },
  { label: 'Analytics', href: '/admin/analytics' },
  { label: 'Settings', href: '/admin/settings' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className="w-56 bg-brand-black text-white flex flex-col flex-shrink-0">
        <div className="px-6 py-6 border-b border-inverse-surface">
          <Link href="/" className="font-playfair text-base tracking-[0.15em] uppercase">
            AESTHETE
          </Link>
          <p className="text-[10px] tracking-widest uppercase text-outline mt-1">Admin</p>
        </div>
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-1">
            {navItems.map(item => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="block px-3 py-2 text-xs tracking-widest uppercase text-inverse-primary hover:text-white hover:bg-inverse-surface rounded transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-6 py-4 border-t border-inverse-surface">
          <Link
            href="/"
            className="text-[10px] tracking-widest uppercase text-outline hover:text-inverse-primary transition-colors"
          >
            ← Back to Store
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-brand-sand px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-[10px] tracking-widest uppercase text-outline">
              System operational
            </span>
          </div>
        </header>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}
