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
  Sliders,
  MessageCircle
} from 'lucide-react';

export const ServicesPricing = ({ onSelectPackage }) => {
  const { t, lang, isRtl } = useLanguage();
  const [packages, setPackages] = useState([]);
  const [activeTab, setActiveTab] = useState('website_tier');

  // Interactive Project Scope Builder State
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

  // Build list of selected specifications for WhatsApp request
  const getSelectedModules = () => {
    const items = [];
    if (calcWeb) items.push(lang === 'ar' ? 'موقع ويب ديناميكي مع لوحة تحكم' : 'Dynamic Website with Admin Dashboard');
    if (calcAndroid) items.push(lang === 'ar' ? 'تطبيق أندرويد متزامن' : 'Synchronized Android Mobile App');
    if (calcPaidDomain) items.push(lang === 'ar' ? 'دومين رسمي مخصص (.com)' : 'Custom Official Domain (.com)');
    if (calcPaidHosting) items.push(lang === 'ar' ? 'استضافة سحابية فائقة السرعة' : 'High-Speed Cloud Hosting Server');
    if (calcPaidDb) items.push(lang === 'ar' ? 'قاعدة بيانات سحابية متقدمة' : 'Production Cloud Database Engine');
    return items;
  };

  const handleOrderCalculatedWhatsApp = () => {
    const items = getSelectedModules();
    const msg = encodeURIComponent(
      lang === 'ar'
        ? `مرحباً شركة TECVEXA،\nقمت بتحديد مواصفات مشروعي عبر الموقع:\n- المكونات المطلوبة:\n• ${items.join('\n• ')}\n\nأرغب في الحصول على عرض السعر المناسب وتحديد موعد للبدء في التنفيذ.`
        : `Hello TECVEXA,\nI configured my desired project specifications:\n- Requirements:\n• ${items.join('\n• ')}\n\nI would like to receive a tailored quotation to get started.`
    );
    window.open(`https://wa.me/201208794479?text=${msg}`, '_blank');
  };

  const handlePackageWhatsApp = (pkg) => {
    const name = lang === 'ar' ? pkg.name_ar : pkg.name_en;
    const msg = encodeURIComponent(
      lang === 'ar'
        ? `مرحباً TECVEXA،\nأرغب في الاستفسار عن باقة: ${name}\nومعرفة تفاصيل وخيارات التسعير الأنسب لمتطلبات مشروعي.\nبرجاء موافاتي بالتفاصيل والخطوات للبدء.`
        : `Hello TECVEXA,\nI would like to inquire about the plan: ${name}\nand receive a custom quote tailored to my project requirements.\nPlease let me know the next steps to start.`
    );
    window.open(`https://wa.me/201208794479?text=${msg}`, '_blank');
  };

  const selectedModules = getSelectedModules();

  return (
    <section id="services" className="relative py-20 lg:py-28 bg-slate-100/60 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800/80 transition-colors duration-300">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-cyan-700 dark:text-cyan-400 text-xs sm:text-sm font-bold mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>{lang === 'ar' ? 'خدمات وحلول TECVEXA المتكاملة' : 'TECVEXA Digital Solutions & Plans'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {lang === 'ar' ? 'اختر الباقة المناسبة لطموح مشروعك' : 'Select the Ideal Plan for Your Ambition'}
          </h2>
          <p className="mt-4 text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
            {lang === 'ar' 
              ? 'نقدم حلولاً برمجية مرنة ومخصصة بالكامل. تواصل معنا لتحديد العرض الأنسب والأكثر توفيراً لمتطلبات عملك.'
              : 'Tailored dynamic platforms engineered for scale. Contact our team to receive a custom quotation best suited for your goals.'}
          </p>

          {/* Navigation Category Tabs */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg max-w-full overflow-x-auto gap-1.5">
            <button
              onClick={() => setActiveTab('website_tier')}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === 'website_tier'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>{lang === 'ar' ? 'المواقع الديناميكية' : 'Dynamic Websites'}</span>
            </button>
            <button
              onClick={() => setActiveTab('bundle')}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === 'bundle'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>{lang === 'ar' ? 'باقات العروض الخاصة (Combo)' : 'Special Bundles (Combo)'}</span>
            </button>
            <button
              onClick={() => setActiveTab('bespoke')}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === 'bespoke'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{lang === 'ar' ? 'الأنظمة المخصصة (Bespoke)' : 'Bespoke Enterprise'}</span>
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
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-bold">
                      {pkg.billing_period}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {lang === 'ar' ? pkg.name_ar : pkg.name_en}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium min-h-[44px] leading-relaxed">
                    {lang === 'ar' ? pkg.description_ar : pkg.description_en}
                  </p>

                  {/* Pricing Callout without rigid numbers */}
                  <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 block">
                        {lang === 'ar' ? 'خطة التسعير:' : 'Pricing:'}
                      </span>
                      <span className="text-base sm:text-lg font-black text-cyan-600 dark:text-cyan-400">
                        {lang === 'ar' ? 'حسب متطلبات مشروعك' : 'Custom Quote on Request'}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 shrink-0">
                      {lang === 'ar' ? 'مرونة في الدفع' : 'Flexible Terms'}
                    </span>
                  </div>

                  {/* Highlights Grid (Domain, Host, DB, Dashboard) */}
                  <div className="mt-5 space-y-2.5 p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs">
                    <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                      <Globe className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                      <span className="font-bold text-slate-900 dark:text-white">
                        {t.pricing.domainIncluded}
                      </span>
                      <span className="text-slate-700 dark:text-slate-300 font-medium truncate">
                        {lang === 'ar' ? pkg.domain_included_ar : pkg.domain_included_en}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                      <Server className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span className="font-bold text-slate-900 dark:text-white">
                        {t.pricing.hostingIncluded}
                      </span>
                      <span className="text-slate-700 dark:text-slate-300 font-medium truncate">
                        {lang === 'ar' ? pkg.hosting_included_ar : pkg.hosting_included_en}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                      <Database className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                      <span className="font-bold text-slate-900 dark:text-white">
                        {t.pricing.databaseIncluded}
                      </span>
                      <span className="text-slate-700 dark:text-slate-300 font-medium truncate">
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
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
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
                    className={`w-full py-3.5 px-4 rounded-xl text-sm font-extrabold transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
                      pkg.is_popular
                        ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 hover:from-cyan-300 hover:to-emerald-300 shadow-cyan-500/25 hover:scale-105 active:scale-95'
                        : 'bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white border border-slate-700/60 active:scale-95'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'طلب عرض سعر للباقة' : 'Request Package Quote'}</span>
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
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-bold">
                      {pkg.billing_period}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {lang === 'ar' ? pkg.name_ar : pkg.name_en}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed min-h-[44px]">
                    {lang === 'ar' ? pkg.description_ar : pkg.description_en}
                  </p>

                  {/* Pricing Callout */}
                  <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 block">
                        {lang === 'ar' ? 'عرض السعر:' : 'Bundle Offer:'}
                      </span>
                      <span className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400">
                        {lang === 'ar' ? 'سعر خاص ومخفض للباقة المجمعة' : 'Special Discounted Bundle Quote'}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 shrink-0">
                      {lang === 'ar' ? 'توفير حتى 35%' : 'Save up to 35%'}
                    </span>
                  </div>

                  {/* Key Highlights */}
                  <div className="mt-5 space-y-2.5 p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs">
                    <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                      <Smartphone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span className="font-bold text-slate-900 dark:text-white">{isRtl ? "نظام الموبايل:" : "Mobile System:"}</span>
                      <span className="text-slate-700 dark:text-slate-300 font-medium">{isRtl ? "تطبيق أندرويد متكامل" : "Full Android Mobile App"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                      <Database className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                      <span className="font-bold text-slate-900 dark:text-white">{isRtl ? "قاعدة البيانات:" : "Database:"}</span>
                      <span className="text-slate-700 dark:text-slate-300 font-medium">{lang === 'ar' ? pkg.database_included_ar : pkg.database_included_en}</span>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {(lang === 'ar' ? pkg.features_ar : pkg.features_en).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    onClick={() => handlePackageWhatsApp(pkg)}
                    className="w-full py-3.5 px-4 rounded-xl text-sm font-extrabold bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 hover:from-emerald-300 hover:to-teal-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'طلب عرض سعر للعرض المجمع' : 'Inquire Bundle Pricing'}</span>
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
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-bold">
                    {pkg.billing_period}
                  </span>
                </div>

                <h3 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {lang === 'ar' ? pkg.name_ar : pkg.name_en}
                </h3>

                <p className="mt-3 text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  {lang === 'ar' ? pkg.description_ar : pkg.description_en}
                </p>

                {/* Pricing Callout */}
                <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 block">
                      {lang === 'ar' ? 'تقدير التكلفة:' : 'Cost Estimation:'}
                    </span>
                    <span className="text-base sm:text-xl font-black text-purple-600 dark:text-purple-400">
                      {lang === 'ar' ? 'دراسة مخصصة دقيقة وفق حجم مؤسستك' : 'Tailored Scope for Enterprise Architecture'}
                    </span>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-lg bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30 shrink-0">
                    {lang === 'ar' ? 'حلول خاصة 100%' : '100% Bespoke'}
                  </span>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {(lang === 'ar' ? pkg.features_ar : pkg.features_en).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium p-3 rounded-xl bg-slate-100/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                      <Check className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-4">
                  <button
                    onClick={() => handlePackageWhatsApp(pkg)}
                    className="w-full py-4 px-6 rounded-xl text-sm sm:text-base font-extrabold bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 text-white hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-xl shadow-purple-500/25 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{lang === 'ar' ? 'طلب استشارة وتسعير المنظومة' : 'Request Architecture & Quote'}</span>
                    <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. INTERACTIVE PROJECT SCOPE BUILDER (Replaced fixed calculator) */}
        <div className="mt-14 sm:mt-16 rounded-3xl p-5 sm:p-8 md:p-10 glass-card border border-slate-200 dark:border-slate-700/80 max-w-4xl mx-auto shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {lang === 'ar' ? 'محدد مواصفات المشروع المخصص' : 'Custom Project Scope Builder'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                {lang === 'ar' 
                  ? 'اختر المكونات البرمجية التي تحتاجها وسنقوم بإعداد أفضل عرض سعر مخصص لمشروعك فوراً'
                  : 'Select the modules you need and we will prepare your tailor-made quote directly'}
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
                  className="w-4 h-4 rounded text-cyan-500 focus:ring-0 cursor-pointer" 
                />
                <span className="text-xs sm:text-sm font-semibold">{lang === 'ar' ? 'موقع ويب تفاعلي وديناميكي' : 'Dynamic Interactive Website'}</span>
              </div>
              <span className="text-xs font-mono text-cyan-700 dark:text-cyan-300 font-bold shrink-0">{lang === 'ar' ? 'شامل لوحة التحكم' : 'Includes Admin Panel'}</span>
            </label>

            <label className={`p-3.5 sm:p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              calcAndroid ? 'bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/50 text-slate-900 dark:text-white font-bold' : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}>
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={calcAndroid} 
                  onChange={(e) => setCalcAndroid(e.target.checked)} 
                  className="w-4 h-4 rounded text-emerald-500 focus:ring-0 cursor-pointer" 
                />
                <span className="text-xs sm:text-sm font-semibold">{lang === 'ar' ? 'تطبيق أندرويد للهواتف الذكية' : 'Android Mobile Application'}</span>
              </div>
              <span className="text-xs font-mono text-emerald-700 dark:text-emerald-300 font-bold shrink-0">{lang === 'ar' ? 'تزامن مباشر' : 'Live Sync'}</span>
            </label>

            <label className={`p-3.5 sm:p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              calcPaidDomain ? 'bg-blue-500/10 dark:bg-blue-500/15 border-blue-500/50 text-slate-900 dark:text-white font-bold' : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}>
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={calcPaidDomain} 
                  onChange={(e) => setCalcPaidDomain(e.target.checked)} 
                  className="w-4 h-4 rounded text-blue-500 focus:ring-0 cursor-pointer" 
                />
                <span className="text-xs sm:text-sm font-semibold">{lang === 'ar' ? 'دومين رسمي مخصص (.com / .net)' : 'Official Domain (.com / .net)'}</span>
              </div>
              <span className="text-xs font-mono text-blue-700 dark:text-blue-300 font-bold shrink-0">{lang === 'ar' ? 'باسم شركتك' : 'Brand Name'}</span>
            </label>

            <label className={`p-3.5 sm:p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              calcPaidHosting ? 'bg-indigo-500/10 dark:bg-indigo-500/15 border-indigo-500/50 text-slate-900 dark:text-white font-bold' : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}>
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={calcPaidHosting} 
                  onChange={(e) => setCalcPaidHosting(e.target.checked)} 
                  className="w-4 h-4 rounded text-indigo-500 focus:ring-0 cursor-pointer" 
                />
                <span className="text-xs sm:text-sm font-semibold">{lang === 'ar' ? 'استضافة سحابية فائقة السرعة' : 'High-Speed Cloud Hosting'}</span>
              </div>
              <span className="text-xs font-mono text-indigo-700 dark:text-indigo-300 font-bold shrink-0">99.9% Uptime</span>
            </label>

            <label className={`p-3.5 sm:p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all sm:col-span-2 ${
              calcPaidDb ? 'bg-teal-500/10 dark:bg-teal-500/15 border-teal-500/50 text-slate-900 dark:text-white font-bold' : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}>
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={calcPaidDb} 
                  onChange={(e) => setCalcPaidDb(e.target.checked)} 
                  className="w-4 h-4 rounded text-teal-500 focus:ring-0 cursor-pointer" 
                />
                <span className="text-xs sm:text-sm font-semibold">{lang === 'ar' ? 'قاعدة بيانات سحابية متقدمة وآمنة' : 'Advanced Cloud Database Engine'}</span>
              </div>
              <span className="text-xs font-mono text-teal-700 dark:text-teal-300 font-bold shrink-0">{lang === 'ar' ? 'حماية ونسخ احتياطي' : 'Protected & Backed up'}</span>
            </label>

          </div>

          {/* Builder Bottom Summary */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-sm">
            <div className="text-center sm:text-start">
              <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">
                {lang === 'ar' ? 'ملخص المواصفات المطلوبة لمشروعك:' : 'Selected Project Scope:'}
              </span>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 mt-2">
                {selectedModules.length > 0 ? (
                  selectedModules.map((item, idx) => (
                    <span key={idx} className="text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-200 border border-cyan-500/30">
                      {item}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500">{lang === 'ar' ? 'يرجى تحديد عنصر واحد على الأقل' : 'Please select at least one module'}</span>
                )}
              </div>
            </div>

            <button
              onClick={handleOrderCalculatedWhatsApp}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-extrabold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 text-slate-950 shrink-0" />
              <span>{lang === 'ar' ? 'طلب تسعير هذه المواصفات عبر واتساب' : 'Request Quote for Scope'}</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
