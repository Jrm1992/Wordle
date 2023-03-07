import React from 'react';
import { View } from 'react-native';

import { Loading } from './src/components/Loading';

import { Routes } from './src/routes';

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold
} from '@expo-google-fonts/inter';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  });

  if (!fontsLoaded) {
    return <Loading />;
  }
  return (
    <View>
      <Routes />
      <StatusBar translucent backgroundColor="transparent" style="light" />
    </View>
  );
}
