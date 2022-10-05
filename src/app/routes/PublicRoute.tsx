import React from 'react';
import { Navigate } from 'react-router-dom';

import LoginLayout from '../pages/_layouts/SignIn';

type Props = {
  children?: React.ReactNode; // 👈️ type children
};

const PublicRoute = ({ children }:Props) => {

  const c = true

  // se estiver logado encaminha para home



  if (!c) {
    return <Navigate to="/companies" />;
  }

  return <LoginLayout>{children}</LoginLayout>;
};

export default PublicRoute;
