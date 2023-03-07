import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Container, Text } from './style';

import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

export default function TryAgain() {
  const { navigate } = useNavigation();
  return (
    <Container>
      <LottieView
        source={require('.././../../assets/try-again.json')}
        autoPlay
        loop={false}
      />
      <TouchableOpacity onPress={() => navigate('home')}>
        <Text>Try Again</Text>
      </TouchableOpacity>
    </Container>
  );
}
