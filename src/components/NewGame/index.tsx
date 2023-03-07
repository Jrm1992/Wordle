import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Container, Text } from './style';

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
      <TouchableOpacity onPress={() => navigate('home')}>
        <Text>New Game</Text>
      </TouchableOpacity>
    </Container>
  );
}
