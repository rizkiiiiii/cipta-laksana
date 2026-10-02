export function generateWhatsAppUrl(phone: string, message: string): string {
    // Clean phone number (remove non-digits, replace leading 0 with 62 if indonesian)
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
        cleaned = '62' + cleaned.substring(1);
    }
    
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${cleaned}?text=${encodedMessage}`;
}
