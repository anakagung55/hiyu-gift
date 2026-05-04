import { supabase } from '../../utils/supabase'
import Image from 'next/image'
import Link from 'next/link'
import AddToCartForm from '../../../components/AddToCartForm' // Import komponen baru

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const productId = resolvedParams.id

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .single()

  const { data: options } = await supabase
    .from('product_options')
    .select('*')
    .eq('product_id', productId)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-hiyu-cream">
        <h1 className="text-3xl font-serif text-hiyu-dark">Produk tidak ditemukan 😢</h1>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-hiyu-cream pt-20 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <Link href="/" className="text-sm font-medium text-hiyu-rose hover:text-hiyu-dark transition mb-8 inline-block">
          &larr; Kembali ke Etalase
        </Link>

        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm flex flex-col md:flex-row gap-12">
          
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-hiyu-cream/30">
              <Image src={product.image_url} alt={product.name} fill className="object-cover" unoptimized />
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <p className="text-xs text-hiyu-rose font-bold uppercase tracking-wider mb-3">{product.category}</p>
            <h1 className="text-4xl md:text-5xl font-serif text-hiyu-dark mb-4 leading-tight">{product.name}</h1>
            <p className="text-2xl font-medium text-hiyu-dark mb-6 border-b border-gray-100 pb-6">
              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(product.base_price)}
            </p>
            <p className="text-gray-600 leading-relaxed mb-8 font-light">
              {product.description}
            </p>

            {/* KOMPONEN INTERAKTIF DIMASUKKAN DI SINI */}
            <AddToCartForm product={product} options={options || []} />
            
          </div>
        </div>
      </div>
    </main>
  )
}