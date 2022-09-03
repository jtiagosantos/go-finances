import { FC, useState, useCallback, useMemo, PropsWithChildren, useEffect } from 'react';
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';

//types
import { User, AuthorizationResponse } from './types';

//contexts
import { AuthStateContext, AuthDispatchContext } from './authContexts';

//hooks
import { useStorage } from '../../hooks/useStorage';

//constants
import { AUTH_URL } from '../../constants/googleCrendentials';
import { STORAGE_USER_KEY } from '../../constants/storage';

export const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const AuthStateProvider = AuthStateContext.Provider;
  const AuthDispatchProvider = AuthDispatchContext.Provider;

  const [user, setUser] = useState<User | undefined>(undefined);
  const { getItem, setItem, removeItem } = useStorage(STORAGE_USER_KEY);

  const handleSignInWithGoogle = useCallback(async () => {
    const { params, type } = await AuthSession.startAsync({ authUrl: AUTH_URL }) as AuthorizationResponse;

    if (type === 'success') {
      const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
      const userData = await response.json();
      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        photo: userData?.picture,
      });
    }
  }, []);

  const handleSignInWithApple = useCallback(async () => {
    const credentials = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
  
    if (credentials) {
      const fullName = `${credentials.fullName?.givenName}+${credentials.fullName?.middleName}`;
      setUser({
        id: credentials.user,
        name: credentials.fullName?.givenName ?? '',
        email: credentials.email ?? '',
        photo: `https://ui-avatars.com/api/?name=${fullName}&background=fff`,
      });
    }
  }, []);

  const handleSignOut = async () => {
    setUser(undefined);
    await removeItem();
  }

  const authDispatch = useMemo(() => ({
    signInWithGoogle: handleSignInWithGoogle,
    signInWithApple: handleSignInWithApple,
    signOut: handleSignOut,
  }), [
    handleSignInWithGoogle,
    handleSignInWithApple,
    handleSignOut,
  ]);

  const authState = useMemo(() => ({
    user,
  }), [
    user,
  ]);

  useEffect(() => {
    user && (async () => await setItem(user))();
  }, [user]);

  useEffect(() => {
    (async () => {
      const storedUser = await getItem();
      storedUser && setUser(storedUser);
    })();
  }, []);

  return (
    <AuthDispatchProvider value={authDispatch}>
      <AuthStateProvider value={authState}>
        {children}
      </AuthStateProvider>
    </AuthDispatchProvider>
  );
}