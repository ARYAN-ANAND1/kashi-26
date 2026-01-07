import { createContext, useState, useEffect, ReactNode } from "react";
// import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface User {
  name: string;
  email: string;
  ca_id?: string; // Optional field
  gender?: string | undefined;
  college?: string | undefined;
  reason?: string | undefined;
  year?: string | undefined;
  mobile_number?: string | undefined;
  ky_id: string;
  profile_picture:string;
  paymentStatus: boolean;
  registered_teams:number[];
  isIITStudent?: boolean;
}

const defaultAuthContext: AuthContextType = {
  userInfo: null,
  authTokens: null,
  zonalAuthTokens: null,
  zonalUserInfo: null,
  setAuthTokens: () => {},
  setZonalAuthTokens: () => {},
  loginUserKY: async () => {},
  loginUserGoogle: async () => {},
  loginUserZonal: async () => false,
  setInfoFromToken: async () => {
    console.log("Default setInfoFromToken called.");
  }, // Add this default implementation
  logoutUser: () => {},
  logoutZonal: () => {},
  clearTokens: () => {},
  testContext: () => console.log("Default context"),
};

interface AuthContextType {
  userInfo: User | null;
  authTokens: any; // You can define a more specific type for tokens if necessary
  zonalAuthTokens: any;
  zonalUserInfo: any | null;
  setAuthTokens: React.Dispatch<any>;
  setZonalAuthTokens: React.Dispatch<any>;
  loginUserKY: (email: string, password: string) => Promise<void>;
  loginUserGoogle: (token: string) => Promise<void>;
  // Accept either a provider token string (Google) or an object with gmail+otp or gmail+password
  loginUserZonal: (
    payload: string | { gmail: string; otp?: string } | { gmail: string; password: string }
  ) => Promise<boolean>;
  logoutZonal: () => void;
  setInfoFromToken: (access_token: string) => Promise<void>; // Add this
  logoutUser: () => void;
  clearTokens: () => void;
  testContext: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>(defaultAuthContext);
export default AuthContext;

const VITE_BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [authTokens, setAuthTokens] = useState(() => {
    const storedTokens = localStorage.getItem("authTokens");
    return storedTokens ? JSON.parse(storedTokens) : null;
  });
  const [zonalAuthTokens, setZonalAuthTokens] = useState(() => {
    const stored = localStorage.getItem("zonalAuthTokens");
    return stored ? JSON.parse(stored) : null;
  });
  const [zonalUserInfo, setZonalUserInfo] = useState<any | null>(null);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const setInfoFromToken = async (access_token: string) => {
    try {
      let response = await axios({
        method: "get",
        url: `${VITE_BACKEND_URL}/api/user/profile`,
        headers: { Authorization: `Bearer ${access_token}` },
      });

        console.log("info res", response.data)

      if (response.status === 200) {
        const body = {
          name: response.data.name,
          email: response.data.gmail,
          ca_id: response.data.ca_id,
          gender: response.data.gender,
          college: response.data.college,
          reason: response.data.reason || undefined,
          year: response.data.year || undefined,
          mobile_number: response.data.mobile_number || undefined,
          ky_id: response.data.ky_id,
          pro: response.data.ky_id,
          profile_picture:response.data.profile_picture,
          // Prefer backend-provided paymentStatus (computed from max registrations
          // or purchased benefits). Fall back to purchased_benefits check for
          // older backends that might not include paymentStatus.
          paymentStatus:
            response.data.paymentStatus === true ||
            (Array.isArray(response.data.purchased_benefits) &&
              response.data.purchased_benefits.length > 0) ||
            (typeof response.data.max_registrations === "number" &&
              response.data.max_registrations > 0),
          registered_teams: response.data.registered_teams,
          isIITStudent: response.data.isIITBHUStudent,
        };

        console.log("body",body);
        setUserInfo(body);
        // toast.success(`Welcome ${response.data.full_name}!`);
      } else {
        toast.error("Something went wrong while fetching user data!");
      }
    } catch (e) {
      console.error("setuserinfoerror", e);
    }
  };

  const loginUserKY = async (gmail: string, password: string) => {
    try {
      console.log(JSON.stringify({ gmail, password }));
      let response = await fetch(`${VITE_BACKEND_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Login-Method": "password",
        },
        body: JSON.stringify({ gmail, password }),
      });

      let data = await response.json();

      if (response.status === 200) {
        // console.log("Toast should appear now");

        setAuthTokens(data);
        localStorage.setItem("authTokens", JSON.stringify(data));
        toast.success("Logged in successfully!");
        let res = await axios({
          method: "get",
          url: `${VITE_BACKEND_URL}/api/user/profile`,
          headers: { Authorization: `Bearer ${data.access}` },
        });
        // console.log(`Helloo oooop oo ${data.access}`)
        setInfoFromToken(data.access);
        // console.log(`Helloo oooop oo ${userInfo}`)
        toast.success(`Welcome ${res.data.name}!`);
        navigate("/");
      // } else if (response.status === 400) {
      //   toast.error("Login failed! Please check your Credentials!");
      } else {
        console.log(response.statusText)
        toast.error("Login failed! Please check your Credentials!");
      }
    } catch (error) {
      toast.error("Server Error! Try again later.");
    }
  };

  const loginUserGoogle = async (token: string) => {
    try {
      console.log("loginUserGoogle: sending token to backend", token);
      let res = await fetch(`${VITE_BACKEND_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "login-method": "gmail",
        },
        body: JSON.stringify({ access_token: token }),
      });

      const data = await res.json();
      console.log("loginUserGoogle: backend response", res.status, data);

      if (res.status === 200) {
        setAuthTokens(data);
        localStorage.setItem("authTokens", JSON.stringify(data));
        toast.success("Logged in successfully!");
        let profileRes = await axios({
          method: "get",
          url: `${VITE_BACKEND_URL}/api/user/profile`,
          headers: { Authorization: `Bearer ${data.access}` },
        });
        await setInfoFromToken(data.access);
        toast.success(`Welcome ${profileRes.data.name}!`);
        navigate("/");
      } else if (res.status === 400) {
        toast.error("Gmail not registered!");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error("loginUserGoogle error:", error);
      toast.error("Server Error! Try again later.");
    }
  };

