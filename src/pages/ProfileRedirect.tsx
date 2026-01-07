import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "@/Context/AuthContext";
import Dashboard from "@/pages/Dashboard";

function looksLikeZonal(userInfo: any, authTokens: any) {
  if (!userInfo && !authTokens) return false;
  if (userInfo) {
    if ((userInfo as any).origin === "zonal") return true;
    if ((userInfo as any).isZonal) return true;
    if ((userInfo as any).is_zonal) return true;
  }
  if (authTokens) {
    if ((authTokens as any).origin === "zonal") return true;
  }
  return false;
}

const ProfileRedirect = () => {
  const { authTokens, userInfo } = useContext(AuthContext);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // quick check; resolved immediately since we rely on context
    setChecked(true);
  }, [authTokens, userInfo]);

  if (!authTokens) {
    return <Navigate to="/login" replace />;
  }

  if (!checked) return null;

  if (looksLikeZonal(userInfo, authTokens)) {
    // redirect zonal users to zonal profile
    return <Navigate to="/profile/zonal" replace />;
  }

  // non-zonal -> show normal dashboard/profile
  return <Dashboard />;
};

export default ProfileRedirect;
