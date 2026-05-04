"use client"
import { useState } from 'react'

export default function AddToCartForm({ product, options }: { product: any, options: any[] }) {
  const [customizations, setCustomizations] = useState<Record<string, string>>({})

  // Nomor WA Bisnismu
  const ADMIN_WA_NUMBER = "6288808900908" 

  const handleInputChange = (optionName: string, value: string) => {
    setCustomizations({ ...customizations, [optionName]: value })
  }

  const handleOrderWA = () => {
    // 1. Validasi
    const requiredOptions = options.filter(o => o.is_required);
    for (const opt of requiredOptions) {
      if (!customizations[opt.option_name]) {
        alert(`Mohon lengkapi bagian: ${opt.option_name}`);
        return;
      }
    }

    // 2. Susun template pesan
    let message = `Halo Admin HiYu Gift!\nSaya mau pesan kado ini:\n\n`;
    message += `*Produk:* ${product.name}\n`;
    message += `*Harga:* ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(product.base_price)}\n\n`;

    if (Object.keys(customizations).length > 0) {
      message += `*Detail Personalisasi:*\n`;
      for (const [key, value] of Object.entries(customizations)) {
        if (value.trim() !== '') {
          message += `- ${key}: ${value}\n`;
        }
      }
    }

    message += `\nMohon info cara pembayarannya ya. Terima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    
    // 3. FIX: Gunakan API resmi WhatsApp (Lebih aman dari blokir Chrome)
    const waUrl = `https://api.whatsapp.com/send?phone=${ADMIN_WA_NUMBER}&text=${encodedMessage}`;
    
    // 4. FIX: Eksekusi Anti-Blokir
    // Kita coba buka di tab baru dengan parameter keamanan lengkap
    const newWindow = window.open(waUrl, '_blank', 'noopener,noreferrer');
    
    // Fallback: Kalau Chrome tetap galak dan memblokir pop-up tab baru (newWindow = null), 
    // kita paksa ganti URL di tab yang sama.
    if (!newWindow) {
      window.location.href = waUrl;
    }
  }

  return (
    <>
      {options && options.length > 0 && (
        <div className="mb-10 bg-hiyu-blush/10 p-6 rounded-2xl border border-hiyu-blush/30">
          <h3 className="font-serif text-xl text-hiyu-dark mb-4">Personalisasi Kado Anda</h3>
          <div className="space-y-4">
            {options.map((opt) => (
              <div key={opt.id}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {opt.option_name} {opt.is_required && <span className="text-red-500">*</span>}
                </label>
                <input 
                  type="text" 
                  placeholder={`Ketik ${opt.option_name.toLowerCase()} di sini...`}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-hiyu-rose/50 focus:border-hiyu-rose transition"
                  onChange={(e) => handleInputChange(opt.option_name, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <button 
        onClick={handleOrderWA}
        className="w-full bg-[#25D366] text-white flex justify-center items-center gap-3 py-4 rounded-xl font-semibold text-lg hover:bg-[#20bd5a] transition-all duration-300 shadow-lg shadow-[#25D366]/30 hover:-translate-y-1"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <path d="M12.031 0C5.385 0 .001 5.385.001 12.031c0 2.128.552 4.204 1.6 6.035L.034 24l6.096-1.597c1.768.96 3.753 1.468 5.801 1.468 6.646 0 12.03-5.385 12.03-12.03C24.062 5.385 18.677 0 12.031 0zm0 21.966c-1.8 0-3.567-.482-5.117-1.395l-.367-.217-3.804.997 1.016-3.708-.238-.38c-1.002-1.603-1.53-3.46-1.53-5.385 0-5.46 4.444-9.904 9.904-9.904 5.46 0 9.904 4.444 9.904 9.904 0 5.46-4.444 9.904-9.904 9.904zm5.426-7.408c-.297-.15-1.762-.872-2.035-.972-.272-.102-.472-.15-.672.15-.2.3-.77 1.02-1.043 1.22-.272.2-.544.25-.842.1-.297-.15-1.257-.463-2.395-1.482-.885-.794-1.482-1.775-1.655-2.073-.173-.298-.018-.46.13-.61.133-.133.297-.348.446-.522.15-.173.2-.298.298-.497.1-.2.05-.373-.025-.522-.075-.15-.672-1.62-.922-2.22-.243-.585-.49-.505-.672-.515-.173-.01-.373-.01-.573-.01-.2 0-.522.075-.795.373-.272.298-1.043 1.02-1.043 2.492s1.068 2.89 1.218 3.09c.15.2 2.106 3.218 5.103 4.512.713.308 1.27.493 1.704.63.715.228 1.365.196 1.88.118.577-.086 1.762-.72 2.01-1.42.247-.698.247-1.3.173-1.42-.074-.12-.272-.195-.57-.345z"/>
        </svg>
        Pesan via WhatsApp
      </button>
    </>
  )
}