import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import { useSelector } from '../../services/store';
import { selectUser, selectUserIsAuth } from '../../services/userSlice';

type TProtectedRoute = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: TProtectedRoute) => {
  const user = useSelector(selectUser);
  const isAuthChecked = useSelector(selectUserIsAuth);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }
  if (!onlyUnAuth && !user) {
    // для авторизованных, но неавторизованный
    return <Navigate to='/login' state={{ from: location }} />;
  }
  if (onlyUnAuth && user) {
    // для неавторизованых, но авторизован
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  return children;
};
