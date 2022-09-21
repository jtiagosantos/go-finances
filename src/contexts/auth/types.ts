export interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

export interface AuthorizationResponse {
  params: {
    access_token: string;
  },
  type: string;
}

export interface AuthStateContextData {
  user?: User;
  loadingData: boolean;
}

export interface AuthDispatchContextData {
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
}