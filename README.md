# TECVEXA - Advanced Software Solutions & Web Applications
# تيكفيكسا - حلول برمجية متقدمة وتطبيقات ومواقع الويب

[![Deploy to GitHub Pages](https://github.com/AsmaelShowky70/TecVexa-company-/actions/workflows/deploy.yml/badge.svg)](https://github.com/AsmaelShowky70/TecVexa-company-/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live-Demo-cyan?style=for-the-badge&logo=githubpages)](https://asmaelshowky70.github.io/TecVexa-company-/)

الموقع الرسمي لشركة **TECVEXA** الرائدة في تقديم الحلول البرمجية المتكاملة، وتطوير مواقع الويب الديناميكية، وتطبيقات الأندرويد السحابية، والأنظمة المخصصة لإدارة المؤسسات والمصانع.

---

## 🌟 مميزات المشروع (Features)

- ⚡ **أداء فائق السرعة:** مبني باستخدام React 19 و Vite 8 و Tailwind CSS.
- 🌐 **دعم كامل للغتين (العربية / الإنجليزية):** تبديل سلس وذكي للاتجاهات (RTL / LTR).
- 🌓 **دعم الوضعين الفاتح والداكن (Dark & Light Mode).**
- 🛡️ **لوحة تحكم إدارة متكاملة وسرية (Admin Suite):**
  - إدارة وإضافة وتعديل وحذف المشاريع وسابقة الأعمال.
  - إدارة باقات الأسعار والعروض الترويجية.
  - صندوق استلام ومتابعة طلبات العملاء (Inquiries).
  - مزامنة سحابية فورية ومباشرة عبر **Supabase Cloud**.
- 🎬 **فيديو ترويجي تفاعلي ريلز (Promo Reel Modal):** مع تعليق صوتي مصري جذاب وسيناريو تسويقي متكامل.
- 📱 **زر واتساب عائم ذكي وسريع للتواصل المباشر.**
- 🚀 **متوافق بالكامل مع GitHub Pages** ومزود بإعادة توجيه المسارات ولوحة التحكم تلقائياً دون أخطاء 404.

---

## 🔐 طرق فتح لوحة التحكم (Admin Access Methods)

تم تأمين لوحة التحكم بحيث تفتح بعدة طرق مرنة ومضمونة:
1. **الرابط المباشر:** إضافة `#admin` في نهاية الرابط، مثال:
   `https://asmaelshowky70.github.io/TecVexa-company-/#admin`
2. **عبر المسار:** `.../admin` أو `.../admin/` (يتم التحويل تلقائياً للوحة التحكم).
3. **عبر اختصار لوحة المفاتيح السري:**
   اضغط في أي مكان داخل الموقع على:
   `Ctrl + Shift + A` (أو `Cmd + Shift + A`)
4. **الضغط السريع على الشعار (Easter Egg):**
   اضغط 5 مرات متتالية وسريعة على لوجو TECVEXA في القائمة العلوية.

---

## 🛠️ التشغيل والتطوير المحلي (Local Development)

```bash
# 1. تثبيت الاعتماديات
npm install

# 2. تشغيل سيرفر التطوير
npm run dev

# 3. بناء نسخة الإنتاج
npm run build

# 4. النشر على GitHub Pages
npm run deploy
```

---

## 📁 هيكلية المشروع (Project Structure)

```text
├── .github/workflows/deploy.yml # GitHub Actions للنشر التلقائي على Pages
├── public/
│   ├── admin/index.html         # صفحة التوجيه السريع لمسار الأدمن
│   ├── 404.html                 # صفحة المعالجة والتوجيه التلقائي لـ GitHub Pages
│   ├── .nojekyll                # تعطيل Jekyll لضمان رفع كافة ملفات Vite
│   └── logo.jpeg                # لوجو الشركة
├── src/
│   ├── assets/                  # الصور والوسائط
│   ├── components/              # مكونات الواجهة (Hero, Navbar, Admin, etc.)
│   ├── context/                 # سياق اللغة، الثيم، والمصادقة
│   ├── data/                    # البيانات الأولية الافتراضية
│   └── lib/                     # ربط وتكوين Supabase Cloud
└── vite.config.js               # إعدادات Vite ومسارات النشر النسبية
```

---

## 👨‍💻 المطور (Author)

- **م/ إسماعيل شوقي (Asmael Showky)**
- GitHub: [@AsmaelShowky70](https://github.com/AsmaelShowky70)
- WhatsApp: [+201208794479](https://wa.me/201208794479)
- Email: [asmaelmohamed2025@gmail.com](mailto:asmaelmohamed2025@gmail.com)
