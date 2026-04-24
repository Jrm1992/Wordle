import React, { useEffect, useMemo, useState } from 'react';
import { Text, View, useWindowDimensions } from 'react-native';

import Header from '../Header';
import KeyBoard, { LetterState } from '../KeyBoard';
import { Board, Col, Container, Row } from './style';

import { useNavigation } from '@react-navigation/native';

const NUMBER_OF_TRIES = 6;

const copyArray = (arr: string[][]) => {
  return [...arr.map((rows) => [...rows])];
};

function getCellColor(
  letter: string,
  col: number,
  letters: string[]
): LetterState {
  if (!letter) return 'empty';
  const L = letter.toUpperCase();
  if (L === letters[col]?.toUpperCase()) return 'correct';
  if (letters.map((l) => l.toUpperCase()).includes(L)) return 'present';
  return 'absent';
}

const BG: Record<LetterState, string> = {
  empty: '#121213',
  correct: '#538D4E',
  present: '#B59F3B',
  absent: '#3A3A3C'
};

export default function GameBoard({
  Word,
  setGameId
}: {
  Word: string;
  setGameId: () => void;
}) {
  const { navigate } = useNavigation();
  const { width } = useWindowDimensions();

  const letters = Word.split('');

  const [curRow, setCurRow] = useState(0);
  const [curCol, setCurCol] = useState(0);
  const [rows, setRows] = useState<string[][]>(
    new Array(NUMBER_OF_TRIES).fill(new Array(letters.length).fill(''))
  );

  useEffect(() => {
    setRows(
      new Array(NUMBER_OF_TRIES).fill(new Array(letters.length).fill(''))
    );
    setCurCol(0);
    setCurRow(0);
  }, [Word]);

  const tileSize = Math.min(
    62,
    Math.floor((width - 16 - (letters.length - 1) * 6 - 16) / letters.length)
  );

  const keyStates = useMemo(() => {
    const map: Record<string, LetterState> = {};
    for (let r = 0; r < curRow; r++) {
      for (let c = 0; c < rows[r].length; c++) {
        const L = rows[r][c]?.toUpperCase();
        if (!L) continue;
        const state = getCellColor(L, c, letters);
        const prev = map[L];
        if (
          prev !== 'correct' &&
          !(prev === 'present' && state === 'absent')
        ) {
          map[L] = state;
        }
      }
    }
    return map;
  }, [rows, curRow, letters]);

  const keyPressed = (key: string) => {
    const updatedRows = copyArray(rows);
    if (key === 'CLEAR') {
      const prevCol = curCol - 1;
      if (prevCol >= 0) {
        updatedRows[curRow][prevCol] = '';
        setRows(updatedRows);
        setCurCol(prevCol);
      }
      return;
    }

    if (key === 'ENTER') {
      if (rows[curRow].join('').toUpperCase() === Word.toUpperCase()) {
        setCurRow(curRow + 1);
        setGameId();
        navigate('postgame', { status: 'youwin' });
        return;
      }
      if (curRow >= NUMBER_OF_TRIES - 1) {
        setGameId();
        navigate('postgame', { status: 'tryagain' });
        return;
      }
      if (curCol === rows[0].length) {
        setCurRow(curRow + 1);
        setCurCol(0);
      }
      return;
    }

    if (curCol < letters.length) {
      updatedRows[curRow][curCol] = key;
      setRows(updatedRows);
      setCurCol(curCol + 1);
    }
  };

  return (
    <Container>
      <Header />
      <Board>
        <Col>
          {rows.map((items, rowIndex) => (
            <Row key={rowIndex}>
              {items.map((letter: string, colIndex: number) => {
                const isSubmitted = rowIndex < curRow;
                const isActive =
                  rowIndex === curRow && colIndex === curCol - 1;
                const filled = letter !== '';
                const state: LetterState = isSubmitted
                  ? getCellColor(letter, colIndex, letters)
                  : 'empty';

                return (
                  <View
                    key={colIndex}
                    style={{
                      width: tileSize,
                      height: tileSize,
                      backgroundColor: BG[state],
                      borderWidth: 2,
                      borderColor: isSubmitted
                        ? BG[state]
                        : filled
                        ? '#565758'
                        : isActive
                        ? '#818384'
                        : '#3A3A3C',
                      borderRadius: 6,
                      borderCurve: 'continuous',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Text
                      selectable={false}
                      style={{
                        color: 'white',
                        fontSize: Math.floor(tileSize * 0.55),
                        fontWeight: '800',
                        textAlign: 'center'
                      }}
                    >
                      {letter.toUpperCase()}
                    </Text>
                  </View>
                );
              })}
            </Row>
          ))}
        </Col>
      </Board>
      <KeyBoard onKeyPress={keyPressed} keyStates={keyStates} />
    </Container>
  );
}
