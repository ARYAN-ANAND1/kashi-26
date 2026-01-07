import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "@/Context/AuthContext";

interface ZonalPrivateRouteProps {
  children: React.ReactNode;
}

function looksLikeZonal(userInfo: any, authTokens: any, zonalAuthTokens: any) {
  if (!userInfo && !authTokens && !zonalAuthTokens) return false;
  if (userInfo) {
    if ((userInfo as any).origin === "zonal") return true;
    if ((userInfo as any).isZonal) return true;
    if ((userInfo as any).is_zonal) return true;
  }
  if (authTokens) {
    if ((authTokens as any).origin === "zonal") return true;
  }
  if (zonalAuthTokens) return true;
  return false;
}

const ZonalPrivateRoute = ({ children }: ZonalPrivateRouteProps) => {
  const { authTokens, userInfo, zonalAuthTokens } = useContext(AuthContext) || {};

  // If no general auth at all, send to zonal login
  if (!authTokens && !zonalAuthTokens) {
    return <Navigate to="/zonal-login" replace />;
  }

  // If user is not zonal, redirect to normal profile
  if (!looksLikeZonal(userInfo, authTokens, zonalAuthTokens)) {
    return <Navigate to="/profile" replace />;
  }

  // Otherwise allow access
  return <>{children}</>;
};

export default ZonalPrivateRoute;
