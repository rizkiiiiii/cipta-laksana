import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Trash2, Eye, Mail, Phone, Clock } from 'lucide-react';
import { useState } from 'react';

export default function Index({ messages }: any) {
    const [selectedMessage, setSelectedMessage] = useState<any>(null);

    const handleStatusChange = (id: number, status: string) => {
        router.put(route('admin.messages.update', id), { status }, {
            preserveScroll: true
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Yakin ingin menghapus pesan ini?')) {
            router.delete(route('admin.messages.destroy', id), {
                onSuccess: () => {
                    if (selectedMessage?.id === id) setSelectedMessage(null);
                }
            });
        }
    };

    const openMessage = (message: any) => {
        setSelectedMessage(message);
        if (message.status === 'unread') {
            router.get(route('admin.messages.show', message.id), {}, { preserveState: true });
        }
    };

    return (
        <AdminLayout title="Pesan Masuk">
            <Head title="Pesan - Admin" />

            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 h-auto lg:h-[calc(100vh-8rem)]">
                {/* Daftar Pesan */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-[400px] lg:h-full overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                        <h2 className="font-semibold text-gray-800">Inbox</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <div className="divide-y divide-gray-100">
                            {messages.map((message: any) => (
                                <div
                                    key={message.id}
                                    onClick={() => openMessage(message)}
                                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                                        selectedMessage?.id === message.id ? 'bg-gray-50 border-l-2 border-l-gray-900' : 'border-l-2 border-l-transparent'
                                    } ${message.status === 'unread' ? 'bg-blue-50/30' : ''}`}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className={`font-medium ${message.status === 'unread' ? 'text-gray-900' : 'text-gray-700'}`}>
                                            {message.name}
                                        </h3>
                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {new Date(message.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="text-sm font-medium text-gray-600 mb-1 line-clamp-1">{message.subject || 'Tanpa Subjek'}</div>
                                    <p className="text-sm text-gray-500 line-clamp-2">{message.message}</p>
                                </div>
                            ))}
                            {messages.length === 0 && (
                                <div className="p-8 text-center text-gray-500">
                                    Belum ada pesan masuk.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Detail Pesan */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-[500px] lg:h-full overflow-hidden">
                    {selectedMessage ? (
                        <>
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                <h2 className="text-lg font-semibold text-gray-800">{selectedMessage.subject || 'Tanpa Subjek'}</h2>
                                <div className="flex items-center gap-3">
                                    <select
                                        value={selectedMessage.status}
                                        onChange={(e) => {
                                            handleStatusChange(selectedMessage.id, e.target.value);
                                            setSelectedMessage({...selectedMessage, status: e.target.value});
                                        }}
                                        className="text-sm border-gray-300 rounded-lg focus:border-gray-500 focus:ring-gray-500"
                                    >
                                        <option value="unread">Belum Dibaca</option>
                                        <option value="read">Sudah Dibaca</option>
                                        <option value="replied">Sudah Dibalas</option>
                                    </select>
                                    <button
                                        onClick={() => handleDelete(selectedMessage.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Hapus"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-6 flex-1 overflow-y-auto">
                                <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-gray-100">
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <UserIcon className="w-5 h-5 text-gray-400" />
                                        <span className="font-medium text-gray-900">{selectedMessage.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Mail className="w-5 h-5 text-gray-400" />
                                        <a href={`mailto:${selectedMessage.email}`} className="hover:text-blue-600 transition-colors">
                                            {selectedMessage.email}
                                        </a>
                                    </div>
                                    {selectedMessage.phone && (
                                        <div className="flex items-center gap-3 text-gray-600">
                                            <Phone className="w-5 h-5 text-gray-400" />
                                            <a href={`tel:${selectedMessage.phone}`} className="hover:text-blue-600 transition-colors">
                                                {selectedMessage.phone}
                                            </a>
                                        </div>
                                    )}
                                </div>
                                <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                                    {selectedMessage.message}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                            <Mail className="w-16 h-16 mb-4 text-gray-300" />
                            <p>Pilih pesan untuk melihat detailnya</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

// Dummy User Icon since User isn't imported from lucide-react above
const UserIcon = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);
