import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { generateWhatsAppUrl } from '@/utils/whatsapp';

export default function Home({ banners, categories, featuredProducts, bestSellers, testimonials, global_settings }: any) {
    const mainBanner = banners.length > 0 ? banners[0] : null;
    const whatsappPhone = global_settings?.whatsapp_number || "6281234567890";
    const waConsultUrl = generateWhatsAppUrl(whatsappPhone, "Halo, saya ingin konsultasi custom furniture.");

    return (
        <PublicLayout>
            <Head title="Furnitur Kustom Premium" />

            {/* Editorial Modern Hero Section */}
            {mainBanner && (
                <section className="bg-[#FAF9F6] pt-32 lg:pt-40 pb-16 lg:pb-24 overflow-hidden">
                    <div className="container mx-auto px-6 max-w-[1400px]">
                        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                            <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-10">
                                <span className="text-xs font-bold tracking-[0.25em] text-[#8C6239] uppercase mb-6 block">
                                    Koleksi Eksklusif
                                </span>
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] mb-8 tracking-tight">
                                    {mainBanner.title || 'Wujudkan Ruang Impian Anda'}
                                </h1>
                                <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
                                    Hadirkan sentuhan personal di setiap sudut ruangan dengan koleksi furnitur kustom premium kami yang memadukan estetika modern dan material terbaik.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                                    {mainBanner.button_url.startsWith('http') || mainBanner.button_url.startsWith('wa.me') || mainBanner.button_url.startsWith('//') ? (
                                        <a 
                                            href={mainBanner.button_url.startsWith('wa.me') ? `https://${mainBanner.button_url}` : mainBanner.button_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-8 py-4 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-all hover:-translate-y-1 w-full sm:w-auto text-center"
                                        >
                                            {mainBanner.button_text || 'Eksplorasi Koleksi'}
                                        </a>
                                    ) : (
                                        <Link 
                                            href={mainBanner.button_url}
                                            className="px-8 py-4 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-all hover:-translate-y-1 w-full sm:w-auto text-center"
                                        >
                                            {mainBanner.button_text || 'Eksplorasi Koleksi'}
                                        </Link>
                                    )}
                                    <a 
                                        href={waConsultUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-8 py-4 bg-transparent border-2 border-gray-200 text-gray-900 text-sm font-semibold rounded-full hover:border-[#8C6239] hover:text-[#8C6239] transition-all w-full sm:w-auto text-center"
                                    >
                                        Konsultasi Desain
                                    </a>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 relative">
                                <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden relative">
                                    <img 
                                        src={mainBanner.image} 
                                        alt={mainBanner.title} 
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Clean Editorial Categories */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">Kategori Pilihan</h2>
                            <p className="text-gray-500 text-lg">Pilih koleksi yang dirancang untuk melengkapi setiap sudut ruangan Anda.</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
                        {categories.map((category: any) => (
                            <Link 
                                key={category.id} 
                                href={`/products?category=${category.slug}`}
                                className="group block"
                            >
                                <div className="aspect-[3/4] rounded-3xl bg-[#F8F8F8] mb-6 overflow-hidden relative">
                                    <img 
                                        src={category.image} 
                                        alt={category.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#8C6239] transition-colors">{category.name}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Best Sellers */}
            <section className="py-24 bg-[#FAF9F6]">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Koleksi Terpopuler</h2>
                            <p className="text-gray-500 text-lg">Produk favorit pilihan pelanggan kami.</p>
                        </div>
                        <Link href="/products" className="hidden sm:inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gray-900 hover:text-[#8C6239] transition-colors pb-2 border-b-2 border-transparent hover:border-[#8C6239]">
                            Lihat Semua
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                        {bestSellers.map((product: any) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    
                    <div className="mt-12 sm:hidden text-center">
                        <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gray-900 hover:text-[#8C6239] transition-colors pb-2 border-b-2 border-transparent hover:border-[#8C6239]">
                            Lihat Semua
                        </Link>
                    </div>
                </div>
            </section>
            
            {/* Minimalist Inspiration */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Inspirasi Ruangan</h2>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto">Temukan ide desain dan paduan furnitur untuk menciptakan suasana rumah impian Anda.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        <Link href="/articles" className="group block relative rounded-[2.5rem] overflow-hidden aspect-[16/10]">
                            <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80" alt="Tips Desain" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                            <div className="absolute inset-0 flex flex-col justify-end p-10 lg:p-14">
                                <span className="text-xs font-bold tracking-[0.2em] text-white/80 uppercase mb-3 block">Tips & Trik</span>
                                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">Desain Interior Minimalis Modern</h3>
                                <p className="text-white font-medium hover:underline inline-flex items-center gap-2">
                                    Baca Selengkapnya <span className="text-xl">&rarr;</span>
                                </p>
                            </div>
                        </Link>
                        <Link href="/articles" className="group block relative rounded-[2.5rem] overflow-hidden aspect-[16/10]">
                            <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80" alt="Material" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                            <div className="absolute inset-0 flex flex-col justify-end p-10 lg:p-14">
                                <span className="text-xs font-bold tracking-[0.2em] text-white/80 uppercase mb-3 block">Panduan Material</span>
                                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">Mengenal Kayu Jati Premium</h3>
                                <p className="text-white font-medium hover:underline inline-flex items-center gap-2">
                                    Baca Selengkapnya <span className="text-xl">&rarr;</span>
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

function ProductCard({ product }: { product: any }) {
    return (
        <Link href={`/products/${product.slug}`} className="group flex flex-col">
            <div className="relative aspect-[4/5] bg-[#F1F0EB] rounded-[2rem] overflow-hidden mb-6 p-6 flex items-center justify-center transition-all duration-300">
                <img 
                    src={product.main_image} 
                    alt={product.name}
                    className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                {product.is_preorder && (
                    <div className="absolute top-5 left-5 bg-gray-900 text-white px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase font-bold rounded-full">
                        Pre-Order
                    </div>
                )}
            </div>
            <div className="flex flex-col px-2">
                <p className="text-xs text-gray-500 mb-2 font-bold tracking-[0.15em] uppercase">{product.category?.name}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#8C6239] transition-colors leading-snug">
                    {product.name}
                </h3>
                <p className="text-lg font-medium text-gray-900 mt-2">
                    Rp{new Intl.NumberFormat('id-ID').format(product.starting_price)}
                </p>
            </div>
        </Link>
    );
}
