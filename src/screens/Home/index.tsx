import React, { useState } from 'react';

import GameBoard from '../../components/GameBoard';

import useGetWord from '../../hooks/useGetWord';

export default function Home() {
  const [gameId, setGameId] = useState(0);
  const { word } = useGetWord('en', gameId);

  return (
    <>
      <GameBoard Word={word} setGameId={() => setGameId(gameId + 1)} />
    </>
  );
}
