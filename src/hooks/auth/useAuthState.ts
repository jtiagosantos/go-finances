import { useContextSelector } from 'use-context-selector';

//contexts
import { AuthStateContext } from '../../contexts/auth/authContexts';

export const useAuthState = () => {
  return useContextSelector(AuthStateContext, (context) => context);
}