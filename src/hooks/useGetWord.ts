import { useEffect, useState } from 'react';

import { db } from '../service/firebaseDB';

import { collection, getDocs } from 'firebase/firestore';

export default function useGetWord(lang: string, gameId: number) {
  const [word, setWord] = useState('');

  async function getData() {
    const querySnapshot = await getDocs(collection(db, 'words'));
    const words = querySnapshot.docs.map((doc) => doc.data());
    const countWords = words[0][lang].length;
    const shuffleIndex: number = Math.floor(Math.random() * countWords);

    const randomWord = words[0][lang][shuffleIndex];
    setWord(randomWord.toUpperCase());
  }

  useEffect(() => {
    getData();
  }, [lang, gameId]);

  return { word };
}
