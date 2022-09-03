import { NavigationContainer } from '@react-navigation/native';

//hooks
import { useAuthState } from '../hooks/auth/useAuthState';

//routes
import { TabRoutes } from './tabs';
import { StackRoutes } from './stack';

export const AppRoutes = () => {
  const { user } = useAuthState();

  return (
    <NavigationContainer>
      {!!user ? <TabRoutes/> : <StackRoutes />}
    </NavigationContainer>
  );
}