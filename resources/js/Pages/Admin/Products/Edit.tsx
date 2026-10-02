import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

export default function Edit({ product, categories }: any) {
    const [imagePreview, setImagePreview] = useState<string | null>(product.main_image);

    const { data, setData, post, processing, errors } = useForm({
        category_id: product.category_id || '',
        name: product.name || '',
        sku: product.sku || '',
        starting_price: product.starting_price || '',
        short_description: product.short_description || '',
        description: product.description || '',
        estimated_production_days: product.estimated_production_days || '',
        is_preorder: product.is_preorder || false,
        is_customizable: product.is_customizable || false,
        is_featured: product.is_featured || false,
        is_best_seller: product.is_best_seller || false,
        status: product.status || 'draft',
        main_image: null as File | null,
        specifications: product.specifications || [] as any[],
        customizations: product.customizations || [] as any[],
        new_images: [] as File[],
        _method: 'put',
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setData('main_image', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.products.update', product.id));
    };

    return (
        <AdminLayout title="Edit Produk">
            <Head title="Edit Produk - Admin" />

            <div className="mb-6 flex items-center gap-4">
                <Link href={route('admin.products.index')} className="text-gray-500 hover:text-gray-900">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-2xl font-semibold text-gray-900">Edit Produk</h1>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Bagian Kiri - Form Utama */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500"
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                                    <input
                                        type="text"
                                        value={data.sku}
                                        onChange={e => setData('sku', e.target.value)}
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500"
                                        required
                                    />
                                    {errors.sku && <p className="text-red-500 text-xs mt-1">{errors.sku}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                                    <select
                                        value={data.category_id}
                                        onChange={e => setData('category_id', e.target.value)}
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500"
                                        required
                                    >
                                        <option value="" disabled>Pilih Kategori</option>
                                        {categories.map((cat: any) => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                    {errors.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Mulai dari)</label>
                                    <input
                                        type="number"
                                        value={data.starting_price}
                                        onChange={e => setData('starting_price', e.target.value)}
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500"
                                        required
                                    />
                                    {errors.starting_price && <p className="text-red-500 text-xs mt-1">{errors.starting_price}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Estimasi Produksi (Hari)</label>
                                    <input
                                        type="number"
                                        value={data.estimated_production_days}
                                        onChange={e => setData('estimated_production_days', e.target.value)}
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500"
                                    />
                                    {errors.estimated_production_days && <p className="text-red-500 text-xs mt-1">{errors.estimated_production_days}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Singkat</label>
                                <textarea
                                    value={data.short_description}
                                    onChange={e => setData('short_description', e.target.value)}
                                    rows={2}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500"
                                />
                                {errors.short_description && <p className="text-red-500 text-xs mt-1">{errors.short_description}</p>}
                            </div>

                                <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Lengkap</label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    rows={5}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500"
                                />
                                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                            </div>

                            {/* Specifications */}
                            <div className="pt-4 border-t border-gray-100">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-gray-700">Spesifikasi Produk</label>
                                    <button
                                        type="button"
                                        onClick={() => setData('specifications', [...data.specifications, { key: '', value: '' }])}
                                        className="text-sm text-gray-900 bg-gray-100 px-3 py-1 rounded-md hover:bg-gray-200 transition-colors"
                                    >
                                        + Tambah Spesifikasi
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {data.specifications.map((spec: any, index: number) => (
                                        <div key={index} className="flex gap-3">
                                            <input
                                                type="text"
                                                placeholder="Contoh: Material"
                                                value={spec.key}
                                                onChange={e => {
                                                    const newSpecs = [...data.specifications];
                                                    newSpecs[index].key = e.target.value;
                                                    setData('specifications', newSpecs);
                                                }}
                                                className="flex-1 border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Contoh: Kayu Jati"
                                                value={spec.value}
                                                onChange={e => {
                                                    const newSpecs = [...data.specifications];
                                                    newSpecs[index].value = e.target.value;
                                                    setData('specifications', newSpecs);
                                                }}
                                                className="flex-1 border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newSpecs = data.specifications.filter((_: any, i: number) => i !== index);
                                                    setData('specifications', newSpecs);
                                                }}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Customizations */}
                            <div className="pt-4 border-t border-gray-100">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-gray-700">Pilihan Kustomisasi</label>
                                    <button
                                        type="button"
                                        onClick={() => setData('customizations', [...data.customizations, { name: '', description: '' }])}
                                        className="text-sm text-gray-900 bg-gray-100 px-3 py-1 rounded-md hover:bg-gray-200 transition-colors"
                                    >
                                        + Tambah Kustomisasi
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {data.customizations.map((cust: any, index: number) => (
                                        <div key={index} className="flex gap-3">
                                            <input
                                                type="text"
                                                placeholder="Contoh: Pilihan Warna"
                                                value={cust.name}
                                                onChange={e => {
                                                    const newCusts = [...data.customizations];
                                                    newCusts[index].name = e.target.value;
                                                    setData('customizations', newCusts);
                                                }}
                                                className="w-1/3 border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Deskripsi singkat (opsional)"
                                                value={cust.description}
                                                onChange={e => {
                                                    const newCusts = [...data.customizations];
                                                    newCusts[index].description = e.target.value;
                                                    setData('customizations', newCusts);
                                                }}
                                                className="flex-1 border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newCusts = data.customizations.filter((_: any, i: number) => i !== index);
                                                    setData('customizations', newCusts);
                                                }}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bagian Kanan - Opsi & Gambar */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Gambar Utama</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition-colors">
                                <input
                                    type="file"
                                    id="main_image"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                <label htmlFor="main_image" className="cursor-pointer block">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="w-full h-auto rounded-lg object-cover" />
                                    ) : (
                                        <div className="py-8 flex flex-col items-center">
                                            <ImageIcon className="w-10 h-10 text-gray-400 mb-2" />
                                            <span className="text-sm text-gray-600">Klik untuk upload gambar</span>
                                        </div>
                                    )}
                                </label>
                            </div>
                            {errors.main_image && <p className="text-red-500 text-xs mt-1">{errors.main_image}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Gambar Galeri Tambahan</label>
                            
                            {/* Existing Images */}
                            {product.images && product.images.length > 0 && (
                                <div className="grid grid-cols-4 gap-2 mb-3">
                                    {product.images.map((img: any) => (
                                        <div key={img.id} className="aspect-square bg-gray-100 rounded overflow-hidden">
                                            <img src={img.image} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            )}

                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={e => {
                                    if (e.target.files) {
                                        const filesArray = Array.from(e.target.files);
                                        setData('new_images', filesArray);
                                    }
                                }}
                                className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                            />
                            {data.new_images.length > 0 && (
                                <p className="text-xs text-gray-500 mt-2">{data.new_images.length} file baru dipilih</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Status Produk</label>
                            <select
                                value={data.status}
                                onChange={e => setData('status', e.target.value)}
                                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring-gray-500"
                            >
                                <option value="active">Aktif</option>
                                <option value="draft">Draft</option>
                                <option value="inactive">Tidak Aktif</option>
                            </select>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-gray-200">
                            <label className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={data.is_preorder}
                                    onChange={e => setData('is_preorder', e.target.checked)}
                                    className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                                />
                                <span className="text-sm text-gray-700">Pre-order</span>
                            </label>
                            <label className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={data.is_customizable}
                                    onChange={e => setData('is_customizable', e.target.checked)}
                                    className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                                />
                                <span className="text-sm text-gray-700">Bisa Kustomisasi</span>
                            </label>
                            <label className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={data.is_featured}
                                    onChange={e => setData('is_featured', e.target.checked)}
                                    className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                                />
                                <span className="text-sm text-gray-700">Produk Unggulan</span>
                            </label>
                            <label className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={data.is_best_seller}
                                    onChange={e => setData('is_best_seller', e.target.checked)}
                                    className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                                />
                                <span className="text-sm text-gray-700">Best Seller</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-gray-900 text-white rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-black transition-colors disabled:opacity-70 mt-4"
                        >
                            <Save className="w-4 h-4" />
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
