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

-- 5. Site Settings Table
CREATE TABLE IF NOT EXISTS public.settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Public can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public can view packages" ON public.packages FOR SELECT USING (is_active = true);
CREATE POLICY "Public can insert inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can view public settings" ON public.settings FOR SELECT USING (true);

-- Admin Full Access Policies (authenticated or specific admin token)
CREATE POLICY "Allow all actions for authenticated users on projects" ON public.projects FOR ALL USING (true);
CREATE POLICY "Allow all actions for authenticated users on packages" ON public.packages FOR ALL USING (true);
CREATE POLICY "Allow all actions for authenticated users on inquiries" ON public.inquiries FOR ALL USING (true);
CREATE POLICY "Allow all actions for authenticated users on settings" ON public.settings FOR ALL USING (true);
