import pkg from 'pg';
const { Client } = pkg;
import { INITIAL_PROJECTS } from '../src/data/initialProjects.js';
import { INITIAL_PACKAGES } from '../src/data/initialPackages.js';

async function runMigration() {
  console.log('🚀 Connecting directly to Supabase Cloud PostgreSQL Database (aws-1-eu-west-1)...');
  const client = new Client({
    host: 'aws-1-eu-west-1.pooler.supabase.com',
    port: 5432,
    user: 'postgres.iyhwwlzmmakgayhihtje',
    password: process.env.SUPABASE_DB_PASSWORD || 'Asmael010@#',
    database: 'postgres',
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Connected successfully to your Supabase project (iyhwwlzmmakgayhihtje)!');

    // 1. Recreate Tables Cleanly
    console.log('📦 Establishing tables in Supabase...');
    await client.query(`
      DROP TABLE IF EXISTS public.inquiries, public.packages, public.projects CASCADE;
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

      CREATE TABLE public.projects (
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

      -- Enable Row Level Security
      ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

      -- Create Read and Write Policies
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'projects' AND policyname = 'Public read projects') THEN
          CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'packages' AND policyname = 'Public read packages') THEN
          CREATE POLICY "Public read packages" ON public.packages FOR SELECT USING (true);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'inquiries' AND policyname = 'Public insert inquiries') THEN
          CREATE POLICY "Public insert inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'projects' AND policyname = 'Allow all actions on projects') THEN
          CREATE POLICY "Allow all actions on projects" ON public.projects FOR ALL USING (true);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'packages' AND policyname = 'Allow all actions on packages') THEN
          CREATE POLICY "Allow all actions on packages" ON public.packages FOR ALL USING (true);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'inquiries' AND policyname = 'Allow all actions on inquiries') THEN
          CREATE POLICY "Allow all actions on inquiries" ON public.inquiries FOR ALL USING (true);
        END IF;
      END
      $$;
    `);
    console.log('✅ Tables and Security Policies successfully created!');

    // 2. Insert all 10 projects
    console.log('📂 Seeding all 10 projects into Supabase `projects` table...');
    for (const p of INITIAL_PROJECTS) {
      await client.query(`
        INSERT INTO public.projects (
          id, title_ar, title_en, category, type_ar, type_en, tech_stack,
          description_ar, description_en, highlights_ar, highlights_en,
          live_url, repo_url, image_url, is_featured, display_order
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16
        )
        ON CONFLICT (id) DO UPDATE SET
          title_ar = EXCLUDED.title_ar,
          title_en = EXCLUDED.title_en,
          description_ar = EXCLUDED.description_ar,
          description_en = EXCLUDED.description_en,
          tech_stack = EXCLUDED.tech_stack,
          live_url = EXCLUDED.live_url,
          repo_url = EXCLUDED.repo_url,
          image_url = EXCLUDED.image_url;
      `, [
        p.id, p.title_ar, p.title_en, p.category, p.type_ar, p.type_en, p.tech_stack,
        p.description_ar, p.description_en, p.highlights_ar, p.highlights_en,
        p.live_url, p.repo_url, p.image_url, p.is_featured, p.display_order
      ]);
    }
    console.log('✅ 10 Projects seeded into Supabase cloud table!');

    // 3. Insert all packages
    console.log('💎 Seeding all packages and offers into Supabase `packages` table...');
    for (const pkg of INITIAL_PACKAGES) {
      await client.query(`
        INSERT INTO public.packages (
          id, slug, name_ar, name_en, category, price_egp, price_usd,
          billing_period, badge_ar, badge_en, description_ar, description_en,
          features_ar, features_en, domain_included_ar, domain_included_en,
          hosting_included_ar, hosting_included_en, database_included_ar, database_included_en,
          dashboard_included, is_popular
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22
        )
        ON CONFLICT (id) DO UPDATE SET
          name_ar = EXCLUDED.name_ar,
          name_en = EXCLUDED.name_en,
          price_egp = EXCLUDED.price_egp,
          price_usd = EXCLUDED.price_usd,
          features_ar = EXCLUDED.features_ar,
          features_en = EXCLUDED.features_en,
          domain_included_ar = EXCLUDED.domain_included_ar,
          domain_included_en = EXCLUDED.domain_included_en,
          hosting_included_ar = EXCLUDED.hosting_included_ar,
          hosting_included_en = EXCLUDED.hosting_included_en,
          database_included_ar = EXCLUDED.database_included_ar,
          database_included_en = EXCLUDED.database_included_en;
      `, [
        pkg.id, pkg.slug, pkg.name_ar, pkg.name_en, pkg.category, pkg.price_egp, pkg.price_usd,
        pkg.billing_period, pkg.badge_ar, pkg.badge_en, pkg.description_ar, pkg.description_en,
        pkg.features_ar, pkg.features_en, pkg.domain_included_ar, pkg.domain_included_en,
        pkg.hosting_included_ar, pkg.hosting_included_en, pkg.database_included_ar, pkg.database_included_en,
        pkg.dashboard_included, pkg.is_popular
      ]);
    }
    console.log('✅ Packages and offers seeded into Supabase cloud table!');

    // 4. Verify Counts
    const { rows: projRows } = await client.query('SELECT COUNT(*) FROM public.projects');
    const { rows: pkgRows } = await client.query('SELECT COUNT(*) FROM public.packages');
    console.log(`\n🎉 VERIFICATION ON SUPABASE:`);
    console.log(`- Projects in Supabase DB: ${projRows[0].count}`);
    console.log(`- Packages in Supabase DB: ${pkgRows[0].count}`);
    console.log('✨ All tables and data are now LIVE on your Supabase dashboard!');

  } catch (err) {
    console.error('❌ Migration Error:', err);
  } finally {
    await client.end();
  }
}

runMigration();
