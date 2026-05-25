import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Size Guide',
  description: 'Find your perfect fit with the AESTHETE size guide.',
}

const TOPS = [
  { size: 'XS', uk: '6–8', eu: '34–36', us: '2–4', bust: '82–86', waist: '62–66', hip: '88–92' },
  { size: 'S',  uk: '8–10', eu: '36–38', us: '4–6', bust: '86–90', waist: '66–70', hip: '92–96' },
  { size: 'M',  uk: '10–12', eu: '38–40', us: '6–8', bust: '90–94', waist: '70–74', hip: '96–100' },
  { size: 'L',  uk: '12–14', eu: '40–42', us: '8–10', bust: '94–98', waist: '74–78', hip: '100–104' },
  { size: 'XL', uk: '14–16', eu: '42–44', us: '10–12', bust: '98–104', waist: '78–84', hip: '104–110' },
]

const COATS = [
  { size: 'XS', shoulder: '38', chest: '88', length: '102' },
  { size: 'S',  shoulder: '39.5', chest: '92', length: '104' },
  { size: 'M',  shoulder: '41', chest: '96', length: '106' },
  { size: 'L',  shoulder: '42.5', chest: '100', length: '108' },
  { size: 'XL', shoulder: '44', chest: '106', length: '110' },
]

const HOW_TO = [
  { label: 'Bust', instruction: 'Measure around the fullest part of your chest, keeping the tape parallel to the floor.' },
  { label: 'Waist', instruction: 'Measure around your natural waistline — the narrowest part of your torso.' },
  { label: 'Hip', instruction: 'Measure around the fullest part of your hips, approximately 20cm below the waist.' },
  { label: 'Shoulder', instruction: 'Measure from the edge of one shoulder to the other across the back.' },
]

export default function SizeGuidePage() {
  return (
    <div className="max-w-[1440px] mx-auto px-5 md:px-16 pt-32 md:pt-36 pb-[120px]">

      {/* Header */}
      <div className="mb-16 border-b border-[#e8e2da] pb-10">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#747878] mb-3">AESTHETE</p>
        <h1 className="font-playfair text-4xl md:text-5xl text-[#1a1a1a]">Size Guide</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-16 md:gap-24">
        <div>

          {/* How to measure */}
          <div className="mb-14">
            <h2 className="font-playfair text-2xl text-[#1a1a1a] mb-8">How to Measure</h2>
            <div className="space-y-6">
              {HOW_TO.map(item => (
                <div key={item.label} className="grid grid-cols-[100px_1fr] gap-4 border-b border-[#f0ede9] pb-6">
                  <p className="text-[12px] tracking-[0.1em] uppercase text-[#1a1a1a] font-medium pt-0.5">{item.label}</p>
                  <p className="text-[14px] text-[#444748] leading-relaxed">{item.instruction}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Ready-to-wear / Tops */}
          <div className="mb-14">
            <h2 className="font-playfair text-2xl text-[#1a1a1a] mb-2">Ready-to-Wear</h2>
            <p className="text-[13px] text-[#747878] mb-8">All measurements in centimetres.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#e8e2da]">
                    {['Size', 'UK', 'EU', 'US', 'Bust', 'Waist', 'Hip'].map(h => (
                      <th key={h} className="text-[10px] tracking-[0.15em] uppercase text-[#747878] pb-3 pr-8 font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TOPS.map((row, i) => (
                    <tr key={row.size} className={`border-b border-[#f0ede9] ${i % 2 === 0 ? '' : 'bg-[#faf9f7]'}`}>
                      <td className="py-4 pr-8 text-[13px] font-medium text-[#1a1a1a]">{row.size}</td>
                      <td className="py-4 pr-8 text-[13px] text-[#444748]">{row.uk}</td>
                      <td className="py-4 pr-8 text-[13px] text-[#444748]">{row.eu}</td>
                      <td className="py-4 pr-8 text-[13px] text-[#444748]">{row.us}</td>
                      <td className="py-4 pr-8 text-[13px] text-[#444748]">{row.bust}</td>
                      <td className="py-4 pr-8 text-[13px] text-[#444748]">{row.waist}</td>
                      <td className="py-4 pr-8 text-[13px] text-[#444748]">{row.hip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Outerwear */}
          <div>
            <h2 className="font-playfair text-2xl text-[#1a1a1a] mb-2">Outerwear & Coats</h2>
            <p className="text-[13px] text-[#747878] mb-8">Garment measurements in centimetres. Our coats are cut with an intentional oversized ease.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#e8e2da]">
                    {['Size', 'Shoulder', 'Chest', 'Length'].map(h => (
                      <th key={h} className="text-[10px] tracking-[0.15em] uppercase text-[#747878] pb-3 pr-8 font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COATS.map((row, i) => (
                    <tr key={row.size} className={`border-b border-[#f0ede9] ${i % 2 === 0 ? '' : 'bg-[#faf9f7]'}`}>
                      <td className="py-4 pr-8 text-[13px] font-medium text-[#1a1a1a]">{row.size}</td>
                      <td className="py-4 pr-8 text-[13px] text-[#444748]">{row.shoulder}</td>
                      <td className="py-4 pr-8 text-[13px] text-[#444748]">{row.chest}</td>
                      <td className="py-4 pr-8 text-[13px] text-[#444748]">{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Between sizes */}
          <div className="bg-[#f3f1ee] p-8">
            <h3 className="font-playfair text-xl text-[#1a1a1a] mb-4">Between Sizes?</h3>
            <p className="text-[13px] text-[#444748] leading-relaxed">
              We recommend sizing up for a relaxed, considered fit — or down if you prefer a more structured silhouette. Our knits have natural stretch and are designed to move with the body.
            </p>
          </div>

          {/* Bespoke */}
          <div className="bg-[#1a1a1a] p-8">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#747878] mb-3">Bespoke</p>
            <h3 className="font-playfair text-xl text-white mb-4">Made for You</h3>
            <p className="text-[13px] text-[#c8c6c5] leading-relaxed mb-6">
              Every AESTHETE piece can be made to your exact measurements. Enquire for lead times and pricing.
            </p>
            <a
              href="/about#contact"
              className="inline-block border border-white text-white px-6 py-2.5 text-[12px] font-medium tracking-[0.1em] uppercase hover:bg-white hover:text-[#1a1a1a] transition-colors"
            >
              Enquire
            </a>
          </div>

          {/* Need help */}
          <div className="border border-[#e8e2da] p-8">
            <h3 className="font-playfair text-xl text-[#1a1a1a] mb-4">Need Help?</h3>
            <p className="text-[13px] text-[#444748] leading-relaxed mb-4">
              Our team is available to assist with sizing and styling advice.
            </p>
            <a
              href="/about#contact"
              className="text-[12px] tracking-[0.1em] uppercase text-[#1a1a1a] border-b border-[#1a1a1a] pb-px hover:text-[#747878] hover:border-[#747878] transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
