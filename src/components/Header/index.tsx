import Logo from '../../../assets/Logo.svg';
import { useAuth } from '../../hooks/useAuth';
import { Container, LogoGroup, SignOutButton, Spacer, Text } from './style';

import { SignOut } from 'phosphor-react-native';

export default function Header() {
  const { signOut } = useAuth();

  return (
    <Container>
      <Spacer />
      <LogoGroup>
        <Logo />
        <Text>ordle</Text>
      </LogoGroup>
      <SignOutButton
        onPress={() => {
          signOut();
        }}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="Sign out"
      >
        <SignOut size={24} color="#ffffff" weight="regular" />
      </SignOutButton>
    </Container>
  );
}
