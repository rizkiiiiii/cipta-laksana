import { usePage } from '@inertiajs/react';
import { MessageCircle } from 'lucide-react';
import { generateWhatsAppUrl } from '@/utils/whatsapp';

export default function FloatingWhatsApp() {
    const { global_settings } = usePage().props as any;
    const phoneNumber = global_settings?.whatsapp_number || "6281234567890";
    const defaultMessage = "Halo, saya ingin konsultasi mengenai produk furniture.";
    
    const href = generateWhatsAppUrl(phoneNumber, defaultMessage);

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
            aria-label="Chat via WhatsApp"
        >
            <MessageCircle className="w-8 h-8" />
            <span className="absolute right-full mr-4 bg-white text-gray-800 text-sm font-medium py-2 px-4 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Konsultasi via WhatsApp
            </span>
        </a>
    );
}
