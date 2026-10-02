import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { ChevronRight } from 'lucide-react';

export default function Show({ article, relatedArticles }: any) {
    return (
        <PublicLayout>
            <Head title={`${article.title} - Cita Laksana Mebel`} />

            {/* Clean Breadcrumbs */}
            <div className="bg-[#FAF9F6] pt-32 pb-6">
                <div className="container mx-auto px-6 max-w-4xl flex items-center justify-center text-[10px] text-gray-500 font-bold uppercase tracking-[0.15em]">
                    <Link href="/" className="hover:text-gray-900 transition-colors">Beranda</Link>
                    <ChevronRight className="w-3 h-3 mx-3 opacity-30" />
                    <Link href="/articles" className="hover:text-gray-900 transition-colors">Jurnal</Link>
                    <ChevronRight className="w-3 h-3 mx-3 opacity-30" />
                    <span className="text-gray-900 truncate max-w-[200px] sm:max-w-none">{article.title}</span>
                </div>
            </div>

            <article className="pb-24 pt-12 bg-[#FAF9F6]">
                <div className="container mx-auto px-6 max-w-4xl">
                    <header className="mb-16 text-center">
                        <div className="flex items-center justify-center text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase mb-8">
                            <span className="text-[#8C6239]">{article.category?.name || 'Gaya Hidup'}</span>
                            <span className="mx-4 opacity-30">|</span>
                            <span>{new Date(article.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-16 leading-tight tracking-tight">
                            {article.title}
                        </h1>
                        {article.cover_image && (
                            <div className="aspect-[16/10] bg-gray-100 rounded-[2rem] overflow-hidden w-full mb-16 shadow-lg">
                                <img src={article.cover_image} alt={article.title} className="w-full h-full object-cover" />
                            </div>
                        )}
                    </header>

                    <div className="prose prose-lg md:prose-xl max-w-3xl mx-auto text-gray-600 leading-relaxed prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight prose-a:text-[#8C6239] prose-a:font-medium prose-p:mb-8 prose-img:rounded-3xl">
                        <div dangerouslySetInnerHTML={{ __html: article.content }} />
                    </div>
                </div>
            </article>

            {relatedArticles && relatedArticles.length > 0 && (
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-6 max-w-[1400px]">
                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-16 text-center tracking-tight">Artikel Terkait</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
                            {relatedArticles.map((related: any) => (
                                <Link key={related.id} href={`/articles/${related.slug}`} className="group block flex flex-col h-full">
                                    <div className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-[#FAF9F6] mb-6">
                                        <img src={related.cover_image} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                                    </div>
                                    <div className="flex flex-col flex-1 px-2">
                                        <div className="flex items-center text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase mb-3">
                                            <span>{new Date(related.published_at).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</span>
                                        </div>
                                        <h4 className="text-xl font-bold text-gray-900 group-hover:text-[#8C6239] transition-colors line-clamp-2 mb-4 leading-snug">
                                            {related.title}
                                        </h4>
                                        <div className="mt-auto pt-2">
                                            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-900 hover:text-[#8C6239] transition-colors pb-1 border-b-2 border-transparent hover:border-[#8C6239]">
                                                Baca Artikel
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}
