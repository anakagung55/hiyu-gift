import { supabase } from './utils/supabase'
import Image from 'next/image'
import Link from 'next/link'

interface Product {
  id: string;
  name: string;
  base_price: number;
  original_price?: number; 
  category: string;
  image_url: string;
}

interface Testimonial {
  id: number;
  customer_name: string;
  location: string;
  content: string;
}

export default async function Home() {
  // Ambil data Produk
  const { data: products, error: prodError } = await supabase
    .from('products')
    .select('*')

  // Ambil data Testimoni (Dinamis sesuai task)
  const { data: testimonials, error: testError } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true) // Hanya ambil yang diset aktif oleh Ibu
    .order('created_at', { ascending: false })
    .limit(3)

  if (prodError) console.error('Gagal mengambil data produk:', prodError)
  if (testError) console.error('Gagal mengambil data testimoni:', testError)

  return (
    <main className="min-h-screen bg-hiyu-cream text-hiyu-dark selection:bg-hiyu-rose selection:text-white relative">
      
      {/* SCARCITY PROMO BAR */}
      <div className="bg-hiyu-rose text-white text-center py-2.5 text-sm font-medium tracking-wide shadow-md relative z-20">
        🎈 Promo Soft Opening: Gratis Custom Tulisan untuk 50 Pembeli Pertama! 🎈
      </div>

      <nav className="w-full py-6 px-8 flex justify-between items-center max-w-7xl mx-auto relative z-10">
        <div className="font-serif text-3xl font-bold tracking-tight text-hiyu-dark">
          HiYu <span className="text-hiyu-rose font-medium italic">Gift</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
          <Link href="#" className="hover:text-hiyu-rose transition">Koleksi Balon</Link>
          <Link href="#" className="hover:text-hiyu-rose transition">Kado Personal</Link>
        </div>
      </nav>

      <section className="relative text-center py-28 px-4 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-hiyu-blush/40 blur-[120px] rounded-full -z-10"></div>
        <div className="max-w-3xl mx-auto z-10">
          <span className="text-hiyu-rose font-bold uppercase tracking-[0.2em] text-xs mb-4 block">Moments that matter most</span>
          <h1 className="text-5xl md:text-7xl font-serif text-hiyu-dark mb-8 leading-tight">
            Give a Gift They'll <br/> <span className="italic text-hiyu-rose">Never Forget</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 font-light leading-relaxed">
            Rangkaian balon premium dan kado personal yang diracik khusus untuk merayakan momen berharga orang tersayang.
          </p>
          <button className="bg-hiyu-dark text-white px-10 py-4 rounded-full font-medium hover:bg-hiyu-rose transition-all duration-300 shadow-xl hover:shadow-hiyu-rose/30 hover:-translate-y-1">
            Lihat Koleksi Kami
          </button>
        </div>
      </section>

      {/* SECTION PRODUK */}
      <section className="max-w-7xl mx-auto py-24 px-6 md:px-12 bg-white rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
        <div className="text-center md:text-left mb-16">
          <h2 className="text-4xl font-serif text-hiyu-dark mb-3">Pilihan Terfavorit</h2>
          <p className="text-gray-500">Kado yang paling sering membuat orang tersenyum bahagia.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products?.map((product: Product) => (
            <Link href={`/product/${product.id}`} key={product.id} className="group cursor-pointer">
              <div className="bg-hiyu-cream/30 rounded-3xl overflow-hidden mb-6 relative aspect-[4/5] shadow-sm">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10"></div>
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  unoptimized 
                />
                <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm">
                  <p className="text-[10px] text-hiyu-rose font-bold uppercase tracking-wider">{product.category}</p>
                </div>
              </div>
              <div className="px-2">
                <h3 className="font-serif text-2xl mb-2 text-hiyu-dark group-hover:text-hiyu-rose transition-colors">{product.name}</h3>
                <div className="flex justify-between items-end mt-4 border-t border-gray-100 pt-4">
                  <div className="flex flex-col">
                    {product.original_price && (
                      <p className="text-xs text-gray-400 line-through mb-0.5">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(product.original_price)}
                      </p>
                    )}
                    <p className="text-xl font-semibold text-hiyu-dark">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(product.base_price)}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-white bg-hiyu-rose px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all -translate-y-2 group-hover:translate-y-0 duration-300">
                    Pesan &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-hiyu-cream py-24 px-6 md:px-12 border-t border-hiyu-blush/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-hiyu-dark mb-4">Cara Memesan Kebahagiaan</h2>
            <p className="text-gray-500">Tiga langkah mudah untuk momen tak terlupakan.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[2rem] shadow-sm text-center hover:shadow-md transition">
              <div className="w-16 h-16 bg-hiyu-blush/50 text-hiyu-rose rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-serif font-bold">1</div>
              <h3 className="font-serif text-xl mb-3 text-hiyu-dark">Pilih & Kustomisasi</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Pilih rangkaian favoritmu dan tuliskan pesan paling personal di atas balon cantik kami.</p>
            </div>
            <div className="bg-white p-10 rounded-[2rem] shadow-sm text-center hover:shadow-md transition">
              <div className="w-16 h-16 bg-hiyu-blush/50 text-hiyu-rose rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-serif font-bold">2</div>
              <h3 className="font-serif text-xl mb-3 text-hiyu-dark">Tentukan Waktu</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Atur tanggal pengiriman atau waktu pengambilan agar kejutan tiba di momen yang tepat.</p>
            </div>
            <div className="bg-white p-10 rounded-[2rem] shadow-sm text-center hover:shadow-md transition">
              <div className="w-16 h-16 bg-hiyu-blush/50 text-hiyu-rose rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-serif font-bold">3</div>
              <h3 className="font-serif text-xl mb-3 text-hiyu-dark">Kejutan Tiba</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Duduk manis, dan biarkan kado premium kami membuat orang tersayangmu tersenyum lebar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL SECTION (Sekarang Dinamis) */}
      <section className="bg-white py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-hiyu-dark mb-4">Apa Kata Mereka?</h2>
            <p className="text-gray-500">Momen bahagia yang berhasil kami abadikan.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials?.map((testi: Testimonial) => (
              <div key={testi.id} className="bg-hiyu-cream/20 p-8 rounded-[2.5rem] border border-hiyu-blush/20 italic text-gray-600 shadow-sm hover:shadow-md transition">
                "{testi.content}"
                <div className="mt-6 not-italic font-bold text-hiyu-dark text-sm">
                  — {testi.customer_name}{testi.location ? `, ${testi.location}` : ''}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLOATING WHATSAPP BUTTON */}
      <a href="https://wa.me/6288808900908" target="_blank" rel="noopener noreferrer" 
         className="fixed bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 hover:-translate-y-2 transition-all z-50 flex items-center justify-center group">
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
          <path d="M12.031 0C5.385 0 .001 5.385.001 12.031c0 2.128.552 4.204 1.6 6.035L.034 24l6.096-1.597c1.768.96 3.753 1.468 5.801 1.468 6.646 0 12.03-5.385 12.03-12.03C24.062 5.385 18.677 0 12.031 0zm0 21.966c-1.8 0-3.567-.482-5.117-1.395l-.367-.217-3.804.997 1.016-3.708-.238-.38c-1.002-1.603-1.53-3.46-1.53-5.385 0-5.46 4.444-9.904 9.904-9.904 5.46 0 9.904 4.444 9.904 9.904 0 5.46-4.444 9.904-9.904 9.904zm5.426-7.408c-.297-.15-1.762-.872-2.035-.972-.272-.102-.472-.15-.672.15-.2.3-.77 1.02-1.043 1.22-.272.2-.544.25-.842.1-.297-.15-1.257-.463-2.395-1.482-.885-.794-1.482-1.775-1.655-2.073-.173-.298-.018-.46.13-.61.133-.133.297-.348.446-.522.15-.173.2-.298.298-.497.1-.2.05-.373-.025-.522-.075-.15-.672-1.62-.922-2.22-.243-.585-.49-.505-.672-.515-.173-.01-.373-.01-.573-.01-.2 0-.522.075-.795.373-.272.298-1.043 1.02-1.043 2.492s1.068 2.89 1.218 3.09c.15.2 2.106 3.218 5.103 4.512.713.308 1.27.493 1.704.63.715.228 1.365.196 1.88.118.577-.086 1.762-.72 2.01-1.42.247-.698.247-1.3.173-1.42-.074-.12-.272-.195-.57-.345z"/>
        </svg>
      </a>
    </main>
  )
}