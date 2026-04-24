import React from 'react';
import { View } from 'react-native';

import NewGame from '../../components/NewGame';
import TryAgain from '../../components/TryAgrain';

import { useRoute } from '@react-navigation/native';

export default function Postgame() {
  const route = useRoute<{ key: string; name: string; params?: { status?: string } }>();
  const status = route.params?.status;
  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {status == 'tryagain' && <TryAgain />}
      {status == 'youwin' && <NewGame />}
    </View>
  );
}
