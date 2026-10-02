import { Head, useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function Contact({ settings }: any) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('contact.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <PublicLayout>
            <Head title="Kontak Kami - Cita Laksana Mebel" />

            <div className="bg-[#FAF9F6] pt-32 pb-16">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">Hubungi Kami</h1>
                    <p className="text-gray-600 max-w-2xl text-lg leading-relaxed">
                        Punya pertanyaan tentang pesanan kustom atau butuh konsultasi desain? Tim ahli kami siap melayani Anda.
                    </p>
                </div>
            </div>

            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                        {/* Contact Info */}
                        <div className="w-full lg:w-1/3 space-y-16">
                            <div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">Layanan Pelanggan</h3>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Kami berkomitmen memberikan pelayanan terbaik untuk setiap karya furnitur impian Anda.
                                </p>
                            </div>

                            <div className="space-y-10">
                                <div className="flex gap-6 items-start">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#FAF9F6] text-[#8C6239] shrink-0">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-2">Kunjungi Kami</h4>
                                        <p className="text-gray-600 leading-relaxed">{settings?.address || 'Jakarta, Indonesia'}</p>
                                    </div>
                                </div>
                                <div className="flex gap-6 items-start">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#FAF9F6] text-[#8C6239] shrink-0">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-2">Email Kami</h4>
                                        <p className="text-gray-600 leading-relaxed">{settings?.email || 'hello@arsliving.test'}</p>
                                    </div>
                                </div>
                                <div className="flex gap-6 items-start">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#FAF9F6] text-[#8C6239] shrink-0">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-2">Telepon Kami</h4>
                                        <p className="text-gray-600 leading-relaxed">{settings?.whatsapp_number || '+62 812 3456 7890'}</p>
                                    </div>
                                </div>
                                <div className="flex gap-6 items-start">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#FAF9F6] text-[#8C6239] shrink-0">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-2">Jam Operasional</h4>
                                        <p className="text-gray-600 leading-relaxed">Senin - Jumat: 09:00 - 17:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="w-full lg:w-2/3">
                            <div className="bg-[#FAF9F6] p-10 md:p-14 rounded-[2.5rem]">
                                <h3 className="text-3xl font-bold text-gray-900 mb-10 tracking-tight">Kirim Pesan</h3>
                                
                                <form onSubmit={submit} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label htmlFor="name" className="block text-xs font-bold tracking-[0.1em] uppercase text-gray-500 mb-3">Nama</label>
                                            <input
                                                id="name"
                                                type="text"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                className="w-full bg-white border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-[#8C6239] shadow-sm"
                                                required
                                            />
                                            {errors.name && <p className="text-red-500 text-xs mt-2">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-xs font-bold tracking-[0.1em] uppercase text-gray-500 mb-3">Email</label>
                                            <input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                onChange={e => setData('email', e.target.value)}
                                                className="w-full bg-white border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-[#8C6239] shadow-sm"
                                                required
                                            />
                                            {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email}</p>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label htmlFor="phone" className="block text-xs font-bold tracking-[0.1em] uppercase text-gray-500 mb-3">Telepon (Opsional)</label>
                                            <input
                                                id="phone"
                                                type="text"
                                                value={data.phone}
                                                onChange={e => setData('phone', e.target.value)}
                                                className="w-full bg-white border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-[#8C6239] shadow-sm"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="subject" className="block text-xs font-bold tracking-[0.1em] uppercase text-gray-500 mb-3">Subjek</label>
                                            <input
                                                id="subject"
                                                type="text"
                                                value={data.subject}
                                                onChange={e => setData('subject', e.target.value)}
                                                className="w-full bg-white border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-[#8C6239] shadow-sm"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-xs font-bold tracking-[0.1em] uppercase text-gray-500 mb-3">Pesan</label>
                                        <textarea
                                            id="message"
                                            rows={6}
                                            value={data.message}
                                            onChange={e => setData('message', e.target.value)}
                                            className="w-full bg-white border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-[#8C6239] shadow-sm resize-none"
                                            required
                                        ></textarea>
                                        {errors.message && <p className="text-red-500 text-xs mt-2">{errors.message}</p>}
                                    </div>
                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full sm:w-auto px-10 py-4 bg-gray-900 text-white font-bold tracking-widest uppercase text-sm rounded-2xl hover:bg-gray-800 transition-all hover:-translate-y-1 shadow-lg disabled:opacity-70"
                                        >
                                            {processing ? 'Mengirim...' : 'Kirim Pesan'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
