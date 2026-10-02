import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Package, Layers, FileText, MessageCircle, Eye, TrendingUp } from 'lucide-react';

export default function Dashboard({ stats, recentProducts, recentMessages, topViewedProducts }: any) {
    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin Dashboard" />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mr-4 shrink-0">
                        <Package className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Produk</p>
                        <h3 className="text-2xl font-bold text-gray-900">{stats.total_products}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="w-12 h-12 bg-[#4A6B53]/10 text-[#4A6B53] rounded-lg flex items-center justify-center mr-4 shrink-0">
                        <Eye className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Dilihat</p>
                        <h3 className="text-2xl font-bold text-gray-900">{new Intl.NumberFormat('id-ID').format(stats.total_product_views || 0)}</h3>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mr-4 shrink-0">
                        <Layers className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Kategori</p>
                        <h3 className="text-2xl font-bold text-gray-900">{stats.total_categories}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mr-4 shrink-0">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Artikel</p>
                        <h3 className="text-2xl font-bold text-gray-900">{stats.total_articles}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center mr-4 shrink-0">
                        <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Pesan Masuk</p>
                        <div className="flex items-end gap-2">
                            <h3 className="text-2xl font-bold text-gray-900">{stats.total_messages}</h3>
                            {stats.unread_messages > 0 && (
                                <span className="text-xs text-red-500 font-medium mb-1">({stats.unread_messages} baru)</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Top Viewed Products (Analytics) */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden lg:col-span-2">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-[#4A6B53]" /> 
                            Produk Paling Banyak Dilihat
                        </h2>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {topViewedProducts && topViewedProducts.map((product: any) => (
                            <div key={product.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                                <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                                    <img src={product.main_image} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium text-gray-900 truncate">{product.name}</h4>
                                    <p className="text-xs text-gray-500">{product.category?.name || 'Tanpa Kategori'}</p>
                                </div>
                                <div className="text-right flex items-center gap-2">
                                    <Eye className="w-4 h-4 text-gray-400" />
                                    <span className="font-semibold text-gray-900">
                                        {new Intl.NumberFormat('id-ID').format(product.views_count || 0)}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {(!topViewedProducts || topViewedProducts.length === 0) && (
                            <div className="p-6 text-center text-gray-500">Belum ada data analitik.</div>
                        )}
                    </div>
                </div>

                {/* Recent Messages */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                        <h2 className="text-lg font-semibold text-gray-800">Pesan Terbaru</h2>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {recentMessages.map((msg: any) => (
                            <div key={msg.id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="text-sm font-medium text-gray-900">{msg.name}</h4>
                                    <span className="text-xs text-gray-500">{new Date(msg.created_at).toLocaleDateString('id-ID')}</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-2">{msg.email}</p>
                                <p className="text-sm text-gray-700 line-clamp-2">{msg.message}</p>
                            </div>
                        ))}
                        {recentMessages.length === 0 && (
                            <div className="p-6 text-center text-gray-500">Belum ada pesan.</div>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1">
                {/* Recent Products */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                        <h2 className="text-lg font-semibold text-gray-800">Produk Baru Ditambahkan</h2>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {recentProducts.map((product: any) => (
                            <div key={product.id} className="p-6 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                                <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                                    <img src={product.main_image} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-base font-medium text-gray-900 truncate">{product.name}</h4>
                                    <p className="text-sm text-gray-500">{product.category?.name || 'Tanpa Kategori'}</p>
                                </div>
                                <div className="text-right">
                                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                                        product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {product.status === 'active' ? 'Aktif' : (product.status === 'draft' ? 'Draft' : 'Tidak Aktif')}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {recentProducts.length === 0 && (
                            <div className="p-6 text-center text-gray-500">Belum ada produk.</div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
