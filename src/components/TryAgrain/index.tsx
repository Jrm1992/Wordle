import React from 'react';
import { View } from 'react-native';

import { Button, Container, Subtitle, Text, Title } from './style';

import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

export default function TryAgain() {
  const { navigate } = useNavigation();
  return (
    <Container edges={['top', 'bottom']}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <LottieView
          source={require('.././../../assets/try-again.json')}
          autoPlay
          loop={false}
          style={{ width: '100%', aspectRatio: 1 }}
        />
        <Title>So close!</Title>
        <Subtitle>Give it another shot.</Subtitle>
      </View>
      <Button activeOpacity={0.8} onPress={() => navigate('home')}>
        <Text>Try Again</Text>
      </Button>
    </Container>
  );
}
