import { useContextSelector } from 'use-context-selector';

//contexts
import { AuthDispatchContext } from '../../contexts/auth/authContexts';

export const useAuthDispatch = () => {
  return useContextSelector(AuthDispatchContext, (context) => context);
}