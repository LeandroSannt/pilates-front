import { useMemo, useState } from 'react';

import { useAuth } from '../hooks/auth/useAuth';
import { ISigninProps, IUser } from '../interfaces/user';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const api = useAuth();
  const setToken = (token: string) => {
    localStorage.setItem('gerenciamento-aulas', token);
  };

  const validateToken = async () => {
    const storageData = localStorage.getItem('gerenciamento-aulas');
    if (storageData) {
      const data = await api.validateToken(storageData);
      if (data.user) {
        setUser(data.user);
        return data.user;
      }
    }
  };

  const signin = async (body: ISigninProps) => {
    const data = await api.signin(body);

    if (data.session_token) {
      setToken(data.session_token);
      return true;
    }
    return false;
  };

  const signout = async () => {
    await api.logout();
    setUser(null);
    setToken('');
  };



  const value = useMemo(
    () => ({ user, setUser, signout, signin, validateToken }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider };

