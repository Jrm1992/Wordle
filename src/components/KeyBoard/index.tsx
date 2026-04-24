import React from 'react';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';

import { Backspace } from 'phosphor-react-native';
import * as Haptics from 'expo-haptics';

export type LetterState = 'empty' | 'correct' | 'present' | 'absent';

const KEY_BG: Record<LetterState, string> = {
  empty: '#818384',
  correct: '#538D4E',
  present: '#B59F3B',
  absent: '#3A3A3C'
};

const KEYS: string[][] = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'CLEAR']
];

export default function KeyBoard({
  onKeyPress,
  keyStates = {}
}: {
  onKeyPress: (key: string) => void;
  keyStates?: Record<string, LetterState>;
}) {
  const { width } = useWindowDimensions();
  const gap = 6;
  const sidePadding = 6;
  const available = width - sidePadding * 2;
  const keyWidth = Math.floor((available - gap * 9) / 10);

  const handlePress = (key: string) => {
    if (process.env.EXPO_OS === 'ios') {
      Haptics.selectionAsync().catch(() => {});
    }
    onKeyPress(key);
  };

  return (
    <View
      style={{
        paddingHorizontal: sidePadding,
        paddingTop: 8,
        paddingBottom: 20,
        gap
      }}
    >
      {KEYS.map((row, rIdx) => (
        <View
          key={rIdx}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap
          }}
        >
          {row.map((key) => {
            const isAction = key === 'ENTER' || key === 'CLEAR';
            const w = isAction ? keyWidth * 1.5 + gap / 2 : keyWidth;
            const state = keyStates[key] ?? 'empty';
            const bg = KEY_BG[state];

            return (
              <Pressable
                key={key}
                onPress={() => handlePress(key)}
                style={({ pressed }) => ({
                  width: w,
                  height: 52,
                  backgroundColor: bg,
                  borderRadius: 6,
                  borderCurve: 'continuous',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: pressed ? 0.7 : 1
                })}
              >
                {key === 'CLEAR' ? (
                  <Backspace size={20} weight="bold" color="white" />
                ) : (
                  <Text
                    style={{
                      color: 'white',
                      fontSize: isAction ? 13 : 16,
                      fontWeight: '700',
                      letterSpacing: 0.5
                    }}
                  >
                    {key}
                  </Text>
                )}
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}
