import { ReactNode, useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X, Globe, Mail, MapPin } from 'lucide-react';
import FloatingWhatsApp from '@/Components/Public/FloatingWhatsApp';

interface Props {
    children: ReactNode;
}

export default function PublicLayout({ children }: Props) {
    const { global_settings } = usePage().props as any;
    const { url } = usePage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Beranda', href: '/' },
        { name: 'Koleksi', href: '/products' },
        { name: 'Jurnal', href: '/articles' },
        { name: 'Tentang Kami', href: '/about' },
        { name: 'Kontak', href: '/contact' },
    ];

    return (
        <div className="min-h-screen font-sans bg-white text-gray-900 flex flex-col selection:bg-[#8C6239] selection:text-white">
            {/* Modern Header */}
            <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900">
                            Cita Laksana Mebel.
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-10">
                            {navLinks.map((link) => {
                                const isActive = url === link.href || (link.href !== '/' && url.startsWith(link.href));
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-colors relative group ${isActive
                                            ? 'text-gray-900'
                                            : 'text-gray-500 hover:text-gray-900'
                                            }`}
                                    >
                                        {link.name}
                                        <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 bg-gray-900 transition-all ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden p-2 text-gray-900 z-50 relative"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 z-40 bg-white transition-transform duration-500 ease-in-out ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full md:hidden'}`}>
                <div className="flex flex-col items-center justify-center h-full gap-8">
                    {navLinks.map((link) => {
                        const isActive = url === link.href || (link.href !== '/' && url.startsWith(link.href));
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`text-2xl font-bold tracking-[0.1em] uppercase transition-colors ${isActive ? 'text-[#8C6239]' : 'text-gray-900 hover:text-[#8C6239]'}`}
                            >
                                {link.name}
                            </Link>
                        )
                    })}
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-grow flex flex-col">
                {children}
            </main>

            {/* Editorial Footer */}
            <footer className="bg-gray-900 text-white pt-24 pb-12 mt-auto">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                        <div className="col-span-1 md:col-span-2 pr-12">
                            <h2 className="text-3xl font-bold mb-6 text-white tracking-tight">Cita Laksana Mebel.</h2>
                            <p className="text-gray-400 max-w-sm mb-8 text-lg leading-relaxed">
                                Furnitur kustom premium yang memadukan estetika modern dengan keahlian pengrajin terbaik, dirancang khusus untuk ruangan Anda.
                            </p>
                            <div className="flex gap-4 text-white">
                                {global_settings?.instagram && (
                                    <a href={global_settings.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-gray-900 transition-colors"><Globe className="w-5 h-5" /></a>
                                )}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-8">Eksplorasi</h4>
                            <ul className="space-y-4 text-sm font-medium text-gray-300">
                                <li><Link href="/" className="hover:text-white transition-colors">Beranda</Link></li>
                                <li><Link href="/products" className="hover:text-white transition-colors">Koleksi Kami</Link></li>
                                <li><Link href="/articles" className="hover:text-white transition-colors">Jurnal & Inspirasi</Link></li>
                                <li><Link href="/about" className="hover:text-white transition-colors">Tentang Kami</Link></li>
                                <li><Link href="/contact" className="hover:text-white transition-colors">Hubungi Kami</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-8">Informasi</h4>
                            <ul className="space-y-6 text-sm font-medium text-gray-300">
                                <li className="flex gap-4 items-start">
                                    <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-gray-500" />
                                    <span className="leading-relaxed">Jl. Padepokan, Balokang, Kec. Banjar, Kota Banjar, Jawa Barat 46312</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-xs font-medium tracking-wide">
                        <div>&copy; {new Date().getFullYear()} Cita Laksana Mebel. Hak Cipta Dilindungi.</div>
                        <div>
                            <Link href="/login" className="hover:text-white transition-colors">Admin Login</Link>
                        </div>
                    </div>
                </div>
            </footer>

            <FloatingWhatsApp />
        </div>
    );
}
