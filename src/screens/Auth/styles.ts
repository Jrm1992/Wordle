import { SafeAreaView } from 'react-native-safe-area-context';

import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #000;
  padding: 24px;
`;

export const Title = styled.Text`
  color: white;
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 8px;
`;

export const Subtitle = styled.Text`
  color: #9b9b9b;
  font-size: 15px;
  margin-bottom: 24px;
`;

export const Label = styled.Text`
  color: #d6d6d6;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 6px;
  margin-top: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#6b6b6b',
  selectionColor: '#f9ff00'
})`
  background-color: #141414;
  border-width: 1px;
  border-color: #262626;
  border-radius: 12px;
  color: white;
  padding: 14px 16px;
  font-size: 16px;
`;

export const ErrorText = styled.Text`
  color: #ff6b6b;
  font-size: 13px;
  margin-top: 6px;
`;

export const InfoText = styled.Text`
  color: #9bff9b;
  font-size: 13px;
  margin-top: 6px;
`;

export const PrimaryButton = styled.TouchableOpacity<{ $disabled?: boolean }>`
  background-color: #f9ff00;
  border-radius: 16px;
  padding: 18px;
  margin-top: 24px;
  opacity: ${(p) => (p.$disabled ? 0.5 : 1)};
`;

export const PrimaryButtonText = styled.Text`
  color: black;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
`;

export const LinkButton = styled.TouchableOpacity`
  padding: 14px;
  align-items: center;
`;

export const LinkText = styled.Text`
  color: #f9ff00;
  font-size: 14px;
  font-weight: 600;
`;

export const MutedLink = styled.Text`
  color: #9b9b9b;
  font-size: 13px;
  text-align: center;
  margin-top: 12px;
`;
