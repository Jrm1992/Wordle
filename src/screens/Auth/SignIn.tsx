import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

import { useAuth } from '../../hooks/useAuth';
import { mapAuthError } from '../../lib/authErrors';
import { validateEmail } from '../../lib/validation';
import {
  Container,
  ErrorText,
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

export default function SignIn() {
  const { navigate } = useNavigation();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState<string | null>(null);
  const [pwdErr, setPwdErr] = useState<string | null>(null);
  const [formErr, setFormErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    setFormErr(null);
    const ee = validateEmail(email);
    const pe = password ? null : 'Enter your password.';
    setEmailErr(ee);
    setPwdErr(pe);
    if (ee || pe) return;

    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) setFormErr(mapAuthError(error));
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
            <Title>Welcome back</Title>
            <Subtitle>Sign in to continue playing.</Subtitle>

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
              editable={!loading}
              maxLength={254}
            />
            {emailErr && <ErrorText>{emailErr}</ErrorText>}

            <Label>Password</Label>
            <Input
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="password"
              textContentType="password"
              placeholder="At least 8 characters"
              editable={!loading}
              maxLength={128}
            />
            {pwdErr && <ErrorText>{pwdErr}</ErrorText>}

            {formErr && <ErrorText>{formErr}</ErrorText>}

            <PrimaryButton
              activeOpacity={0.8}
              onPress={onSubmit}
              disabled={loading}
              $disabled={loading}
            >
              <PrimaryButtonText>
                {loading ? 'Signing in…' : 'Sign in'}
              </PrimaryButtonText>
            </PrimaryButton>

            <LinkButton onPress={() => navigate('forgotPassword')}>
              <LinkText>Forgot your password?</LinkText>
            </LinkButton>

            <LinkButton onPress={() => navigate('signUp')}>
              <MutedLink>
                Don&apos;t have an account? <LinkText>Sign up</LinkText>
              </MutedLink>
            </LinkButton>
          </View>
        </ScrollView>
      </Container>
    </KeyboardAvoidingView>
  );
}
