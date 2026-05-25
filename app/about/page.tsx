import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'The story behind AESTHETE and the Silent Atelier.',
}

export default function AboutPage() {
  return (
    <div className="pt-20 md:pt-24">

      {/* Brand story hero */}
      <section className="max-w-aesthete mx-auto px-5 md:px-16 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-outline mb-6">
              The Atelier
            </p>
            <h1 className="font-playfair text-4xl md:text-5xl leading-tight mb-8">
              Craft over
              <br />
              <em>convention</em>
            </h1>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
              AESTHETE was founded on the conviction that clothing should outlast the
              season. Every piece is designed with radical intentionality — each seam,
              each material, each silhouette considered not for trend, but for time.
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              We work with a network of heritage ateliers across Italy, Japan, and
              Portugal. Our supply chain is transparent, our relationships long-standing,
              and our environmental footprint reduced at every stage.
            </p>
          </div>
          <div className="aspect-[4/5] overflow-hidden bg-surface-container-high">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80"
              alt="Atelier"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface-container-low py-20">
        <div className="max-w-aesthete mx-auto px-5 md:px-16">
          <p className="text-[10px] tracking-[0.3em] uppercase text-outline mb-12 text-center">
            Our Values
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Quality',
                body:
                  'We source only Grade-A natural fibers and work exclusively with certified makers. No compromises at any stage.',
              },
              {
                title: 'Transparency',
                body:
                  'Every garment has a traceable origin. We publish our supplier list and environmental metrics annually.',
              },
              {
                title: 'Timelessness',
                body:
                  'We design for the woman who buys less and chooses carefully. Our pieces are built to be worn for decades.',
              },
            ].map(v => (
              <div key={v.title} className="border border-brand-sand p-8">
                <h3 className="text-xs font-semibold tracking-widest uppercase mb-4">
                  {v.title}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Returns & Exchanges */}
      <section id="returns" className="max-w-aesthete mx-auto px-5 md:px-16 py-24">
        <h2 className="font-playfair text-3xl mb-8">Returns & Exchanges</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-brand-sand">
                <th className="text-left text-[10px] tracking-widest uppercase text-outline pb-4 pr-8">
                  Item Type
                </th>
                <th className="text-left text-[10px] tracking-widest uppercase text-outline pb-4 pr-8">
                  Return Window
                </th>
                <th className="text-left text-[10px] tracking-widest uppercase text-outline pb-4">
                  Condition
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-sand">
              {[
                ['Ready-to-Wear', '30 days', 'Unworn, tags attached'],
                ['Knitwear', '30 days', 'Unworn, original packaging'],
                ['Bespoke / Monogrammed', 'Non-returnable', '—'],
                ['Sale items', '14 days', 'Exchange only'],
              ].map(([type, window, condition]) => (
                <tr key={type}>
                  <td className="py-4 pr-8 text-on-surface">{type}</td>
                  <td className="py-4 pr-8 text-on-surface-variant">{window}</td>
                  <td className="py-4 text-on-surface-variant">{condition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-surface-container-low py-20">
        <div className="max-w-aesthete mx-auto px-5 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-playfair text-3xl mb-6">Get in Touch</h2>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-8">
                For inquiries about bespoke pieces, wholesale, or press, reach out
                via the form or visit our atelier in Paris.
              </p>
              <div className="border border-brand-sand p-6 inline-block">
                <p className="text-[10px] tracking-widest uppercase text-outline mb-3">
                  Paris Atelier
                </p>
                <p className="text-sm text-on-surface">128 Rue du Faubourg Saint-Honoré</p>
                <p className="text-sm text-on-surface-variant">75008 Paris, France</p>
                <p className="text-sm text-on-surface-variant mt-2">
                  Mon – Sat, 10:00 – 18:00
                </p>
              </div>
            </div>

            <form className="space-y-6">
              {[
                { name: 'name', label: 'Full Name', type: 'text' },
                { name: 'email', label: 'Email', type: 'email' },
              ].map(field => (
                <div key={field.name}>
                  <label className="text-[10px] tracking-widest uppercase text-outline block mb-1">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    className="w-full border-0 border-b border-on-surface bg-transparent py-2 text-sm focus:outline-none"
                  />
                </div>
              ))}
              <div>
                <label className="text-[10px] tracking-widest uppercase text-outline block mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full border-0 border-b border-on-surface bg-transparent py-2 text-sm focus:outline-none resize-none"
                />
              </div>
              <button
                type="button"
                className="bg-brand-black text-white px-8 py-4 text-xs font-semibold tracking-widest uppercase hover:bg-brand-champagne hover:text-brand-black transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
