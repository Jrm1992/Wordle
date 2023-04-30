import { useAuth } from '../hooks/useAuth';
import { SignIn } from '../screens/SignIn';
import { AppRoutes } from './app.routes';
import { Container } from './style';

import { NavigationContainer } from '@react-navigation/native';

export function Routes() {
  const { user } = useAuth();
  return (
    <Container>
      <NavigationContainer>
        {user.name ? <AppRoutes /> : <SignIn />}
      </NavigationContainer>
    </Container>
  );
}
