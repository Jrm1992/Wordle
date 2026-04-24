import React, { useEffect, useState } from 'react';
import { Linking } from 'react-native';

import { Loading } from '../components/Loading';

import { AuthProvider, useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';
import { Container } from './style';

import { NavigationContainer } from '@react-navigation/native';

function extractCode(url: string): string | null {
  try {
    const parsed = new URL(url);
    return parsed.searchParams.get('code');
  } catch {
    return null;
  }
}

function isResetLink(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.hostname === 'reset-password' ||
      parsed.pathname.includes('reset-password')
    );
  } catch {
    return false;
  }
}

function RoutesInner() {
  const { session, initializing } = useAuth();
  const [pendingReset, setPendingReset] = useState(false);

  useEffect(() => {
    let active = true;

    async function handleUrl(url: string | null) {
      if (!url || !active) return;
      const code = extractCode(url);
      if (!code) return;
      const reset = isResetLink(url);
      if (reset) setPendingReset(true);
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        // eslint-disable-next-line no-console
        console.warn('[auth] exchange failed:', error.message);
        if (reset && active) setPendingReset(false);
      }
    }

    Linking.getInitialURL().then(handleUrl);
    const sub = Linking.addEventListener('url', ({ url }) => handleUrl(url));
    return () => {
      active = false;
      sub.remove();
    };
  }, []);

  useEffect(() => {
    if (!session && pendingReset) setPendingReset(false);
  }, [session, pendingReset]);

  if (initializing) return <Loading />;
  if (!session) return <AuthRoutes />;
  return (
    <AppRoutes initialRouteName={pendingReset ? 'resetPassword' : 'home'} />
  );
}

export function Routes() {
  return (
    <Container>
      <AuthProvider>
        <NavigationContainer>
          <RoutesInner />
        </NavigationContainer>
      </AuthProvider>
    </Container>
  );
}
