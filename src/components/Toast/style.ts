import { Animated } from 'react-native';

import styled from 'styled-components/native';

type ContainerProps = { tone: 'info' | 'success' | 'error' };

const TONE_BG: Record<ContainerProps['tone'], string> = {
  info: '#1F2937',
  success: '#15803D',
  error: '#B91C1C'
};

export const Wrapper = styled(Animated.View)`
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 48px;
  align-items: center;
  z-index: 1000;
`;

export const Bubble = styled.View<ContainerProps>`
  background-color: ${(p) => TONE_BG[p.tone]};
  padding: 12px 20px;
  border-radius: 24px;
  max-width: 100%;
`;

export const Message = styled.Text`
  color: #f9fafb;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
`;
