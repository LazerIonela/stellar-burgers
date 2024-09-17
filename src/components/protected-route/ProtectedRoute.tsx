import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import { useSelector } from '../../services/store';
import { selectUser, selectUserIsAuthChecked } from '../../services/userSlice';

type TProtectedRoute = {
  onlyUnAuth?: boolean;
  children: React.JSX.Element;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: TProtectedRoute): React.JSX.Element => {
  const user = useSelector(selectUser);
  const isAuthChecked = useSelector(selectUserIsAuthChecked);
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
export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({
  children
}: {
  children: React.JSX.Element;
}): React.JSX.Element => <ProtectedRoute onlyUnAuth children={children} />;
