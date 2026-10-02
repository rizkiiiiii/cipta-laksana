import { Head, Link, router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function Index({ products, categories, filters }: any) {
    const [search, setSearch] = useState(filters.search || '');
    
    const handleFilterChange = (key: string, value: string) => {
        const newFilters = { ...filters, [key]: value };
        if (!value) delete newFilters[key]; // Remove empty filters
        
        router.get('/products', newFilters, { preserveState: true });
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleFilterChange('search', search);
    };

    return (
        <PublicLayout>
            <Head title="Koleksi Furnitur" />

            <div className="bg-[#FAF9F6] pt-32 pb-16">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">Koleksi Kami</h1>
                    <p className="text-gray-600 max-w-2xl text-lg leading-relaxed">
                        Eksplorasi rangkaian furnitur kustom premium kami yang dirancang dengan dedikasi tinggi untuk mempercantik ruangan Anda.
                    </p>
                </div>
            </div>

            <section className="py-16 bg-white">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Sidebar Filters */}
                        <div className="w-full lg:w-72 flex-shrink-0 space-y-12">
                            {/* Search */}
                            <div>
                                <h3 className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">Pencarian</h3>
                                <form onSubmit={handleSearchSubmit} className="relative">
                                    <input 
                                        type="text"
                                        placeholder="Cari produk..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-[#8C6239] transition-shadow"
                                    />
                                    <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors">
                                        <Search className="w-5 h-5" />
                                    </button>
                                </form>
                            </div>

                            {/* Categories */}
                            <div>
                                <h3 className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">Kategori</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <button 
                                            onClick={() => handleFilterChange('category', '')}
                                            className={`text-sm w-full text-left px-4 py-3 rounded-2xl transition-all ${!filters.category ? 'bg-gray-900 text-white font-semibold shadow-md' : 'text-gray-600 hover:bg-gray-50 font-medium'}`}
                                        >
                                            Semua Koleksi
                                        </button>
                                    </li>
                                    {categories.map((category: any) => (
                                        <li key={category.id}>
                                            <button 
                                                onClick={() => handleFilterChange('category', category.slug)}
                                                className={`text-sm w-full text-left px-4 py-3 rounded-2xl transition-all ${filters.category === category.slug ? 'bg-gray-900 text-white font-semibold shadow-md' : 'text-gray-600 hover:bg-gray-50 font-medium'}`}
                                            >
                                                {category.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="flex-1">
                            {/* Sorting Bar */}
                            <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
                                <span className="text-sm text-gray-500 font-medium">
                                    Menampilkan {products.from || 0}–{products.to || 0} dari <span className="text-gray-900 font-bold">{products.total}</span> produk
                                </span>
                                <select 
                                    className="bg-gray-50 border-none rounded-full text-sm text-gray-900 font-medium py-3 pl-6 pr-12 focus:ring-2 focus:ring-[#8C6239] cursor-pointer"
                                    value={filters.sort || 'newest'}
                                    onChange={(e) => handleFilterChange('sort', e.target.value)}
                                >
                                    <option value="newest">Urutkan: Koleksi Terbaru</option>
                                    <option value="price_asc">Harga: Terendah ke Tertinggi</option>
                                    <option value="price_desc">Harga: Tertinggi ke Terendah</option>
                                    <option value="name_asc">Nama: A - Z</option>
                                    <option value="name_desc">Nama: Z - A</option>
                                </select>
                            </div>

                            {/* Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 mb-16">
                                {products.data.map((product: any) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>

                            {products.data.length === 0 && (
                                <div className="text-center py-32 bg-gray-50 rounded-[2.5rem]">
                                    <p className="text-gray-500 text-lg">Tidak ada koleksi yang cocok dengan pencarian Anda.</p>
                                </div>
                            )}

                            {/* Pagination */}
                            {products.links.length > 3 && (
                                <div className="flex justify-center gap-2 mt-12">
                                    {products.links.map((link: any, i: number) => (
                                        <Link
                                            key={i}
                                            href={link.url || '#'}
                                            className={`min-w-[48px] h-12 px-4 flex items-center justify-center text-sm font-semibold rounded-2xl transition-all ${
                                                link.active ? 'bg-gray-900 text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                            } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
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
