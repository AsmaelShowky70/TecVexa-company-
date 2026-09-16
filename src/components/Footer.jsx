import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Mail, 
  MessageCircle, 
  FileText,
  ShieldCheck,
  Zap,
  Lock
} from 'lucide-react';
import { GithubIcon } from './Icons';
import logoImg from '../assets/logo.jpeg';

export const Footer = ({ onOpenAdmin }) => {
  const { t, isRtl } = useLanguage();

  return (
    <footer className="w-full bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 pt-16 pb-12 relative overflow-hidden transition-colors duration-300">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-slate-200 dark:border-slate-800/80">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-cyan-500 to-emerald-400">
                <img src={logoImg} alt="TECVEXA Logo" className="w-full h-full object-cover rounded-[10px]" />
              </div>
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-wider">
                TECVEXA
              </span>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              {isRtl 
                ? "شركة متخصصة في هندسة وتطوير مواقع الويب الديناميكية مع لوحات التحكم، وتطبيقات الأندرويد السريعة، والأنظمة السحابية المخصصة للمؤسسات."
                : "Engineering dynamic web systems with intuitive control dashboards, Android mobile apps, and custom enterprise cloud infrastructure."}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/AsmaelShowky70"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white shadow-sm transition-all"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/201208794479"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 shadow-sm transition-all"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href="mailto:asmaelmohamed2025@gmail.com"
                className="w-9 h-9 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 shadow-sm transition-all"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                href="https://asmaelshowky70.github.io/portfolio/cv.html"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 shadow-sm transition-all"
                title="Online CV"
              >
                <FileText className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3 text-xs sm:text-sm">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {isRtl ? "روابط سريعة" : "Quick Links"}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  {t.nav.portfolio}
                </a>
              </li>
              <li>
                <a href="#about" className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Packages */}
          <div className="space-y-3 text-xs sm:text-sm">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {isRtl ? "الباقات والخدمات" : "Services & Plans"}
            </h4>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li>{isRtl ? "مواقع الويب الديناميكية (3 مستويات)" : "Dynamic Websites (3 Tiers)"}</li>
              <li>{isRtl ? "تطبيقات الأندرويد المتزامنة" : "Synced Android Applications"}</li>
              <li>{isRtl ? "لوحات التحكم وقواعد البيانات" : "Admin Panels & Cloud DBs"}</li>
              <li>{isRtl ? "أنظمة المؤسسات وإدارة المصانع" : "Industrial QMS & Factory HR"}</li>
            </ul>
          </div>

          {/* Col 4: Corporate Guarantee & Trust */}
          <div className="space-y-3 text-xs sm:text-sm">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {isRtl ? "ضمان الجودة" : "Quality Assurance"}
            </h4>
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs shadow-sm">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>{isRtl ? "جاهزية 99.9% للخوادم" : "99.9% Uptime Guarantee"}</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold">
                <Zap className="w-4 h-4 shrink-0" />
                <span>{isRtl ? "دعم وتطوير مستمر 24/7" : "24/7 Dedicated Support"}</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              {isRtl 
                ? "كود برمجي نظيف ومعايير حماية مشددة لبيانات شركتك."
                : "Clean architecture and hardened security protocols for enterprise assets."}
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>
            {t.footer.rights}
          </p>
          <div className="flex items-center gap-1.5">
            <span>{t.footer.designedBy}</span>
            <a 
              href="https://github.com/AsmaelShowky70" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline"
            >
              {t.footer.developerName}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
