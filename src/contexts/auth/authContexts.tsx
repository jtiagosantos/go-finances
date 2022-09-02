import { createContext } from 'use-context-selector';

//types
import { AuthStateContextData, AuthDispatchContextData } from './types';

export const AuthStateContext = createContext({} as AuthStateContextData);

export const AuthDispatchContext = createContext({} as AuthDispatchContextData);