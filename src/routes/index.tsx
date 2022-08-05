import { NavigationContainer } from '@react-navigation/native';

//routes
import { TabRoutes } from './tabs';

export const AppRoutes = () => {
  return (
    <NavigationContainer>
      <TabRoutes />
    </NavigationContainer>
  );
}