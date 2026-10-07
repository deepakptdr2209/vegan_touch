const NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999";

export function whatsappLink(message: string) {
  return `https://wa.me/${NUMBER}?text=${encodeURIComponent(message)}`;
}
