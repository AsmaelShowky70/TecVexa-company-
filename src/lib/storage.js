import { supabase } from './supabase';
import { INITIAL_PROJECTS } from '../data/initialProjects';
import { INITIAL_PACKAGES } from '../data/initialPackages';

const STORAGE_KEYS = {
  PROJECTS: 'tecvexa_projects_v1',
  PACKAGES: 'tecvexa_packages_v1',
  SETTINGS: 'tecvexa_settings_v1',
  ADMIN_USERS: 'tecvexa_admin_users_v1',
  ANALYTICS: 'tecvexa_analytics_v1',
  FINANCE_SETTINGS: 'tecvexa_finance_settings_v1',
  FINANCE_REVENUES: 'tecvexa_finance_revenues_v1',
  FINANCE_EXPENSES: 'tecvexa_finance_expenses_v1',
  FINANCE_CAPITAL: 'tecvexa_finance_capital_v1',
  FINANCE_CHARITY: 'tecvexa_finance_charity_v1'
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
  
  // Seed Admin Users
  if (!localStorage.getItem(STORAGE_KEYS.ADMIN_USERS)) {
    localStorage.setItem(STORAGE_KEYS.ADMIN_USERS, JSON.stringify([
      {
        id: "admin-main-01",
        username: "Asmael",
        password: "Asmael010@#",
        name: "Ismail Mohamed (Showky)",
        role: "owner", // 'owner', 'admin', 'finance', 'sales'
        role_title_ar: "المالك والمدير العام (Super Admin)",
        role_title_en: "Chief Architect & Owner",
        is_primary: true,
        created_at: new Date().toISOString()
      }
    ]));
  }

  // Seed Analytics (Visitors & Sales)
  if (!localStorage.getItem(STORAGE_KEYS.ANALYTICS)) {
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify({
      visitors_count: 384,
      manual_sales_override: null,
      last_updated: new Date().toISOString()
    }));
  }

  // Seed Finance Settings (matching Technical_Services_Project_Manager.xlsx)
  if (!localStorage.getItem(STORAGE_KEYS.FINANCE_SETTINGS)) {
    localStorage.setItem(STORAGE_KEYS.FINANCE_SETTINGS, JSON.stringify({
      initial_capital: 5000,
      charity_percentage: 0.10, // 10%
      reinvestment_percentage: 0.15, // 15%
      currency: "EGP"
    }));
  }

  // Seed Finance Expenses (Gemini Pro entry from Excel)
  if (!localStorage.getItem(STORAGE_KEYS.FINANCE_EXPENSES)) {
    localStorage.setItem(STORAGE_KEYS.FINANCE_EXPENSES, JSON.stringify([
      {
        id: "exp-001",
        expense_number: 1,
        date: "2026-09-01",
        category: "أدوات AI",
        item_name: "Gemini pro 18 شهر",
        amount: 450,
        payment_method: "فودافون كاش",
        vendor: "Service-Hubs",
        associated_project_id: "",
        is_recurring: false,
        notes: "اشتراك الذكاء الاصطناعي للمساعدة البرمجية"
      }
    ]));
  }

  // Seed Finance Revenues (Initial project from inquiries)
  if (!localStorage.getItem(STORAGE_KEYS.FINANCE_REVENUES)) {
    localStorage.setItem(STORAGE_KEYS.FINANCE_REVENUES, JSON.stringify([
      {
        id: "rev-001",
        project_number: 1,
        client_name: "م. أحمد الشناوي",
        project_name: "منصة وتطبيق متجر إلكتروني متكامل",
        service_type: "عرض مجمع (Web & Android Combo)",
        sale_date: "2026-09-10",
        project_value: 12500,
        collected_amount: 8000,
        remaining_amount: 4500,
        status: "in_progress", // 'in_progress', 'completed', 'delivered', 'cancelled'
        delivery_date: "2026-09-30",
        notes: "تم استلام الدفعة الأولى وجاري تجهيز واجهات التطبيق",
        estimated_profit_margin: 0.85
      }
    ]));
  }

  // Seed Finance Capital Movements
  if (!localStorage.getItem(STORAGE_KEYS.FINANCE_CAPITAL)) {
    localStorage.setItem(STORAGE_KEYS.FINANCE_CAPITAL, JSON.stringify([
      {
        id: "cap-001",
        date: "2026-09-01",
        movement_type: "إيداع رأس مال ابتدائي",
        description: "رأس المال المبدئي لتأسيس أنشطة TECVEXA",
        amount: 5000,
        source_ref: "مؤسس الشركة",
        associated_project_id: "",
        notes: "رأس المال المبدئي المعتمد",
        cumulative_balance: 5000
      }
    ]));
  }

  // Seed Charity
  if (!localStorage.getItem(STORAGE_KEYS.FINANCE_CHARITY)) {
    localStorage.setItem(STORAGE_KEYS.FINANCE_CHARITY, JSON.stringify([]));
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
// INQUIRIES API (Internal Storage for Contact Form)
// ==========================================
export const getInquiries = async () => {
  initLocalStorage();
  const raw = localStorage.getItem('tecvexa_inquiries_v1');
  return raw ? JSON.parse(raw) : [];
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
  localStorage.setItem('tecvexa_inquiries_v1', JSON.stringify(updated));

  try {
    if (supabase) {
      await supabase.from('inquiries').insert([newInq]);
    }
  } catch (e) {}

  return newInq;
};

export const updateInquiryStatus = async (id, status) => {
  const current = await getInquiries();
  const updated = current.map(item => item.id === id ? { ...item, status } : item);
  localStorage.setItem('tecvexa_inquiries_v1', JSON.stringify(updated));
  return updated;
};

// ==========================================
// ANALYTICS (VISITOR COUNTER & SALES TRACKING)
// ==========================================
export const recordVisitorCount = async () => {
  initLocalStorage();
  if (typeof window === 'undefined') return;

  // Track uniquely per browsing session
  const sessionVisited = sessionStorage.getItem('tecvexa_visited_flag');
  if (sessionVisited) return;

  sessionStorage.setItem('tecvexa_visited_flag', 'true');
  
  let analytics = { visitors_count: 384, manual_sales_override: null };
  const raw = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
  if (raw) {
    try {
      analytics = JSON.parse(raw);
    } catch (e) {}
  }

  analytics.visitors_count = (analytics.visitors_count || 0) + 1;
  analytics.last_updated = new Date().toISOString();
  localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(analytics));

  // Sync to Supabase settings table if available
  try {
    if (supabase) {
      await supabase.from('settings').upsert({
        key: 'analytics',
        value: analytics,
        updated_at: new Date().toISOString()
      });
    }
  } catch (e) {
    console.warn('Supabase visitor sync error:', e);
  }
};

