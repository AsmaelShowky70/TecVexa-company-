import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://iyhwwlzmmakgayhihtje.supabase.co';
export const SUPABASE_KEY = 'sb_publishable_Y4FIbTB7F6q-sbt12ROUvA_KBSwXKZw';

let supabaseClient = null;

try {
  supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  });
} catch (err) {
  console.warn('Supabase initialization warning:', err);
}

export const supabase = supabaseClient;