  const loginUserZonal = async (
    payload: string | { gmail: string; otp?: string } | { gmail: string; password: string }
  ): Promise<boolean> => {
    try {
      let body: any;
      // If payload is a string, assume it's a provider access token (Google)
      if (typeof payload === "string") {
        body = { access_token: payload };
      } else if ((payload as any).password) {
        // Password-based zonal login
        body = { gmail: (payload as any).gmail, password: (payload as any).password };
      } else {
        // OTP-based zonal login: send gmail and otp
        body = { gmail: (payload as any).gmail, otp: (payload as any).otp };
      }

      console.log("loginUserZonal: sending body", body);
      // If we're sending a provider token (string), include the login-method header
      const headers: any = { "Content-Type": "application/json" };
      if (typeof payload === "string") {
        headers["login-method"] = "gmail"; // match main loginUserGoogle
      }
      console.log("loginUserZonal: headers", headers);
      let res = await fetch(`${VITE_BACKEND_URL}/api/user/login/zonal`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      console.log("loginUserZonal: response status", res.status);
      const data = await res.json();
      console.log("loginUserZonal: response body", data);

      if (res.status === 200) {
        setAuthTokens(data);
        localStorage.setItem("authTokens", JSON.stringify(data));
        toast.success("Logged in successfully!");
        await setInfoFromToken(data.access);
        toast.success(`Welcome ${data.name || "Zonal user"}!`);
        return true;
      } else if (res.status === 400) {
        toast.error("Zonal login failed!");
        return false;
      } else {
        toast.error("Something went wrong!");
        return false;
      }
    } catch (error) {
      toast.error("Server Error! Try again later.");
      return false;
    }
  };

  const clearTokens = () => {
    setAuthTokens(null);
    localStorage.removeItem("authTokens");
    setUserInfo(null);
  };

  const clearZonalTokens = () => {
    setZonalAuthTokens(null);
    localStorage.removeItem("zonalAuthTokens");
    setZonalUserInfo(null);
  };

  const logoutUser = () => {
    clearTokens();
    setUserInfo(null); // Ensure user info is also cleared
    toast.success("Logged out!");
    navigate("/login");
  };

  const logoutZonal = () => {
    clearZonalTokens();
    toast.success("Zonal logged out!");
    navigate("/zonal-login");
  };

  //   const refreshTokens = async () => {
  //     try {
  //       if (!authTokens?.refresh) {
  //         clearTokens();
  //         return;
  //       }

  //       const response = await axios.post(`${VITE_BACKEND_URL}/api/token/refresh/`, {
  //         refresh: authTokens.refresh
  //       });

  //       if (response.status === 200) {
  //         const newTokens = {
  //           access: response.data.access,
  //           refresh: authTokens.refresh // Keep old refresh token
  //         };

  //         setAuthTokens(newTokens);
  //         localStorage.setItem('authTokens', JSON.stringify(newTokens));

  //         await setInfoFromToken(newTokens.access);
  //         // toast.success('Session refreshed!');
  //       } else {
  //         clearTokens();
  //         toast.error('Session expired! Please log in again.');
  //         navigate("/login");
  //       }
  //     } catch (error) {
  //       clearTokens();
  //       toast.error('Session expired! Please log in again.');
  //       navigate("/login");
  //     }
  //   };
  useEffect(() => {
    if (loading) {
      if (authTokens) {
        setInfoFromToken(authTokens.access);
        // refreshTokens();
      }
      setLoading(false);
    } else {
      if (authTokens && !userInfo) {
        setInfoFromToken(authTokens.access);
      }
    }
  }, [authTokens]);

  const contextData = {
    userInfo: userInfo,
    authTokens,
    zonalAuthTokens,
    zonalUserInfo,
    setAuthTokens,
    setZonalAuthTokens,
    loginUserKY,
    loginUserGoogle,
    loginUserZonal,
    logoutUser,
    logoutZonal,
    clearTokens,
    setInfoFromToken,
    testContext: () => {
      console.log("HELLO FROM CONTEXT!");
    },
  };

  return (
    <AuthContext.Provider value={contextData}>
      {!loading && children}
    </AuthContext.Provider>
  );
};