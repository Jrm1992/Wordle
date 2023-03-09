import React, { useCallback, useState } from 'react';

import GameBoard from '../../components/GameBoard';

import Words from '../../../assets/words.json';

import { useFocusEffect } from '@react-navigation/native';

export default function Home() {
  const [word, setWord] = useState('teste');

  function getWord() {
    const countWords = Words.en.length;
    const shuffleIndex: number = Math.floor(Math.random() * countWords);
    setWord(Words.en[shuffleIndex]);
  }

  useFocusEffect(
    useCallback(() => {
      getWord();
    }, [])
  );

  return <GameBoard Word={word.toUpperCase()} />;
}