export const getAnalytics = async () => {
  initLocalStorage();
  let analytics = { visitors_count: 384, manual_sales_override: null };

  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .eq('key', 'analytics')
        .single();
      if (!error && data && data.value) {
        analytics = data.value;
        localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(analytics));
      }
    }
  } catch (e) {}

  const raw = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
  if (raw) {
    try { analytics = JSON.parse(raw); } catch (e) {}
  }

  // Calculate real sales from revenues
  const revenues = await getFinanceRevenues();
  const calculatedSales = revenues.reduce((sum, r) => sum + (Number(r.collected_amount) || 0), 0);
  const totalSales = analytics.manual_sales_override !== null && analytics.manual_sales_override !== undefined
    ? Number(analytics.manual_sales_override)
    : calculatedSales;

  return {
    ...analytics,
    calculatedSales,
    totalSales
  };
};

export const updateTotalSales = async (amount) => {
  const current = await getAnalytics();
  const updated = {
    ...current,
    manual_sales_override: amount !== null && amount !== '' ? Number(amount) : null,
    last_updated: new Date().toISOString()
  };
  localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(updated));

  try {
    if (supabase) {
      await supabase.from('settings').upsert({
        key: 'analytics',
        value: updated,
        updated_at: new Date().toISOString()
      });
    }
  } catch (e) {
    console.warn('Supabase sales update error:', e);
  }

  return updated;
};

// ==========================================
// TECHNICAL SERVICES PROJECT MANAGER & FINANCE
// (Matching Technical_Services_Project_Manager.xlsx)
// ==========================================

export const getFinanceSettings = async () => {
  initLocalStorage();
  const raw = localStorage.getItem(STORAGE_KEYS.FINANCE_SETTINGS);
  return raw ? JSON.parse(raw) : { initial_capital: 5000, charity_percentage: 0.10, reinvestment_percentage: 0.15, currency: "EGP" };
};

