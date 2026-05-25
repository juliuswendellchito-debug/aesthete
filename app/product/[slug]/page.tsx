import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MOCK_PRODUCTS } from '@/lib/mock-data'
import { ProductDetail } from '@/components/store/ProductDetail'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = MOCK_PRODUCTS.find(p => p.slug === params.slug)
  if (!product) return {}
  return { title: product.name, description: product.description }
}

export default function ProductPage({ params }: Props) {
  const product = MOCK_PRODUCTS.find(p => p.slug === params.slug)
  if (!product) notFound()
  return <ProductDetail product={product} />
}
