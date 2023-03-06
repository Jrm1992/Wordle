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

export const LetterBox = styled.Text`
  width: 62px;
  height: 62px;
  background-color: ${(props) => props.BGColor};
  margin: 1px;
  border: ${(props) =>
    props.isActive ? '1px solid #c2c2c2' : '1px solid #585858'};
  color: white;
  text-align: center;
  font-size: 42px;
`;