export const saveFinanceSettings = async (settings) => {
  localStorage.setItem(STORAGE_KEYS.FINANCE_SETTINGS, JSON.stringify(settings));
  try {
    if (supabase) {
      await supabase.from('settings').upsert({
        key: 'finance_settings',
        value: settings,
        updated_at: new Date().toISOString()
      });
    }
  } catch (e) {}
  return settings;
};

// 1. Revenues / Projects
export const getFinanceRevenues = async () => {
  initLocalStorage();
  const raw = localStorage.getItem(STORAGE_KEYS.FINANCE_REVENUES);
  return raw ? JSON.parse(raw) : [];
};

export const saveFinanceRevenue = async (item) => {
  const current = await getFinanceRevenues();
  const projectValue = Number(item.project_value) || 0;
  const collected = Number(item.collected_amount) || 0;
  const remaining = projectValue - collected;

  const newItem = {
    ...item,
    id: item.id || `rev-${Date.now()}`,
    project_number: item.project_number || current.length + 1,
    project_value: projectValue,
    collected_amount: collected,
    remaining_amount: remaining,
    sale_date: item.sale_date || new Date().toISOString().split('T')[0]
  };

  let updated;
  if (item.id && current.some(r => r.id === item.id)) {
    updated = current.map(r => r.id === item.id ? newItem : r);
  } else {
    updated = [newItem, ...current];
  }

  localStorage.setItem(STORAGE_KEYS.FINANCE_REVENUES, JSON.stringify(updated));
  return updated;
};

export const deleteFinanceRevenue = async (id) => {
  const current = await getFinanceRevenues();
  const updated = current.filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEYS.FINANCE_REVENUES, JSON.stringify(updated));
  return updated;
};

// 2. Expenses
export const getFinanceExpenses = async () => {
  initLocalStorage();
  const raw = localStorage.getItem(STORAGE_KEYS.FINANCE_EXPENSES);
  return raw ? JSON.parse(raw) : [];
};

export const saveFinanceExpense = async (item) => {
  const current = await getFinanceExpenses();
  const newItem = {
    ...item,
    id: item.id || `exp-${Date.now()}`,
    expense_number: item.expense_number || current.length + 1,
    amount: Number(item.amount) || 0,
    date: item.date || new Date().toISOString().split('T')[0]
  };

  let updated;
  if (item.id && current.some(e => e.id === item.id)) {
    updated = current.map(e => e.id === item.id ? newItem : e);
  } else {
    updated = [newItem, ...current];
  }

  localStorage.setItem(STORAGE_KEYS.FINANCE_EXPENSES, JSON.stringify(updated));
  return updated;
};

export const deleteFinanceExpense = async (id) => {
  const current = await getFinanceExpenses();
  const updated = current.filter(e => e.id !== id);
  localStorage.setItem(STORAGE_KEYS.FINANCE_EXPENSES, JSON.stringify(updated));
  return updated;
};

// 3. Capital Movements
export const getFinanceCapital = async () => {
  initLocalStorage();
  const raw = localStorage.getItem(STORAGE_KEYS.FINANCE_CAPITAL);
  return raw ? JSON.parse(raw) : [];
};

export const saveFinanceCapital = async (item) => {
  const current = await getFinanceCapital();
  const settings = await getFinanceSettings();
  const amount = Number(item.amount) || 0;

  const newItem = {
    ...item,
    id: item.id || `cap-${Date.now()}`,
    amount,
    date: item.date || new Date().toISOString().split('T')[0]
  };

  let list = item.id && current.some(c => c.id === item.id)
    ? current.map(c => c.id === item.id ? newItem : c)
    : [...current, newItem];

  // Recalculate cumulative balances
  let running = Number(settings.initial_capital) || 0;
  const updated = list.map(c => {
    if (c.movement_type === "سحب من رأس المال" || c.movement_type === "سحب أرباح") {
      running -= Number(c.amount) || 0;
    } else {
      running += Number(c.amount) || 0;
    }
    return { ...c, cumulative_balance: running };
  });

  localStorage.setItem(STORAGE_KEYS.FINANCE_CAPITAL, JSON.stringify(updated));
  return updated;
};

export const deleteFinanceCapital = async (id) => {
  const current = await getFinanceCapital();
  const settings = await getFinanceSettings();
  const filtered = current.filter(c => c.id !== id);

  let running = Number(settings.initial_capital) || 0;
  const updated = filtered.map(c => {
    if (c.movement_type === "سحب من رأس المال" || c.movement_type === "سحب أرباح") {
      running -= Number(c.amount) || 0;
    } else {
      running += Number(c.amount) || 0;
    }
    return { ...c, cumulative_balance: running };
  });

  localStorage.setItem(STORAGE_KEYS.FINANCE_CAPITAL, JSON.stringify(updated));
  return updated;
};

