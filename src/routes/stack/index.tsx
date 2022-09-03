import { createStackNavigator } from '@react-navigation/stack';

//screens
import { SignIn } from '../../screens/SignIn/SignIn';

const Stack = createStackNavigator();

export const StackRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="SignIn"
        component={SignIn}
      />
    </Stack.Navigator>
  );
}