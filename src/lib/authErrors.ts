import { AuthError } from '@supabase/supabase-js';

const GENERIC = 'Something went wrong. Please try again.';

export function mapAuthError(err: unknown): string {
  if (!err) return GENERIC;
  const e = err as AuthError & { status?: number; code?: string };
  const msg = (e.message || '').toLowerCase();
  const code = (e.code || '').toLowerCase();

  if (code === 'invalid_credentials' || msg.includes('invalid login'))
    return 'Wrong email or password.';
  if (code === 'email_not_confirmed' || msg.includes('email not confirmed'))
    return 'Please confirm your email before signing in.';
  if (
    code === 'user_already_exists' ||
    msg.includes('already registered') ||
    msg.includes('user already')
  )
    return 'An account with this email already exists.';
  if (code === 'weak_password' || msg.includes('password'))
    return 'Password is too weak. Use at least 8 characters.';
  if (
    code === 'over_email_send_rate_limit' ||
    msg.includes('rate limit') ||
    msg.includes('too many')
  )
    return 'Too many attempts. Please wait a moment and try again.';
  if (msg.includes('network') || msg.includes('fetch'))
    return 'Network error. Check your connection.';
  if (e.status === 422) return 'Invalid email or password.';

  return GENERIC;
}
