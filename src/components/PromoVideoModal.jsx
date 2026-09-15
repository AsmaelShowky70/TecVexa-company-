import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  CheckCircle2, 
  Monitor, 
  Smartphone, 
  Database, 
  ShieldCheck, 
  ArrowRight,
  Mic,
  MessageSquare
} from 'lucide-react';
import logoImg from '../assets/logo.jpeg';

export const PromoVideoModal = ({ isOpen, onClose }) => {
  const { t, isRtl } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeScene, setActiveScene] = useState(0);
  const [isMuted, setIsMuted] = useState(false); // Default unmuted so client hears Egyptian voiceover
  const [progress, setProgress] = useState(0);
  const audioCtxRef = useRef(null);

  const scenes = [
    {
      id: 0,
      badge: "المرحلة الأولى • الفكرة والتصميم",
      badgeEn: "Phase 1 • Vision & UI/UX Design",
      titleAr: "تصميم واجهات تسحر الأنظار وتضاعف تفاعل عملائك",
      titleEn: "Breathtaking UI/UX Crafted for Maximum Conversion",
      descAr: "نبدأ بدراسة هوية شركتك وتحويلها إلى واجهات تفاعلية أنيقة تجمع بين أحدث صيحات التصميم والسرعة الفائقة.",
      descEn: "We translate your brand vision into responsive, ultra-fast interfaces optimized for seamless interaction.",
      egyptianVoiceScript: "أهلاً بيك في تيكفيكسا! فكرتك مش هتفضل مجرد فكرة.. بنحولها لمنصة ويب عصرية وتطبيق يكسر الدنيا ويزود مبيعاتك!",
      icon: Monitor,
      accent: "from-cyan-500 to-blue-600",
      codeSnippet: `const platform = new TecvexaSite({\n  brand: 'TECVEXA',\n  ui: 'Modern UI/UX',\n  speed: 'Ultra Fast',\n  status: 'Ready to Launch'\n});`
    },
    {
      id: 1,
      badge: "المرحلة الثانية • القوة والتحكم",
      badgeEn: "Phase 2 • Engine & Live Admin Panel",
      titleAr: "لوحة تحكم ذكية وقاعدة بيانات سحابية بين يديك",
      titleEn: "Intelligent Custom Dashboard & Real-Time Cloud DB",
      descAr: "تحكم في كل تفصيلة: أسعار، منتجات، عروض، وموظفين بضغطة زرار واحدة ومن أي مكان.",
      descEn: "Govern your entire enterprise: update prices, projects, inventory, and metrics from any browser.",
      egyptianVoiceScript: "لوحة تحكم ذكية بين إيديك.. تتحكم في كل تفصيلة في شغلك: منتجات، أسعار، وموظفين بضغطة زرار واحدة ومن أي مكان!",
      icon: Database,
      accent: "from-emerald-500 to-teal-600",
      codeSnippet: `// Live Sync with Supabase Cloud DB\nawait supabase.from('services')\n  .update({ active: true })\n  .eq('status', 'online');\nconsole.log('Synchronized in 10ms!');`
    },
    {
      id: 2,
      badge: "المرحلة الثالثة • الويب + تطبيق الأندرويد",
      badgeEn: "Phase 3 • Cross-Platform Ecosystem",
      titleAr: "تزامن فوري بين موقعك وتطبيق الأندرويد",
      titleEn: "Instant Synchronization Between Web & Android App",
      descAr: "بيانات موحدة وقاعدة بيانات واحدة: أي تعديل في الموقع يظهر فوراً في هواتف عملائك على تطبيق الأندرويد.",
      descEn: "A single unified cloud backend: edits on the web dashboard reflect instantly inside your Android app.",
      egyptianVoiceScript: "موقعك وتطبيق الأندرويد شغالين مع بعض زي الساعة.. قاعدة بيانات واحدة وأي تعديل هنا يسمّع هناك في ثانية!",
      icon: Smartphone,
      accent: "from-indigo-500 to-purple-600",
      codeSnippet: `// Unified Push Notification Pipeline\nawait AndroidNotificationService.broadcast({\n  title: 'عرض جديد من TECVEXA!',\n  badge: 'Live Sync Active'\n});`
    },
    {
      id: 3,
      badge: "المرحلة الرابعة • الأمان والريادة",
      badgeEn: "Phase 4 • Cloud Security & Growth",
      titleAr: "سيرفرات سحابية فائقة السرعة وضمان تشغيل 99.9%",
      titleEn: "Hardened Enterprise Security & 99.9% Uptime SLA",
      descAr: "أمان متقدم، حماية ضد الاختراق، ونسخ احتياطي يومي يضمن راحة بالك ونمو أعمالك بلا توقف.",
      descEn: "SSL encryption, automated backups, and dedicated SLA support keeping your enterprise operating 24/7.",
      egyptianVoiceScript: "سرعة خارقة وأمان ملوش مثيل.. خوادم سحابية شغالة 24 ساعة بدون انقطاع، ودعم فني جنبك خطوة بخطوة. كلمنا دلوقتي وخلينا نبدأ!",
      icon: ShieldCheck,
      accent: "from-amber-500 to-orange-600",
      codeSnippet: `// Security & Cloud Uptime Radar\nconst securityRadar = {\n  uptime: '99.98%',\n  ssl: 'Active TLS 1.3',\n  backup: 'Daily Cloud Vault'\n};`
    }
  ];

  // Speak narration in Egyptian Arabic using Web Speech API
  const speakSceneNarration = (sceneIndex) => {
    if (isMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    
    try {
      window.speechSynthesis.cancel(); // Stop prior narration

      const scene = scenes[sceneIndex];
      const textToSpeak = scene.egyptianVoiceScript;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.98;
      utterance.pitch = 1.05;

      // Find Arabic Egyptian voice or any Arabic voice
      const voices = window.speechSynthesis.getVoices();
      const arabicVoice = voices.find(v => v.lang === 'ar-EG' || v.lang === 'ar_EG') ||
                          voices.find(v => v.lang.startsWith('ar'));
      if (arabicVoice) {
        utterance.voice = arabicVoice;
        utterance.lang = arabicVoice.lang;
      } else {
        utterance.lang = 'ar-EG';
      }

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis notice:', e);
    }
  };

  // Play subtle chime
  const playTechTone = (freq = 440) => {
    if (isMuted) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {}
  };

  // Trigger speech when modal opens or scene changes
  useEffect(() => {
    if (isOpen && isPlaying && !isMuted) {
      speakSceneNarration(activeScene);
    } else if (!isOpen || isMuted) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  }, [isOpen, activeScene, isMuted]);

  // Video Reel timer logic
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setActiveScene(curr => {
            const next = (curr + 1) % scenes.length;
            playTechTone(380 + next * 100);
            return next;
          });
          return 0;
        }
        return prev + 1.25;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  // Handle modal close
  const handleClose = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    onClose();
  };

  if (!isOpen) return null;

  const current = scenes[activeScene];
  const CurrentIcon = current.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-2xl animate-fade-in">
      <div className="relative w-full max-w-5xl rounded-2xl sm:rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl shadow-cyan-500/20 overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-cyan-500 to-emerald-400">
              <img src={logoImg} alt="TECVEXA" className="w-full h-full object-cover rounded-[10px]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  {t.promo.modalTitle}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <Mic className="w-3 h-3 text-emerald-400 animate-pulse" />
                  <span>صوت باللهجة المصرية</span>
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {t.promo.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const nextMuted = !isMuted;
                setIsMuted(nextMuted);
                if (!nextMuted) {
                  speakSceneNarration(activeScene);
                } else {
                  window.speechSynthesis?.cancel();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-all"
              title={isMuted ? "تشغيل الصوت" : "كتم الصوت"}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-slate-400" />
                  <span className="hidden sm:inline text-[11px]">صوت مكتوم</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span className="hidden sm:inline text-[11px] text-emerald-300">الصوت شغال</span>
                </>
              )}
            </button>

            <button
              onClick={handleClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-all"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Canvas Showcase Screen */}
        <div className="relative flex-1 min-h-[380px] sm:min-h-[440px] bg-slate-950 overflow-hidden flex flex-col justify-between p-6 sm:p-10">
          
          {/* Animated Background Mesh & Particles */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.18),rgba(255,255,255,0))] pointer-events-none"></div>
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

          {/* Scene Header & Badge */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-800/90 border border-slate-700 text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isRtl ? current.badge : current.badgeEn}</span>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span>4K PROMO REEL • مصري</span>
            </div>
          </div>

          {/* Dynamic Interactive Stage per Scene */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto py-2">
            
            {/* Left Narrative Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-xl">
                <CurrentIcon className="w-8 h-8 text-cyan-400" />
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                {isRtl ? current.titleAr : current.titleEn}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                {isRtl ? current.descAr : current.descEn}
              </p>

              {/* Egyptian Arabic Dialect Speech Bubble / Subtitle */}
              <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-200 shadow-xl flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-400 uppercase block mb-1">
                    🎙️ التعليق الصوتي المصري المسموع:
                  </span>
                  <p className="text-sm font-semibold text-white leading-relaxed">
                    "{current.egyptianVoiceScript}"
                  </p>
                </div>
              </div>
            </div>

            {/* Right Screen: Animated Code / Visualizer */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-slate-950/90 border border-slate-800 shadow-2xl p-4 overflow-hidden relative">
                
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    tecvexa-promo-demo.ts
                  </span>
                </div>

                <pre className="text-xs font-mono text-cyan-300 leading-relaxed overflow-x-auto p-2 bg-slate-900/60 rounded-lg">
                  <code>{current.codeSnippet}</code>
                </pre>

                {/* Live Activity Metric Card */}
                <div className="mt-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
                    <span className="text-xs font-medium text-slate-300">
                      {isRtl ? "معدل سرعة التطبيق" : "Engine Response"}
                    </span>
                  </div>
                  <span className="text-xs font-black text-emerald-400 font-mono">
                    ⚡ 0.04s Ultra Fast
                  </span>
                </div>

              </div>
            </div>

          </div>

          {/* Video Timeline & Scene Controls */}
          <div className="relative z-10 pt-4 border-t border-slate-800/80">
            {/* Progress line */}
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-3">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/30 transition-all"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
                  {scenes.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setActiveScene(idx);
                        setProgress(0);
                        playTechTone(380 + idx * 100);
                        speakSceneNarration(idx);
                      }}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                        activeScene === idx 
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md' 
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Call to WhatsApp */}
              <a
                href="https://wa.me/201208794479?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20TECVEXA%D8%8C%20%D8%B4%D8%A7%D9%87%D8%AF%D8%AA%20%D8%A7%D9%84%D9%81%D9%8A%D8%AF%D9%8A%D9%88%20%D8%A7%D9%84%D8%AF%D8%B9%D8%A7%D8%A6%D9%8A%20%D9%88%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%A8%D8%AF%D8%A1%20%D9%81%D9%8A%20%D9%85%D8%B4%D8%B1%D9%88%D8%B9%D9%8A%20%D9%85%D8%B9%D9%83%D9%85"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.speechSynthesis?.cancel()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:from-emerald-400 hover:to-teal-400 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
              >
                <span>{t.promo.ctaAction}</span>
                <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
              </a>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
