import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

import { useAuth } from '../../hooks/useAuth';
import { mapAuthError } from '../../lib/authErrors';
import {
  normalizeEmail,
  validateEmail,
  validatePassword,
  validatePasswordConfirm
} from '../../lib/validation';
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

export default function SignUp() {
  const { navigate } = useNavigation();
  const { signUp } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [emailErr, setEmailErr] = useState<string | null>(null);
  const [pwdErr, setPwdErr] = useState<string | null>(null);
  const [confirmErr, setConfirmErr] = useState<string | null>(null);
  const [formErr, setFormErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    setFormErr(null);
    const ee = validateEmail(email);
    const pe = validatePassword(password);
    const ce = validatePasswordConfirm(password, confirm);
    setEmailErr(ee);
    setPwdErr(pe);
    setConfirmErr(ce);
    if (ee || pe || ce) return;

    setLoading(true);
    const { error } = await signUp(email, password);
    setLoading(false);
    if (error) {
      setFormErr(mapAuthError(error));
      return;
    }
    navigate('checkEmail', { email: normalizeEmail(email) });
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
            <Title>Create account</Title>
            <Subtitle>Sign up with your email and a password.</Subtitle>

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
              autoComplete="password-new"
              textContentType="newPassword"
              placeholder="At least 8 characters"
              editable={!loading}
              maxLength={128}
            />
            {pwdErr && <ErrorText>{pwdErr}</ErrorText>}

            <Label>Confirm password</Label>
            <Input
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="password-new"
              textContentType="newPassword"
              placeholder="Repeat your password"
              editable={!loading}
              maxLength={128}
            />
            {confirmErr && <ErrorText>{confirmErr}</ErrorText>}

            {formErr && <ErrorText>{formErr}</ErrorText>}

            <PrimaryButton
              activeOpacity={0.8}
              onPress={onSubmit}
              disabled={loading}
              $disabled={loading}
            >
              <PrimaryButtonText>
                {loading ? 'Creating…' : 'Create account'}
              </PrimaryButtonText>
            </PrimaryButton>

            <LinkButton onPress={() => navigate('signIn')}>
              <MutedLink>
                Already have an account? <LinkText>Sign in</LinkText>
              </MutedLink>
            </LinkButton>
          </View>
        </ScrollView>
      </Container>
    </KeyboardAvoidingView>
  );
}
