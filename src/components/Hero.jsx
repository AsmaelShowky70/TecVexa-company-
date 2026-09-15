import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  MessageCircle, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Code2,
  Server,
  Smartphone
} from 'lucide-react';

export const Hero = ({ onOpenPromo }) => {
  const { t, isRtl } = useLanguage();

  const stats = [
    { number: t.hero.stat1Number, label: t.hero.stat1Label, icon: Layers },
    { number: t.hero.stat2Number, label: t.hero.stat2Label, icon: Server },
    { number: t.hero.stat3Number, label: t.hero.stat3Label, icon: Zap },
    { number: t.hero.stat4Number, label: t.hero.stat4Label, icon: ShieldCheck },
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Glow Ambient Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 -left-20 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Eyebrow */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 shadow-sm mb-6 hover:border-cyan-500/50 transition-colors">
            <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-ping"></span>
            <span className="text-xs sm:text-sm font-bold text-cyan-700 dark:text-cyan-300">
              {t.hero.badge}
            </span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white max-w-5xl leading-tight sm:leading-none">
            {t.hero.titleStart}{" "}
            <span className="text-gradient">
              {t.hero.titleHighlight}
            </span>{" "}
            <span className="block mt-2 sm:mt-3 text-slate-800 dark:text-slate-200">
              {t.hero.titleEnd}
            </span>
          </h1>

          {/* Subtitle / Marketing Value Proposition */}
          <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* Call to Actions Buttons */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            
            {/* Primary Explore Packages CTA */}
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-extrabold rounded-xl text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </a>

            {/* Watch Promo Video Button */}
            <button
              onClick={onOpenPromo}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold rounded-xl text-amber-700 dark:text-amber-300 bg-amber-500/10 border border-amber-500/40 hover:bg-amber-500/20 hover:border-amber-400 transition-all hover:scale-105 shadow-md shadow-amber-500/10"
            >
              <div className="w-6 h-6 rounded-full bg-amber-400/20 flex items-center justify-center">
                <Play className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 fill-amber-500 dark:fill-amber-400 ml-0.5" />
              </div>
              <span>{t.hero.ctaVideo}</span>
            </button>

            {/* WhatsApp Instant Chat */}
            <a
              href="https://wa.me/201208794479?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20TECVEXA%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%AA%D8%AD%D8%AF%D8%AB%20%D9%85%D8%B9%D9%83%D9%85%20%D8%A8%D8%AE%D8%B5%D9%88%D8%B5%20%D8%A7%D9%84%D8%A8%D8%AF%D8%A1%20%D9%81%D9%8A%20%D9%85%D8%B4%D8%B1%D9%88%D8%B9%20%D8%AC%D8%AF%D9%8A%D8%AF"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold rounded-xl text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 hover:border-emerald-500/60 hover:text-emerald-600 dark:hover:text-emerald-300 transition-all hover:scale-105 shadow-sm"
            >
              <MessageCircle className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
              <span>{t.hero.ctaWhatsApp}</span>
            </a>

          </div>

          {/* High-Impact Interactive Preview Card */}
          <div className="mt-14 w-full max-w-4xl rounded-2xl glass-card border border-slate-200 dark:border-slate-700/80 p-3 sm:p-5 shadow-xl relative overflow-hidden group">
            
            {/* Top Window chrome */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800/80 mb-4 px-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono ml-2">tecvexa.com/platform-preview</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Supabase Live DB • REST API Active</span>
              </div>
            </div>

            {/* Simulated Dynamic Corporate Dashboard Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-left">
              
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>{isRtl ? "مواقع الويب الديناميكية" : "Dynamic Web Architecture"}</span>
                  <Code2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div className="text-xl font-black text-slate-900 dark:text-white">React 19 + Vite</div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {isRtl ? "لوحة تحكم كاملة + قاعدة بيانات متزامنة" : "Full Admin Panel + Cloud Database"}
                </p>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                  <div className="w-full bg-cyan-500 h-full"></div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>{isRtl ? "تطبيقات الأندرويد" : "Android Ecosystem"}</span>
                  <Smartphone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-xl font-black text-slate-900 dark:text-white">Flutter & Native</div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {isRtl ? "مزامنة لحظية للمنتجات والإشعارات" : "Real-time sync for orders & push"}
                </p>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                  <div className="w-full bg-emerald-500 h-full"></div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>{isRtl ? "أنظمة المؤسسات المخصصة" : "Bespoke Enterprise ERP"}</span>
                  <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="text-xl font-black text-slate-900 dark:text-white">QMS & HR Suites</div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {isRtl ? "إدارة خطوط الإنتاج والعمالة والمخازن" : "Industrial QMS, shifts & payroll"}
                </p>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                  <div className="w-full bg-indigo-500 h-full"></div>
                </div>
              </div>

            </div>

          </div>

          {/* Metrics / Statistics Bar */}
          <div className="mt-14 w-full grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((st, i) => {
              const IconComp = st.icon;
              return (
                <div 
                  key={i} 
                  className="p-5 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-all text-center group"
                >
                  <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform shadow-sm">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                    {st.number}
                  </div>
                  <div className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                    {st.label}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
