import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useState } from 'react';
import { Plus, Edit, Trash2, X, Image as ImageIcon } from 'lucide-react';

export default function Index({ articles }: any) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState<any>(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        title: '',
        excerpt: '',
        content: '',
        status: 'draft',
        cover_image: null as File | null,
        _method: 'post',
    });

    const openModal = (article = null) => {
        clearErrors();
        if (article) {
            setEditingArticle(article);
            setData({
                title: (article as any).title || '',
                excerpt: (article as any).excerpt || '',
                content: (article as any).content || '',
                status: (article as any).status || 'draft',
                cover_image: null,
                _method: 'put',
            });
        } else {
            setEditingArticle(null);
            setData({
                title: '',
                excerpt: '',
                content: '',
                status: 'draft',
                cover_image: null,
                _method: 'post',
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingArticle) {
            post(route('admin.articles.update', editingArticle.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.articles.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Yakin ingin menghapus artikel ini?')) {
            router.delete(route('admin.articles.destroy', id));
        }
    };

    return (
        <AdminLayout title="Artikel Inspirasi">
            <Head title="Artikel - Admin" />

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h2 className="text-lg font-semibold text-gray-800">Daftar Artikel</h2>
                    <button
                        onClick={() => openModal()}
                        className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Tambah Artikel
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500 uppercase tracking-wider">
                                <th className="p-4 font-medium">Cover</th>
                                <th className="p-4 font-medium">Judul</th>
                                <th className="p-4 font-medium">Status & Tanggal</th>
                                <th className="p-4 font-medium text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {articles.map((article: any) => (
                                <tr key={article.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4">
                                        <div className="w-20 h-14 rounded bg-gray-100 overflow-hidden flex items-center justify-center">
                                            {article.cover_image ? (
                                                <img src={article.cover_image} alt={article.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <ImageIcon className="w-5 h-5 text-gray-400" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="font-medium text-gray-900 line-clamp-1">{article.title}</div>
                                        <div className="text-xs text-gray-500">{article.slug}</div>
                                    </td>
                                    <td className="p-4 text-sm">
                                        <span className={`inline-flex px-2 py-1 rounded-md text-xs font-medium mb-1 ${article.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {article.status === 'published' ? 'Terbit' : 'Draft'}
                                        </span>
                                        <div className="text-xs text-gray-500">
                                            {article.published_at ? new Date(article.published_at).toLocaleDateString() : '-'}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => openModal(article)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(article.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Hapus"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {articles.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-gray-500">
                                        Belum ada data artikel.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Form */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {editingArticle ? 'Edit Artikel' : 'Tambah Artikel Baru'}
                            </h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Judul Artikel</label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500"
                                        required
                                    />
                                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                                </div>
                                
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Kutipan / Ringkasan Singkat (Opsional)</label>
                                    <textarea
                                        value={data.excerpt}
                                        onChange={e => setData('excerpt', e.target.value)}
                                        rows={2}
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Konten Lengkap</label>
                                    <textarea
                                        value={data.content}
                                        onChange={e => setData('content', e.target.value)}
                                        rows={8}
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500"
                                        required
                                    />
                                    {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cover Artikel</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={e => setData('cover_image', e.target.files ? e.target.files[0] : null)}
                                        className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                                    />
                                    {errors.cover_image && <p className="text-red-500 text-xs mt-1">{errors.cover_image}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status Publikasi</label>
                                    <select
                                        value={data.status}
                                        onChange={e => setData('status', e.target.value)}
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500"
                                    >
                                        <option value="draft">Draft (Simpan Sementara)</option>
                                        <option value="published">Terbit (Publikasi)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-gray-900 hover:bg-black text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
