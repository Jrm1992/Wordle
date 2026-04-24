import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

import { useAuth } from '../../hooks/useAuth';
import { mapAuthError } from '../../lib/authErrors';
import {
  validatePassword,
  validatePasswordConfirm
} from '../../lib/validation';
import {
  Container,
  ErrorText,
  InfoText,
  Input,
  Label,
  PrimaryButton,
  PrimaryButtonText,
  Subtitle,
  Title
} from './styles';

export default function ResetPassword() {
  const { updatePassword, session } = useAuth();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [pwdErr, setPwdErr] = useState<string | null>(null);
  const [confirmErr, setConfirmErr] = useState<string | null>(null);
  const [formErr, setFormErr] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    setFormErr(null);
    const pe = validatePassword(password);
    const ce = validatePasswordConfirm(password, confirm);
    setPwdErr(pe);
    setConfirmErr(ce);
    if (pe || ce) return;

    setLoading(true);
    const { error } = await updatePassword(password);
    setLoading(false);
    if (error) {
      setFormErr(mapAuthError(error));
      return;
    }
    setDone(true);
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
            <Title>Set new password</Title>
            <Subtitle>
              {session
                ? 'Choose a new password for your account.'
                : 'Open the reset link from your email on this device to continue.'}
            </Subtitle>

            <Label>New password</Label>
            <Input
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="password-new"
              textContentType="newPassword"
              placeholder="At least 8 characters"
              editable={!loading && !!session && !done}
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
              editable={!loading && !!session && !done}
              maxLength={128}
            />
            {confirmErr && <ErrorText>{confirmErr}</ErrorText>}

            {done && <InfoText>Password updated. You can play now.</InfoText>}
            {formErr && <ErrorText>{formErr}</ErrorText>}

            <PrimaryButton
              activeOpacity={0.8}
              onPress={onSubmit}
              disabled={loading || !session || done}
              $disabled={loading || !session || done}
            >
              <PrimaryButtonText>
                {loading ? 'Updating…' : done ? 'Done' : 'Update password'}
              </PrimaryButtonText>
            </PrimaryButton>
          </View>
        </ScrollView>
      </Container>
    </KeyboardAvoidingView>
  );
}
