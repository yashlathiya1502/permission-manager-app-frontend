import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthService from '../utils/authServices';

const AuthRestrictedRoute = () => {
  const location = useLocation();
  if (AuthService.isLoggedIn()) {
    return <Navigate to={location.pathname} />;
  }
  return <Outlet />;
};

export default AuthRestrictedRoute;
