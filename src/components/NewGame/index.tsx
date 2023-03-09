import React from 'react';

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
      />
      <LottieView
        source={require('.././../../assets/firecracker.json')}
        autoPlay
      />
      <Button onPress={() => navigate('home')}>
        <Text>New Game</Text>
      </Button>
    </Container>
  );
}
