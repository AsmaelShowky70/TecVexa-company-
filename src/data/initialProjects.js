// Comprehensive catalogue of Ismail Mohamed's 10 major portfolio projects for TECVEXA

export const INITIAL_PROJECTS = [
  {
    id: "proj-01-qms",
    title_ar: "منصة مراقبة وإدارة الجودة الصناعية (QMS)",
    title_en: "Natural Snacks — Quality Control System (QMS)",
    category: "enterprise",
    type_ar: "تطبيق ويب صناعي / إدارة منشآت غذائية",
    type_en: "Enterprise / Industrial Web Application",
    tech_stack: ["React 19", "Vite", "Tailwind CSS", "Lucide Icons", "JavaScript (ES6+)"],
    live_url: "https://asmaelshowky70.github.io/Quality-Control-Natural-snacks/",
    repo_url: "https://github.com/AsmaelShowky70/Quality-Control-Natural-snacks.git",
    image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    description_ar: "منصة صناعية متكاملة لإدارة ومراقبة الجودة (QMS) لمصانع الأغذية (Natural Snacks). تتابع مراحل خطوط الإنتاج الـ 15 للبثق (Extruder)، وحساب مؤشرات الكفاءة التشغيلية (OEE) بشكل لحظي، وتسجيل إنذارات الانحرافات وحالات عدم المطابقة (NCR)، ومؤشرات جودة التعبئة والتغليف.",
    description_en: "A comprehensive real-time industrial Quality Management and Assurance (QMS) dashboard developed for food manufacturing facilities (Natural Snacks). Tracks quality parameters across 15 extruder production stages, calculates live OEE, logs critical anomaly alerts, and provides structured Non-Conformance Incident Reporting.",
    highlights_ar: [
      "مراقبة لحظية لـ 15 مرحلة في خطوط البثق الصناعية",
      "حساب فوري لمؤشرات الكفاءة التشغيلية (OEE) ونسب العيوب",
      "سجل متكامل لتنبيهات الانحرافات وتتبع إجراءات الجودة (NCR)",
      "رسوم بيانية تفاعلية وواجهة قيادة صناعية داكنة فائقة الوضوح"
    ],
    highlights_en: [
      "15-Stage Extruder Line Real-time Monitoring",
      "Real-Time OEE & Quality Defect Metrics Calculation",
      "Anomaly Alert Logging & Audit Trail with NCR workflow",
      "Interactive Analytics Charts & High-contrast Industrial Dashboard"
    ],
    is_featured: true,
    display_order: 1
  },
  {
    id: "proj-02-hr",
    title_ar: "نظام الموارد البشرية والرواتب للمصانع (HR & Payroll)",
    title_en: "Natural Snacks — HR & Payroll Management System",
    category: "enterprise",
    type_ar: "نظام سحابي لإدارة الموارد البشرية وحساب الرواتب",
    type_en: "Enterprise Human Resources & Accounting Web Application",
    tech_stack: ["HTML5", "CSS3", "JavaScript (ES6+)", "LocalStorage", "Offline-First"],
    live_url: "https://asmaelshowky70.github.io/HR-NaturalSnaks/",
    repo_url: "https://github.com/AsmaelShowky70/HR-NaturalSnaks.git",
    image_url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    description_ar: "نظام موارد بشرية ومحاسبة عمالة متكامل وموجه للعمل دون إنترنت (Offline-First) باللغة العربية لمصانع Natural Snacks. يدير سجلات حضور وانصراف الورديات، واحتساب الرواتب والبدلات والاستقطاعات والسلف والعهد المالية تلقائياً، مع دعم التصدير الفوري لملفات Excel و PDF.",
    description_en: "An offline-first, enterprise-ready Arabic HR and payroll management system engineered for factory workforces, technicians, and contractor labor. Handles automated attendance across rotating shifts, complex net wage calculations including overtime, deductions, advances, and client-side export to Excel & PDF.",
    highlights_ar: [
      "جدولة الورديات المتعددة وسجلات الحضور اللحظية للعمال",
      "احتساب آلي دقيق لصافي الأجور، الإضافي، والخصومات",
      "تتبع العهد النقدية، السلفيات، والأرصدة المالية",
      "تصدير فوري بنقرة واحدة لملفات Excel و PDF بدون خوادم وسيطة"
    ],
    highlights_en: [
      "Multi-Shift Attendance Matrix & Worker Records",
      "Automated Daily/Monthly Wage & Penalty Calculations",
      "Petty Cash, Custody & Loan Balances Tracking",
      "Client-Side Instant Export to Excel & PDF"
    ],
    is_featured: true,
    display_order: 2
  },
  {
    id: "proj-03-codeup",
    title_ar: "منصة CodeUp التعليمية وأكاديمية البرمجة",
    title_en: "CodeUp — Tech Academy & Learning Platform",
    category: "web",
    type_ar: "منصة تعليم إلكتروني تفاعلية (EdTech LMS)",
    type_en: "EdTech Web Application & Student LMS",
    tech_stack: ["React 19", "Tailwind CSS", "Framer Motion", "ASP.NET Core Web API", "C#"],
    live_url: "https://asmaelshowky70.github.io/CodeUp/",
    repo_url: "https://github.com/AsmaelShowky70/CodeUp.git",
    image_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    description_ar: "منصة تعليمية وبرمجية تفاعلية متكاملة لطلاب ومناهج البرمجة والتكنولوجيا. تتميز بمسارات تعليمية منظمة، ونظام اختبارات وتقييم فوري مع تأثيرات احتفالية عند الإجابة الصحيحة، ومشغل محاضرات فيديو، ونظام تفعيل الحسابات بأكواد فريدة، وتصميم عصري بحركات انسيابية.",
    description_en: "An interactive full-stack learning and assessment platform for coding students and programming curricula. Features interactive lesson streaming, automated multiple-choice quiz engines with real-time feedback and confetti celebration, student activation codes, and fluid motion animations.",
    highlights_ar: [
      "مسارات برمجية تفاعلية ومناهج مقسمة لدروس نموذجية",
      "محرك اختبارات ذكي مع تصحيح فوري وتأثيرات تحفيزية",
      "مشغل محاضرات فيديو مدمج مع متابعة نسبة إنجاز الطالب",
      "تكامل كامل مع واجهة برمجية ASP.NET Core سريعة وآمنة"
    ],
    highlights_en: [
      "Interactive Coding Curricula & Multi-Module Tracks",
      "Automated Instant Quiz Engine & Progress Tracking",
      "Video Lecture Catalog with Fluid UI Animations",
      "Seamless ASP.NET Core Backend API Integration"
    ],
    is_featured: true,
    display_order: 3
  },
  {
    id: "proj-04-lingoflow",
    title_ar: "تطبيق LingoFlow AI لتعلم الإنجليزية بالمحادثة الذكية",
    title_en: "LingoFlow AI — English Practice Mobile App",
    category: "mobile",
    type_ar: "تطبيق أندرويد و iOS ذكي متعدد المنصات",
    type_en: "Cross-Platform Mobile Application (Android / iOS)",
    tech_stack: ["Flutter", "Dart", "ASP.NET Core API", "AI Speech-to-Text", "JWT Auth"],
    live_url: "https://github.com/AsmaelShowky70/English-app.git",
    repo_url: "https://github.com/AsmaelShowky70/English-app.git",
    image_url: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80",
    description_ar: "تطبيق موبايل ذكي متعدد المنصات مبني بفلاتر (Flutter) لإتقان مهارات التحدث باللغة الإنجليزية عبر المحادثة التفاعلية ومحاكاة الشخصيات بواسطة الذكاء الاصطناعي. يدعم الرسائل الصوتية وتحويل الصوت إلى نصوص (STT)، ومواقف وسيناريوهات وظيفية متخصصة، ونظام مكافآت ونقاط، مع خادم خلفي ASP.NET Core.",
    description_en: "An intelligent cross-platform mobile application developed with Flutter for mastering spoken English through AI-powered conversational role-play. Supports speech-to-text voice messaging pipelines, customizable professional scenarios (Tech, Healthcare, Business), gamified rewards, and secure ASP.NET Core API backend.",
    highlights_ar: [
      "تطبيق موبايل سريع بتقنية Flutter لأجهزة أندرويد و iOS",
      "محاكاة سيناريوهات حية بالذكاء الاصطناعي وقياس الطلاقة اللغوية",
      "معالجة الصوت وتحويله إلى نص Speech-to-Text لحظياً",
      "نظام حوافز، نقاط، وأوسمة لإبقاء المستخدم متفاعلاً يومياً"
    ],
    highlights_en: [
      "Cross-Platform Flutter Mobile Architecture (Android & iOS)",
      "AI Role-Playing Scenario Simulations & Fluency Scoring",
      "Voice & Text Messaging Pipeline (Speech-to-Text)",
      "Gamified Points, Streaks & Rewards Economy"
    ],
    is_featured: true,
    display_order: 4
  },
  {
    id: "proj-05-studyai",
    title_ar: "منصة StudyAI — المساعد الأكاديمي فائق الذكاء",
    title_en: "StudyAI — Intelligent AI Study Companion",
    category: "web",
    type_ar: "منصة ذكاء اصطناعي سحابية (AI SaaS)",
    type_en: "AI SaaS Educational Web Platform",
    tech_stack: ["JavaScript (ES6+)", "AI SaaS", "Computer Vision", "NLP & Analytics", "Modern UI"],
    live_url: "https://asmaelshowky70.github.io/Study-Ai/",
    repo_url: "https://github.com/AsmaelShowky70/Study-Ai",
    image_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    description_ar: "منصة تعليمية ذكية قائمة على الذكاء الاصطناعي ومعالجة اللغات الطبيعية (NLP) والرؤية الحاسوبية (Computer Vision). تحول المناهج والملفات الأكاديمية تلقائياً إلى بنوك أسئلة واختبارات وبطاقات استذكار سريعة (Flashcards)، مع جداول مذاكرة ذكية وتحليلات بيانية لقياس مستوى تقدم الطالب واستيعابه.",
    description_en: "A SaaS educational web platform combining Computer Vision, Natural Language Processing, and adaptive spaced-repetition algorithms. Automatically converts textbooks, slides, and notes into automated quizzes, flashcards, study planners, and in-depth academic analytics.",
    highlights_ar: [
      "تحليل وقراءة الملازم والكتب بالرؤية الحاسوبية ومعالجة اللغات",
      "توليد فوري للبطاقات التعليمية والأسئلة التدريبية الذكية",
      "خوارزميات التكرار المتباعد لتثبيت المعلومات وتقليل النسيان",
      "لوحة مؤشرات تفاعلية لمراقبة معدل الاستيعاب الزمني"
    ],
    highlights_en: [
      "Automated Material Parsing via Vision & NLP",
      "Instant Flashcard & Adaptive Quiz Generation",
      "Academic Performance Analytics & Spaced Repetition Scheduling",
      "Modern Multi-Page Responsive Web Architecture"
    ],
    is_featured: true,
    display_order: 5
  },
  {
    id: "proj-06-sugo-api",
    title_ar: "واجهة Sugo البرمجية للتجارة الإلكترونية (RESTful API)",
    title_en: "Sugo — E-Commerce Backend API",
    category: "api",
    type_ar: "بنية خوادم خلفية / REST Microservices",
    type_en: "Backend Microservice / REST API Architecture",
    tech_stack: ["ASP.NET Core", "C#", "EF Core", "SQL Server", "JWT Auth", "CQRS", "Swagger"],
    live_url: "https://sugobackend.runasp.net/swagger",
    repo_url: "https://github.com/AsmaelShowky70/SugoBackend-Api-.git",
    image_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    description_ar: "خادم خلفي (Backend Web API) عالي الأداء لتطبيقات التجارة الإلكترونية مبني بـ ASP.NET Core وفق مبادئ Clean Architecture ونمط CQRS. يتضمن نظام أمان متكامل بـ JWT، وإدارة صلاحيات المستخدمين، وقاعدة بيانات SQL Server عبر Entity Framework Core، وتوثيق تفاعلي كامل بـ Swagger منشور على الإنترنت.",
    description_en: "A production-ready enterprise RESTful API backend engineered with ASP.NET Core and clean layered architecture. Features CQRS design pattern, token-based JWT authentication, role-based authorization, comprehensive CRUD endpoints, DTO auto-mapping, SQL Server EF Core migrations, and complete Swagger/OpenAPI documentation.",
    highlights_ar: [
      "معمارية نظيفة ثلاثية الطبقات مع نمط الفصل CQRS",
      "أمان فائق بحماية JWT وإدارة الأدوار والصلاحيات (RBAC)",
      "قواعد بيانات SQL Server مهيكلة بـ Entity Framework Code-First",
      "واجهة تفاعلية Swagger كاملة منشورة سحابياً للاختبار الحي"
    ],
    highlights_en: [
      "Clean Layered Architecture & CQRS Pattern",
      "Secure JWT Authentication & Role-Based Access Control",
      "Entity Framework Core Code-First Migrations with SQL Server",
      "Live Cloud API Deployment on runasp.net with Swagger UI"
    ],
    is_featured: false,
    display_order: 6
  },
  {
    id: "proj-07-lapshop",
    title_ar: "متجر LapShop الإلكتروني للإلكترونيات والأجهزة",
    title_en: "LapShop — E-Commerce Platform",
    category: "web",
    type_ar: "متجر إلكتروني متكامل للشركات والمتاجر",
    type_en: "Full-Stack E-Commerce MVC Web Application",
    tech_stack: ["ASP.NET Core MVC", "C#", "Razor Views", "Bootstrap", "EF Core", "SQL Server"],
    live_url: "https://lapshope.runasp.net/",
    repo_url: "https://github.com/AsmaelShowky70/LapShop.git",
    image_url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    description_ar: "متجر إلكتروني شامل لبيع الأجهزة والإلكترونيات مبني بتقنية ASP.NET Core MVC. يطبق نمط المستودع (Repository Pattern)، ويحتوي على تصفح فئات المنتجات، وسلة تسوق، وإتمام الطلبات، ولوحة تحكم متكاملة للإدارة والتحكم في المخزون والطلبات والأسعار.",
    description_en: "A robust electronics and hardware e-commerce web platform built with ASP.NET Core MVC. Implements the Repository Pattern, dynamic product catalog browsing, category filtering, session-backed shopping cart, order placement workflow, and a full administrative dashboard.",
    highlights_ar: [
      "متجر متكامل بسلة تسوق ديناميكية وتتبع حالات الشحن والطلب",
      "لوحة تحكم إدارية لإضافة المنتجات، تعديل الأسعار، ومراقبة المخزون",
      "تصميم سريع ومتوافق مع الهواتف الذكية وتصفح سلس",
      "منشور وسحابي على استضافة حية مع قاعدة بيانات متزامنة"
    ],
    highlights_en: [
      "Clean MVC Structure with Repository Pattern",
      "Product Catalog, Filtering, Search & Detail Views",
      "Shopping Cart, Checkout Workflow & Order Management",
      "Administrative Control Panel for Products & Categories"
    ],
    is_featured: true,
    display_order: 7
  },
  {
    id: "proj-08-healthcare",
    title_ar: "بوابة العيادات الطبية وحجز المواعيد (Health Care)",
    title_en: "Health Care Clinic Platform",
    category: "web",
    type_ar: "موقع ويب للرعاية الصحية وحجز الأطباء",
    type_en: "Healthcare Web UI & Client Portal",
    tech_stack: ["HTML5", "CSS3", "JavaScript (ES6+)", "Responsive Design"],
    live_url: "https://asmaelshowky70.github.io/health/",
    repo_url: "https://github.com/AsmaelShowky70/health.git",
    image_url: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80",
    description_ar: "موقع ويب عصري ومتجاوب لعيادة طبية وخدمات الرعاية الصحية. يتميز بتصميم أنيق ومريح للمريض، ودليل تفاعلي للأطباء والعيادات التخصصية، ونماذج حجز المواعيد السريعة، وتجربة تصفح سريعة وخفيفة على كافة الأجهزة.",
    description_en: "A clean, modern, and highly responsive website for a medical clinic and healthcare services. Features an aesthetic healthcare theme, interactive doctor directories, medical specialty showcases, patient testimonials, and an intuitive appointment booking interface.",
    highlights_ar: [
      "واجهة مستخدم طبية هادئة تعزز ثقة المراجعين والمرضى",
      "دليل للأطباء والأقسام الطبية ومواعيد العيادات",
      "نموذج تفاعلي لطلب وحجز موعد استشارة طبية",
      "سرعة تحميل فائقة وتوافق تام مع شاشات الجوال"
    ],
    highlights_en: [
      "Professional Medical UI/UX with Clean Color Palette",
      "Interactive Doctor Profiles & Medical Departments",
      "Online Appointment Booking Form Interface",
      "Fast Static Loading and High Accessibility"
    ],
    is_featured: false,
    display_order: 8
  },
  {
    id: "proj-09-sugo-ui",
    title_ar: "تطبيق موبايل Sugo UI للمتجر الإلكتروني (Flutter)",
    title_en: "Sugo UI — Cross-Platform Flutter Mobile App",
    category: "mobile",
    type_ar: "تطبيق أندرويد و iOS للتجارة الإلكترونية",
    type_en: "Cross-Platform Mobile App (Android & iOS)",
    tech_stack: ["Flutter", "Dart", "State Management", "REST API Client", "Mobile UX"],
    live_url: "https://github.com/AsmaelShowky70/SugoUI.git",
    repo_url: "https://github.com/AsmaelShowky70/SugoUI.git",
    image_url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    description_ar: "تطبيق موبايل متجاوب وعصري تم تطويره باستخدام Flutter ليكون الواجهة الأمامية لنظام التجارة الإلكترونية المتصل بـ Sugo Backend API. يوفر تصفح المنتجات وسلة الشراء وإدارة الحساب بتجربة مستخدم سلسة وحركات ديناميكية.",
    description_en: "A modern, high-performance mobile application built with Flutter serving as the frontend client for the Sugo Backend API. Features intuitive product discovery, category browsing, reactive shopping cart state management, and smooth transitions.",
    highlights_ar: [
      "أداء فائق وتصميم عصري متوافق مع Android و iOS",
      "ربط متكامل مع واجهات API خادم Sugo ومزامنة السلة",
      "إدارة حالات ديناميكية وتجربة شراء سلسة وسريعة",
      "إشعارات وعناصر واجهة مستخدم تفاعلية وجذابة"
    ],
    highlights_en: [
      "Native Performance for iOS and Android with Flutter",
      "Seamless Connection to Sugo ASP.NET Core REST API",
      "Reactive State Management & Component-Driven UI",
      "Fluid Transitions, Micro-Interactions & Dark Palette"
    ],
    is_featured: true,
    display_order: 9
  },
  {
    id: "proj-10-ecommerce",
    title_ar: "منصة التجارة الإلكترونية الشاملة (My E-Commerce)",
    title_en: "My E-Commerce Platform",
    category: "web",
    type_ar: "متجر متكامل ومعمارية برمجية سحابية",
    type_en: "Full-Stack MVC E-Commerce Application",
    tech_stack: ["ASP.NET Core MVC", "C#", "Entity Framework Core", "SQL Server", "Clean Architecture"],
    live_url: "https://myecommerce.tryasp.net/",
    repo_url: "https://github.com/AsmaelShowky70/ECommerce",
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    description_ar: "منصة تجارة إلكترونية كاملة مبنية بـ ASP.NET Core MVC ومعمارية برمجية منظمة. تتضمن واجهة متجر تفاعلية، وسلة تسوق، وعملية إتمام الطلب، وإدارة المنتجات وقواعد بيانات SQL Server المنشورة سحابياً.",
    description_en: "A complete ASP.NET Core MVC e-commerce platform built with clean layered architecture. Provides a modern storefront experience, customer authentication, product management, cart calculations, checkout processing, and live cloud deployment.",
    highlights_ar: [
      "واجهة متجر تفاعلية متطورة مع تصفح دقيق للمنتجات",
      "دورة شراء مكتملة من السلة حتى تأكيد الطلب والفاتورة",
      "معمارية برمجية نظيفة Clean Code مع قواعد بيانات SQL Server",
      "نظام صلاحيات وحماية متقدم لإدارة المتجر والعملاء"
    ],
    highlights_en: [
      "Modern Responsive Storefront UI",
      "End-to-End Shopping Cart & Checkout Process",
      "Clean Code Architecture & Entity Framework Migrations",
      "Live Cloud Deployment on tryasp.net"
    ],
    is_featured: false,
    display_order: 10
  }
];
