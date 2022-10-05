import { createContext } from 'react';
import { ISigninProps, IUser } from '../interfaces/user';

type AuthContextType = {
  user: IUser | null;

  signin: (body: ISigninProps) => Promise<boolean>;

  signout: () => void;

  validateToken: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>(null!);

export type { AuthContextType };
