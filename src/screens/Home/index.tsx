import React from 'react';

import GameBoard from '../../components/GameBoard';

import useGetWord from '../../hooks/useGetWord';

export default function Home() {
  const { word } = useGetWord();
  console.log(word);

  return <GameBoard Word={word.toUpperCase()} />;
}