// 4. Charity Tracker
export const getFinanceCharity = async () => {
  initLocalStorage();
  const raw = localStorage.getItem(STORAGE_KEYS.FINANCE_CHARITY);
  return raw ? JSON.parse(raw) : [];
};

export const saveFinanceCharity = async (item) => {
  const current = await getFinanceCharity();
  const newItem = {
    ...item,
    id: item.id || `char-${Date.now()}`,
    paid_amount: Number(item.paid_amount) || 0,
    due_amount: Number(item.due_amount) || 0,
    date: item.date || new Date().toISOString().split('T')[0]
  };

  const updated = item.id && current.some(c => c.id === item.id)
    ? current.map(c => c.id === item.id ? newItem : c)
    : [newItem, ...current];

  localStorage.setItem(STORAGE_KEYS.FINANCE_CHARITY, JSON.stringify(updated));
  return updated;
};

export const deleteFinanceCharity = async (id) => {
  const current = await getFinanceCharity();
  const updated = current.filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEYS.FINANCE_CHARITY, JSON.stringify(updated));
  return updated;
};

// 5. Complete Financial Summary Calculation
export const calculateFinancialSummary = async () => {
  const [settings, revenues, expenses, capital, charity] = await Promise.all([
    getFinanceSettings(),
    getFinanceRevenues(),
    getFinanceExpenses(),
    getFinanceCapital(),
    getFinanceCharity()
  ]);

  const totalCollectedRevenues = revenues.reduce((acc, r) => acc + (Number(r.collected_amount) || 0), 0);
  const totalProjectValues = revenues.reduce((acc, r) => acc + (Number(r.project_value) || 0), 0);
  const totalRemaining = revenues.reduce((acc, r) => acc + (Number(r.remaining_amount) || 0), 0);
  const totalExpenses = expenses.reduce((acc, e) => acc + (Number(e.amount) || 0), 0);

  // Profit before allocation = Total collected revenue - Total expenses
  const profitBeforeAllocation = totalCollectedRevenues - totalExpenses;

  // Charity (10% of profit if > 0)
  const charityPercentage = Number(settings.charity_percentage) || 0.10;
  const charityDue = Math.max(0, profitBeforeAllocation * charityPercentage);
  const charityPaid = charity.reduce((acc, c) => acc + (Number(c.paid_amount) || 0), 0);
  const charityRemaining = Math.max(0, charityDue - charityPaid);

  // Reinvestment (15% of profit if > 0)
  const reinvestmentPercentage = Number(settings.reinvestment_percentage) || 0.15;
  const reinvestmentDue = Math.max(0, profitBeforeAllocation * reinvestmentPercentage);

  // Net Profit
  const netProfit = Math.max(0, profitBeforeAllocation - charityDue - reinvestmentDue);

  // Capital Balance = Initial Capital + Capital additions - Capital withdrawals
  const initialCap = Number(settings.initial_capital) || 5000;
  const capitalBalance = capital.length > 0 
    ? capital[capital.length - 1].cumulative_balance 
    : initialCap;

  // 12 Months Breakdown for 2026
  const monthNamesAr = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];

  const monthlyBreakdown = monthNamesAr.map((name, index) => {
    const monthNum = index + 1;
    const monthPrefix = `2026-${monthNum < 10 ? '0' : ''}${monthNum}`;

    const mRevenues = revenues
      .filter(r => (r.sale_date || '').startsWith(monthPrefix))
      .reduce((sum, r) => sum + (Number(r.collected_amount) || 0), 0);

    const mExpenses = expenses
      .filter(e => (e.date || '').startsWith(monthPrefix))
      .reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

    const mProfitBefore = mRevenues - mExpenses;
    const mCharity = Math.max(0, mProfitBefore * charityPercentage);
    const mReinvest = Math.max(0, mProfitBefore * reinvestmentPercentage);
    const mNetProfit = mProfitBefore - mCharity - mReinvest;
    const mMargin = mRevenues > 0 ? ((mProfitBefore / mRevenues) * 100).toFixed(1) : 0;

    return {
      monthName: name,
      monthNum,
      revenues: mRevenues,
      expenses: mExpenses,
      profitBefore: mProfitBefore,
      charity: mCharity,
      reinvestment: mReinvest,
      netProfit: mNetProfit,
      marginPercent: mMargin
    };
  });

  return {
    settings,
    totalCollectedRevenues,
    totalProjectValues,
    totalRemaining,
    totalExpenses,
    profitBeforeAllocation,
    charityDue,
    charityPaid,
    charityRemaining,
    reinvestmentDue,
    netProfit,
    capitalBalance,
    projectsCount: revenues.length,
    monthlyBreakdown
  };
};

