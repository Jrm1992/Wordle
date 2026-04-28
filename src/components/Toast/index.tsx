import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

import { Bubble, Message, Wrapper } from './style';

export type ToastTone = 'info' | 'success' | 'error';

type Props = {
  message: string;
  tone?: ToastTone;
  visible: boolean;
};

export function Toast({ message, tone = 'info', visible }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translate = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: visible ? 1 : 0,
        duration: 180,
        useNativeDriver: true
      }),
      Animated.timing(translate, {
        toValue: visible ? 0 : 12,
        duration: 180,
        useNativeDriver: true
      })
    ]).start();
  }, [visible, opacity, translate]);

  return (
    <Wrapper
      pointerEvents="none"
      style={{ opacity, transform: [{ translateY: translate }] }}
    >
      <Bubble tone={tone}>
        <Message accessibilityLiveRegion="polite">{message}</Message>
      </Bubble>
    </Wrapper>
  );
}
