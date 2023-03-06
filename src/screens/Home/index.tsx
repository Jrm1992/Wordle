import React, { useState } from 'react';

import KeyBoard from '../../components/KeyBoard';
import LetterBox from '../../components/LetterBox';

import { Board, Col, Container, Row } from './style';

const NUMBER_OF_TRIES = 6;

const copyArray = (arr: string[][]) => {
  return [...arr.map((rows) => [...rows])];
};

export default function Home() {
  const word = 'hello';
  const letters = word.split('');

  const [rows, setRows] = useState(
    new Array(NUMBER_OF_TRIES).fill(new Array(letters.length).fill(''))
  );

  const [curRow, setCurRow] = useState(0);
  const [curCol, setCurCol] = useState(0);

  const keyPressed = (key: string) => {
    if (key === 'CLEAR') {
      setRows(
        new Array(NUMBER_OF_TRIES).fill(new Array(letters.length).fill(''))
      );
      setCurCol(0);
      setCurRow(0);
      return;
    }

    if (key === 'ENTER') {
      if (rows[0].join('').toUpperCase() === word.toUpperCase()) {
        console.log(`Voce Ganhou`);
        return;
      }
      console.log('Teste Outra Vez');
      setCurRow(curRow + 1);
      setCurCol(0);
      return;
    }

    if (curCol < letters.length) {
      const updatedRows = copyArray(rows);
      updatedRows[curRow][curCol] = key;
      setRows(updatedRows);
      setCurCol(curCol + 1);
    }
  };

  function isCurrentBox(i: React.Key, j: React.Key) {
    return i == curCol && j == curRow;
  }

  return (
    <Container>
      <Board>
        <Col>
          {rows.map((items, index) => {
            return (
              <Row key={index}>
                {items.map((subItems: string, subIndex: React.Key) => {
                  return (
                    <LetterBox
                      Letter={subItems}
                      CurrentBox={isCurrentBox(subIndex, index)}
                      key={subIndex}
                    />
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
