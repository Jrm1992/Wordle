import React from 'react';

import { Loading } from './src/components/Loading';

import { AuthContextProvider } from './src/context/AuthContext';
import { Routes } from './src/routes';

import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts
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
    <AuthContextProvider>
      <Routes />
      <StatusBar translucent backgroundColor="transparent" style="light" />
    </AuthContextProvider>
  );
}
