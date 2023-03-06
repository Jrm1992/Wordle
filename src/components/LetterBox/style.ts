import styled from 'styled-components/native';

export const Box = styled.Text`
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
