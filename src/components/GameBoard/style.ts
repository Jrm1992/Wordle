import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #000;
`;

export const Board = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 12px 8px;
`;

export const Row = styled.View`
  flex-direction: row;
  gap: 6px;
  margin-bottom: 6px;
`;

export const Col = styled.View`
  flex-direction: column;
  align-items: center;
`;
