import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

import { supabase } from '../lib/supabase';
import { normalizeEmail } from '../lib/validation';

import { AuthError, Session, User } from '@supabase/supabase-js';

const RESET_REDIRECT = 'wordle://reset-password';
const CONFIRM_REDIRECT = 'wordle://auth-callback';

type Result = { error: AuthError | null };

type AuthCtx = {
  session: Session | null;
  user: User | null;
  initializing: boolean;
  signIn: (email: string, password: string) => Promise<Result>;
  signUp: (email: string, password: string) => Promise<Result>;
  signOut: () => Promise<Result>;
  resendConfirmation: (email: string) => Promise<Result>;
  requestPasswordReset: (email: string) => Promise<Result>;
  updatePassword: (password: string) => Promise<Result>;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    let mounted = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!mounted) return;
        setSession(data.session);
      })
      .finally(() => {
        if (mounted) setInitializing(false);
      });

    const { data } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthCtx>(
    () => ({
      session,
      user: session?.user ?? null,
      initializing,
      signIn: async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({
          email: normalizeEmail(email),
          password
        });
        return { error };
      },
      signUp: async (email, password) => {
        const { error } = await supabase.auth.signUp({
          email: normalizeEmail(email),
          password,
          options: { emailRedirectTo: CONFIRM_REDIRECT }
        });
        return { error };
      },
      signOut: async () => {
        const { error } = await supabase.auth.signOut();
        return { error };
      },
      resendConfirmation: async (email) => {
        const { error } = await supabase.auth.resend({
          type: 'signup',
          email: normalizeEmail(email),
          options: { emailRedirectTo: CONFIRM_REDIRECT }
        });
        return { error };
      },
      requestPasswordReset: async (email) => {
        const { error } = await supabase.auth.resetPasswordForEmail(
          normalizeEmail(email),
          { redirectTo: RESET_REDIRECT }
        );
        return { error };
      },
      updatePassword: async (password) => {
        const { error } = await supabase.auth.updateUser({ password });
        return { error };
      }
    }),
    [session, initializing]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth(): AuthCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
