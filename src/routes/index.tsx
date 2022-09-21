import { NavigationContainer } from '@react-navigation/native';

//hooks
import { useAuthState } from '../hooks/auth/useAuthState';

//screens
import { Splash } from '../screens/Splash/Splash';

//routes
import { TabRoutes } from './tabs';
import { StackRoutes } from './stack';

export const AppRoutes = () => {
  const { user, loadingData } = useAuthState();
  
  if (loadingData) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      {!!user ? <TabRoutes/> : <StackRoutes />}
    </NavigationContainer>
  );
}