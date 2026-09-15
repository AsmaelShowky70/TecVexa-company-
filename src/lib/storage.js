import { supabase } from './supabase';
import { INITIAL_PROJECTS } from '../data/initialProjects';
import { INITIAL_PACKAGES } from '../data/initialPackages';

const STORAGE_KEYS = {
  PROJECTS: 'tecvexa_projects_v1',
  PACKAGES: 'tecvexa_packages_v1',
  INQUIRIES: 'tecvexa_inquiries_v1',
  SETTINGS: 'tecvexa_settings_v1',
};

// Seed initial local storage if not already present
export const initLocalStorage = () => {
  if (typeof window === 'undefined') return;
  
  if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(INITIAL_PROJECTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PACKAGES)) {
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(INITIAL_PACKAGES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.INQUIRIES)) {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify([
      {
        id: "inq-demo-01",
        client_name: "م. أحمد الشناوي",
        phone: "01099887766",
        email: "ahmed@example.com",
        service_interest: "عرض موقع ويب + تطبيق أندرويد (Combo)",
        budget_range: "12,500 ج.م",
        message: "نرغب في تدشين منصة وتطبيق لمتجر إلكتروني مع نظام توصيل سريع وتتبع للطلبات.",
        status: "new",
        created_at: new Date(Date.now() - 3600000 * 5).toISOString()
      },
      {
        id: "inq-demo-02",
        client_name: "د. هاني رضوان (مركز الحياة الطبي)",
        phone: "01122334455",
        email: "dr.hani@alhayat.com",
        service_interest: "موقع ويب ديناميكي (باقة Pro Business)",
        budget_range: "5,900 ج.م",
        message: "بحاجة لموقع طبي وحجز كشوفات مثل مشروع Health Care Clinic السابق لديكم.",
        status: "contacted",
        created_at: new Date(Date.now() - 86400000).toISOString()
      }
    ]));
  }
};

// ==========================================
// PROJECTS API
// ==========================================
export const getProjects = async () => {
  initLocalStorage();
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });
      if (!error && data && data.length > 0) {
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(data));
        return data;
      }
    }
  } catch (err) {
    console.warn('Supabase fetch failed, falling back to local store:', err);
  }

  const local = localStorage.getItem(STORAGE_KEYS.PROJECTS);
  return local ? JSON.parse(local) : INITIAL_PROJECTS;
};

export const saveProject = async (project) => {
  const current = await getProjects();
  let updated;
  if (project.id && current.some(p => p.id === project.id)) {
    updated = current.map(p => p.id === project.id ? { ...p, ...project } : p);
  } else {
    const newProj = {
      ...project,
      id: project.id || `proj-${Date.now()}`,
      display_order: current.length + 1,
      created_at: new Date().toISOString()
    };
    updated = [newProj, ...current];
  }
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));

  // Sync to Supabase if available
  try {
    if (supabase) {
      await supabase.from('projects').upsert(project);
    }
  } catch (e) {
    console.warn('Supabase sync warning:', e);
  }

  return updated;
};

export const deleteProject = async (id) => {
  const current = await getProjects();
  const filtered = current.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(filtered));

  try {
    if (supabase) {
      await supabase.from('projects').delete().eq('id', id);
    }
  } catch (e) {
    console.warn('Supabase delete warning:', e);
  }

  return filtered;
};

// ==========================================
// PACKAGES & PRICING API
// ==========================================
export const getPackages = async () => {
  initLocalStorage();
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .order('display_order', { ascending: true });
      if (!error && data && data.length > 0) {
        localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(data));
        return data;
      }
    }
  } catch (err) {
    console.warn('Supabase fetch failed, using local store:', err);
  }

  const local = localStorage.getItem(STORAGE_KEYS.PACKAGES);
  return local ? JSON.parse(local) : INITIAL_PACKAGES;
};

export const savePackage = async (pkg) => {
  const current = await getPackages();
  let updated;
  if (pkg.id && current.some(p => p.id === pkg.id)) {
    updated = current.map(p => p.id === pkg.id ? { ...p, ...pkg } : p);
  } else {
    const newPkg = {
      ...pkg,
      id: pkg.id || `pkg-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    updated = [...current, newPkg];
  }
  localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(updated));

  try {
    if (supabase) {
      await supabase.from('packages').upsert(pkg);
    }
  } catch (e) {
    console.warn('Supabase package sync warning:', e);
  }

  return updated;
};

// ==========================================
// INQUIRIES API
// ==========================================
export const getInquiries = async () => {
  initLocalStorage();
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(data));
        return data;
      }
    }
  } catch (err) {
    console.warn('Supabase inquiries fetch failed:', err);
  }

  const local = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
  return local ? JSON.parse(local) : [];
};

export const addInquiry = async (inquiry) => {
  const current = await getInquiries();
  const newInq = {
    ...inquiry,
    id: `inq-${Date.now()}`,
    status: 'new',
    created_at: new Date().toISOString()
  };
  const updated = [newInq, ...current];
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));

  try {
    if (supabase) {
      await supabase.from('inquiries').insert([newInq]);
    }
  } catch (e) {
    console.warn('Supabase inquiry insert warning:', e);
  }

  return newInq;
};

export const updateInquiryStatus = async (id, status) => {
  const current = await getInquiries();
  const updated = current.map(item => item.id === id ? { ...item, status } : item);
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));

  try {
    if (supabase) {
      await supabase.from('inquiries').update({ status }).eq('id', id);
    }
  } catch (e) {
    console.warn('Supabase inquiry update warning:', e);
  }

  return updated;
};
