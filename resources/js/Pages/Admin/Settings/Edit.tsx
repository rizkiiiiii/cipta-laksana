import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Save } from 'lucide-react';

export default function Edit({ settings }: any) {
    const { data, setData, put, processing, errors } = useForm({
        site_name: settings.site_name || '',
        whatsapp_number: settings.whatsapp_number || '',
        address: settings.address || '',
        email: settings.email || '',
        instagram: settings.instagram || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.settings.update'));
    };

    return (
        <AdminLayout title="Pengaturan Website">
            <Head title="Pengaturan - Admin" />

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-lg font-semibold text-gray-800">Pengaturan Umum</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Website / Toko</label>
                            <input
                                type="text"
                                value={data.site_name}
                                onChange={e => setData('site_name', e.target.value)}
                                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-[#4A6B53] focus:ring focus:ring-[#4A6B53] focus:ring-opacity-50"
                            />
                            {errors.site_name && <p className="text-red-500 text-xs mt-1">{errors.site_name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor WhatsApp (Untuk Tombol Chat & Kontak)</label>
                            <input
                                type="text"
                                value={data.whatsapp_number}
                                onChange={e => setData('whatsapp_number', e.target.value)}
                                placeholder="6281234567890"
                                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-[#4A6B53] focus:ring focus:ring-[#4A6B53] focus:ring-opacity-50"
                            />
                            <p className="text-gray-500 text-xs mt-1">Gunakan format 628... tanpa simbol + (plus)</p>
                            {errors.whatsapp_number && <p className="text-red-500 text-xs mt-1">{errors.whatsapp_number}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-[#4A6B53] focus:ring focus:ring-[#4A6B53] focus:ring-opacity-50"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Toko / Kantor</label>
                            <textarea
                                value={data.address}
                                onChange={e => setData('address', e.target.value)}
                                rows={3}
                                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-[#4A6B53] focus:ring focus:ring-[#4A6B53] focus:ring-opacity-50"
                            />
                            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">URL Instagram</label>
                            <input
                                type="url"
                                value={data.instagram}
                                onChange={e => setData('instagram', e.target.value)}
                                placeholder="https://instagram.com/yourbrand"
                                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-[#4A6B53] focus:ring focus:ring-[#4A6B53] focus:ring-opacity-50"
                            />
                            {errors.instagram && <p className="text-red-500 text-xs mt-1">{errors.instagram}</p>}
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            {processing ? 'Menyimpan...' : 'Simpan Pengaturan'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
