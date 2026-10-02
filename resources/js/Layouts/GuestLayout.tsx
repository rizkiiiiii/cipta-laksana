import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex">
            {/* Left Side - Image */}
            <div className="hidden lg:block lg:w-1/2 relative bg-[#1A1A1A]">
                <img 
                    src="/placeholder/hero-1.jpg" 
                    alt="Login Background" 
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center p-12">
                    <div className="text-white text-center max-w-lg">
                        <Link href="/" className="inline-block mb-10">
                            <h2 className="text-4xl font-serif tracking-wide drop-shadow-lg">Cita Laksana Mebel</h2>
                        </Link>
                        <h3 className="text-2xl font-serif mb-4 leading-tight">Furnitur Kustom Premium<br />untuk Ruang Anda</h3>
                        <p className="text-gray-300 font-light text-sm leading-relaxed">
                            Akses ke akun Anda untuk melacak pesanan, menyimpan produk favorit, dan mendapatkan penawaran eksklusif.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-[#F8F6F0] p-6 sm:p-12">
                <div className="w-full max-w-md bg-white p-10 shadow-sm border border-gray-100">
                    <div className="lg:hidden flex justify-center mb-10">
                        <Link href="/" className="text-3xl font-serif text-[#1A1A1A]">
                            Cita Laksana Mebel
                        </Link>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
