import { Head, Link, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { MessageCircle, Check, ChevronRight, Eye } from 'lucide-react';
import { generateWhatsAppUrl } from '@/utils/whatsapp';
import { useState } from 'react';

export default function Show({ product, relatedProducts }: any) {
    const { url, global_settings } = usePage().props as any;
    const [activeImage, setActiveImage] = useState(product.main_image);
    
    // Ensure images array includes the main image
    const allImages = [product.main_image, ...(product.images || []).map((img: any) => img.image)];

    const whatsappPhone = global_settings?.whatsapp_number || "6281234567890";
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    
    const waMessage = `Halo, saya tertarik dengan produk berikut:
Produk: ${product.name}
Kode: ${product.sku}
Harga Mulai: Rp${new Intl.NumberFormat('id-ID').format(product.starting_price)}
Link: ${currentUrl}

Saya ingin konsultasi mengenai produk ini.`;

    const waConsultUrl = generateWhatsAppUrl(whatsappPhone, waMessage);

    return (
        <PublicLayout>
            <Head title={`${product.name} - Premium Custom Furniture`} />

            {/* Clean Breadcrumbs */}
            <div className="bg-[#FAF9F6] pt-32 pb-6">
                <div className="container mx-auto px-6 max-w-[1400px] flex items-center text-xs text-gray-500 font-bold uppercase tracking-wider">
                    <Link href="/" className="hover:text-gray-900 transition-colors">Beranda</Link>
                    <ChevronRight className="w-4 h-4 mx-2 opacity-30" />
                    <Link href="/products" className="hover:text-gray-900 transition-colors">Koleksi</Link>
                    <ChevronRight className="w-4 h-4 mx-2 opacity-30" />
                    <Link href={`/products?category=${product.category?.slug}`} className="hover:text-gray-900 transition-colors">{product.category?.name}</Link>
                    <ChevronRight className="w-4 h-4 mx-2 opacity-30" />
                    <span className="text-gray-900 truncate max-w-[200px] sm:max-w-none">{product.name}</span>
                </div>
            </div>

            <section className="py-12 bg-[#FAF9F6]">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                        
                        {/* Modern Gallery */}
                        <div className="w-full lg:w-3/5 flex flex-col-reverse md:flex-row gap-6">
                            {/* Thumbnails */}
                            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible w-full md:w-28 flex-shrink-0 hide-scrollbar">
                                {allImages.map((img: string, idx: number) => (
                                    <button 
                                        key={idx} 
                                        onClick={() => setActiveImage(img)}
                                        className={`w-24 md:w-full aspect-[4/5] bg-white rounded-[1.5rem] overflow-hidden transition-all duration-300 border-2 ${activeImage === img ? 'border-[#8C6239] shadow-md scale-105' : 'border-transparent hover:border-gray-200 opacity-60 hover:opacity-100'}`}
                                    >
                                        <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover mix-blend-multiply p-2" />
                                    </button>
                                ))}
                            </div>
                            {/* Main Image */}
                            <div className="flex-1 bg-white rounded-[2.5rem] aspect-square lg:aspect-[4/5] overflow-hidden p-8 shadow-sm relative flex items-center justify-center">
                                <img src={activeImage} alt={product.name} className="max-h-full max-w-full object-contain mix-blend-multiply transition-opacity duration-500 hover:scale-105 transition-transform" />
                                {product.is_preorder && (
                                    <div className="absolute top-6 left-6 bg-gray-900 text-white px-4 py-2 text-xs font-bold tracking-[0.2em] uppercase rounded-full">
                                        Pre-Order
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Product Info Minimalist */}
                        <div className="w-full lg:w-2/5 flex flex-col">
                            <div className="mb-10">
                                <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">{product.category?.name}</p>
                                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">{product.name}</h1>
                                
                                <div className="text-3xl font-bold text-gray-900 mb-4">
                                    Rp{new Intl.NumberFormat('id-ID').format(product.starting_price)}
                                </div>
                                <div className="flex items-center gap-6 text-sm text-gray-500 mb-6 font-medium">
                                    <span className="font-mono bg-gray-100 px-2 py-1 rounded-md">SKU: {product.sku}</span>
                                    <span className="flex items-center gap-1.5">
                                        <Eye className="w-4 h-4" />
                                        {new Intl.NumberFormat('id-ID').format(product.views_count || 0)} dilihat
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 leading-relaxed max-w-md">Harga merupakan estimasi awal dan dapat berubah menyesuaikan ukuran, material, dan kustomisasi Anda.</p>
                            </div>

                            <div className="prose prose-lg text-gray-600 mb-10 max-w-none leading-relaxed">
                                <p>{product.short_description || product.description}</p>
                            </div>

                            {/* PO Information & Modern CTA */}
                            <div className="bg-white rounded-[2rem] p-8 mb-10 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-3 h-3 rounded-full ${product.is_preorder ? 'bg-amber-400' : 'bg-emerald-400'} shadow-[0_0_10px_rgba(0,0,0,0.1)]`}></div>
                                        <span className="font-bold text-gray-900 text-sm tracking-wide">
                                            {product.is_preorder ? 'Sistem Pre-Order' : 'Ready Stock'}
                                        </span>
                                    </div>
                                    {product.estimated_production_days && (
                                        <span className="text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                                            Estimasi {product.estimated_production_days} Hari
                                        </span>
                                    )}
                                </div>
                                
                                <a 
                                    href={waConsultUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-5 bg-gray-900 text-white text-sm font-bold uppercase tracking-widest rounded-2xl hover:bg-gray-800 transition-all hover:-translate-y-1 shadow-lg flex items-center justify-center gap-3"
                                >
                                    <MessageCircle className="w-5 h-5" /> 
                                    Konsultasi & Pesan
                                </a>
                            </div>

                            {/* Customization Options */}
                            {product.customizations && product.customizations.length > 0 && (
                                <div className="mb-10">
                                    <h3 className="text-sm font-bold tracking-[0.1em] uppercase text-gray-400 mb-6">Opsi Kustomisasi</h3>
                                    <ul className="space-y-4">
                                        {product.customizations.map((opt: any) => (
                                            <li key={opt.id} className="flex gap-4 items-start">
                                                <div className="bg-[#FAF9F6] p-2 rounded-full shrink-0">
                                                    <Check className="w-4 h-4 text-[#8C6239]" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 text-sm">{opt.name}</p>
                                                    <p className="text-gray-500 mt-1 text-sm leading-relaxed">{opt.description}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Specifications */}
                            {product.specifications && product.specifications.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-bold tracking-[0.1em] uppercase text-gray-400 mb-6">Spesifikasi Detail</h3>
                                    <div className="bg-white rounded-[2rem] p-8 shadow-sm">
                                        <div className="divide-y divide-gray-100 text-sm">
                                            {product.specifications.map((spec: any) => (
                                                <div key={spec.id} className="flex py-4 first:pt-0 last:pb-0">
                                                    <div className="w-2/5 text-gray-500 font-medium">{spec.key}</div>
                                                    <div className="w-3/5 text-gray-900 font-semibold">{spec.value}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            {relatedProducts && relatedProducts.length > 0 && (
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-6 max-w-[1400px]">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 tracking-tight text-center">Produk Terkait</h2>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                            {relatedProducts.map((p: any) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}

function ProductCard({ product }: { product: any }) {
    return (
        <Link href={`/products/${product.slug}`} className="group flex flex-col">
            <div className="relative aspect-[4/5] bg-[#FAF9F6] rounded-[2rem] overflow-hidden mb-6 p-6 flex items-center justify-center transition-all duration-300">
                <img 
                    src={product.main_image} 
                    alt={product.name}
                    className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                {product.is_preorder && (
                    <div className="absolute top-4 left-4 bg-gray-900 text-white px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase font-bold rounded-full">
                        Pre-Order
                    </div>
                )}
            </div>
            <div className="flex flex-col px-2">
                <p className="text-[10px] text-gray-500 mb-2 font-bold tracking-[0.15em] uppercase">{product.category?.name}</p>
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#8C6239] transition-colors leading-snug">
                    {product.name}
                </h3>
                <p className="text-base font-medium text-gray-900">
                    Rp{new Intl.NumberFormat('id-ID').format(product.starting_price)}
                </p>
            </div>
        </Link>
    );
}
