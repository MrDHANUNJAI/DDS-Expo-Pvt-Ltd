import React from 'react';
import { buildWhatsAppUrl } from '../../utils/chatbotMatcher';
import { DDS_WHATSAPP_NUMBER } from '../../data/chatbotFaqData';

interface WhatsAppCtaButtonProps {
  message: string;
  label?: string;
  phoneNumber?: string;
  className?: string;
  compact?: boolean;
}

export const WhatsAppCtaButton: React.FC<WhatsAppCtaButtonProps> = ({
  message,
  label = '💬 Ask on WhatsApp',
  phoneNumber = DDS_WHATSAPP_NUMBER,
  className = '',
  compact = false,
}) => {
  const url = buildWhatsAppUrl(message, phoneNumber);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 font-semibold rounded-xl text-white transition-all duration-200 shadow-sm hover:shadow-md hover:brightness-105 active:scale-95 ${
        compact 
          ? 'px-3 py-1.5 text-xs bg-[#25D366]' 
          : 'w-full px-4 py-2.5 text-sm bg-[#25D366] hover:bg-[#20ba59]'
      } ${className}`}
      style={{
        textDecoration: 'none',
        backgroundColor: '#25D366',
        letterSpacing: '0.01em',
      }}
      aria-label={label}
    >
      <i className="bi bi-whatsapp text-lg leading-none"></i>
      <span>{label}</span>
    </a>
  );
};
