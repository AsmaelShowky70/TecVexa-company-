import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { 
  Globe, 
  Menu, 
  X, 
  Sparkles, 
  ArrowRight,
  Sun,
  Moon
} from 'lucide-react';
import logoImg from '../assets/logo.jpeg';

export const Navbar = ({ onOpenAdmin, onOpenPromo }) => {
  const { lang, toggleLanguage, t, isRtl } = useLanguage();
  const { theme, toggleTheme, isDark } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Secret Easter Egg: Click logo 5 times to open hidden admin
  const logoClicksRef = useRef(0);
  const lastClickTimeRef = useRef(0);

  const handleLogoClick = (e) => {
    const now = Date.now();
    if (now - lastClickTimeRef.current < 1000) {
      logoClicksRef.current += 1;
      if (logoClicksRef.current >= 5) {
        logoClicksRef.current = 0;
        onOpenAdmin?.();
      }
    } else {
      logoClicksRef.current = 1;
    }
    lastClickTimeRef.current = now;
  };

  const navLinks = [
    { href: "#services", label: t.nav.services },
    { href: "#portfolio", label: t.nav.portfolio },
    { href: "#about", label: t.nav.about },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/85 dark:bg-slate-950/85 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Name */}
          <a 
            href="#" 
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 sm:gap-3.5 group cursor-pointer shrink-0"
            title="TECVEXA"
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-cyan-500 via-indigo-500 to-emerald-400 shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <img 
                src={logoImg} 
                alt="TECVEXA Logo" 
                className="w-full h-full object-cover rounded-[10px]" 
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-wider text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  TECVEXA
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                {t.nav.tagline}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-900/60 rounded-lg transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Promo Video Quick Pill (Desktop/Tablet) */}
            <button
              onClick={onOpenPromo}
              className="hidden sm:inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-full hover:bg-amber-500/20 transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 animate-spin" />
              <span className="whitespace-nowrap">{t.hero.ctaVideo}</span>
            </button>

            {/* Theme Toggle (Light / Dark) */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl transition-all shadow-sm hover:scale-105 active:scale-95"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-xl hover:border-cyan-500/50 transition-all shadow-sm active:scale-95"
              title="Switch Language"
              aria-label="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            {/* Primary WhatsApp / Launch CTA (Desktop) */}
            <a
              href="https://wa.me/201208794479?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20TECVEXA%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D9%88%D8%A8%D8%A7%D9%82%D8%A7%D8%AA%20%D8%A7%D9%84%D9%85%D9%88%D8%A7%D9%82%D8%B9%20%D9%88%D8%A7%D9%84%D8%AA%D8%B7%D8%A8%D9%8A%D9%82%D8%A7%D8%AA"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex relative items-center justify-center p-0.5 overflow-hidden text-xs font-bold rounded-xl group bg-gradient-to-r from-cyan-500 to-emerald-500 hover:text-white text-white shadow-md shadow-cyan-500/20 shrink-0"
            >
              <span className="relative px-3.5 py-2 transition-all ease-in duration-200 bg-slate-900 dark:bg-slate-950/40 rounded-[10px] group-hover:bg-opacity-0 flex items-center gap-1.5 text-white">
                <span className="whitespace-nowrap">{t.nav.requestQuote}</span>
                <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
              </span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-300 hover:text-cyan-500 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl lg:hidden focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer & Backdrop */}
      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 top-16 sm:top-20 bg-slate-950/50 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-40 lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-slate-950/98 backdrop-blur-2xl px-5 pt-3 pb-6 space-y-3 shadow-2xl animate-fade-in">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-base font-semibold text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPromo();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-amber-700 dark:text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-xl active:scale-98 transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                <span>{t.hero.ctaVideo}</span>
              </button>

              <a
                href="https://wa.me/201208794479?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20TECVEXA%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D9%88%D8%A8%D8%A7%D9%82%D8%A7%D8%AA%20%D8%A7%D9%84%D9%85%D9%88%D8%A7%D9%82%D8%B9%20%D9%88%D8%A7%D9%84%D8%AA%D8%B7%D8%A8%D9%8A%D9%82%D8%A7%D8%AA"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-extrabold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-xl shadow-lg shadow-cyan-500/20 active:scale-98 transition-all"
              >
                <span>{t.nav.requestQuote}</span>
                <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
