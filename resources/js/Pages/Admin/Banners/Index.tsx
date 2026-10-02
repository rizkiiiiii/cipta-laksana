import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useState } from 'react';
import { Plus, Edit, Trash2, X, Image as ImageIcon } from 'lucide-react';

export default function Index({ banners }: any) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBanner, setEditingBanner] = useState<any>(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        title: '',
        subtitle: '',
        button_text: '',
        button_url: '',
        status: 'active',
        position: 0,
        image: null as File | null,
        _method: 'post',
    });

    const openModal = (banner = null) => {
        clearErrors();
        if (banner) {
            setEditingBanner(banner);
            setData({
                title: (banner as any).title || '',
                subtitle: (banner as any).subtitle || '',
                button_text: (banner as any).button_text || '',
                button_url: (banner as any).button_url || '',
                status: (banner as any).status || 'active',
                position: (banner as any).position || 0,
                image: null,
                _method: 'put',
            });
        } else {
            setEditingBanner(null);
            setData({
                title: '',
                subtitle: '',
                button_text: '',
                button_url: '',
                status: 'active',
                position: 0,
                image: null,
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
        if (editingBanner) {
            post(route('admin.banners.update', editingBanner.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.banners.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Yakin ingin menghapus banner ini?')) {
            router.delete(route('admin.banners.destroy', id));
        }
    };

    return (
        <AdminLayout title="Banner Utama">
            <Head title="Banner - Admin" />

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h2 className="text-lg font-semibold text-gray-800">Daftar Banner</h2>
                    <button
                        onClick={() => openModal()}
                        className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Tambah Banner
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500 uppercase tracking-wider">
                                <th className="p-4 font-medium">Gambar</th>
                                <th className="p-4 font-medium">Judul & Subjudul</th>
                                <th className="p-4 font-medium">Tombol</th>
                                <th className="p-4 font-medium">Status & Urutan</th>
                                <th className="p-4 font-medium text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {banners.map((banner: any) => (
                                <tr key={banner.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4">
                                        <div className="w-32 h-16 rounded bg-gray-100 overflow-hidden flex items-center justify-center">
                                            {banner.image ? (
                                                <img src={banner.image} alt="Banner" className="w-full h-full object-cover" />
                                            ) : (
                                                <ImageIcon className="w-5 h-5 text-gray-400" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="font-medium text-gray-900">{banner.title || '-'}</div>
                                        <div className="text-sm text-gray-500">{banner.subtitle || '-'}</div>
                                    </td>
                                    <td className="p-4 text-sm text-gray-600">
                                        {banner.button_text ? (
                                            <div>
                                                <span className="font-medium">Teks:</span> {banner.button_text}<br/>
                                                <span className="font-medium">URL:</span> {banner.button_url}
                                            </div>
                                        ) : '-'}
                                    </td>
                                    <td className="p-4 text-sm">
                                        <span className={`inline-flex px-2 py-1 rounded-md text-xs font-medium mb-1 ${banner.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {banner.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                                        </span>
                                        <div className="text-gray-500">Urutan: {banner.position}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => openModal(banner)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(banner.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Hapus"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {banners.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-500">
                                        Belum ada data banner.
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
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {editingBanner ? 'Edit Banner' : 'Tambah Banner Baru'}
                            </h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Gambar Banner</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={e => setData('image', e.target.files ? e.target.files[0] : null)}
                                        className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                                        required={!editingBanner}
                                    />
                                    {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Judul Utama</label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500"
                                    />
                                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Subjudul</label>
                                    <input
                                        type="text"
                                        value={data.subtitle}
                                        onChange={e => setData('subtitle', e.target.value)}
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Teks Tombol</label>
                                    <input
                                        type="text"
                                        value={data.button_text}
                                        onChange={e => setData('button_text', e.target.value)}
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">URL Tombol</label>
                                    <input
                                        type="text"
                                        value={data.button_url}
                                        onChange={e => setData('button_url', e.target.value)}
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        value={data.status}
                                        onChange={e => setData('status', e.target.value)}
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500"
                                    >
                                        <option value="active">Aktif</option>
                                        <option value="inactive">Tidak Aktif</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Posisi / Urutan</label>
                                    <input
                                        type="number"
                                        value={data.position}
                                        onChange={e => setData('position', parseInt(e.target.value) || 0)}
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500"
                                    />
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
