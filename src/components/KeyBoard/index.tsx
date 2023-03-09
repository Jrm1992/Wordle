import React from 'react';

import { Box, Col, Container, Row, Text } from './style';

import { Backspace } from 'phosphor-react-native';

export default function KeyBoard({ onKeyPress }: any) {
  const keyBoard = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'CLEAR']
  ];
  return (
    <Container>
      <Col>
        {keyBoard.map((items, index) => {
          return (
            <Row key={index}>
              {items.map((subItems, sIndex) => {
                return (
                  <Box
                    onPress={() => onKeyPress(subItems)}
                    key={sIndex}
                    activeOpacity={0.7}
                  >
                    <Text>
                      {subItems === 'CLEAR' ? (
                        <Backspace size={20} weight="bold" />
                      ) : (
                        subItems
                      )}
                    </Text>
                  </Box>
                );
              })}
            </Row>
          );
        })}
      </Col>
    </Container>
  );
}
