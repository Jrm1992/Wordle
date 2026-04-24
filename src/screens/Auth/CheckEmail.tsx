import React, { useState } from 'react';
import { View } from 'react-native';

import { useAuth } from '../../hooks/useAuth';
import { mapAuthError } from '../../lib/authErrors';
import {
  Container,
  ErrorText,
  InfoText,
  LinkButton,
  LinkText,
  MutedLink,
  PrimaryButton,
  PrimaryButtonText,
  Subtitle,
  Title
} from './styles';

import { useNavigation, useRoute } from '@react-navigation/native';

export default function CheckEmail() {
  const { navigate } = useNavigation();
  const route = useRoute<{
    key: string;
    name: string;
    params?: { email?: string };
  }>();
  const email = route.params?.email ?? '';
  const { resendConfirmation } = useAuth();

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onResend() {
    if (!email) return;
    setErr(null);
    setSent(false);
    setLoading(true);
    const { error } = await resendConfirmation(email);
    setLoading(false);
    if (error) {
      setErr(mapAuthError(error));
      return;
    }
    setSent(true);
  }

  return (
    <Container edges={['top', 'bottom']}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Title>Check your email</Title>
        <Subtitle>
          {email
            ? `We sent a confirmation link to ${email}. Tap it to activate your account.`
            : 'We sent you a confirmation link. Tap it to activate your account.'}
        </Subtitle>

        {sent && <InfoText>Confirmation email resent.</InfoText>}
        {err && <ErrorText>{err}</ErrorText>}

        <PrimaryButton
          activeOpacity={0.8}
          onPress={onResend}
          disabled={loading || !email}
          $disabled={loading || !email}
        >
          <PrimaryButtonText>
            {loading ? 'Resending…' : 'Resend email'}
          </PrimaryButtonText>
        </PrimaryButton>

        <LinkButton onPress={() => navigate('signIn')}>
          <MutedLink>
            Back to <LinkText>Sign in</LinkText>
          </MutedLink>
        </LinkButton>
      </View>
    </Container>
  );
}
