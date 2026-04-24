const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MAX_EMAIL_LEN = 254;
export const MIN_PASSWORD_LEN = 8;
export const MAX_PASSWORD_LEN = 128;

export function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

export function validateEmail(raw: string): string | null {
  const email = normalizeEmail(raw);
  if (!email) return 'Enter your email.';
  if (email.length > MAX_EMAIL_LEN) return 'Email is too long.';
  if (!EMAIL_RE.test(email)) return 'Enter a valid email.';
  return null;
}

export function validatePassword(pwd: string): string | null {
  if (!pwd) return 'Enter a password.';
  if (pwd.length < MIN_PASSWORD_LEN)
    return `Password must be at least ${MIN_PASSWORD_LEN} characters.`;
  if (pwd.length > MAX_PASSWORD_LEN) return 'Password is too long.';
  return null;
}

export function validatePasswordConfirm(
  pwd: string,
  confirm: string
): string | null {
  if (pwd !== confirm) return 'Passwords do not match.';
  return null;
}
