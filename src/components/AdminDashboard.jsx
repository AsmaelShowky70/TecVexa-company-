import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  getProjects, 
  saveProject, 
  deleteProject,
  getPackages,
  savePackage,
  getInquiries,
  updateInquiryStatus
} from '../lib/storage';
import { 
  ShieldCheck, 
  LogOut, 
  Layers, 
  DollarSign, 
  Mail, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  CheckCircle, 
  ExternalLink,
  Database, 
  Copy, 
  Sparkles,
  MessageCircle,
  Tag,
  ArrowRight
} from 'lucide-react';
import { GithubIcon } from './Icons';
import logoImg from '../assets/logo.jpeg';

export const AdminDashboard = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const { t, lang, isRtl } = useLanguage();

  const [activeTab, setActiveTab] = useState('overview');
  const [projects, setProjects] = useState([]);
  const [packages, setPackages] = useState([]);
  const [inquiries, setInquiries] = useState([]);

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
    price_egp: 0,
    price_usd: 0,
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

  useEffect(() => {
    if (isOpen) {
      loadAllData();
    }
  }, [isOpen]);

  const loadAllData = async () => {
    const [projs, pkgs, inqs] = await Promise.all([
      getProjects(),
      getPackages(),
      getInquiries()
    ]);
    setProjects(projs);
    setPackages(pkgs);
    setInquiries(inqs);
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
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
      price_egp: 5000,
      price_usd: 110,
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
      price_egp: Number(packageForm.price_egp),
      price_usd: Number(packageForm.price_usd),
      features_ar: packageForm.features_ar.split('\n').map(s => s.trim()).filter(Boolean),
      features_en: packageForm.features_en.split('\n').map(s => s.trim()).filter(Boolean),
    };
    const updated = await savePackage(payload);
    setPackages(updated);
    setIsEditingPackage(false);
    showToast(t.admin.savedToast);
  };

  // ==========================
  // INQUIRIES ACTIONS
  // ==========================
  const handleStatusChange = async (id, newStatus) => {
    const updated = await updateInquiryStatus(id, newStatus);
    setInquiries(updated);
    showToast(isRtl ? "تم تحديث حالة الطلب" : "Status updated");
  };

  const handleReplyWhatsApp = (phone, name) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const fullPhone = cleanPhone.startsWith('20') ? cleanPhone : (cleanPhone.startsWith('0') ? '2' + cleanPhone : '20' + cleanPhone);
    const msg = encodeURIComponent(`مرحباً أستاذ ${name}، بخصوص طلبكم عبر منصة TECVEXA للحلول التقنية، يسعدنا التواصل معكم...`);
    window.open(`https://wa.me/${fullPhone}?text=${msg}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-2xl animate-fade-in">
      <div className="relative w-full max-w-6xl rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden flex flex-col h-[94vh]">
        
        {/* Top Admin Bar */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/90 gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-cyan-400 to-emerald-400">
              <img src={logoImg} alt="TECVEXA" className="w-full h-full object-cover rounded-[10px]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white">
                  {t.admin.panelTitle}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  ADMIN: Asmael
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {t.admin.welcome} <span className="text-white font-bold">{user?.name || "Ismail Mohamed"}</span> ({t.admin.role})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-red-300 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t.admin.logout}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Toast Alert */}
        {toastMsg && (
          <div className="px-6 py-2 bg-emerald-500/20 border-b border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-slate-800 bg-slate-900/80 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'overview' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {t.admin.tabOverview}
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'projects' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {t.admin.tabProjects} ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('pricing')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'pricing' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {t.admin.tabPricing} ({packages.length})
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'inquiries' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {t.admin.tabInquiries} ({inquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'settings' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {t.admin.tabSettings}
          </button>
        </div>

        {/* Dashboard Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-950/60">
          
          {/* ==================================================== */}
          {/* 1. OVERVIEW TAB */}
          {/* ==================================================== */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">{t.admin.totalProjects}</span>
                    <span className="text-3xl font-black text-white mt-1 block">{projects.length}</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Layers className="w-6 h-6" />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">{t.admin.totalPackages}</span>
                    <span className="text-3xl font-black text-emerald-400 mt-1 block">{packages.length}</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <DollarSign className="w-6 h-6" />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">{t.admin.totalInquiries}</span>
                    <span className="text-3xl font-black text-amber-400 mt-1 block">{inquiries.length}</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Mail className="w-6 h-6" />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">{t.admin.supabaseStatus}</span>
                    <span className="text-xs font-black text-cyan-300 mt-1 block font-mono">
                      {t.admin.statusConnected}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <Database className="w-6 h-6" />
                  </div>
                </div>

              </div>

              {/* Quick Actions & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    {isRtl ? "إجراءات سريعة للمدير" : "Quick Administrative Actions"}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={handleOpenAddProject}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/60 text-slate-200 hover:text-white flex items-center gap-2.5 text-xs font-bold transition-all text-left"
                    >
                      <Plus className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{t.admin.addNewProject}</span>
                    </button>
                    <button
                      onClick={handleOpenAddPackage}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/60 text-slate-200 hover:text-white flex items-center gap-2.5 text-xs font-bold transition-all text-left"
                    >
                      <Plus className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{t.admin.addNewPackage}</span>
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    {isRtl ? "أحدث طلبات التواصل الواردة" : "Latest Client Inquiries"}
                  </h4>
                  <div className="space-y-2">
                    {inquiries.slice(0, 3).map((inq) => (
                      <div key={inq.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-white block">{inq.client_name}</span>
                          <span className="text-slate-400 font-mono" dir="ltr">{inq.phone}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          inq.status === 'new' ? 'bg-red-500/20 text-red-300' : 'bg-emerald-500/20 text-emerald-300'
                        }`}>
                          {inq.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ==================================================== */}
          {/* 2. MANAGE PROJECTS TAB */}
          {/* ==================================================== */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {isRtl ? "إدارة المشاريع والأعمال السابقة" : "Portfolio Archive Manager"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isRtl ? "تعديل، حذف، أو إضافة مشاريع جديدة إلى قائمة الأعمال." : "Add, modify, or remove showcase projects."}
                  </p>
                </div>
                <button
                  onClick={handleOpenAddProject}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.admin.addNewProject}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((p, idx) => (
                  <div
                    key={p.id || idx}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                            {p.category}
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            #{idx + 1}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white mt-1.5">
                          {lang === 'ar' ? p.title_ar : p.title_en}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                          {lang === 'ar' ? p.description_ar : p.description_en}
                        </p>
                      </div>

                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-950">
                        <img src={p.image_url} alt="" className="w-full h-full object-cover" />
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {p.live_url && (
                          <a
                            href={p.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-slate-400 hover:text-cyan-400"
                            title="Live Demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        {p.repo_url && (
                          <a
                            href={p.repo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-slate-400 hover:text-white"
                            title="GitHub"
                          >
                            <GithubIcon className="w-4 h-4" />
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEditProject(p)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-300"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>{t.admin.edit}</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-xs font-bold text-red-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{t.admin.delete}</span>
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ==================================================== */}
          {/* 3. MANAGE PRICING & PACKAGES TAB */}
          {/* ==================================================== */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {isRtl ? "إدارة أسعار الباقات والعروض" : "Pricing & Service Packages"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isRtl ? "تعديل أسعار باقات الويب وعروض الأندرويد أو إضافة خدمات جديدة." : "Modify prices, features, and launch new offers."}
                  </p>
                </div>
                <button
                  onClick={handleOpenAddPackage}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.admin.addNewPackage}</span>
                </button>
              </div>

              <div className="space-y-4">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-slate-700 transition-all"
                  >
                    <div className="space-y-1 max-w-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-emerald-300">
                          {pkg.category}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {pkg.billing_period}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white">
                        {lang === 'ar' ? pkg.name_ar : pkg.name_en}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-1">
                        {lang === 'ar' ? pkg.description_ar : pkg.description_en}
                      </p>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <span className="text-2xl font-black text-white">
                          {pkg.price_egp.toLocaleString()}
                        </span>
                        <span className="text-xs font-bold text-slate-400 ml-1">ج.م</span>
                        <div className="text-[11px] text-slate-400 font-mono">
                          (${pkg.price_usd} USD)
                        </div>
                      </div>

                      <button
                        onClick={() => handleOpenEditPackage(pkg)}
                        className="flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-emerald-300"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{t.admin.edit}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ==================================================== */}
          {/* 4. INQUIRIES TAB */}
          {/* ==================================================== */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              
              <div>
                <h3 className="text-lg font-bold text-white">
                  {isRtl ? "طلبات المشاريع والتواصل الواردة" : "Customer Leads & Inquiries"}
                </h3>
                <p className="text-xs text-slate-400">
                  {isRtl ? "تواصل مباشرة مع العملاء عبر واتساب لتأكيد طلباتهم وتحديد الأسعار." : "Direct WhatsApp messaging to close client project requests."}
                </p>
              </div>

              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h4 className="text-base font-bold text-white">
                          {inq.client_name}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                          <span className="font-mono text-cyan-300" dir="ltr">{inq.phone}</span>
                          {inq.email && <span>• {inq.email}</span>}
                          <span>• {new Date(inq.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={inq.status}
                          onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                          className="py-1.5 px-3 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        >
                          <option value="new">New (جديد)</option>
                          <option value="contacted">Contacted (تم التواصل)</option>
                          <option value="closed">Closed (مكتمل)</option>
                        </select>

                        <button
                          onClick={() => handleReplyWhatsApp(inq.phone, inq.client_name)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-xs font-bold border border-emerald-500/40"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{t.admin.openWhatsApp}</span>
                        </button>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
                      <div className="text-[11px] text-cyan-400 font-bold mb-1">
                        {isRtl ? "الخدمة المطلوبة:" : "Service Requested:"} {inq.service_interest || "استفسار عام"}
                      </div>
                      <p className="leading-relaxed whitespace-pre-wrap">{inq.message}</p>
                    </div>

                  </div>
                ))}

                {inquiries.length === 0 && (
                  <div className="text-center py-12 text-slate-400 text-sm">
                    {isRtl ? "لا توجد طلبات جديدة حالياً." : "No incoming inquiries yet."}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* ==================================================== */}
          {/* 5. CLOUD & SETTINGS TAB */}
          {/* ==================================================== */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-4xl">
              
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {isRtl ? "معلومات الربط السحابي (Supabase Cloud)" : "Supabase Cloud Architecture"}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {isRtl ? "المنصة متصلة وجاهزة للمزامنة السحابية." : "Connected with fallback local storage sync."}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Supabase URL:</span>
                    <span className="text-cyan-300">https://iyhwwlzmmakgayhihtje.supabase.co</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Project Reference:</span>
                    <span className="text-emerald-300">iyhwwlzmmakgayhihtje</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">PostgreSQL Host:</span>
                    <span className="text-indigo-300">db.iyhwwlzmmakgayhihtje.supabase.co:5432</span>
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isRtl 
                      ? "لإنشاء الجداول وحفظ المشاريع والباقات في حسابك على Supabase بنقرة واحدة، اضغط على زر فتح لوحة Supabase SQL والصق الكود واضغط Run:"
                      : "To create tables and sync live data in your Supabase project, click below to open Supabase SQL Editor, paste the SQL schema and hit Run:"}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href="https://supabase.com/dashboard/project/iyhwwlzmmakgayhihtje/sql"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all shadow-md"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>{isRtl ? "فتح Supabase SQL Editor" : "Open Supabase SQL Editor"}</span>
                    </a>

                    <button
                      onClick={() => {
                        const sql = `-- TECVEXA Database Schema
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title_ar TEXT NOT NULL,
  title_en TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'web',
  type_ar TEXT NOT NULL,
  type_en TEXT NOT NULL,
  tech_stack TEXT[] DEFAULT '{}',
  description_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  highlights_ar TEXT[] DEFAULT '{}',
  highlights_en TEXT[] DEFAULT '{}',
  live_url TEXT,
  repo_url TEXT,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.packages (
  id TEXT PRIMARY KEY,
  slug TEXT,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  category TEXT NOT NULL,
  price_egp NUMERIC NOT NULL,
  price_usd NUMERIC NOT NULL,
  billing_period TEXT,
  badge_ar TEXT,
  badge_en TEXT,
  description_ar TEXT,
  description_en TEXT,
  features_ar TEXT[] DEFAULT '{}',
  features_en TEXT[] DEFAULT '{}',
  domain_included_ar TEXT,
  domain_included_en TEXT,
  hosting_included_ar TEXT,
  hosting_included_en TEXT,
  database_included_ar TEXT,
  database_included_en TEXT,
  dashboard_included BOOLEAN DEFAULT true,
  is_popular BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.inquiries (
  id TEXT PRIMARY KEY,
  client_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service_interest TEXT,
  budget_range TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public read packages" ON public.packages FOR SELECT USING (true);
CREATE POLICY "Public insert inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all on projects" ON public.projects FOR ALL USING (true);
CREATE POLICY "Allow all on packages" ON public.packages FOR ALL USING (true);
CREATE POLICY "Allow all on inquiries" ON public.inquiries FOR ALL USING (true);
`;
                        navigator.clipboard.writeText(sql);
                        showToast(isRtl ? "تم نسخ كود SQL بنجاح! الصقه في Supabase واضغط Run" : "SQL copied! Paste into Supabase and click Run");
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all"
                    >
                      <Copy className="w-4 h-4 text-cyan-400" />
                      <span>{isRtl ? "نسخ كود SQL الكامل" : "Copy Complete SQL Script"}</span>
                    </button>
                  </div>
                </div>

                {/* Secret Admin Access Instructions */}
                <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    {isRtl ? "🔒 طرق الدخول السرية للوحة التحكم (المخفية عن العلن):" : "🔒 Secret Ways to Access This Hidden Panel:"}
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                    <li>{isRtl ? "كتابة #admin في نهاية رابط الموقع (مثال: mysite.com/#admin)" : "Add #admin to URL (e.g., site.com/#admin)"}</li>
                    <li>{isRtl ? "الضغط على اختصار لوحة المفاتيح: Ctrl + Shift + A من أي صفحة" : "Press keyboard shortcut: Ctrl + Shift + A on any page"}</li>
                    <li>{isRtl ? "الضغط على شعار الشركة (اللوجو) 5 مرات متتالية سريعة" : "Click company logo 5 times in quick succession"}</li>
                  </ul>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* ==================================================== */}
      {/* EDIT / ADD PROJECT MODAL */}
      {/* ==================================================== */}
      {isEditingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/90 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {isRtl ? "بيانات المشروع" : "Project Details"}
              </h3>
              <button onClick={() => setIsEditingProject(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">اسم المشروع (عربي) *</label>
                  <input
                    type="text"
                    required
                    value={projectForm.title_ar}
                    onChange={(e) => setProjectForm({ ...projectForm, title_ar: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Project Title (EN) *</label>
                  <input
                    type="text"
                    required
                    value={projectForm.title_en}
                    onChange={(e) => setProjectForm({ ...projectForm, title_en: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">التصنيف (Category)</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  >
                    <option value="web">Web Application (موقع ويب)</option>
                    <option value="mobile">Mobile App (تطبيق أندرويد/موبايل)</option>
                    <option value="enterprise">Enterprise System (نظام صناعي/شركات)</option>
                    <option value="api">Backend API (خادم وواجهة برمجية)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">التقنيات (مفصولة بفواصل)</label>
                  <input
                    type="text"
                    value={projectForm.tech_stack}
                    onChange={(e) => setProjectForm({ ...projectForm, tech_stack: e.target.value })}
                    placeholder="React 19, Tailwind, Supabase"
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">رابط المعاينة الحية (Live URL)</label>
                  <input
                    type="url"
                    value={projectForm.live_url}
                    onChange={(e) => setProjectForm({ ...projectForm, live_url: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">رابط GitHub Repo</label>
                  <input
                    type="url"
                    value={projectForm.repo_url}
                    onChange={(e) => setProjectForm({ ...projectForm, repo_url: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">رابط الصورة (Image URL)</label>
                <input
                  type="url"
                  value={projectForm.image_url}
                  onChange={(e) => setProjectForm({ ...projectForm, image_url: e.target.value })}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">الوصف بالعربية *</label>
                <textarea
                  rows={2}
                  required
                  value={projectForm.description_ar}
                  onChange={(e) => setProjectForm({ ...projectForm, description_ar: e.target.value })}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Description in English *</label>
                <textarea
                  rows={2}
                  required
                  value={projectForm.description_en}
                  onChange={(e) => setProjectForm({ ...projectForm, description_en: e.target.value })}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white resize-none"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditingProject(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white"
                >
                  {t.admin.cancel}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                >
                  {t.admin.saveChanges}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* EDIT / ADD PACKAGE MODAL */}
      {/* ==================================================== */}
      {isEditingPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/90 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {isRtl ? "تعديل الباقة والسعر" : "Package & Price Editor"}
              </h3>
              <button onClick={() => setIsEditingPackage(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePackage} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">اسم الباقة (عربي) *</label>
                  <input
                    type="text"
                    required
                    value={packageForm.name_ar}
                    onChange={(e) => setPackageForm({ ...packageForm, name_ar: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Package Name (EN) *</label>
                  <input
                    type="text"
                    required
                    value={packageForm.name_en}
                    onChange={(e) => setPackageForm({ ...packageForm, name_en: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">السعر بالجنيه (EGP) *</label>
                  <input
                    type="number"
                    required
                    value={packageForm.price_egp}
                    onChange={(e) => setPackageForm({ ...packageForm, price_egp: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">السعر بالدولار (USD) *</label>
                  <input
                    type="number"
                    required
                    value={packageForm.price_usd}
                    onChange={(e) => setPackageForm({ ...packageForm, price_usd: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">نوع الدومين المشمول</label>
                  <input
                    type="text"
                    value={packageForm.domain_included_ar}
                    onChange={(e) => setPackageForm({ ...packageForm, domain_included_ar: e.target.value })}
                    placeholder="دومين مدفوع لسنة مجاناً"
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">نوع الاستضافة المشمولة</label>
                  <input
                    type="text"
                    value={packageForm.hosting_included_ar}
                    onChange={(e) => setPackageForm({ ...packageForm, hosting_included_ar: e.target.value })}
                    placeholder="استضافة سحابية سريعة"
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">المميزات (كل ميزة في سطر)</label>
                <textarea
                  rows={4}
                  value={packageForm.features_ar}
                  onChange={(e) => setPackageForm({ ...packageForm, features_ar: e.target.value })}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white resize-none"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditingPackage(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white"
                >
                  {t.admin.cancel}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                >
                  {t.admin.saveChanges}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
