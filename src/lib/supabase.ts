import 'react-native-url-polyfill/auto';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

function missing(): never {
  throw new Error(
    'Supabase env missing. Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY in .env.'
  );
}

export const supabase: SupabaseClient =
  url && key
    ? createClient(url, key, {
        auth: { persistSession: false, autoRefreshToken: false }
      })
    : (new Proxy({} as SupabaseClient, { get: missing }) as SupabaseClient);

if (!url || !key) {
  // eslint-disable-next-line no-console
  console.warn('[supabase] env not set — client will throw when used');
}
