import { SafeAreaView } from 'react-native-safe-area-context';

import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #000;
  padding: 20px;
`;

export const Title = styled.Text`
  color: white;
  text-align: center;
  font-size: 36px;
  font-weight: 800;
  letter-spacing: 0.5px;
`;

export const Subtitle = styled.Text`
  color: #9b9b9b;
  text-align: center;
  font-size: 16px;
  margin-top: 8px;
`;

export const Text = styled.Text`
  color: black;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
`;

export const Button = styled.TouchableOpacity`
  background-color: #f9ff00;
  border-radius: 16px;
  padding: 18px;
`;
