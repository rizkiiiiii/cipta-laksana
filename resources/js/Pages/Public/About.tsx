import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function About({ testimonials }: any) {
    return (
        <PublicLayout>
            <Head title="Tentang Kami - Cita Laksana Mebel" />

            <div className="bg-[#FAF9F6] pt-32 pb-16">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">Cerita Kami</h1>
                    <p className="text-gray-600 max-w-2xl text-lg leading-relaxed">
                        Menciptakan furnitur abadi yang disesuaikan untuk memperindah ruang hidup Anda dengan material premium dan keahlian tinggi.
                    </p>
                </div>
            </div>

            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
                        <div className="w-full lg:w-1/2">
                            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-[#FAF9F6] relative shadow-lg">
                                <img src="/placeholder/hero-1.jpg" alt="Craftsmanship" className="w-full h-full object-cover mix-blend-multiply p-8" />
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">Menguasai Seni Pengrajin</h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                Di Cita Laksana Mebel, setiap furnitur bukan sekadar barang fungsional—melainkan karya seni yang dibuat dengan presisi, gairah, dan komitmen tak tergoyahkan terhadap kualitas. Perjalanan kami dimulai dengan satu visi: menciptakan furnitur kustom yang menyeimbangkan estetika modern dengan ketahanan jangka panjang.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Kami hanya menggunakan kayu solid terbaik, kain pelapis premium, dan material finishing berkualitas tinggi. Para pengrajin ahli kami dengan cermat mewujudkan ide Anda, memastikan bahwa setiap produk tidak hanya tampil memukau namun juga tahan lama untuk lintas generasi.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-[#FAF9F6]">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Apa Kata Klien Kami</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial: any) => (
                            <div key={testimonial.id} className="bg-white p-10 rounded-[2rem] flex flex-col h-full shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="flex gap-1.5 mb-8 text-[#8C6239]">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-lg text-gray-600 mb-10 leading-relaxed flex-grow font-medium">
                                    "{testimonial.testimonial}"
                                </p>
                                <div className="mt-auto">
                                    <h4 className="text-base font-bold text-gray-900">{testimonial.customer_name}</h4>
                                    {testimonial.customer_title && (
                                        <p className="text-sm text-gray-500 mt-1 font-medium tracking-wide uppercase">{testimonial.customer_title}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
