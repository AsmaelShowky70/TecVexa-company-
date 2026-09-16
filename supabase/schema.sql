-- ==============================================================================
-- TECVEXA Database Schema for Supabase PostgreSQL
-- Project: TECVEXA Tech Solutions & Platforms
-- Database URL: https://iyhwwlzmmakgayhihtje.supabase.co
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Projects Portfolio Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_ar TEXT NOT NULL,
    title_en TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'web', -- 'web', 'mobile', 'enterprise', 'api'
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

-- 3. Services & Pricing Packages Table
CREATE TABLE IF NOT EXISTS public.packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL,
    category TEXT NOT NULL, -- 'website_tier', 'bundle', 'bespoke'
    price_egp NUMERIC NOT NULL,
    price_usd NUMERIC NOT NULL,
    billing_period TEXT DEFAULT 'one_time', -- 'one_time', 'annual', 'custom'
    badge_ar TEXT,
    badge_en TEXT,
    description_ar TEXT,
    description_en TEXT,
    features_ar TEXT[] DEFAULT '{}',
    features_en TEXT[] DEFAULT '{}',
    domain_included TEXT, -- 'مجاني مدى الحياة', 'مدفوع لسنة مجاناً', 'دومين مخصص مدفوع'
    hosting_included TEXT, -- 'استضافة مجانية سريعة', 'استضافة سحابية مدفوعة لسنة'
    database_included TEXT, -- 'قاعدة بيانات مجانية متكاملة', 'قاعدة بيانات سحابية مدفوعة لسنة'
    dashboard_included BOOLEAN DEFAULT true,
    is_popular BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Inquiries & Contact Leads Table
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    company_name TEXT,
    service_id TEXT,
    package_name TEXT,
    budget_range TEXT,
    message TEXT,
    status TEXT DEFAULT 'new', -- 'new', 'contacted', 'closed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Site Settings & Dynamic Key-Value Store
CREATE TABLE IF NOT EXISTS public.settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Admin Users & Team Management Table
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin', -- 'owner', 'admin', 'finance', 'sales', 'projects'
    role_title_ar TEXT,
    role_title_en TEXT,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Finance Revenues (Software Projects) Table
CREATE TABLE IF NOT EXISTS public.finance_revenues (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_number INTEGER,
    client_name TEXT NOT NULL,
    project_name TEXT NOT NULL,
    service_type TEXT,
    sale_date DATE DEFAULT CURRENT_DATE,
    project_value NUMERIC NOT NULL DEFAULT 0,
    collected_amount NUMERIC NOT NULL DEFAULT 0,
    remaining_amount NUMERIC NOT NULL DEFAULT 0,
    status TEXT DEFAULT 'in_progress', -- 'in_progress', 'completed', 'delivered', 'cancelled'
    delivery_date DATE,
    notes TEXT,
    estimated_profit_margin NUMERIC DEFAULT 0.85,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Finance Expenses Table
CREATE TABLE IF NOT EXISTS public.finance_expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    expense_number INTEGER,
    date DATE DEFAULT CURRENT_DATE,
    category TEXT NOT NULL,
    item_name TEXT NOT NULL,
    amount NUMERIC NOT NULL DEFAULT 0,
    payment_method TEXT,
    vendor TEXT,
    associated_project_id TEXT,
    is_recurring BOOLEAN DEFAULT false,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Finance Capital Movements Table
CREATE TABLE IF NOT EXISTS public.finance_capital (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE DEFAULT CURRENT_DATE,
    movement_type TEXT NOT NULL,
    description TEXT NOT NULL,
    amount NUMERIC NOT NULL DEFAULT 0,
    source_ref TEXT,
    associated_project_id TEXT,
    cumulative_balance NUMERIC DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Finance Charity Table (10% of Profits)
CREATE TABLE IF NOT EXISTS public.finance_charity (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE DEFAULT CURRENT_DATE,
    benchmark_profit NUMERIC DEFAULT 0,
    percentage NUMERIC DEFAULT 0.10,
    due_amount NUMERIC DEFAULT 0,
    paid_amount NUMERIC DEFAULT 0,
    beneficiary TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.finance_revenues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.finance_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.finance_capital ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.finance_charity ENABLE ROW LEVEL SECURITY;

-- Read Policies
CREATE POLICY "Public can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public can view packages" ON public.packages FOR SELECT USING (is_active = true);
CREATE POLICY "Public can insert inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can view public settings" ON public.settings FOR SELECT USING (true);

-- Full Access Policies
CREATE POLICY "Allow all actions for authenticated users on projects" ON public.projects FOR ALL USING (true);
CREATE POLICY "Allow all actions for authenticated users on packages" ON public.packages FOR ALL USING (true);
CREATE POLICY "Allow all actions for authenticated users on inquiries" ON public.inquiries FOR ALL USING (true);
CREATE POLICY "Allow all actions for authenticated users on settings" ON public.settings FOR ALL USING (true);
CREATE POLICY "Allow all actions on admin_users" ON public.admin_users FOR ALL USING (true);
CREATE POLICY "Allow all actions on finance_revenues" ON public.finance_revenues FOR ALL USING (true);
CREATE POLICY "Allow all actions on finance_expenses" ON public.finance_expenses FOR ALL USING (true);
CREATE POLICY "Allow all actions on finance_capital" ON public.finance_capital FOR ALL USING (true);
CREATE POLICY "Allow all actions on finance_charity" ON public.finance_charity FOR ALL USING (true);

