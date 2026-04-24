import styled from 'styled-components/native';

const SIDE_SLOT = 40;

export const Container = styled.View`
  flex-direction: row;
  padding: 12px 20px 20px 20px;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #1f1f1f;
`;

export const Spacer = styled.View`
  width: ${SIDE_SLOT}px;
`;

export const LogoGroup = styled.View`
  flex: 1;
  flex-direction: row;
  gap: 6px;
  justify-content: center;
  align-items: center;
`;

export const SignOutButton = styled.Pressable`
  width: ${SIDE_SLOT}px;
  height: ${SIDE_SLOT}px;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  font-size: 34px;
  font-weight: 800;
  color: white;
  letter-spacing: 1px;
`;
