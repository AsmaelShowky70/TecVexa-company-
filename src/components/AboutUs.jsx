import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sparkles, 
  Code2, 
  Palette, 
  ShieldCheck, 
  Clock
} from 'lucide-react';
import logoImg from '../assets/logo.jpeg';

export const AboutUs = () => {
  const { t, isRtl } = useLanguage();

  const pillars = [
    {
      icon: Code2,
      title: t.about.pillar1Title,
      desc: t.about.pillar1Desc,
      accent: 'border-cyan-500/40 text-cyan-600 dark:text-cyan-400'
    },
    {
      icon: Palette,
      title: t.about.pillar2Title,
      desc: t.about.pillar2Desc,
      accent: 'border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
    },
    {
      icon: ShieldCheck,
      title: t.about.pillar3Title,
      desc: t.about.pillar3Desc,
      accent: 'border-indigo-500/40 text-indigo-600 dark:text-indigo-400'
    },
    {
      icon: Clock,
      title: t.about.pillar4Title,
      desc: t.about.pillar4Desc,
      accent: 'border-amber-500/40 text-amber-600 dark:text-amber-400'
    },
  ];

  const technologies = [
    "React 19", "Vite", "Tailwind CSS", "Flutter", "Dart", 
    "Supabase", "PostgreSQL", "ASP.NET Core", "C#", "Entity Framework", 
    "RESTful APIs", "JWT Security", "Git & GitHub", "Cloud CDNs"
  ];

  return (
    <section id="about" className="relative py-20 lg:py-28 bg-slate-100/60 dark:bg-slate-950/40 border-t border-slate-200 dark:border-slate-800/80 transition-colors duration-300">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-cyan-700 dark:text-cyan-400 text-xs sm:text-sm font-bold shadow-sm">
              <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>{t.about.sectionBadge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight">
              {t.about.title}
            </h2>

            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              {t.about.paragraph1}
            </p>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              {t.about.paragraph2}
            </p>

            {/* Tech Badges Cloud */}
            <div className="pt-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-3">
                {isRtl ? "الترسانة التقنية المعتمدة:" : "Approved Technology Stack:"}
              </span>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-cyan-700 dark:text-cyan-300 shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Brand Badge & Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-8 glass-card border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden group">
              <div className="absolute -top-20 -right-20 w-52 h-52 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700"></div>
              
              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 rounded-2xl overflow-hidden p-1 bg-gradient-to-tr from-cyan-400 via-indigo-500 to-emerald-400 shadow-xl shadow-cyan-500/20">
                  <img src={logoImg} alt="TECVEXA Logo" className="w-full h-full object-cover rounded-xl" />
                </div>

                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">TECVEXA</h3>
                  <p className="text-xs text-cyan-600 dark:text-cyan-400 font-mono tracking-widest mt-1 uppercase font-bold">
                    Advanced Tech Platforms
                  </p>
                </div>

                <div className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">{isRtl ? "المقر الرئيسي:" : "Headquarters:"}</span>
                    <span className="font-bold text-slate-900 dark:text-white">القاهرة، مصر (عالمياً)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">{isRtl ? "الخبرة الميدانية:" : "Field Experience:"}</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">10 أنظمة ومشاريع كبرى</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">{isRtl ? "سرعة التسليم:" : "Delivery Velocity:"}</span>
                    <span className="font-bold text-cyan-600 dark:text-cyan-400">قياسية ومضمونة 100%</span>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {isRtl 
                      ? "نسخر أحدث التقنيات لنضمن لشركتك انطلاقة رقمية قوية وتجربة إدارة ذكية بلا تعقيد." 
                      : "We leverage bleeding-edge technologies to guarantee your enterprise an unstoppable digital launch."}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pil, idx) => {
            const IconComponent = pil.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 transition-all group shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {pil.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {pil.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
