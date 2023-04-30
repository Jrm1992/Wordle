import React, { useState } from 'react';

import GameBoard from '../../components/GameBoard';

import { useAuth } from '../../hooks/useAuth';
import useGetWord from '../../hooks/useGetWord';

export default function Home() {
  const { user } = useAuth();
  const [gameId, setGameId] = useState(0);
  const { word } = useGetWord('en', gameId);

  console.log(user);
  return (
    <>
      <GameBoard Word={word} setGameId={() => setGameId(gameId + 1)} />
    </>
  );
}
