import 'react-native-url-polyfill/auto';

import { AppState, Platform } from 'react-native';

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

const CHUNK_SIZE = 1800;

function chunkKey(base: string, i: number) {
  return `${base}.${i}`;
}

const SecureStorageAdapter = {
  async getItem(k: string): Promise<string | null> {
    const meta = await SecureStore.getItemAsync(k);
    if (!meta) return null;
    if (!meta.startsWith('__chunks__:')) return meta;
    const count = Number(meta.slice('__chunks__:'.length));
    if (!Number.isFinite(count) || count <= 0) return null;
    const parts: string[] = [];
    for (let i = 0; i < count; i++) {
      const part = await SecureStore.getItemAsync(chunkKey(k, i));
      if (part == null) return null;
      parts.push(part);
    }
    return parts.join('');
  },
  async setItem(k: string, value: string): Promise<void> {
    await this.removeItem(k);
    if (value.length <= CHUNK_SIZE) {
      await SecureStore.setItemAsync(k, value);
      return;
    }
    const count = Math.ceil(value.length / CHUNK_SIZE);
    for (let i = 0; i < count; i++) {
      await SecureStore.setItemAsync(
        chunkKey(k, i),
        value.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE)
      );
    }
    await SecureStore.setItemAsync(k, `__chunks__:${count}`);
  },
  async removeItem(k: string): Promise<void> {
    const meta = await SecureStore.getItemAsync(k);
    if (meta && meta.startsWith('__chunks__:')) {
      const count = Number(meta.slice('__chunks__:'.length));
      if (Number.isFinite(count)) {
        for (let i = 0; i < count; i++) {
          await SecureStore.deleteItemAsync(chunkKey(k, i));
        }
      }
    }
    await SecureStore.deleteItemAsync(k);
  }
};

function missing(): never {
  throw new Error(
    'Supabase env missing. Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY in .env.'
  );
}

export const supabase: SupabaseClient =
  url && key
    ? createClient(url, key, {
        auth: {
          storage: SecureStorageAdapter,
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: false,
          flowType: 'pkce'
        }
      })
    : (new Proxy({} as SupabaseClient, { get: missing }) as SupabaseClient);

if (!url || !key) {
  // eslint-disable-next-line no-console
  console.warn('[supabase] env not set — client will throw when used');
}

if (url && key && Platform.OS !== 'web') {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });
}
