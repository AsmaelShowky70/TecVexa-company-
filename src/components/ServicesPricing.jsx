import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getPackages } from '../lib/storage';
import { 
  Check, 
  Sparkles, 
  Zap, 
  ArrowRight, 
  Globe, 
  Server, 
  Database, 
  Smartphone, 
  ShieldCheck, 
  Layers, 
  Calculator,
  MessageCircle,
  Clock
} from 'lucide-react';

export const ServicesPricing = ({ onSelectPackage }) => {
  const { t, lang, isRtl } = useLanguage();
  const [packages, setPackages] = useState([]);
  const [activeTab, setActiveTab] = useState('website_tier');

  // Interactive Calculator State
  const [calcWeb, setCalcWeb] = useState(true);
  const [calcAndroid, setCalcAndroid] = useState(false);
  const [calcPaidDomain, setCalcPaidDomain] = useState(true);
  const [calcPaidHosting, setCalcPaidHosting] = useState(false);
  const [calcPaidDb, setCalcPaidDb] = useState(false);

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    const data = await getPackages();
    setPackages(data);
  };

  // Filter packages by category
  const websiteTiers = packages.filter(p => p.category === 'website_tier');
  const bundleOffers = packages.filter(p => p.category === 'bundle');
  const bespokeSystems = packages.filter(p => p.category === 'bespoke');

  // Calculate live estimate in EGP
  const calculateTotal = () => {
    let total = 0;
    if (calcWeb) total += 3500;
    if (calcAndroid) {
      // If web is also selected, apply combo discount
      total += calcWeb ? 9000 : 7500;
    }
    if (calcPaidDomain) total += 1200; // Paid .com domain 1 year
    if (calcPaidHosting) total += 2200; // Dedicated high-speed cloud host
    if (calcPaidDb) total += 1900; // Dedicated production cloud DB
    return total;
  };

  const calculatedTotal = calculateTotal();

  const handleOrderCalculatedWhatsApp = () => {
    const items = [];
    if (calcWeb) items.push(lang === 'ar' ? 'موقع ويب ديناميكي مع لوحة تحكم' : 'Dynamic Website with Admin Dashboard');
    if (calcAndroid) items.push(lang === 'ar' ? 'تطبيق أندرويد متزامن' : 'Synchronized Android App');
    if (calcPaidDomain) items.push(lang === 'ar' ? 'دومين مدفوع .com لسنة' : 'Paid .com Domain for 1 yr');
    if (calcPaidHosting) items.push(lang === 'ar' ? 'استضافة سحابية فائقة السرعة مدفوعة' : 'Paid High-Speed Cloud Host');
    if (calcPaidDb) items.push(lang === 'ar' ? 'قاعدة بيانات سحابية مدفوعة' : 'Paid Cloud Database');

    const msg = encodeURIComponent(
      `مرحباً شركة TECVEXA،\nقمت بحساب تكلفة مشروعي عبر حاسبة الموقع:\n- المكونات: ${items.join(' + ')}\n- التكلفة التقديرية: ${calculatedTotal.toLocaleString()} ج.م\nأرغب في بدء التنفيذ وتحديد موعد للبدء.`
    );
    window.open(`https://wa.me/201208794479?text=${msg}`, '_blank');
  };

  const handlePackageWhatsApp = (pkg) => {
    const name = lang === 'ar' ? pkg.name_ar : pkg.name_en;
    const price = `${pkg.price_egp.toLocaleString()} ج.م / $${pkg.price_usd}`;
    const msg = encodeURIComponent(
      `مرحباً TECVEXA،\nأرغب في حجز واختيار:\nالباقة: ${name}\nالسعر: ${price}\nبرجاء موافاتي بالخطوات المطلوبة لبدء العمل.`
    );
    window.open(`https://wa.me/201208794479?text=${msg}`, '_blank');
  };

  return (
    <section id="services" className="relative py-20 lg:py-28 bg-slate-100/60 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800/80 transition-colors duration-300">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-cyan-700 dark:text-cyan-400 text-xs sm:text-sm font-bold mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>{t.pricing.sectionBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {t.pricing.title}
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            {t.pricing.subtitle}
          </p>

          {/* Navigation Category Tabs */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 shadow-md max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveTab('website_tier')}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all ${
                activeTab === 'website_tier'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300/50 dark:hover:bg-slate-800'
              }`}
            >
              {t.pricing.tabWebTiers}
            </button>
            <button
              onClick={() => setActiveTab('bundle')}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all ${
                activeTab === 'bundle'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300/50 dark:hover:bg-slate-800'
              }`}
            >
              {t.pricing.tabBundles}
            </button>
            <button
              onClick={() => setActiveTab('bespoke')}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all ${
                activeTab === 'bespoke'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300/50 dark:hover:bg-slate-800'
              }`}
            >
              {t.pricing.tabBespoke}
            </button>
          </div>
        </div>

        {/* 1. DYNAMIC WEBSITE TIERS (The 3 Packages) */}
        {activeTab === 'website_tier' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {websiteTiers.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  pkg.is_popular
                    ? 'bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 border-2 border-cyan-500 shadow-xl shadow-cyan-500/15 scale-100 md:scale-105 z-20'
                    : 'glass-card border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50'
                }`}
              >
                {/* Popular Badge */}
                {pkg.is_popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 text-[11px] sm:text-xs font-black tracking-wider uppercase shadow-lg shadow-cyan-400/30">
                    {lang === 'ar' ? pkg.badge_ar : pkg.badge_en}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-cyan-700 dark:text-cyan-300 border border-slate-200 dark:border-slate-700/60">
                      {lang === 'ar' ? pkg.badge_ar : pkg.badge_en}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {pkg.billing_period}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {lang === 'ar' ? pkg.name_ar : pkg.name_en}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 min-h-[44px] leading-relaxed">
                    {lang === 'ar' ? pkg.description_ar : pkg.description_en}
                  </p>

                  {/* Price Tag */}
                  <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                        {pkg.price_egp.toLocaleString()}
                      </span>
                      <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
                        {t.pricing.currency}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        (~${pkg.price_usd})
                      </span>
                    </div>
                  </div>

                  {/* Highlights Grid (Domain, Host, DB, Dashboard) */}
                  <div className="mt-5 space-y-2.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 text-xs">
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <Globe className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {t.pricing.domainIncluded}
                      </span>
                      <span className="text-slate-600 dark:text-slate-300 truncate">
                        {lang === 'ar' ? pkg.domain_included_ar : pkg.domain_included_en}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <Server className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {t.pricing.hostingIncluded}
                      </span>
                      <span className="text-slate-600 dark:text-slate-300 truncate">
                        {lang === 'ar' ? pkg.hosting_included_ar : pkg.hosting_included_en}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <Database className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {t.pricing.databaseIncluded}
                      </span>
                      <span className="text-slate-600 dark:text-slate-300 truncate">
                        {lang === 'ar' ? pkg.database_included_ar : pkg.database_included_en}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{t.pricing.dashboardYes}</span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="mt-6 space-y-3">
                    {(lang === 'ar' ? pkg.features_ar : pkg.features_en).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <Check className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Order on WhatsApp */}
                <div className="mt-8 pt-4">
                  <button
                    onClick={() => handlePackageWhatsApp(pkg)}
                    className={`w-full py-3.5 px-4 rounded-xl text-sm font-extrabold transition-all flex items-center justify-center gap-2 shadow-lg ${
                      pkg.is_popular
                        ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 hover:from-cyan-300 hover:to-emerald-300 shadow-cyan-500/25 hover:scale-105 active:scale-95'
                        : 'bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white border border-slate-700/60 active:scale-95'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t.pricing.choosePlan}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* 2. SPECIAL OFFERS & BUNDLES (Web + Android & Standalone Android) */}
        {activeTab === 'bundle' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {bundleOffers.map((pkg) => (
              <div
                key={pkg.id}
                className="relative rounded-3xl p-6 sm:p-8 glass-card border border-emerald-500/40 shadow-xl dark:shadow-2xl shadow-emerald-500/10 flex flex-col justify-between group hover:border-emerald-400 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold px-3 py-1 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                      {lang === 'ar' ? pkg.badge_ar : pkg.badge_en}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {pkg.billing_period}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {lang === 'ar' ? pkg.name_ar : pkg.name_en}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed min-h-[44px]">
                    {lang === 'ar' ? pkg.description_ar : pkg.description_en}
                  </p>

                  <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                      {pkg.price_egp.toLocaleString()}
                    </span>
                    <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
                      {t.pricing.currency}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      (~${pkg.price_usd})
                    </span>
                  </div>

                  {/* Key Highlights */}
                  <div className="mt-5 space-y-2 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 text-xs">
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <Smartphone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span className="font-semibold text-slate-900 dark:text-white">{isRtl ? "نظام الموبايل:" : "Mobile System:"}</span>
                      <span className="text-slate-600 dark:text-slate-300">{isRtl ? "تطبيق أندرويد متكامل" : "Full Android Mobile App"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <Database className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                      <span className="font-semibold text-slate-900 dark:text-white">{isRtl ? "قاعدة البيانات:" : "Database:"}</span>
                      <span className="text-slate-600 dark:text-slate-300">{lang === 'ar' ? pkg.database_included_ar : pkg.database_included_en}</span>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {(lang === 'ar' ? pkg.features_ar : pkg.features_en).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    onClick={() => handlePackageWhatsApp(pkg)}
                    className="w-full py-3.5 px-4 rounded-xl text-sm font-extrabold bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 hover:from-emerald-300 hover:to-teal-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t.pricing.choosePlan}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. BESPOKE ENTERPRISE SYSTEMS */}
        {activeTab === 'bespoke' && (
          <div className="max-w-4xl mx-auto">
            {bespokeSystems.map((pkg) => (
              <div
                key={pkg.id}
                className="rounded-3xl p-6 sm:p-8 md:p-10 glass-card border border-purple-500/40 shadow-xl dark:shadow-2xl shadow-purple-500/10 group"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/40">
                    {lang === 'ar' ? pkg.badge_ar : pkg.badge_en}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {pkg.billing_period}
                  </span>
                </div>

                <h3 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {lang === 'ar' ? pkg.name_ar : pkg.name_en}
                </h3>

                <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {lang === 'ar' ? pkg.description_ar : pkg.description_en}
                </p>

                <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 flex items-baseline gap-3">
                  <span className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400">
                    {isRtl ? "يبدأ من:" : "Starts from:"}
                  </span>
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                    {pkg.price_egp.toLocaleString()}
                  </span>
                  <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
                    {t.pricing.currency}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    (~${pkg.price_usd})
                  </span>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {(lang === 'ar' ? pkg.features_ar : pkg.features_en).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                      <Check className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-4">
                  <button
                    onClick={() => handlePackageWhatsApp(pkg)}
                    className="w-full py-4 px-6 rounded-xl text-sm sm:text-base font-extrabold bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 text-white hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-xl shadow-purple-500/25 hover:scale-105 active:scale-95"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{t.pricing.choosePlan}</span>
                    <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. INTERACTIVE PROJECT COST CALCULATOR */}
        <div className="mt-14 sm:mt-16 rounded-3xl p-5 sm:p-8 md:p-10 glass-card border border-slate-200 dark:border-slate-700/80 max-w-4xl mx-auto shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {t.pricing.calculatorTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                {t.pricing.calculatorDesc}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 mb-8">
            
            <label className={`p-3.5 sm:p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              calcWeb ? 'bg-cyan-500/10 dark:bg-cyan-500/15 border-cyan-500/50 text-slate-900 dark:text-white font-bold' : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}>
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={calcWeb} 
                  onChange={(e) => setCalcWeb(e.target.checked)} 
                  className="w-4 h-4 rounded text-cyan-500 focus:ring-0" 
                />
                <span className="text-xs sm:text-sm font-semibold">{t.pricing.optWeb}</span>
              </div>
              <span className="text-xs font-mono text-cyan-700 dark:text-cyan-300 font-bold shrink-0">+3,500 ج.م</span>
            </label>

            <label className={`p-3.5 sm:p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              calcAndroid ? 'bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/50 text-slate-900 dark:text-white font-bold' : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}>
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={calcAndroid} 
                  onChange={(e) => setCalcAndroid(e.target.checked)} 
                  className="w-4 h-4 rounded text-emerald-500 focus:ring-0" 
                />
                <span className="text-xs sm:text-sm font-semibold">{t.pricing.optAndroid}</span>
              </div>
              <span className="text-xs font-mono text-emerald-700 dark:text-emerald-300 font-bold shrink-0">+9,000 ج.م</span>
            </label>

            <label className={`p-3.5 sm:p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              calcPaidDomain ? 'bg-blue-500/10 dark:bg-blue-500/15 border-blue-500/50 text-slate-900 dark:text-white font-bold' : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}>
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={calcPaidDomain} 
                  onChange={(e) => setCalcPaidDomain(e.target.checked)} 
                  className="w-4 h-4 rounded text-blue-500 focus:ring-0" 
                />
                <span className="text-xs sm:text-sm font-semibold">{t.pricing.optDomain}</span>
              </div>
              <span className="text-xs font-mono text-blue-700 dark:text-blue-300 font-bold shrink-0">+1,200 ج.م</span>
            </label>

            <label className={`p-3.5 sm:p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              calcPaidHosting ? 'bg-indigo-500/10 dark:bg-indigo-500/15 border-indigo-500/50 text-slate-900 dark:text-white font-bold' : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}>
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={calcPaidHosting} 
                  onChange={(e) => setCalcPaidHosting(e.target.checked)} 
                  className="w-4 h-4 rounded text-indigo-500 focus:ring-0" 
                />
                <span className="text-xs sm:text-sm font-semibold">{t.pricing.optPaidHost}</span>
              </div>
              <span className="text-xs font-mono text-indigo-700 dark:text-indigo-300 font-bold shrink-0">+2,200 ج.م</span>
            </label>

            <label className={`p-3.5 sm:p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all sm:col-span-2 ${
              calcPaidDb ? 'bg-teal-500/10 dark:bg-teal-500/15 border-teal-500/50 text-slate-900 dark:text-white font-bold' : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}>
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={calcPaidDb} 
                  onChange={(e) => setCalcPaidDb(e.target.checked)} 
                  className="w-4 h-4 rounded text-teal-500 focus:ring-0" 
                />
                <span className="text-xs sm:text-sm font-semibold">{t.pricing.optDb}</span>
              </div>
              <span className="text-xs font-mono text-teal-700 dark:text-teal-300 font-bold shrink-0">+1,900 ج.م</span>
            </label>

          </div>

          {/* Calculator Bottom Summary */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-sm">
            <div className="text-center sm:text-start">
              <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">
                {t.pricing.totalEstimate}
              </span>
              <div className="flex items-baseline justify-center sm:justify-start gap-2 mt-1">
                <span className="text-3xl sm:text-4xl font-black text-cyan-600 dark:text-cyan-400">
                  {calculatedTotal.toLocaleString()}
                </span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  {t.pricing.currency}
                </span>
              </div>
            </div>

            <button
              onClick={handleOrderCalculatedWhatsApp}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-extrabold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-5 h-5 text-slate-950 shrink-0" />
              <span>{t.pricing.orderCalculated}</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
