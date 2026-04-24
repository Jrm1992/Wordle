import ResetPassword from '../screens/Auth/ResetPassword';
import Home from '../screens/Home';
import Postgame from '../screens/PostGame';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator();

type Props = { initialRouteName?: 'home' | 'resetPassword' };

export function AppRoutes({ initialRouteName = 'home' }: Props) {
  return (
    <Navigator
      initialRouteName={initialRouteName}
      screenOptions={{ headerShown: false }}
    >
      <Screen name="home" component={Home} />
      <Screen name="postgame" component={Postgame} />
      <Screen name="resetPassword" component={ResetPassword} />
    </Navigator>
  );
}
