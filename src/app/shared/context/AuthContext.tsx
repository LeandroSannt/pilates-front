import { createContext } from 'react';

type AuthContextType = {
  user: any | null;

  signin: (body: any) => Promise<boolean>;

  signout: () => void;

  validateToken: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>(null!);

export type { AuthContextType };
