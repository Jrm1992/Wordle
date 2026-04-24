import CheckEmail from '../screens/Auth/CheckEmail';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import SignIn from '../screens/Auth/SignIn';
import SignUp from '../screens/Auth/SignUp';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signIn" component={SignIn} />
      <Screen name="signUp" component={SignUp} />
      <Screen name="forgotPassword" component={ForgotPassword} />
      <Screen name="checkEmail" component={CheckEmail} />
    </Navigator>
  );
}
