import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Index({ articles }: any) {
    return (
        <PublicLayout>
            <Head title="Inspirasi & Artikel - Cita Laksana Mebel" />

            <div className="bg-[#FAF9F6] pt-32 pb-16">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">Jurnal & Inspirasi</h1>
                    <p className="text-gray-600 max-w-2xl text-lg leading-relaxed">
                        Eksplorasi wawasan desain interior, panduan gaya hidup, dan cerita di balik dedikasi kami menciptakan furnitur premium.
                    </p>
                </div>
            </div>

            <section className="py-16 bg-white">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                        {articles.data.map((article: any) => (
                            <article key={article.id} className="group cursor-pointer flex flex-col h-full">
                                <Link href={`/articles/${article.slug}`} className="block relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-[#FAF9F6] mb-6">
                                    {article.cover_image ? (
                                        <img 
                                            src={article.cover_image} 
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <span className="text-gray-400 font-bold tracking-widest uppercase text-sm">Cita Laksana Mebel</span>
                                        </div>
                                    )}
                                </Link>
                                <div className="flex flex-col flex-1 px-2">
                                    <div className="flex items-center text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase mb-4">
                                        <span className="text-[#8C6239]">{article.category?.name || 'Inspirasi'}</span>
                                        <span className="mx-3 opacity-30">|</span>
                                        <span>{new Date(article.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#8C6239] transition-colors leading-tight">
                                        <Link href={`/articles/${article.slug}`}>{article.title}</Link>
                                    </h2>
                                    <p className="text-base text-gray-500 line-clamp-3 mb-6 leading-relaxed">
                                        {article.excerpt || article.content.substring(0, 120) + '...'}
                                    </p>
                                    <div className="mt-auto pt-4">
                                        <Link href={`/articles/${article.slug}`} className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gray-900 hover:text-[#8C6239] transition-colors pb-1 border-b-2 border-transparent hover:border-[#8C6239]">
                                            Baca Selengkapnya
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Pagination */}
                    {articles.links && articles.links.length > 3 && (
                        <div className="mt-20 flex justify-center gap-2">
                            {articles.links.map((link: any, i: number) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    className={`min-w-[48px] h-12 px-4 flex items-center justify-center text-sm font-semibold rounded-2xl transition-all ${
                                        link.active ? 'bg-gray-900 text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                    } ${!link.url ? 'opacity-50 cursor-not-allowed bg-transparent hover:bg-transparent' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
