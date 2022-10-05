import { useContext, useEffect, useState } from 'react';
import { useMutation } from 'react-query';

import { AuthContext } from './AuthContext';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const { mutateAsync: validateUser } = useMutation(auth.validateToken);

  useEffect(() => {
    (async () => {
      const result = validateUser();
      setLoading(false);
      return result;
    })();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
      </div>
    );
  }

  return children;
};

export { RequireAuth };

