import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  getProjects, 
  saveProject, 
  deleteProject,
  getPackages, 
  savePackage,
  getAnalytics,
  updateTotalSales,
  getFinanceSettings,
  saveFinanceSettings,
  getFinanceRevenues,
  saveFinanceRevenue,
  deleteFinanceRevenue,
  getFinanceExpenses,
  saveFinanceExpense,
  deleteFinanceExpense,
  getFinanceCapital,
  saveFinanceCapital,
  deleteFinanceCapital,
  getFinanceCharity,
  saveFinanceCharity,
  deleteFinanceCharity,
  calculateFinancialSummary,
  getAdminUsers,
  saveAdminUser,
  deleteAdminUser,
  updateMainAccountCredentials
} from '../lib/storage';
import { 
  ShieldCheck, 
  LogOut, 
  Layers, 
  DollarSign, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  CheckCircle, 
  ExternalLink,
  Database, 
  Sparkles,
  MessageCircle,
  Eye,
  Key,
  UserPlus,
  Users,
  Calendar,
  CreditCard,
  Heart,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  FileSpreadsheet,
  Wallet,
  Briefcase,
  Sliders,
  RotateCcw
} from 'lucide-react';
import logoImg from '../assets/logo.jpeg';

export const AdminDashboard = ({ isOpen, onClose }) => {
  const { user, logout, refreshSessionUser } = useAuth();
  const { t, lang, isRtl } = useLanguage();

  const [activeTab, setActiveTab] = useState('overview');
  const [financeSubTab, setFinanceSubTab] = useState('kpis'); // 'kpis', 'revenues', 'expenses', 'capital', 'charity', 'monthly', 'settings'

  // Data states
  const [projects, setProjects] = useState([]);
  const [packages, setPackages] = useState([]);
  const [analytics, setAnalytics] = useState({ visitors_count: 0, totalSales: 0, calculatedSales: 0 });
  const [financeSummary, setFinanceSummary] = useState(null);
  const [revenues, setRevenues] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [capital, setCapital] = useState([]);
  const [charity, setCharity] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);

  // Toast notification state
  const [toastMsg, setToastMsg] = useState('');

  // Editing Project Modal State
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [projectForm, setProjectForm] = useState({
    id: '',
    title_ar: '',
    title_en: '',
    category: 'web',
    type_ar: '',
    type_en: '',
    tech_stack: '',
    live_url: '',
    repo_url: '',
    image_url: '',
    description_ar: '',
    description_en: '',
    highlights_ar: '',
    highlights_en: ''
  });

  // Editing Package Modal State
  const [isEditingPackage, setIsEditingPackage] = useState(false);
  const [packageForm, setPackageForm] = useState({
    id: '',
    name_ar: '',
    name_en: '',
    category: 'website_tier',
    billing_period: '',
    badge_ar: '',
    badge_en: '',
    domain_included_ar: '',
    domain_included_en: '',
    hosting_included_ar: '',
    hosting_included_en: '',
    database_included_ar: '',
    database_included_en: '',
    description_ar: '',
    description_en: '',
    features_ar: '',
    features_en: '',
    is_popular: false
  });

  // Sales Manual Override Modal State
  const [isEditingSales, setIsEditingSales] = useState(false);
  const [manualSalesInput, setManualSalesInput] = useState('');

  // Finance Revenue / Project Modal State
  const [isEditingRevenue, setIsEditingRevenue] = useState(false);
  const [revenueForm, setRevenueForm] = useState({
    id: '',
    project_number: '',
    client_name: '',
    project_name: '',
    service_type: 'موقع ويب ديناميكي',
    sale_date: '',
    project_value: 0,
    collected_amount: 0,
    status: 'in_progress',
    delivery_date: '',
    notes: ''
  });

  // Finance Expense Modal State
  const [isEditingExpense, setIsEditingExpense] = useState(false);
  const [expenseForm, setExpenseForm] = useState({
    id: '',
    expense_number: '',
    date: '',
    category: 'أدوات AI',
    item_name: '',
    amount: 0,
    payment_method: 'فودافون كاش',
    vendor: '',
    associated_project_id: '',
    is_recurring: false,
    notes: ''
  });

  // Finance Capital Modal State
  const [isEditingCapital, setIsEditingCapital] = useState(false);
  const [capitalForm, setCapitalForm] = useState({
    id: '',
    date: '',
    movement_type: 'تغذية مرتدة من الأرباح 15%',
    description: '',
    amount: 0,
    source_ref: '',
    notes: ''
  });

  // Finance Charity Modal State
  const [isEditingCharity, setIsEditingCharity] = useState(false);
  const [charityForm, setCharityForm] = useState({
    id: '',
    date: '',
    due_amount: 0,
    paid_amount: 0,
    beneficiary: '',
    notes: ''
  });

  // Main Account Credentials Form State
  const [mainCredsForm, setMainCredsForm] = useState({
    username: '',
    password: '',
    name: ''
  });

  // Member Modal State
  const [isEditingMember, setIsEditingMember] = useState(false);
  const [memberForm, setMemberForm] = useState({
    id: '',
    username: '',
    password: '',
    name: '',
    role: 'admin',
    role_title_ar: 'مشرف مشاريع',
    role_title_en: 'Project Supervisor'
  });

  useEffect(() => {
    if (isOpen) {
      loadAllData();
    }
  }, [isOpen]);

  const loadAllData = async () => {
    const [projs, pkgs, anly, finSum, revs, exps, caps, chars, users] = await Promise.all([
      getProjects(),
      getPackages(),
      getAnalytics(),
      calculateFinancialSummary(),
      getFinanceRevenues(),
      getFinanceExpenses(),
      getFinanceCapital(),
      getFinanceCharity(),
      getAdminUsers()
    ]);
    setProjects(projs);
    setPackages(pkgs);
    setAnalytics(anly);
    setFinanceSummary(finSum);
    setRevenues(revs);
    setExpenses(exps);
    setCapital(caps);
    setCharity(chars);
    setAdminUsers(users);

    // Seed main credentials form with active primary user
    const primary = users.find(u => u.is_primary || u.username === "Asmael");
    if (primary) {
      setMainCredsForm({
        username: primary.username,
        password: primary.password,
        name: primary.name
      });
    }
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

  // ==========================
  // SALES ACTIONS
  // ==========================
  const handleSaveManualSales = async (e) => {
    e.preventDefault();
    const val = manualSalesInput.trim() === '' ? null : Number(manualSalesInput);
    await updateTotalSales(val);
    const updatedAnly = await getAnalytics();
    setAnalytics(updatedAnly);
    setIsEditingSales(false);
    showToast(isRtl ? "تم تحديث إجمالي المبيعات بنجاح" : "Sales record updated");
  };

  // ==========================
  // PROJECT ACTIONS
  // ==========================
  const handleOpenAddProject = () => {
    setProjectForm({
      id: `proj-${Date.now()}`,
      title_ar: '',
      title_en: '',
      category: 'web',
      type_ar: 'موقع وتطبيق ويب متقدم',
      type_en: 'Advanced Web Application',
      tech_stack: 'React 19, Tailwind CSS, Supabase',
      live_url: '',
      repo_url: 'https://github.com/AsmaelShowky70/',
      image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      description_ar: '',
      description_en: '',
      highlights_ar: 'لوحة تحكم كاملة\nقاعدة بيانات سحابية\nتصميم متجاوب',
      highlights_en: 'Full Admin Panel\nCloud Database\nResponsive Design'
    });
    setIsEditingProject(true);
  };

  const handleOpenEditProject = (p) => {
    setProjectForm({
      ...p,
      tech_stack: Array.isArray(p.tech_stack) ? p.tech_stack.join(', ') : (p.tech_stack || ''),
      highlights_ar: Array.isArray(p.highlights_ar) ? p.highlights_ar.join('\n') : (p.highlights_ar || ''),
      highlights_en: Array.isArray(p.highlights_en) ? p.highlights_en.join('\n') : (p.highlights_en || '')
    });
    setIsEditingProject(true);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    const updatedPayload = {
      ...projectForm,
      tech_stack: projectForm.tech_stack.split(',').map(s => s.trim()).filter(Boolean),
      highlights_ar: projectForm.highlights_ar.split('\n').map(s => s.trim()).filter(Boolean),
      highlights_en: projectForm.highlights_en.split('\n').map(s => s.trim()).filter(Boolean),
    };
    const updated = await saveProject(updatedPayload);
    setProjects(updated);
    setIsEditingProject(false);
    showToast(t.admin.savedToast);
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm(isRtl ? "هل أنت متأكد من حذف هذا المشروع نهائياً؟" : "Confirm permanent deletion of this project?")) {
      const updated = await deleteProject(id);
      setProjects(updated);
      showToast(t.admin.deletedToast);
    }
  };

  // ==========================
  // PACKAGE & PRICING ACTIONS
  // ==========================
  const handleOpenAddPackage = () => {
    setPackageForm({
      id: `pkg-${Date.now()}`,
      name_ar: '',
      name_en: '',
      category: 'website_tier',
      billing_period: 'مرة واحدة',
      badge_ar: 'عرض جديد',
      badge_en: 'New Offer',
      domain_included_ar: 'دومين مشمول',
      domain_included_en: 'Domain Included',
      hosting_included_ar: 'استضافة سحابية سريعة',
      hosting_included_en: 'Fast Cloud Hosting',
      database_included_ar: 'قاعدة بيانات سحابية',
      database_included_en: 'Cloud Database',
      description_ar: '',
      description_en: '',
      features_ar: 'موقع ديناميكي متكامل\nلوحة تحكم خاصة\nدعم فني وتدريب',
      features_en: 'Dynamic Website\nCustom Dashboard\nTechnical Support',
      is_popular: false
    });
    setIsEditingPackage(true);
  };

  const handleOpenEditPackage = (pkg) => {
    setPackageForm({
      ...pkg,
      features_ar: Array.isArray(pkg.features_ar) ? pkg.features_ar.join('\n') : (pkg.features_ar || ''),
      features_en: Array.isArray(pkg.features_en) ? pkg.features_en.join('\n') : (pkg.features_en || '')
    });
    setIsEditingPackage(true);
  };

  const handleSavePackage = async (e) => {
    e.preventDefault();
    const payload = {
      ...packageForm,
      features_ar: packageForm.features_ar.split('\n').map(s => s.trim()).filter(Boolean),
      features_en: packageForm.features_en.split('\n').map(s => s.trim()).filter(Boolean),
    };
    const updated = await savePackage(payload);
    setPackages(updated);
    setIsEditingPackage(false);
    showToast(t.admin.savedToast);
  };

  // ==========================
  // REVENUE (PROJECTS) ACTIONS
  // ==========================
  const handleSaveRevenue = async (e) => {
    e.preventDefault();
    const updated = await saveFinanceRevenue(revenueForm);
    setRevenues(updated);
    setIsEditingRevenue(false);
    const sum = await calculateFinancialSummary();
    setFinanceSummary(sum);
    const anly = await getAnalytics();
    setAnalytics(anly);
    showToast(isRtl ? "تم حفظ المشروع البرمجي في سجل الإيرادات" : "Project revenue saved");
  };

  const handleDeleteRevenue = async (id) => {
    if (window.confirm(isRtl ? "هل أنت متأكد من حذف هذا المشروع من سجل الإيرادات؟" : "Confirm delete revenue project?")) {
      const updated = await deleteFinanceRevenue(id);
      setRevenues(updated);
      const sum = await calculateFinancialSummary();
      setFinanceSummary(sum);
      const anly = await getAnalytics();
      setAnalytics(anly);
      showToast(isRtl ? "تم حذف المشروع" : "Project deleted");
    }
  };

  // ==========================
  // EXPENSE ACTIONS
  // ==========================
  const handleSaveExpense = async (e) => {
    e.preventDefault();
    const updated = await saveFinanceExpense(expenseForm);
    setExpenses(updated);
    setIsEditingExpense(false);
    const sum = await calculateFinancialSummary();
    setFinanceSummary(sum);
    showToast(isRtl ? "تم تسجيل المصروف بنجاح" : "Expense recorded successfully");
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm(isRtl ? "هل أنت متأكد من حذف هذا المصروف؟" : "Confirm delete expense?")) {
      const updated = await deleteFinanceExpense(id);
      setExpenses(updated);
      const sum = await calculateFinancialSummary();
      setFinanceSummary(sum);
      showToast(isRtl ? "تم حذف المصروف" : "Expense deleted");
    }
  };

  // ==========================
  // CAPITAL ACTIONS
  // ==========================
  const handleSaveCapital = async (e) => {
    e.preventDefault();
    const updated = await saveFinanceCapital(capitalForm);
    setCapital(updated);
    setIsEditingCapital(false);
    const sum = await calculateFinancialSummary();
    setFinanceSummary(sum);
    showToast(isRtl ? "تم تسجيل حركة رأس المال" : "Capital movement logged");
  };

  const handleDeleteCapital = async (id) => {
    if (window.confirm(isRtl ? "هل ترغب في حذف حركة رأس المال هذه؟" : "Confirm delete capital entry?")) {
      const updated = await deleteFinanceCapital(id);
      setCapital(updated);
      const sum = await calculateFinancialSummary();
      setFinanceSummary(sum);
      showToast(isRtl ? "تم الحذف بنجاح" : "Deleted");
    }
  };

  // ==========================
  // CHARITY ACTIONS
  // ==========================
  const handleSaveCharity = async (e) => {
    e.preventDefault();
    const updated = await saveFinanceCharity(charityForm);
    setCharity(updated);
    setIsEditingCharity(false);
    const sum = await calculateFinancialSummary();
    setFinanceSummary(sum);
    showToast(isRtl ? "تم تسجيل مساهمة الأعمال الخيرية" : "Charity contribution saved");
  };

  const handleDeleteCharity = async (id) => {
    if (window.confirm(isRtl ? "تأكيد حذف هذا القيد الخيري؟" : "Confirm delete charity record?")) {
      const updated = await deleteFinanceCharity(id);
      setCharity(updated);
      const sum = await calculateFinancialSummary();
      setFinanceSummary(sum);
      showToast(isRtl ? "تم الحذف" : "Deleted");
    }
  };

  // ==========================
  // MAIN ACCOUNT & TEAM MEMBERS
  // ==========================
  const handleUpdateMainCredentials = async (e) => {
    e.preventDefault();
    if (!mainCredsForm.username.trim() || !mainCredsForm.password.trim()) {
      alert(isRtl ? "يرجى كتابة اسم المستخدم وكلمة المرور" : "Please enter username and password");
      return;
    }
    const updated = await updateMainAccountCredentials(
      mainCredsForm.username,
      mainCredsForm.password,
      mainCredsForm.name
    );
    setAdminUsers(updated);
    refreshSessionUser({
      username: mainCredsForm.username,
      name: mainCredsForm.name
    });
    showToast(isRtl ? "تم تحديث بيانات الحساب الرئيسي بنجاح!" : "Main credentials updated!");
  };

  const handleSaveMember = async (e) => {
    e.preventDefault();
    if (!memberForm.username.trim() || !memberForm.password.trim()) {
      alert(isRtl ? "اسم المستخدم وكلمة المرور مطلوبان" : "Username and password required");
      return;
    }

    const roleTitles = {
      admin: { ar: 'مشرف إدارة عام', en: 'General Admin' },
      finance: { ar: 'مدير مالي وحسابات', en: 'Finance Manager' },
      sales: { ar: 'مسؤول مبيعات وعملاء', en: 'Sales Executive' },
      projects: { ar: 'مشرف تسليم مشاريع', en: 'Projects Lead' }
    };

    const payload = {
      ...memberForm,
      role_title_ar: roleTitles[memberForm.role]?.ar || 'عضو إدارة',
      role_title_en: roleTitles[memberForm.role]?.en || 'Admin Member'
    };

    const updated = await saveAdminUser(payload);
    setAdminUsers(updated);
    setIsEditingMember(false);
    showToast(isRtl ? "تم حفظ بيانات عضو الفريق بنجاح" : "Team member saved");
  };

  const handleDeleteMember = async (id) => {
    try {
      if (window.confirm(isRtl ? "هل ترغب في حذف هذا العضو وسحب صلاحية دخوله للوحة التحكم؟" : "Confirm delete member?")) {
        const updated = await deleteAdminUser(id);
        setAdminUsers(updated);
        showToast(isRtl ? "تم حذف العضو بنجاح" : "Member deleted");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-2xl animate-fade-in">
      <div className="relative w-full max-w-7xl rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden flex flex-col h-[94vh]">
        
        {/* Top Admin Bar */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/90 gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-cyan-400 to-emerald-400">
              <img src={logoImg} alt="TECVEXA" className="w-full h-full object-cover rounded-[10px]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white">
                  {lang === 'ar' ? 'منظومة إدارة TECVEXA التقنية والمالية' : 'TECVEXA Business Control Center'}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {user?.role_title_ar || "المالك (Super Admin)"}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {lang === 'ar' ? 'المستخدم النشط:' : 'Logged in as:'} <span className="text-white font-bold">{user?.name || "Ismail Mohamed (Showky)"}</span> (@{user?.username || "Asmael"})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-red-300 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'خروج' : 'Logout'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Toast Alert */}
        {toastMsg && (
          <div className="px-6 py-2.5 bg-emerald-500/20 border-b border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-1.5 px-6 py-3 border-b border-slate-800 bg-slate-900/80 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'overview' ? 'bg-cyan-500 text-slate-950 shadow-md font-black' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>{lang === 'ar' ? 'نظرة عامة والمؤشرات' : 'Overview & KPIs'}</span>
          </button>

          <button
            onClick={() => setActiveTab('finance')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'finance' ? 'bg-emerald-500 text-slate-950 shadow-md font-black' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>{lang === 'ar' ? 'إدارة المشاريع والماليات (Excel)' : 'Project & Finance Manager'}</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'projects' ? 'bg-cyan-500 text-slate-950 shadow-md font-black' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>{lang === 'ar' ? 'معرض الأعمال (Portfolio)' : 'Portfolio'} ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('pricing')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'pricing' ? 'bg-cyan-500 text-slate-950 shadow-md font-black' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{lang === 'ar' ? 'باقات الخدمات والعروض' : 'Services & Packages'} ({packages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('team')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'team' ? 'bg-purple-500 text-white shadow-md font-black' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{lang === 'ar' ? 'فريق العمل والحساب الرئيسي' : 'Team & Accounts'} ({adminUsers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'settings' ? 'bg-cyan-500 text-slate-950 shadow-md font-black' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>{lang === 'ar' ? 'السحابة وقاعدة البيانات' : 'Cloud & Database'}</span>
          </button>
        </div>

        {/* Dashboard Main Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 bg-slate-950/70">
          
          {/* ==================================================== */}
          {/* 1. OVERVIEW TAB */}
          {/* ==================================================== */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              
              {/* Top Highlights Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* 1. Live Visitor Counter */}
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 shadow-lg shadow-cyan-500/5 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      <span className="text-xs text-slate-400 font-bold">{lang === 'ar' ? 'عدد زوار الموقع' : 'Website Visitors'}</span>
                    </div>
                    <span className="text-3xl font-black text-cyan-400 mt-2 block font-mono">
                      {analytics.visitors_count.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                      {lang === 'ar' ? 'تتبع لحظي للزيارات' : 'Live visit tracking'}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Eye className="w-6 h-6" />
                  </div>
                </div>

                {/* 2. Total Real Sales Metric */}
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-emerald-500/30 shadow-lg shadow-emerald-500/5 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 font-bold">{lang === 'ar' ? 'إجمالي المبيعات المحققة' : 'Total Real Sales'}</span>
                      <button 
                        onClick={() => {
                          setManualSalesInput(analytics.manual_sales_override !== null ? String(analytics.manual_sales_override) : '');
                          setIsEditingSales(true);
                        }}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[10px] cursor-pointer"
                        title={lang === 'ar' ? 'تسجيل / تعديل المبيعات يدوياً' : 'Edit Sales'}
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-3xl font-black text-emerald-400 mt-2 block font-mono">
                      {analytics.totalSales.toLocaleString()} <span className="text-xs text-slate-400">ج.م</span>
                    </span>
                    <span className="text-[10px] text-emerald-500/90 block mt-0.5">
                      {analytics.manual_sales_override !== null 
                        ? (lang === 'ar' ? '• مسجل يدوياً بناءً على الواقع' : '• Manually recorded')
                        : (lang === 'ar' ? '• محسوب تلقائياً من المشاريع' : '• Auto-calculated from projects')}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                </div>

                {/* 3. Software Projects in Progress */}
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block font-bold">{lang === 'ar' ? 'المشاريع البرمجية' : 'Software Projects'}</span>
                    <span className="text-3xl font-black text-white mt-2 block font-mono">
                      {revenues.length}
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      {revenues.filter(r => r.status === 'in_progress').length} {lang === 'ar' ? 'قيد التنفيذ حالياً' : 'in progress'}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <Briefcase className="w-6 h-6" />
                  </div>
                </div>

                {/* 4. Current Capital Balance */}
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block font-bold">{lang === 'ar' ? 'رصيد رأس المال الحالي' : 'Current Capital'}</span>
                    <span className="text-3xl font-black text-purple-400 mt-2 block font-mono">
                      {(financeSummary?.capitalBalance || 5000).toLocaleString()} <span className="text-xs text-slate-400">ج.م</span>
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      {lang === 'ar' ? 'الرصيد التراكمي المتاح' : 'Cumulative available'}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <Wallet className="w-6 h-6" />
                  </div>
                </div>

              </div>

              {/* Financial Quick Breakdown Summary */}
              {financeSummary && (
                <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-black text-white flex items-center gap-2">
                        <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                        <span>{lang === 'ar' ? 'مؤشرات الأرباح والتدفقات المالية (وفق نموذج الإكسيل)' : 'Profit & Cashflow Indicators'}</span>
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {lang === 'ar' ? 'حساب تلقائي لنسبة الأعمال الخيرية 10%، وإعادة الاستثمار للتطوير 15%' : 'Automated 10% charity & 15% reinvestment allocation'}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setActiveTab('finance');
                        setFinanceSubTab('kpis');
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold transition-all cursor-pointer"
                    >
                      {lang === 'ar' ? 'فتح المنظومة المالية كاملة ←' : 'Open Finance Suite →'}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80">
                      <span className="text-[11px] text-slate-400 font-bold block">{lang === 'ar' ? 'إجمالي المحصل' : 'Collected'}</span>
                      <span className="text-lg font-black text-emerald-400 mt-1 block font-mono">
                        {financeSummary.totalCollectedRevenues.toLocaleString()} ج.م
                      </span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80">
                      <span className="text-[11px] text-slate-400 font-bold block">{lang === 'ar' ? 'إجمالي المصروفات' : 'Expenses'}</span>
                      <span className="text-lg font-black text-red-400 mt-1 block font-mono">
                        {financeSummary.totalExpenses.toLocaleString()} ج.م
                      </span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80">
                      <span className="text-[11px] text-slate-400 font-bold block">{lang === 'ar' ? 'الربح قبل التخصيص' : 'Gross Profit'}</span>
                      <span className="text-lg font-black text-cyan-400 mt-1 block font-mono">
                        {financeSummary.profitBeforeAllocation.toLocaleString()} ج.م
                      </span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80">
                      <span className="text-[11px] text-amber-400 font-bold block">{lang === 'ar' ? 'الخيرية 10%' : 'Charity 10%'}</span>
                      <span className="text-lg font-black text-amber-300 mt-1 block font-mono">
                        {financeSummary.charityDue.toLocaleString()} ج.م
                      </span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80">
                      <span className="text-[11px] text-indigo-400 font-bold block">{lang === 'ar' ? 'تطوير 15%' : 'Reinvestment 15%'}</span>
                      <span className="text-lg font-black text-indigo-300 mt-1 block font-mono">
                        {financeSummary.reinvestmentDue.toLocaleString()} ج.م
                      </span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-500/30">
                      <span className="text-[11px] text-emerald-400 font-bold block">{lang === 'ar' ? 'صافي الربح' : 'Net Profit'}</span>
                      <span className="text-lg font-black text-emerald-400 mt-1 block font-mono">
                        {financeSummary.netProfit.toLocaleString()} ج.م
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Actions Bar */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  {lang === 'ar' ? 'إجراءات سريعة للمدير' : 'Quick Actions'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <button
                    onClick={() => {
                      setActiveTab('finance');
                      setFinanceSubTab('revenues');
                      setRevenueForm({
                        id: `rev-${Date.now()}`,
                        project_number: revenues.length + 1,
                        client_name: '',
                        project_name: '',
                        service_type: 'موقع ويب ديناميكي',
                        sale_date: new Date().toISOString().split('T')[0],
                        project_value: 0,
                        collected_amount: 0,
                        status: 'in_progress',
                        delivery_date: '',
                        notes: ''
                      });
                      setIsEditingRevenue(true);
                    }}
                    className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/60 text-slate-200 hover:text-white flex items-center gap-2.5 text-xs font-bold transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{lang === 'ar' ? 'تسجيل مشروع / بيع جديد' : 'Add New Project Sale'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('finance');
                      setFinanceSubTab('expenses');
                      setExpenseForm({
                        id: `exp-${Date.now()}`,
                        expense_number: expenses.length + 1,
                        date: new Date().toISOString().split('T')[0],
                        category: 'أدوات AI',
                        item_name: '',
                        amount: 0,
                        payment_method: 'فودافون كاش',
                        vendor: '',
                        associated_project_id: '',
                        is_recurring: false,
                        notes: ''
                      });
                      setIsEditingExpense(true);
                    }}
                    className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-red-500/60 text-slate-200 hover:text-white flex items-center gap-2.5 text-xs font-bold transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{lang === 'ar' ? 'تسجيل مصروف جديد' : 'Record Expense'}</span>
                  </button>

                  <button
                    onClick={handleOpenAddProject}
                    className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/60 text-slate-200 hover:text-white flex items-center gap-2.5 text-xs font-bold transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{lang === 'ar' ? 'إضافة لمعرض الأعمال' : 'Add Portfolio Item'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('team');
                      setMemberForm({
                        id: `admin-${Date.now()}`,
                        username: '',
                        password: '',
                        name: '',
                        role: 'admin',
                        role_title_ar: 'مشرف إدارة',
                        role_title_en: 'Admin Member'
                      });
                      setIsEditingMember(true);
                    }}
                    className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/60 text-slate-200 hover:text-white flex items-center gap-2.5 text-xs font-bold transition-all cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>{lang === 'ar' ? 'إضافة عضو جديد للفريق' : 'Add Team Member'}</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ==================================================== */}
          {/* 2. TECHNICAL SERVICES PROJECT & FINANCE MANAGER (EXCEL SUITE) */}
          {/* ==================================================== */}
          {activeTab === 'finance' && (
            <div className="space-y-6">
              
              {/* Finance Sub-navigation */}
              <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto">
                <button
                  onClick={() => setFinanceSubTab('kpis')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    financeSubTab === 'kpis' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang === 'ar' ? 'لوحة المؤشرات (Dashboard)' : 'KPI Dashboard'}
                </button>
                <button
                  onClick={() => setFinanceSubTab('revenues')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    financeSubTab === 'revenues' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang === 'ar' ? 'المشاريع والإيرادات (Revenues)' : 'Revenues & Projects'} ({revenues.length})
                </button>
                <button
                  onClick={() => setFinanceSubTab('expenses')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    financeSubTab === 'expenses' ? 'bg-red-500 text-white font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang === 'ar' ? 'المصروفات (Expenses)' : 'Expenses'} ({expenses.length})
                </button>
                <button
                  onClick={() => setFinanceSubTab('capital')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    financeSubTab === 'capital' ? 'bg-purple-500 text-white font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang === 'ar' ? 'رأس المال والاستثمار (Capital)' : 'Capital Movements'}
                </button>
                <button
                  onClick={() => setFinanceSubTab('charity')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    financeSubTab === 'charity' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang === 'ar' ? 'الأعمال الخيرية 10% (Charity)' : 'Charity 10%'}
                </button>
                <button
                  onClick={() => setFinanceSubTab('monthly')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    financeSubTab === 'monthly' ? 'bg-indigo-500 text-white font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang === 'ar' ? 'المتابعة الشهرية 2026 (Monthly)' : 'Monthly Analysis'}
                </button>
              </div>

              {/* VIEW 1: KPIS & SUMMARY */}
              {financeSubTab === 'kpis' && financeSummary && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                      <span className="text-xs text-slate-400 block font-bold">{lang === 'ar' ? 'إجمالي الإيرادات المحصلة' : 'Collected Revenues'}</span>
                      <span className="text-2xl font-black text-emerald-400 mt-2 block font-mono">
                        {financeSummary.totalCollectedRevenues.toLocaleString()} ج.م
                      </span>
                      <span className="text-[11px] text-slate-500 block mt-1">
                        {lang === 'ar' ? 'من إجمالي تعاقدات بقيمة:' : 'From total contracts:'} {financeSummary.totalProjectValues.toLocaleString()} ج.م
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                      <span className="text-xs text-slate-400 block font-bold">{lang === 'ar' ? 'إجمالي المصروفات' : 'Total Expenses'}</span>
                      <span className="text-2xl font-black text-red-400 mt-2 block font-mono">
                        {financeSummary.totalExpenses.toLocaleString()} ج.م
                      </span>
                      <span className="text-[11px] text-slate-500 block mt-1">
                        {lang === 'ar' ? 'تشمل أدوات AI، استضافات، تراخيص' : 'Tools, hosting, licenses'}
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900 border border-cyan-500/30">
                      <span className="text-xs text-slate-400 block font-bold">{lang === 'ar' ? 'الربح قبل التخصيص' : 'Gross Profit'}</span>
                      <span className="text-2xl font-black text-cyan-400 mt-2 block font-mono">
                        {financeSummary.profitBeforeAllocation.toLocaleString()} ج.م
                      </span>
                      <span className="text-[11px] text-slate-500 block mt-1">
                        {financeSummary.profitBeforeAllocation >= 0 ? (lang === 'ar' ? 'فائض أرباح تشغيلي' : 'Operational surplus') : (lang === 'ar' ? 'عجز أولي' : 'Deficit')}
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900 border border-emerald-500/40">
                      <span className="text-xs text-emerald-400 block font-bold">{lang === 'ar' ? 'صافي الربح بعد الاستقطاعات' : 'Net Profit'}</span>
                      <span className="text-2xl font-black text-emerald-300 mt-2 block font-mono">
                        {financeSummary.netProfit.toLocaleString()} ج.م
                      </span>
                      <span className="text-[11px] text-slate-500 block mt-1">
                        {lang === 'ar' ? 'بعد خصم 10% خيرية و 15% تطوير' : 'After charity & reinvestment'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-5 rounded-2xl bg-slate-900 border border-amber-500/30">
                      <div className="flex items-center gap-2 text-amber-400">
                        <Heart className="w-4 h-4" />
                        <span className="text-xs font-bold">{lang === 'ar' ? 'مخصص الأعمال الخيرية (10%)' : 'Charity Allocation (10%)'}</span>
                      </div>
                      <span className="text-2xl font-black text-amber-300 mt-2 block font-mono">
                        {financeSummary.charityDue.toLocaleString()} ج.م
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-1">
                        {lang === 'ar' ? 'المسدد فعلياً:' : 'Paid:'} {financeSummary.charityPaid.toLocaleString()} ج.م | {lang === 'ar' ? 'المتبقي:' : 'Due:'} {financeSummary.charityRemaining.toLocaleString()} ج.م
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900 border border-indigo-500/30">
                      <div className="flex items-center gap-2 text-indigo-400">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-xs font-bold">{lang === 'ar' ? 'التغذية المرتدة للتطوير (15%)' : 'Reinvestment (15%)'}</span>
                      </div>
                      <span className="text-2xl font-black text-indigo-300 mt-2 block font-mono">
                        {financeSummary.reinvestmentDue.toLocaleString()} ج.م
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-1">
                        {lang === 'ar' ? 'تُضخ في رأس المال لشراء أدوات وتطوير خدمات' : 'Reinvested in company growth'}
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900 border border-purple-500/30">
                      <div className="flex items-center gap-2 text-purple-400">
                        <Wallet className="w-4 h-4" />
                        <span className="text-xs font-bold">{lang === 'ar' ? 'رأس المال التراكمي المتاح' : 'Available Capital'}</span>
                      </div>
                      <span className="text-2xl font-black text-purple-300 mt-2 block font-mono">
                        {financeSummary.capitalBalance.toLocaleString()} ج.م
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-1">
                        {lang === 'ar' ? 'رأس المال الابتدائي: 5,000 ج.م' : 'Initial capital: 5,000 EGP'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 2: REVENUES & PROJECTS */}
              {financeSubTab === 'revenues' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-black text-white">{lang === 'ar' ? 'سجل المشاريع البرمجية والإيرادات' : 'Software Projects & Revenues'}</h4>
                      <p className="text-xs text-slate-400">{lang === 'ar' ? 'تتبع تفاصيل التعاقد، المبالغ المحصلة، والمتبقي وحالة التسليم' : 'Track contracts, collected amounts and delivery status'}</p>
                    </div>

                    <button
                      onClick={() => {
                        setRevenueForm({
                          id: `rev-${Date.now()}`,
                          project_number: revenues.length + 1,
                          client_name: '',
                          project_name: '',
                          service_type: 'موقع ويب ديناميكي',
                          sale_date: new Date().toISOString().split('T')[0],
                          project_value: 0,
                          collected_amount: 0,
                          status: 'in_progress',
                          delivery_date: '',
                          notes: ''
                        });
                        setIsEditingRevenue(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'إضافة مشروع بيع' : 'Add Project'}</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/90">
                    <table className="w-full text-right text-xs text-slate-300">
                      <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-bold">
                        <tr>
                          <th className="p-3">#</th>
                          <th className="p-3">{lang === 'ar' ? 'العميل' : 'Client'}</th>
                          <th className="p-3">{lang === 'ar' ? 'اسم المشروع' : 'Project Name'}</th>
                          <th className="p-3">{lang === 'ar' ? 'نوع الخدمة' : 'Service Type'}</th>
                          <th className="p-3">{lang === 'ar' ? 'تاريخ البيع' : 'Sale Date'}</th>
                          <th className="p-3">{lang === 'ar' ? 'قيمة المشروع' : 'Total Value'}</th>
                          <th className="p-3">{lang === 'ar' ? 'المحصل' : 'Collected'}</th>
                          <th className="p-3">{lang === 'ar' ? 'المتبقي' : 'Remaining'}</th>
                          <th className="p-3">{lang === 'ar' ? 'الحالة' : 'Status'}</th>
                          <th className="p-3 text-center">{lang === 'ar' ? 'إجراءات' : 'Actions'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 font-medium">
                        {revenues.map((r, idx) => (
                          <tr key={r.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="p-3 font-mono text-slate-500">{r.project_number || idx + 1}</td>
                            <td className="p-3 font-bold text-white">{r.client_name}</td>
                            <td className="p-3 text-slate-200">{r.project_name}</td>
                            <td className="p-3 text-cyan-300">{r.service_type}</td>
                            <td className="p-3 font-mono text-slate-400">{r.sale_date}</td>
                            <td className="p-3 font-mono font-bold text-white">{(Number(r.project_value) || 0).toLocaleString()} ج.م</td>
                            <td className="p-3 font-mono font-bold text-emerald-400">{(Number(r.collected_amount) || 0).toLocaleString()} ج.م</td>
                            <td className="p-3 font-mono font-bold text-red-300">{(Number(r.remaining_amount) || 0).toLocaleString()} ج.م</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                                r.status === 'delivered' ? 'bg-emerald-500/20 text-emerald-300' :
                                r.status === 'completed' ? 'bg-cyan-500/20 text-cyan-300' :
                                r.status === 'cancelled' ? 'bg-red-500/20 text-red-300' :
                                'bg-amber-500/20 text-amber-300'
                              }`}>
                                {r.status === 'delivered' ? (lang === 'ar' ? 'تم التسليم' : 'Delivered') :
                                 r.status === 'completed' ? (lang === 'ar' ? 'مكتمل' : 'Completed') :
                                 r.status === 'cancelled' ? (lang === 'ar' ? 'ملغي' : 'Cancelled') :
                                 (lang === 'ar' ? 'قيد التنفيذ' : 'In Progress')}
                              </span>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => {
                                    setRevenueForm(r);
                                    setIsEditingRevenue(true);
                                  }}
                                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                                  title="تعديل"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteRevenue(r.id)}
                                  className="p-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-400 cursor-pointer"
                                  title="حذف"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* VIEW 3: EXPENSES */}
              {financeSubTab === 'expenses' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-black text-white">{lang === 'ar' ? 'سجل المصروفات والاشتراكات' : 'Expenses & Subscriptions'}</h4>
                      <p className="text-xs text-slate-400">{lang === 'ar' ? 'أدوات الذكاء الاصطناعي، السيرفرات، الدومينات، والمصاريف التشغيلية' : 'AI tools, servers, domains, and operations'}</p>
                    </div>

                    <button
                      onClick={() => {
                        setExpenseForm({
                          id: `exp-${Date.now()}`,
                          expense_number: expenses.length + 1,
                          date: new Date().toISOString().split('T')[0],
                          category: 'أدوات AI',
                          item_name: '',
                          amount: 0,
                          payment_method: 'فودافون كاش',
                          vendor: '',
                          associated_project_id: '',
                          is_recurring: false,
                          notes: ''
                        });
                        setIsEditingExpense(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-400 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'تسجيل مصروف' : 'Add Expense'}</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/90">
                    <table className="w-full text-right text-xs text-slate-300">
                      <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-bold">
                        <tr>
                          <th className="p-3">#</th>
                          <th className="p-3">{lang === 'ar' ? 'التاريخ' : 'Date'}</th>
                          <th className="p-3">{lang === 'ar' ? 'الفئة' : 'Category'}</th>
                          <th className="p-3">{lang === 'ar' ? 'البند / الاشتراك' : 'Item / Subscription'}</th>
                          <th className="p-3">{lang === 'ar' ? 'القيمة' : 'Amount'}</th>
                          <th className="p-3">{lang === 'ar' ? 'طريقة الدفع' : 'Payment Method'}</th>
                          <th className="p-3">{lang === 'ar' ? 'المورد' : 'Supplier'}</th>
                          <th className="p-3 text-center">{lang === 'ar' ? 'إجراءات' : 'Actions'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 font-medium">
                        {expenses.map((e, idx) => (
                          <tr key={e.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="p-3 font-mono text-slate-500">{e.expense_number || idx + 1}</td>
                            <td className="p-3 font-mono text-slate-400">{e.date}</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-cyan-500/15 text-cyan-300">
                                {e.category}
                              </span>
                            </td>
                            <td className="p-3 font-bold text-white">{e.item_name}</td>
                            <td className="p-3 font-mono font-bold text-red-400">{(Number(e.amount) || 0).toLocaleString()} ج.م</td>
                            <td className="p-3 text-slate-300">{e.payment_method}</td>
                            <td className="p-3 text-slate-400">{e.vendor || '—'}</td>
                            <td className="p-3">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => {
                                    setExpenseForm(e);
                                    setIsEditingExpense(true);
                                  }}
                                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteExpense(e.id)}
                                  className="p-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-400 cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* VIEW 4: CAPITAL MOVEMENTS */}
              {financeSubTab === 'capital' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-black text-white">{lang === 'ar' ? 'حركات رأس المال وإعادة الاستثمار' : 'Capital & Reinvestment Movements'}</h4>
                      <p className="text-xs text-slate-400">{lang === 'ar' ? 'رأس المال المبدئي: 5,000 ج.م + حركات الإيداع والسحب' : 'Initial capital: 5,000 EGP + movements'}</p>
                    </div>

                    <button
                      onClick={() => {
                        setCapitalForm({
                          id: `cap-${Date.now()}`,
                          date: new Date().toISOString().split('T')[0],
                          movement_type: 'تغذية مرتدة من الأرباح 15%',
                          description: '',
                          amount: 0,
                          source_ref: 'أرباح المشاريع',
                          notes: ''
                        });
                        setIsEditingCapital(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'تسجيل حركة رأس مال' : 'Add Movement'}</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/90">
                    <table className="w-full text-right text-xs text-slate-300">
                      <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-bold">
                        <tr>
                          <th className="p-3">{lang === 'ar' ? 'التاريخ' : 'Date'}</th>
                          <th className="p-3">{lang === 'ar' ? 'نوع الحركة' : 'Movement Type'}</th>
                          <th className="p-3">{lang === 'ar' ? 'الوصف' : 'Description'}</th>
                          <th className="p-3">{lang === 'ar' ? 'المبلغ' : 'Amount'}</th>
                          <th className="p-3">{lang === 'ar' ? 'الرصيد التراكمي' : 'Cumulative Balance'}</th>
                          <th className="p-3 text-center">{lang === 'ar' ? 'إجراءات' : 'Actions'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 font-medium">
                        {capital.map((c) => (
                          <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="p-3 font-mono text-slate-400">{c.date}</td>
                            <td className="p-3 font-bold text-cyan-300">{c.movement_type}</td>
                            <td className="p-3 text-slate-200">{c.description}</td>
                            <td className="p-3 font-mono font-bold text-white">{(Number(c.amount) || 0).toLocaleString()} ج.م</td>
                            <td className="p-3 font-mono font-black text-purple-400">{(Number(c.cumulative_balance) || 0).toLocaleString()} ج.م</td>
                            <td className="p-3 text-center">
                              <button
                                onClick={() => handleDeleteCapital(c.id)}
                                className="p-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-400 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* VIEW 5: CHARITY 10% */}
              {financeSubTab === 'charity' && financeSummary && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-black text-white">{lang === 'ar' ? 'متابعة وسداد الأعمال الخيرية (10% من الأرباح)' : 'Charity Tracking (10% of Profits)'}</h4>
                      <p className="text-xs text-slate-400">{lang === 'ar' ? 'المستحق الحالي المحسوب تلقائياً: ' + financeSummary.charityDue.toLocaleString() + ' ج.م' : 'Auto-calculated due: ' + financeSummary.charityDue + ' EGP'}</p>
                    </div>

                    <button
                      onClick={() => {
                        setCharityForm({
                          id: `char-${Date.now()}`,
                          date: new Date().toISOString().split('T')[0],
                          due_amount: financeSummary.charityDue,
                          paid_amount: financeSummary.charityRemaining,
                          beneficiary: '',
                          notes: ''
                        });
                        setIsEditingCharity(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'تسجيل سداد صدقة / عمل خيري' : 'Record Charity Payment'}</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/90">
                    <table className="w-full text-right text-xs text-slate-300">
                      <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-bold">
                        <tr>
                          <th className="p-3">{lang === 'ar' ? 'التاريخ' : 'Date'}</th>
                          <th className="p-3">{lang === 'ar' ? 'الجهة / المستفيد' : 'Beneficiary'}</th>
                          <th className="p-3">{lang === 'ar' ? 'المبلغ المدفوع' : 'Paid Amount'}</th>
                          <th className="p-3">{lang === 'ar' ? 'ملاحظات' : 'Notes'}</th>
                          <th className="p-3 text-center">{lang === 'ar' ? 'إجراءات' : 'Actions'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 font-medium">
                        {charity.map((ch) => (
                          <tr key={ch.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="p-3 font-mono text-slate-400">{ch.date}</td>
                            <td className="p-3 font-bold text-amber-300">{ch.beneficiary}</td>
                            <td className="p-3 font-mono font-bold text-emerald-400">{(Number(ch.paid_amount) || 0).toLocaleString()} ج.م</td>
                            <td className="p-3 text-slate-400">{ch.notes || '—'}</td>
                            <td className="p-3 text-center">
                              <button
                                onClick={() => handleDeleteCharity(ch.id)}
                                className="p-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-400 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* VIEW 6: MONTHLY 2026 */}
              {financeSubTab === 'monthly' && financeSummary && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-base font-black text-white">{lang === 'ar' ? 'المتابعة والتحليل المالي الشهري لعام 2026' : 'Monthly Performance Analysis (2026)'}</h4>
                    <p className="text-xs text-slate-400">{lang === 'ar' ? 'جدول يطابق تماماً ورقة Monthly في ملف الإكسيل بحسابات لحظية' : 'Exact match to Excel Monthly analysis'}</p>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/90">
                    <table className="w-full text-right text-xs text-slate-300">
                      <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-bold">
                        <tr>
                          <th className="p-3">{lang === 'ar' ? 'الشهر' : 'Month'}</th>
                          <th className="p-3">{lang === 'ar' ? 'الإيرادات المحصلة' : 'Revenues'}</th>
                          <th className="p-3">{lang === 'ar' ? 'المصروفات' : 'Expenses'}</th>
                          <th className="p-3">{lang === 'ar' ? 'الربح قبل التخصيص' : 'Gross Profit'}</th>
                          <th className="p-3">{lang === 'ar' ? 'أعمال خيرية 10%' : 'Charity 10%'}</th>
                          <th className="p-3">{lang === 'ar' ? 'تغذية مرتدة 15%' : 'Reinvest 15%'}</th>
                          <th className="p-3">{lang === 'ar' ? 'صافي الربح' : 'Net Profit'}</th>
                          <th className="p-3">{lang === 'ar' ? 'هامش الربح %' : 'Margin %'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 font-medium">
                        {financeSummary.monthlyBreakdown.map((m, idx) => (
                          <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                            <td className="p-3 font-bold text-white">{m.monthName}</td>
                            <td className="p-3 font-mono text-emerald-400 font-bold">{m.revenues.toLocaleString()} ج.م</td>
                            <td className="p-3 font-mono text-red-400">{m.expenses.toLocaleString()} ج.م</td>
                            <td className="p-3 font-mono text-cyan-300 font-bold">{m.profitBefore.toLocaleString()} ج.م</td>
                            <td className="p-3 font-mono text-amber-300">{m.charity.toLocaleString()} ج.م</td>
                            <td className="p-3 font-mono text-indigo-300">{m.reinvestment.toLocaleString()} ج.م</td>
                            <td className="p-3 font-mono text-emerald-400 font-bold">{m.netProfit.toLocaleString()} ج.م</td>
                            <td className="p-3 font-mono font-bold text-slate-300">{m.marginPercent}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ==================================================== */}
          {/* 3. PROJECTS TAB (PORTFOLIO) */}
          {/* ==================================================== */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-black text-white">{lang === 'ar' ? 'إدارة معرض الأعمال السابقة' : 'Manage Portfolio Projects'}</h4>
                  <p className="text-xs text-slate-400">{lang === 'ar' ? 'المشاريع الـ 10 المعروضة في واجهة الموقع' : 'Featured showcase portfolio projects'}</p>
                </div>

                <button
                  onClick={handleOpenAddProject}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'إضافة مشروع جديد' : 'Add Project'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((p) => (
                  <div key={p.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between group">
                    <div>
                      <div className="aspect-video rounded-xl overflow-hidden mb-3 bg-slate-950 relative">
                        <img src={p.image_url} alt={p.title_ar} className="w-full h-full object-cover" />
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950/80 text-cyan-300 border border-slate-700">
                          {p.category}
                        </span>
                      </div>
                      <h5 className="font-bold text-white text-sm line-clamp-1">{lang === 'ar' ? p.title_ar : p.title_en}</h5>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">{lang === 'ar' ? p.description_ar : p.description_en}</p>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800">
                      <span className="text-[11px] text-cyan-400 font-mono font-bold truncate max-w-[120px]">
                        {lang === 'ar' ? p.type_ar : p.type_en}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEditProject(p)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                          title="تعديل"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          className="p-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-400 cursor-pointer"
                          title="حذف"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* 4. PACKAGES TAB */}
          {/* ==================================================== */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-black text-white">{lang === 'ar' ? 'إدارة باقات الخدمات والعروض' : 'Manage Packages & Offers'}</h4>
                  <p className="text-xs text-slate-400">{lang === 'ar' ? 'تعديل أسماء ومميزات باقات المواقع والعروض المجمعة' : 'Edit tier features, titles, and highlights'}</p>
                </div>

                <button
                  onClick={handleOpenAddPackage}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'إضافة باقة جديدة' : 'Add Package'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-cyan-500/15 text-cyan-300">
                          {pkg.category}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono font-bold">{pkg.billing_period}</span>
                      </div>
                      <h5 className="font-bold text-white text-base mt-1">{lang === 'ar' ? pkg.name_ar : pkg.name_en}</h5>
                      <p className="text-xs text-slate-400 mt-2 line-clamp-3">{lang === 'ar' ? pkg.description_ar : pkg.description_en}</p>
                    </div>

                    <div className="flex items-center justify-between mt-5 pt-3 border-t border-slate-800">
                      <span className="text-xs font-bold text-emerald-400">
                        {lang === 'ar' ? 'تسعير مخصص بالطلب' : 'Quote on Request'}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEditPackage(pkg)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                          title="تعديل"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* 5. TEAM & MAIN ACCOUNT MANAGEMENT TAB */}
          {/* ==================================================== */}
          {activeTab === 'team' && (
            <div className="space-y-8">
              
              {/* Section 1: Update Main Account Credentials */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-cyan-500/30 space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <Key className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-white">{lang === 'ar' ? 'تعديل بيانات الحساب الرئيسي (المالك / Super Admin)' : 'Update Primary Account Credentials'}</h4>
                    <p className="text-xs text-slate-400">{lang === 'ar' ? 'يمكنك هنا تغيير اسم المستخدم وكلمة المرور لحسابك الرئيسي في أي وقت' : 'Change the primary owner username & password securely'}</p>
                  </div>
                </div>

                <form onSubmit={handleUpdateMainCredentials} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">{lang === 'ar' ? 'اسم المالك' : 'Owner Display Name'}</label>
                    <input
                      type="text"
                      value={mainCredsForm.name}
                      onChange={(e) => setMainCredsForm({ ...mainCredsForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-bold focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">{lang === 'ar' ? 'اسم المستخدم (Username)' : 'Username'}</label>
                    <input
                      type="text"
                      value={mainCredsForm.username}
                      onChange={(e) => setMainCredsForm({ ...mainCredsForm, username: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-bold font-mono focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">{lang === 'ar' ? 'كلمة المرور الجديدة' : 'New Password'}</label>
                    <input
                      type="text"
                      value={mainCredsForm.password}
                      onChange={(e) => setMainCredsForm({ ...mainCredsForm, password: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-bold font-mono focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-3 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'حفظ وتحديث بيانات الحساب الرئيسي' : 'Save Main Account Credentials'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Section 2: Manage Team Members */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-black text-white">{lang === 'ar' ? 'إدارة أعضاء لوحة التحكم والفريق' : 'Admin Panel Members & Team Access'}</h4>
                      <p className="text-xs text-slate-400">{lang === 'ar' ? 'إضافة وتعديل وحذف حسابات الأعضاء الذين يمكنهم الدخول للوحة التحكم' : 'Manage member accounts who can log in to admin panel'}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setMemberForm({
                        id: `admin-${Date.now()}`,
                        username: '',
                        password: '',
                        name: '',
                        role: 'admin',
                        role_title_ar: 'مشرف مشاريع',
                        role_title_en: 'Project Supervisor'
                      });
                      setIsEditingMember(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'إضافة عضو جديد' : 'Add Member'}</span>
                  </button>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
                  <table className="w-full text-right text-xs text-slate-300">
                    <thead className="bg-slate-900 text-slate-400 border-b border-slate-800 font-bold">
                      <tr>
                        <th className="p-3">{lang === 'ar' ? 'الاسم' : 'Name'}</th>
                        <th className="p-3">{lang === 'ar' ? 'اسم المستخدم (Username)' : 'Username'}</th>
                        <th className="p-3">{lang === 'ar' ? 'كلمة المرور' : 'Password'}</th>
                        <th className="p-3">{lang === 'ar' ? 'الدور والصلاحية' : 'Role'}</th>
                        <th className="p-3 text-center">{lang === 'ar' ? 'إجراءات' : 'Actions'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 font-medium">
                      {adminUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-900/40 transition-colors">
                          <td className="p-3 font-bold text-white flex items-center gap-2">
                            <span>{u.name}</span>
                            {u.is_primary && (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                                {lang === 'ar' ? 'الحساب الرئيسي' : 'Primary'}
                              </span>
                            )}
                          </td>
                          <td className="p-3 font-mono text-cyan-300 font-bold">@{u.username}</td>
                          <td className="p-3 font-mono text-slate-400">••••••••</td>
                          <td className="p-3">
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                              u.is_primary ? 'bg-cyan-500/20 text-cyan-300' : 'bg-purple-500/20 text-purple-300'
                            }`}>
                              {u.role_title_ar || u.role}
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => {
                                  setMemberForm(u);
                                  setIsEditingMember(true);
                                }}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                                title="تعديل"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              {!u.is_primary && (
                                <button
                                  onClick={() => handleDeleteMember(u.id)}
                                  className="p-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-400 cursor-pointer"
                                  title="حذف"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ==================================================== */}
          {/* 6. SETTINGS & CLOUD DATABASE TAB */}
          {/* ==================================================== */}
          {activeTab === 'settings' && (
            <div className="max-w-3xl space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-white">{lang === 'ar' ? 'حالة قاعدة بيانات Supabase والسحابة' : 'Supabase Cloud Database Status'}</h4>
                    <p className="text-xs text-slate-400">{lang === 'ar' ? 'قاعدة بيانات PostgreSQL سحابية متزامنة تلقائياً' : 'PostgreSQL cloud database synchronized live'}</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">{lang === 'ar' ? 'رابط خادم Supabase:' : 'Supabase Endpoint:'}</span>
                    <span className="font-mono text-cyan-300">https://iyhwwlzmmakgayhihtje.supabase.co</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">{lang === 'ar' ? 'التخزين المحلي الاحتياطي:' : 'Local Storage Fallback:'}</span>
                    <span className="font-mono text-emerald-400 font-bold">{lang === 'ar' ? 'مفعل ونشط' : 'Active'}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">{lang === 'ar' ? 'تزامن بيانات الماليات والمشاريع:' : 'Finance & Analytics Sync:'}</span>
                    <span className="font-mono text-cyan-400 font-bold">{lang === 'ar' ? 'متزامن لحظياً' : 'Real-time'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* ==================================================== */}
      {/* MODALS SECTION */}
      {/* ==================================================== */}

      {/* 1. Edit Manual Sales Modal */}
      {isEditingSales && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-black text-white">{lang === 'ar' ? 'تسجيل إجمالي المبيعات يدوياً' : 'Record Total Sales'}</h4>
              <button onClick={() => setIsEditingSales(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveManualSales} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-300 font-bold mb-1.5">
                  {lang === 'ar' ? 'أدخل إجمالي المبيعات بالجنيه (اتركه فارغاً للحساب التلقائي من المشاريع):' : 'Enter sales in EGP:'}
                </label>
                <input
                  type="number"
                  value={manualSalesInput}
                  onChange={(e) => setManualSalesInput(e.target.value)}
                  placeholder={lang === 'ar' ? 'مثال: 50000' : 'e.g. 50000'}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono font-bold text-base focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingSales(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-bold"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs cursor-pointer"
                >
                  {lang === 'ar' ? 'حفظ المبيعات' : 'Save Sales'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Revenue (Project) Modal */}
      {isEditingRevenue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-base font-black text-white">{lang === 'ar' ? 'إضافة / تعديل مشروع برمجيات وإيراد' : 'Add / Edit Project Revenue'}</h4>
              <button onClick={() => setIsEditingRevenue(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveRevenue} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'اسم العميل' : 'Client Name'}</label>
                <input
                  type="text"
                  required
                  value={revenueForm.client_name}
                  onChange={(e) => setRevenueForm({ ...revenueForm, client_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'اسم المشروع' : 'Project Name'}</label>
                <input
                  type="text"
                  required
                  value={revenueForm.project_name}
                  onChange={(e) => setRevenueForm({ ...revenueForm, project_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'نوع الخدمة' : 'Service Type'}</label>
                <input
                  type="text"
                  value={revenueForm.service_type}
                  onChange={(e) => setRevenueForm({ ...revenueForm, service_type: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'تاريخ البيع' : 'Sale Date'}</label>
                <input
                  type="date"
                  value={revenueForm.sale_date}
                  onChange={(e) => setRevenueForm({ ...revenueForm, sale_date: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'قيمة المشروع بالجنيه' : 'Project Value (EGP)'}</label>
                <input
                  type="number"
                  required
                  value={revenueForm.project_value}
                  onChange={(e) => setRevenueForm({ ...revenueForm, project_value: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono font-bold focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'المبلغ المحصل بالجنيه' : 'Collected (EGP)'}</label>
                <input
                  type="number"
                  value={revenueForm.collected_amount}
                  onChange={(e) => setRevenueForm({ ...revenueForm, collected_amount: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 font-mono font-bold focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'حالة المشروع' : 'Status'}</label>
                <select
                  value={revenueForm.status}
                  onChange={(e) => setRevenueForm({ ...revenueForm, status: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="in_progress">{lang === 'ar' ? 'قيد التنفيذ' : 'In Progress'}</option>
                  <option value="completed">{lang === 'ar' ? 'مكتمل' : 'Completed'}</option>
                  <option value="delivered">{lang === 'ar' ? 'تم التسليم' : 'Delivered'}</option>
                  <option value="cancelled">{lang === 'ar' ? 'ملغي' : 'Cancelled'}</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'تاريخ التسليم المتوقع' : 'Delivery Date'}</label>
                <input
                  type="date"
                  value={revenueForm.delivery_date}
                  onChange={(e) => setRevenueForm({ ...revenueForm, delivery_date: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'ملاحظات المشروع' : 'Notes'}</label>
                <textarea
                  rows="2"
                  value={revenueForm.notes}
                  onChange={(e) => setRevenueForm({ ...revenueForm, notes: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2 flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditingRevenue(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white font-bold"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black cursor-pointer"
                >
                  {lang === 'ar' ? 'حفظ المشروع' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Expense Modal */}
      {isEditingExpense && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-xl bg-slate-900 border border-red-500/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-base font-black text-white">{lang === 'ar' ? 'تسجيل مصروف جديد' : 'Record Expense'}</h4>
              <button onClick={() => setIsEditingExpense(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveExpense} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'الفئة' : 'Category'}</label>
                <select
                  value={expenseForm.category}
                  onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-red-500 focus:outline-none"
                >
                  <option value="أدوات AI">أدوات AI</option>
                  <option value="استضافات وسيرفرات">استضافات وسيرفرات</option>
                  <option value="دومينات">دومينات</option>
                  <option value="تسويق وإعلانات">تسويق وإعلانات</option>
                  <option value="تراخيص برمجية">تراخيص برمجية</option>
                  <option value="رواتب ومكافآت">رواتب ومكافآت</option>
                  <option value="مصروفات إدارية">مصروفات إدارية</option>
                  <option value="أخرى">أخرى</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'التاريخ' : 'Date'}</label>
                <input
                  type="date"
                  value={expenseForm.date}
                  onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'البند / الاشتراك' : 'Item Name'}</label>
                <input
                  type="text"
                  required
                  value={expenseForm.item_name}
                  onChange={(e) => setExpenseForm({ ...expenseForm, item_name: e.target.value })}
                  placeholder="مثال: Gemini pro 18 شهر"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'القيمة بالجنيه' : 'Amount (EGP)'}</label>
                <input
                  type="number"
                  required
                  value={expenseForm.amount}
                  onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-red-400 font-mono font-bold focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'طريقة الدفع' : 'Payment Method'}</label>
                <select
                  value={expenseForm.payment_method}
                  onChange={(e) => setExpenseForm({ ...expenseForm, payment_method: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-red-500 focus:outline-none"
                >
                  <option value="فودافون كاش">فودافون كاش</option>
                  <option value="انستاباي (InstaPay)">انستاباي (InstaPay)</option>
                  <option value="فيزا / ماستركارد">فيزا / ماستركارد</option>
                  <option value="نقداً (كاش)">نقداً (كاش)</option>
                  <option value="تحويل بنكي">تحويل بنكي</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'المورد / المنصة' : 'Vendor'}</label>
                <input
                  type="text"
                  value={expenseForm.vendor}
                  onChange={(e) => setExpenseForm({ ...expenseForm, vendor: e.target.value })}
                  placeholder="مثال: Service-Hubs / Google"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-red-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2 flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditingExpense(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white font-bold"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-white font-black cursor-pointer"
                >
                  {lang === 'ar' ? 'حفظ المصروف' : 'Save Expense'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Capital Movement Modal */}
      {isEditingCapital && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-slate-900 border border-purple-500/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-base font-black text-white">{lang === 'ar' ? 'تسجيل حركة رأس مال' : 'Log Capital Movement'}</h4>
              <button onClick={() => setIsEditingCapital(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveCapital} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'نوع الحركة' : 'Movement Type'}</label>
                <select
                  value={capitalForm.movement_type}
                  onChange={(e) => setCapitalForm({ ...capitalForm, movement_type: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-purple-500 focus:outline-none"
                >
                  <option value="تغذية مرتدة من الأرباح 15%">تغذية مرتدة من الأرباح 15%</option>
                  <option value="زيادة رأس مال">زيادة رأس مال</option>
                  <option value="سحب أرباح">سحب أرباح</option>
                  <option value="سحب من رأس المال">سحب من رأس المال</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'المبلغ بالجنيه' : 'Amount (EGP)'}</label>
                <input
                  type="number"
                  required
                  value={capitalForm.amount}
                  onChange={(e) => setCapitalForm({ ...capitalForm, amount: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-purple-400 font-mono font-bold focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'الوصف' : 'Description'}</label>
                <input
                  type="text"
                  required
                  value={capitalForm.description}
                  onChange={(e) => setCapitalForm({ ...capitalForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditingCapital(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white font-bold"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-black cursor-pointer"
                >
                  {lang === 'ar' ? 'حفظ الحركة' : 'Save Movement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Charity Payment Modal */}
      {isEditingCharity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-slate-900 border border-amber-500/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-base font-black text-white">{lang === 'ar' ? 'تسجيل سداد للأعمال الخيرية' : 'Record Charity Donation'}</h4>
              <button onClick={() => setIsEditingCharity(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveCharity} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'الجهة المستفيدة' : 'Beneficiary'}</label>
                <input
                  type="text"
                  required
                  value={charityForm.beneficiary}
                  onChange={(e) => setCharityForm({ ...charityForm, beneficiary: e.target.value })}
                  placeholder="مثال: مستشفى 57357 / مؤسسة مصر الخير / عائلة مستحقة"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'المبلغ المدفوع بالجنيه' : 'Paid Amount (EGP)'}</label>
                <input
                  type="number"
                  required
                  value={charityForm.paid_amount}
                  onChange={(e) => setCharityForm({ ...charityForm, paid_amount: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-amber-300 font-mono font-bold focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'ملاحظات' : 'Notes'}</label>
                <input
                  type="text"
                  value={charityForm.notes}
                  onChange={(e) => setCharityForm({ ...charityForm, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditingCharity(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white font-bold"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black cursor-pointer"
                >
                  {lang === 'ar' ? 'حفظ السداد' : 'Save Payment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Member Modal (Add / Edit) */}
      {isEditingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-purple-500/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-base font-black text-white">{lang === 'ar' ? 'بيانات عضو الإدارة' : 'Team Member Credentials'}</h4>
              <button onClick={() => setIsEditingMember(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveMember} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}</label>
                <input
                  type="text"
                  required
                  value={memberForm.name}
                  onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'اسم المستخدم (Username)' : 'Username'}</label>
                <input
                  type="text"
                  required
                  value={memberForm.username}
                  onChange={(e) => setMemberForm({ ...memberForm, username: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono font-bold focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'كلمة المرور' : 'Password'}</label>
                <input
                  type="text"
                  required
                  value={memberForm.password}
                  onChange={(e) => setMemberForm({ ...memberForm, password: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono font-bold focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'الدور الوظيفي' : 'Role'}</label>
                <select
                  value={memberForm.role}
                  onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-purple-500 focus:outline-none"
                >
                  <option value="admin">{lang === 'ar' ? 'مشرف عام' : 'General Admin'}</option>
                  <option value="finance">{lang === 'ar' ? 'مدير مالي وحسابات' : 'Finance Manager'}</option>
                  <option value="sales">{lang === 'ar' ? 'مسؤول مبيعات وعملاء' : 'Sales Executive'}</option>
                  <option value="projects">{lang === 'ar' ? 'مشرف تسليم مشاريع' : 'Projects Lead'}</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditingMember(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white font-bold"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-black cursor-pointer"
                >
                  {lang === 'ar' ? 'حفظ العضو' : 'Save Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Portfolio Project Modal */}
      {isEditingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-base font-black text-white">{lang === 'ar' ? 'تعديل مشروع المعرض' : 'Edit Portfolio Project'}</h4>
              <button onClick={() => setIsEditingProject(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveProject} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'عنوان المشروع (عربي)' : 'Title (AR)'}</label>
                <input
                  type="text"
                  required
                  value={projectForm.title_ar}
                  onChange={(e) => setProjectForm({ ...projectForm, title_ar: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'عنوان المشروع (إنجليزي)' : 'Title (EN)'}</label>
                <input
                  type="text"
                  required
                  value={projectForm.title_en}
                  onChange={(e) => setProjectForm({ ...projectForm, title_en: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'التصنيف' : 'Category'}</label>
                <select
                  value={projectForm.category}
                  onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="web">Web Platform (منصة ويب)</option>
                  <option value="mobile">Android App (تطبيق أندرويد)</option>
                  <option value="enterprise">Enterprise ERP (أنظمة شركات)</option>
                  <option value="api">Backend & API (خوادم سحابية)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'رابط الصورة' : 'Image URL'}</label>
                <input
                  type="text"
                  value={projectForm.image_url}
                  onChange={(e) => setProjectForm({ ...projectForm, image_url: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'التقنيات المستخدمة (مفصولة بفواصل)' : 'Tech Stack'}</label>
                <input
                  type="text"
                  value={projectForm.tech_stack}
                  onChange={(e) => setProjectForm({ ...projectForm, tech_stack: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'الوصف (عربي)' : 'Description (AR)'}</label>
                <textarea
                  rows="2"
                  value={projectForm.description_ar}
                  onChange={(e) => setProjectForm({ ...projectForm, description_ar: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2 flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditingProject(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white font-bold"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black cursor-pointer"
                >
                  {lang === 'ar' ? 'حفظ المشروع' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 8. Package Modal */}
      {isEditingPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-xl bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-base font-black text-white">{lang === 'ar' ? 'تعديل الباقة' : 'Edit Package'}</h4>
              <button onClick={() => setIsEditingPackage(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSavePackage} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'اسم الباقة (عربي)' : 'Package Name (AR)'}</label>
                <input
                  type="text"
                  required
                  value={packageForm.name_ar}
                  onChange={(e) => setPackageForm({ ...packageForm, name_ar: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'شارة الباقة' : 'Badge'}</label>
                <input
                  type="text"
                  value={packageForm.badge_ar}
                  onChange={(e) => setPackageForm({ ...packageForm, badge_ar: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">{lang === 'ar' ? 'المميزات (سطر لكل ميزة)' : 'Features (One per line)'}</label>
                <textarea
                  rows="4"
                  value={packageForm.features_ar}
                  onChange={(e) => setPackageForm({ ...packageForm, features_ar: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none font-sans"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditingPackage(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white font-bold"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black cursor-pointer"
                >
                  {lang === 'ar' ? 'حفظ التعديلات' : 'Save Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
