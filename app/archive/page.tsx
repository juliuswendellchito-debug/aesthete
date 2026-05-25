import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Archive',
  description: 'Past collections from the AESTHETE archive.',
}

const ARCHIVE_SEASONS = [
  {
    year: 2024,
    season: 'Autumn/Winter',
    pieces: 24,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&q=85&fit=crop',
    description: 'Wool, cashmere, and structured silhouettes for the cooler months.',
  },
  {
    year: 2024,
    season: 'Spring/Summer',
    pieces: 18,
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=900&q=85&fit=crop',
    description: 'Lightweight silks and organic linens in bone and sand.',
  },
  {
    year: 2023,
    season: 'Autumn/Winter',
    pieces: 21,
    image: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=900&q=85&fit=crop',
    description: 'The collection that defined our coat language.',
  },
  {
    year: 2023,
    season: 'Spring/Summer',
    pieces: 16,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=900&q=85&fit=crop',
    description: 'Knits in grade-A cashmere, deliberately understated.',
  },
  {
    year: 2022,
    season: 'Autumn/Winter',
    pieces: 19,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=900&q=85&fit=crop',
    description: 'Our first silk programme — fluid, minimal, considered.',
  },
  {
    year: 2022,
    season: 'Spring/Summer',
    pieces: 12,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=900&q=85&fit=crop',
    description: 'The founding collection. Twelve pieces. Zero compromises.',
  },
]

export default function ArchivePage() {
  return (
    <div className="max-w-[1440px] mx-auto px-5 md:px-16 pt-32 md:pt-36 pb-[120px]">
      {/* Header */}
      <div className="mb-16 border-b border-[#e8e2da] pb-10">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#747878] mb-3">AESTHETE</p>
        <h1 className="font-playfair text-4xl md:text-5xl text-[#1a1a1a]">Archive</h1>
      </div>

      {/* Season list */}
      <div className="space-y-0">
        {ARCHIVE_SEASONS.map((s) => (
          <Link
            key={`${s.year}-${s.season}`}
            href="/collections"
            className="group grid grid-cols-1 md:grid-cols-[1fr_auto] items-center border-t border-[#e8e2da] py-8 gap-6 hover:bg-[#faf9f7] transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-14">
              {/* Thumbnail */}
              <div className="w-20 h-24 overflow-hidden bg-[#f0ede9] flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.image}
                  alt={`${s.season} ${s.year}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#747878] mb-1">
                  {s.year}
                </p>
                <h2 className="font-playfair text-2xl text-[#1a1a1a] mb-2">{s.season}</h2>
                <p className="text-[13px] text-[#444748] max-w-md">{s.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <p className="text-[12px] tracking-[0.1em] uppercase text-[#747878]">
                {s.pieces} pieces
              </p>
              <span className="text-[12px] tracking-[0.1em] uppercase text-[#1a1a1a] border-b border-[#1a1a1a] pb-px group-hover:text-[#747878] group-hover:border-[#747878] transition-colors">
                View
              </span>
            </div>
          </Link>
        ))}
        {/* Final border */}
        <div className="border-t border-[#e8e2da]" />
      </div>
    </div>
  )
}
