import styled from 'styled-components/native';

export const Box = styled.TouchableOpacity`
  background-color: #818384;
  min-width: 36px;
  height: 46px;
  margin: 1px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

export const Container = styled.View`
  display: flex;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 10px 40px 10px;
`;

export const Row = styled.View`
  flex-direction: row;
`;

export const Col = styled.View`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  font-size: 18px;
`;
