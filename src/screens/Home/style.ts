import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #000;
  height: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const Board = styled.View`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
`;

export const Row = styled.View`
  flex-direction: row;
`;

export const Col = styled.View`
  flex-direction: column;
`;
