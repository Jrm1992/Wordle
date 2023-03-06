import Logo from '../../../assets/Logo.svg';
import { Container, Text } from './style';

export default function Header() {
  return (
    <Container>
      <Logo />
      <Text>ordle</Text>
    </Container>
  );
}
