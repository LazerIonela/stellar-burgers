import React from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  isAuth?: boolean;
  children: React.ReactElement;
};

const ProtectedRoute = ({ isAuth = false, children }: ProtectedRouteProps) => {
  if (!isAuth) {
    return <Navigate to='/login' />;
  }

  return children;
};

export default ProtectedRoute;
