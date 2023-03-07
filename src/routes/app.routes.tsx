import Home from '../screens/Home';
import Postgame from '../screens/PostGame';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="postgame" component={Postgame} />
    </Navigator>
  );
}
