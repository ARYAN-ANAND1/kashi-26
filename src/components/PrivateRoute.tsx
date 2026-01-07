import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '@/Context/AuthContext';
//l
interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { authTokens } = useContext(AuthContext) || {};
    // For the lolls
  if (!authTokens) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;