import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Container, Subtitle, Text, Title } from './style';

import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

export default function NewGame() {
  const { navigate } = useNavigation();

  return (
    <Container edges={['top', 'bottom']}>
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <LottieView
          source={require('.././../../assets/firecracker.json')}
          autoPlay
          loop
          style={{ flex: 1 }}
        />
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <LottieView
          source={require('.././../../assets/you-win.json')}
          autoPlay
          loop={false}
          style={{ width: '100%', aspectRatio: 1 }}
        />
        <Title>You won!</Title>
        <Subtitle>Nicely played. Ready for another?</Subtitle>
      </View>
      <Button activeOpacity={0.8} onPress={() => navigate('home')}>
        <Text>New Game</Text>
      </Button>
    </Container>
  );
}
