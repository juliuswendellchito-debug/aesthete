import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Editorial',
  description: 'Stories from the atelier — lookbooks, craft notes, and seasonal dispatches.',
}

const STORIES = [
  {
    id: 1,
    label: 'Issue No. 12',
    title: 'The Weight of Wool',
    subtitle: 'A study in structure',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=85&fit=crop',
    date: 'May 2025',
  },
  {
    id: 2,
    label: 'Issue No. 11',
    title: 'Silence as Luxury',
    subtitle: 'On wearing less',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=900&q=85&fit=crop',
    date: 'March 2025',
  },
  {
    id: 3,
    label: 'Issue No. 10',
    title: 'Made in Milan',
    subtitle: 'The atelier visits',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=85&fit=crop',
    date: 'January 2025',
  },
  {
    id: 4,
    label: 'Issue No. 9',
    title: 'A Coat for Every Season',
    subtitle: 'Investment dressing',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=900&q=85&fit=crop',
    date: 'November 2024',
  },
  {
    id: 5,
    label: 'Issue No. 8',
    title: 'Considered Details',
    subtitle: 'Craft and restraint',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=900&q=85&fit=crop',
    date: 'September 2024',
  },
  {
    id: 6,
    label: 'Issue No. 7',
    title: 'The Archive',
    subtitle: 'Looking back to move forward',
    image: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=900&q=85&fit=crop',
    date: 'July 2024',
  },
]

export default function EditorialPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-5 md:px-16 pt-32 md:pt-36 pb-[120px]">
      {/* Header */}
      <div className="mb-16 border-b border-[#e8e2da] pb-10">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#747878] mb-3">AESTHETE</p>
        <h1 className="font-playfair text-4xl md:text-5xl text-[#1a1a1a]">Editorial</h1>
      </div>

      {/* Featured story — full width */}
      <div className="relative h-[65vh] overflow-hidden mb-6 group cursor-pointer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={STORIES[0].image}
          alt={STORIES[0].title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-[#1a1a1a]/35 flex flex-col justify-end p-8 md:p-14">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#d4c5b9] mb-3">
            {STORIES[0].label} · {STORIES[0].date}
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-white mb-3 leading-tight">
            {STORIES[0].title}
          </h2>
          <p className="text-[14px] text-white/70 mb-6">{STORIES[0].subtitle}</p>
          <span className="text-[12px] text-white tracking-[0.1em] uppercase border-b border-white pb-px self-start">
            Read Story
          </span>
        </div>
      </div>

      {/* Story grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STORIES.slice(1).map(story => (
          <div key={story.id} className="group cursor-pointer">
            <div className="relative overflow-hidden aspect-[3/4] mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#747878] mb-2">
              {story.label} · {story.date}
            </p>
            <h3 className="font-playfair text-xl text-[#1a1a1a] mb-1">{story.title}</h3>
            <p className="text-[13px] text-[#444748]">{story.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
