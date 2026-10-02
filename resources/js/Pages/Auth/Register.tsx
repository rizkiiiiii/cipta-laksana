import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Buat Akun Baru</h2>
                <p className="text-sm text-gray-500">Bergabunglah dengan Cita Laksana Mebel</p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="name" value="Nama Lengkap" className="text-sm font-semibold text-gray-700 mb-1" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full border-gray-200 rounded-lg focus:border-[#8C6239] focus:ring-[#8C6239] shadow-sm py-2.5"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" className="text-sm font-semibold text-gray-700 mb-1" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full border-gray-200 rounded-lg focus:border-[#8C6239] focus:ring-[#8C6239] shadow-sm py-2.5"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Password" className="text-sm font-semibold text-gray-700 mb-1" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full border-gray-200 rounded-lg focus:border-[#8C6239] focus:ring-[#8C6239] shadow-sm py-2.5"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Konfirmasi Password"
                        className="text-sm font-semibold text-gray-700 mb-1"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full border-gray-200 rounded-lg focus:border-[#8C6239] focus:ring-[#8C6239] shadow-sm py-2.5"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="pt-2">
                    <button 
                        type="submit" 
                        disabled={processing}
                        className="w-full bg-[#8C6239] text-white py-3 rounded-lg text-sm font-semibold hover:bg-[#734F2D] transition-colors disabled:opacity-70 shadow-sm"
                    >
                        Daftar
                    </button>
                </div>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Sudah punya akun?{' '}
                        <Link href={route('login')} className="font-semibold text-[#8C6239] hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
