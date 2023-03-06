import Words from '../../assets/words.json';

export default function useGetWord() {
  const countWords = Words.words.length;
  const shuffleIndex: number = Math.floor(Math.random() * countWords);
  const word = Words.words[shuffleIndex];

  return { word };
}
