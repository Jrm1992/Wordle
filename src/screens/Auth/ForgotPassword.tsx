import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

import { useAuth } from '../../hooks/useAuth';
import { mapAuthError } from '../../lib/authErrors';
import { validateEmail } from '../../lib/validation';
import {
  Container,
  ErrorText,
  InfoText,
  Input,
  Label,
  LinkButton,
  LinkText,
  MutedLink,
  PrimaryButton,
  PrimaryButtonText,
  Subtitle,
  Title
} from './styles';

import { useNavigation } from '@react-navigation/native';

export default function ForgotPassword() {
  const { navigate } = useNavigation();
  const { requestPasswordReset } = useAuth();

  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState<string | null>(null);
  const [formErr, setFormErr] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    setFormErr(null);
    const ee = validateEmail(email);
    setEmailErr(ee);
    if (ee) return;

    setLoading(true);
    const { error } = await requestPasswordReset(email);
    setLoading(false);
    if (error) {
      setFormErr(mapAuthError(error));
      return;
    }
    setSent(true);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#000' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Container edges={['top', 'bottom']}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Title>Reset password</Title>
            <Subtitle>
              Enter your email and we will send a reset link if an account
              exists.
            </Subtitle>

            <Label>Email</Label>
            <Input
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              textContentType="emailAddress"
              keyboardType="email-address"
              placeholder="you@example.com"
              editable={!loading && !sent}
              maxLength={254}
            />
            {emailErr && <ErrorText>{emailErr}</ErrorText>}
            {sent && (
              <InfoText>
                If an account exists, we sent a reset link to your email.
              </InfoText>
            )}
            {formErr && <ErrorText>{formErr}</ErrorText>}

            <PrimaryButton
              activeOpacity={0.8}
              onPress={onSubmit}
              disabled={loading || sent}
              $disabled={loading || sent}
            >
              <PrimaryButtonText>
                {loading ? 'Sending…' : sent ? 'Email sent' : 'Send reset link'}
              </PrimaryButtonText>
            </PrimaryButton>

            <LinkButton onPress={() => navigate('signIn')}>
              <MutedLink>
                Back to <LinkText>Sign in</LinkText>
              </MutedLink>
            </LinkButton>
          </View>
        </ScrollView>
      </Container>
    </KeyboardAvoidingView>
  );
}