// ==========================================
// ADMIN USERS & TEAM ACCESS API
// ==========================================
export const getAdminUsers = async () => {
  initLocalStorage();
  const raw = localStorage.getItem(STORAGE_KEYS.ADMIN_USERS);
  return raw ? JSON.parse(raw) : [];
};

export const saveAdminUser = async (user) => {
  const current = await getAdminUsers();
  const newUser = {
    ...user,
    id: user.id || `admin-${Date.now()}`,
    is_primary: user.is_primary || false,
    created_at: user.created_at || new Date().toISOString()
  };

  let updated;
  if (user.id && current.some(u => u.id === user.id)) {
    updated = current.map(u => u.id === user.id ? newUser : u);
  } else {
    updated = [...current, newUser];
  }

  localStorage.setItem(STORAGE_KEYS.ADMIN_USERS, JSON.stringify(updated));

  // Sync to Supabase if settings table available
  try {
    if (supabase) {
      await supabase.from('settings').upsert({
        key: 'admin_users',
        value: updated,
        updated_at: new Date().toISOString()
      });
    }
  } catch (e) {}

  return updated;
};

export const deleteAdminUser = async (id) => {
  const current = await getAdminUsers();
  // Protect primary account from deletion
  const target = current.find(u => u.id === id);
  if (target && target.is_primary) {
    throw new Error("لا يمكن حذف الحساب الرئيسي للمالك.");
  }

  const updated = current.filter(u => u.id !== id);
  localStorage.setItem(STORAGE_KEYS.ADMIN_USERS, JSON.stringify(updated));

  try {
    if (supabase) {
      await supabase.from('settings').upsert({
        key: 'admin_users',
        value: updated,
        updated_at: new Date().toISOString()
      });
    }
  } catch (e) {}

  return updated;
};

export const updateMainAccountCredentials = async (newUsername, newPassword, newName) => {
  const users = await getAdminUsers();
  const primaryIdx = users.findIndex(u => u.is_primary || u.username === "Asmael");

  if (primaryIdx === -1) {
    // If not found, create it
    const primary = {
      id: "admin-main-01",
      username: newUsername.trim(),
      password: newPassword.trim(),
      name: newName || "Ismail Mohamed (Showky)",
      role: "owner",
      role_title_ar: "المالك والمدير العام (Super Admin)",
      role_title_en: "Chief Architect & Owner",
      is_primary: true,
      created_at: new Date().toISOString()
    };
    users.unshift(primary);
  } else {
    users[primaryIdx] = {
      ...users[primaryIdx],
      username: newUsername.trim(),
      password: newPassword.trim(),
      name: newName || users[primaryIdx].name,
      updated_at: new Date().toISOString()
    };
  }

  localStorage.setItem(STORAGE_KEYS.ADMIN_USERS, JSON.stringify(users));

  // Update current session if user is logged in
  const sessionRaw = localStorage.getItem('tecvexa_admin_session_v1');
  if (sessionRaw) {
    try {
      const session = JSON.parse(sessionRaw);
      session.username = newUsername.trim();
      if (newName) session.name = newName;
      localStorage.setItem('tecvexa_admin_session_v1', JSON.stringify(session));
    } catch (e) {}
  }

  return users;
};

export const authenticateAdmin = async (username, password) => {
  initLocalStorage();
  const users = await getAdminUsers();
  const user = users.find(
    u => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password.trim()
  );

  if (user) {
    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        role_title_ar: user.role_title_ar || "عضو إدارة",
        role_title_en: user.role_title_en || "Staff Member",
        is_primary: !!user.is_primary,
        authenticated: true,
        loginAt: new Date().toISOString()
      }
    };
  }

  return {
    success: false,
    error: "اسم المستخدم أو كلمة المرور غير صحيحة"
  };
};
