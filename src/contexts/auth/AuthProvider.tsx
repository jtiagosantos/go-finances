import { FC, useState, useCallback, useMemo, PropsWithChildren } from 'react';
import * as AuthSession from 'expo-auth-session';

//types
import { User, AuthorizationResponse } from './types';

//contexts
import { AuthStateContext, AuthDispatchContext } from './authContexts';

//constants
import { AUTH_URL } from '../../constants/googleCrendentials';

export const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const AuthStateProvider = AuthStateContext.Provider;
  const AuthDispatchProvider = AuthDispatchContext.Provider;

  const [user, setUser] = useState({} as User);

  const handleSignInWithGoogle = useCallback(async () => {
    const { params, type } = await AuthSession.startAsync({ authUrl: AUTH_URL }) as AuthorizationResponse;
    
    if (type === 'success') {
      const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
      const userData = await response.json();
      setUser({
        id: userData.id,
        name: userData.given_name,
        email: userData.email,
        photo: userData?.picture,
      });
    }
  }, []);

  const authDispatch = useMemo(() => ({
    signInWithGoogle: handleSignInWithGoogle,
  }), [
    handleSignInWithGoogle,
  ]);

  const authState = useMemo(() => ({
    user
  }), [
    user,
  ]);

  return (
    <AuthDispatchProvider value={authDispatch}>
      <AuthStateProvider value={authState}>
        {children}
      </AuthStateProvider>
    </AuthDispatchProvider>
  );
}