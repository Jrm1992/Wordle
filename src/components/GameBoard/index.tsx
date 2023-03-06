import React, { useState } from 'react';

import Header from '../Header';
import KeyBoard from '../KeyBoard';
import { Board, Col, Container, Row, LetterBox } from './style';

const NUMBER_OF_TRIES = 6;

const copyArray = (arr: string[][]) => {
  return [...arr.map((rows) => [...rows])];
};

export default function GameBoard({ Word }: { Word: string }) {
  const letters = Word.split('');

  const [rows, setRows] = useState(
    new Array(NUMBER_OF_TRIES).fill(new Array(letters.length).fill(''))
  );

  const [curRow, setCurRow] = useState(0);
  const [curCol, setCurCol] = useState(0);

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
        console.log(`Voce Ganhou`);
        return;
      }
      if (curCol === rows[0].length) {
        setCurRow(curRow + 1);
        setCurCol(0);
      }
      console.log('Teste Outra Vez');
      return;
    }

    if (curCol < letters.length) {
      updatedRows[curRow][curCol] = key;
      setRows(updatedRows);
      setCurCol(curCol + 1);
    }
  };

  function isCurrentBox(i: React.Key, j: React.Key) {
    return i == curCol && j == curRow;
  }

  function getCellBGColor(letter: string, row: number, col: number) {
    if (row >= curRow) {
      return '#2c2c2c';
    }
    if (letter === letters[col].toUpperCase()) {
      return '#538D4E';
    }
    if (letters.includes(letter.toUpperCase())) {
      return '#B59F3B';
    }
    return '#585858';
  }

  return (
    <Container>
      <Header />
      <Board>
        <Col>
          {rows.map((items, index) => {
            return (
              <Row key={index}>
                {items.map((letter: string, subIndex: React.Key) => {
                  return (
                    <LetterBox
                      isActive={isCurrentBox(subIndex, index)}
                      key={subIndex}
                      BGColor={getCellBGColor(
                        letter,
                        index,
                        subIndex as number
                      )}
                    >
                      {letter.toUpperCase()}
                    </LetterBox>
                  );
                })}
              </Row>
            );
          })}
        </Col>
      </Board>
      <KeyBoard onKeyPress={(key: string) => keyPressed(key)} />
    </Container>
  );
}
