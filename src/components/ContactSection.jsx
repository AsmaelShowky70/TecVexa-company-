import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { addInquiry } from '../lib/storage';
import { 
  MessageCircle, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Clock
} from 'lucide-react';

export const ContactSection = () => {
  const { t, isRtl } = useLanguage();
  const [formData, setFormData] = useState({
    client_name: '',
    phone: '',
    email: '',
    service_interest: '',
    budget_range: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.client_name || !formData.phone) return;

    setIsSubmitting(true);
    try {
      await addInquiry(formData);
      setIsSuccess(true);
      setFormData({
        client_name: '',
        phone: '',
        email: '',
        service_interest: '',
        budget_range: '',
        message: ''
      });
      setTimeout(() => setIsSuccess(false), 8000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickWhatsApp = () => {
    const text = encodeURIComponent(
      `مرحباً TECVEXA،\nأرغب في الاستفسار عن خدماتكم التقنية وطلب عرض سعر لمشروعي.`
    );
    window.open(`https://wa.me/201208794479?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="relative py-20 lg:py-28 transition-colors duration-300">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-cyan-700 dark:text-cyan-400 text-xs sm:text-sm font-bold mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>{t.contact.sectionBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {t.contact.title}
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Direct WhatsApp & Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* High-Impact WhatsApp Banner Card */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 dark:from-emerald-950/60 dark:to-slate-900 border-2 border-emerald-500/50 shadow-xl shadow-emerald-500/15 space-y-5 text-white">
              <div className="w-14 h-14 rounded-2xl bg-white/20 dark:bg-emerald-500/20 border border-white/30 dark:border-emerald-500/30 flex items-center justify-center text-white dark:text-emerald-400">
                <MessageCircle className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-white">
                  {t.contact.directWhatsApp}
                </h3>
                <p className="mt-1 text-sm text-emerald-100 dark:text-slate-300">
                  {isRtl 
                    ? "تحدث مباشرة مع المهندس إسماعيل عبر واتساب للرد الفوري ومناقشة تفاصيل مشروعك."
                    : "Connect directly with Lead Architect Ismail on WhatsApp for immediate feedback."}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/20 dark:bg-slate-950/80 border border-white/20 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase font-bold text-emerald-100 dark:text-slate-400 block">
                    {t.contact.phoneLabel}
                  </span>
                  <span className="text-lg font-black text-white dark:text-emerald-400 font-mono" dir="ltr">
                    {t.contact.whatsAppNumber}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white dark:text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 dark:bg-emerald-400 animate-ping"></span>
                  <span>{isRtl ? "متاح الآن" : "Online"}</span>
                </div>
              </div>

              <button
                onClick={handleQuickWhatsApp}
                className="w-full py-4 px-6 rounded-xl font-extrabold text-sm sm:text-base text-slate-950 bg-white hover:bg-slate-100 dark:bg-gradient-to-r dark:from-emerald-400 dark:to-teal-400 shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 hover:scale-105"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600 dark:text-slate-950" />
                <span>{isRtl ? "فتح محادثة واتساب فورية" : "Launch WhatsApp Chat"}</span>
                <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* General Contact Info Cards */}
            <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 space-y-4 text-xs sm:text-sm shadow-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-500 dark:text-slate-400 block">{t.contact.emailLabel}</span>
                  <a href={`mailto:${t.contact.emailAddress}`} className="text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 font-mono font-semibold">
                    {t.contact.emailAddress}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-slate-200 dark:border-slate-800/80">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-500 dark:text-slate-400 block">{t.contact.locationLabel}</span>
                  <span className="text-slate-700 dark:text-slate-300">{t.contact.locationVal}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-slate-200 dark:border-slate-800/80">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-500 dark:text-slate-400 block">{isRtl ? "ساعات العمل والاستجابة:" : "Working Hours & Response:"}</span>
                  <span className="text-slate-700 dark:text-slate-300">{isRtl ? "على مدار الساعة 24/7 طوال الأسبوع" : "24/7 Priority Availability"}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Project Brief Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl glass-card border border-slate-200 dark:border-slate-700 shadow-xl relative">
              
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                {t.contact.formTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6">
                {isRtl 
                  ? "املأ البيانات وسيقوم فريقنا بدراسة متطلباتك وموافاتك بالتكلفة والجدول الزمني."
                  : "Submit your details and our team will analyze your requirements with a formal proposal."}
              </p>

              {isSuccess && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-800 dark:text-emerald-300 text-sm flex items-center gap-3 animate-fade-in font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{t.contact.successMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                      {isRtl ? "الاسم الكريم *" : "Full Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.client_name}
                      onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                      placeholder={t.contact.namePlaceholder}
                      className="w-full py-3 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                      {isRtl ? "رقم الهاتف / واتساب *" : "Phone / WhatsApp *"}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t.contact.phonePlaceholder}
                      className="w-full py-3 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                      {isRtl ? "البريد الإلكتروني" : "Email Address"}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.contact.emailPlaceholder}
                      className="w-full py-3 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                      {isRtl ? "الباقة أو الخدمة المطلوبة" : "Desired Service / Tier"}
                    </label>
                    <select
                      value={formData.service_interest}
                      onChange={(e) => setFormData({ ...formData, service_interest: e.target.value })}
                      className="w-full py-3 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 shadow-sm"
                    >
                      <option value="">{t.contact.serviceSelectPlaceholder}</option>
                      <option value="موقع ويب ديناميكي (باقة Starter)">{t.contact.serviceOption1}</option>
                      <option value="موقع ويب ديناميكي (باقة Pro Business)">{t.contact.serviceOption2}</option>
                      <option value="موقع ويب ديناميكي (باقة Enterprise VIP)">{t.contact.serviceOption3}</option>
                      <option value="عرض موقع ويب + تطبيق أندرويد (Combo)">{t.contact.serviceOption4}</option>
                      <option value="تطبيق أندرويد مستقل">{t.contact.serviceOption5}</option>
                      <option value="سيستم ومنصة مخصصة للشركة (Bespoke ERP)">{t.contact.serviceOption6}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    {isRtl ? "تفاصيل ورؤية المشروع *" : "Project Details & Scope *"}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full py-3 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 resize-none shadow-sm"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl font-extrabold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:opacity-95 shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>{t.contact.sending}</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-slate-950" />
                      <span>{t.contact.submitBtn}</span>
                    </>
                  )}
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
