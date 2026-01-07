import { useGoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import AuthContext from "@/Context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { toast } from "react-toastify";

const GoogleLoginButton: React.FC = () => {
  const { loginUserGoogle } = useContext(AuthContext);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // tokenResponse shape depends on Google SDK flow. Be defensive and accept
      // access_token, credential (id_token), or code if present.
      console.log("Google tokenResponse:", tokenResponse);
      const anyResp: any = tokenResponse as any;
      const tokenToSend = anyResp?.access_token ?? anyResp?.credential ?? anyResp?.code;
      if (tokenToSend) {
        await loginUserGoogle(tokenToSend);
      } else {
        toast.error("Could not obtain token from Google login");
      }
    },
    flow: "implicit", // Ensure we are using the correct authentication flow
  });

  return (
    <div
      className="flex-1 text-center bg-white/30 py-2 rounded-full text-black hover:bg-white/50 cursor-pointer p-1"
      onClick={() => login()}
    >
      <FontAwesomeIcon icon={faGoogle} className="mr-2" />
      Continue with Google
    </div>
  );// 
};

export default GoogleLoginButton;