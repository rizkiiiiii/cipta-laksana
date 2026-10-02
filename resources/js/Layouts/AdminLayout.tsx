import { ReactNode, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    Package, 
    Layers, 
    FileText, 
    MessageSquare, 
    Image as ImageIcon, 
    Settings, 
    LogOut,
    Menu,
    MessageCircle,
    X
} from 'lucide-react';

interface Props {
    children: ReactNode;
    title?: string;
}

export default function AdminLayout({ children, title }: Props) {
    const { url } = usePage();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, route: '/admin', active: url === '/admin' },
        { name: 'Produk', icon: Package, route: '/admin/products', active: url.startsWith('/admin/products') },
        { name: 'Kategori', icon: Layers, route: '/admin/categories', active: url.startsWith('/admin/categories') },
        { name: 'Artikel', icon: FileText, route: '/admin/articles', active: url.startsWith('/admin/articles') },
        { name: 'Testimoni', icon: MessageSquare, route: '/admin/testimonials', active: url.startsWith('/admin/testimonials') },
        { name: 'Banner', icon: ImageIcon, route: '/admin/banners', active: url.startsWith('/admin/banners') },
        { name: 'Pesan', icon: MessageCircle, route: '/admin/messages', active: url.startsWith('/admin/messages') },
        { name: 'Pengaturan', icon: Settings, route: '/admin/settings', active: url.startsWith('/admin/settings') },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden" 
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
                    <span className="text-xl font-bold text-gray-800">Admin Panel</span>
                    <button className="md:hidden text-gray-500" onClick={() => setIsSidebarOpen(false)}>
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-1 px-3">
                        {menuItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.route}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                                        item.active 
                                            ? 'bg-gray-900 text-white' 
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="p-4 border-t border-gray-200">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="flex items-center gap-3 px-3 py-2.5 w-full text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Keluar</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
                    <div className="flex items-center gap-4">
                        <button 
                            className="md:hidden text-gray-500 hover:text-gray-700"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        {title && <h1 className="text-xl font-semibold text-gray-800">{title}</h1>}
                    </div>
                    <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-2">Halo, Admin</span>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
