import { useEffect, useState } from 'react';

import { WORDS } from '../data/words';

export default function useGetWord(lang: string, gameId: number) {
  const [word, setWord] = useState('');

  useEffect(() => {
    const list = WORDS[lang] ?? WORDS.en;
    const idx = Math.floor(Math.random() * list.length);
    setWord(list[idx].toUpperCase());
  }, [lang, gameId]);

  return { word };
}
