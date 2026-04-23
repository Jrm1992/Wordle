import React from 'react';
import { StyleSheet } from 'react-native';

import { Button, Container, Text } from './style';

import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

export default function NewGame() {
  const { navigate } = useNavigation();

  return (
    <Container>
      <LottieView
        source={require('.././../../assets/you-win.json')}
        autoPlay
        loop={false}
        style={{ flex: 1, width: '100%' }}
      />
      <LottieView
        source={require('.././../../assets/firecracker.json')}
        autoPlay
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      <Button onPress={() => navigate('home')}>
        <Text>New Game</Text>
      </Button>
    </Container>
  );
}
