import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import GameBoard from '../../components/GameBoard';

import useGetWord from '../../hooks/useGetWord';

export default function Home() {
  const [gameId, setGameId] = useState(0);
  const { word } = useGetWord('en', gameId);

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={{ flex: 1, backgroundColor: '#000' }}
    >
      <GameBoard Word={word} setGameId={() => setGameId(gameId + 1)} />
    </SafeAreaView>
  );
}
