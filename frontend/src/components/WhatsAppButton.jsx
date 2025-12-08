import React from 'react';
import { MessageCircle } from 'lucide-react';
import { whatsappNumber } from '../data/mock';

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hola, quiero más información sobre Prados de Paraíso');
    const phoneNumber = whatsappNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] hover:bg-[#20BA5A] rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-8 h-8 text-white" strokeWidth={2} />
      
      {/* Tooltip */}
      <div className="absolute right-full mr-3 px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        ¡Chatea con nosotros!
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-stone-900 rotate-45"></div>
      </div>
    </button>
  );
};

export default WhatsAppButton;
