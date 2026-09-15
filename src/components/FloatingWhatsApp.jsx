import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp = () => {
  const { lang, isRtl } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(true);

  const handleClick = () => {
    const text = encodeURIComponent(
      lang === 'ar'
        ? "مرحباً TECVEXA، أرغب في الاستفسار عن باقات وخدمات المواقع والتطبيقات."
        : "Hello TECVEXA, I would like to inquire about your web and mobile packages."
    );
    window.open(`https://wa.me/201208794479?text=${text}`, '_blank');
  };

  return (
    <div className={`fixed bottom-6 z-40 flex items-center gap-3 ${isRtl ? 'left-6 flex-row' : 'right-6 flex-row-reverse'}`}>
      
      {/* Tooltip Pill */}
      {showTooltip && (
        <div className="relative hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-900/95 border border-emerald-500/40 text-xs font-bold text-white shadow-2xl backdrop-blur-md animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>{lang === 'ar' ? 'تحدث معنا عبر واتساب الآن!' : 'Chat on WhatsApp!'}</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }} 
            className="text-slate-400 hover:text-white ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Pulse Button */}
      <button
        onClick={handleClick}
        className="relative group p-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-300"
        title="WhatsApp Direct Contact"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-75 animate-ping -z-10"></span>
        <MessageCircle className="w-7 h-7" />
      </button>

    </div>
  );
};
