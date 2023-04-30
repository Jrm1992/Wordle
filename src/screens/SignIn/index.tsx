import { Text, TouchableOpacity } from 'react-native';

import { useAuth } from '../../hooks/useAuth';

export function SignIn() {
  const { signIn } = useAuth();

  return (
    <TouchableOpacity
      onPress={signIn}
      style={{ backgroundColor: 'white', marginTop: 200 }}
    >
      <Text>Login</Text>
    </TouchableOpacity>
  );
}
