// import { NavLink } from "react-router";
import { useState, useContext, useEffect } from "react";
import AuthContext from "@/Context/AuthContext";
// import { NavLink } from "react-router-dom";
import { Link, NavLink } from 'react-router-dom';
import GoogleLoginButton from "./GoogleLoginButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


interface LoginFormProps {
  isMobile?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ isMobile }) => {
  // const { loginUserCA, clearTokens } = useContext(AuthContext);
  const { loginUserKY, clearTokens } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [requesting, setRequesting] = useState(false); // New state for loading
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    console.log("clearing tokens");
    clearTokens();
    // window.location.reload(); 
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClick = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the page from refreshing
    setRequesting(true); // Start loading
    try {
      const result = await loginUserKY(formData.email, formData.password); // Call the login function
      console.log(result); // Log the result to the console
    } catch (error) {
      console.error("Login failed", error); // Log any error
    } finally {
      setRequesting(false); // End loading
    }
  };

  return (
    <div className="w-full h-full bg-[#D2C1A1] flex justify-center items-center">
    <div
      className={`${
        isMobile
          ? "  w-full h-full p-6 rounded-lg overflow-scroll"
          : "relative h-4/5 w-3/5 bg-[#D2C1A1]"
      }`}
    >
      <h2
        className={`text-center ${
          isMobile ? "text-3xl text-[#101720]" : "text-5xl"
        } font-semibold mb-10`}
      >
        Login
      </h2>
      <form>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
          className="w-full h-10 mb-5 px-4 py-6 rounded-full border bg-[#D2C1A1] border-[#3E0F0F] placeholder:text-[#3E0F0F]"
          onChange={handleChange}
        />
        
        {/* FIX APPLIED: Wrap input and icon in a relative div for positioning */}
        <div className="relative mb-3"> 
          <input
            type={showPassword?"text" : "password"}
            id="password"
            placeholder="Password"
            name="password"
            required
            // Note: The input has py-6 padding and h-10, making its total height around 58px.
            // The existing py-6 padding is likely causing the input to be taller than needed.
            // I'm keeping the original classes but focusing the icon fix.
            className="w-full h-10 px-4 bg-[#D2C1A1] py-6 rounded-full border border-[#3E0F0F] placeholder:text-[#3E0F0F] pr-12" // Added pr-12 to make space for the icon
            onChange={handleChange}
            />
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            onClick={() => setShowPassword(!showPassword)}
            // New styles for reliable vertical centering:
            // top-1/2: Position the top edge at 50% down
            // -translate-y-1/2: Shift up by 50% of the icon's height
            // right-4: Position it 1rem (4 * 0.25rem) from the right edge
            className="absolute top-1/2 transform -translate-y-1/2 right-4 cursor-pointer text-[#555] text-lg"
            />
        </div>
        
        <div className="text-right">
            <Link
              to="/forgot-password"
              className={`text-sm ${isMobile ? "text-[#101720]" : "text-gray-600"} hover:underline`}
              >
              Forgot password?
              </Link>
              </div>
              <button
        type="submit"
        disabled={requesting} // Disable button while loading
        style={{
          backgroundColor: "#310D3D", // Dark purple
        }}
        className={`w-full h-11 text-[#fafafa] text-lg font-medium rounded-full shadow-xl mt-5 ${
          requesting ? "bg-gray-400 cursor-not-allowed" : "hover:opacity-90"
        }`}
        onClick={handleClick}
      >
  {requesting ? (
    <div className="flex justify-center items-center">
      <svg
        className="animate-spin h-5 w-5 mr-3 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 10h2zm2 5.291A7.963 7.963 0 014 12H2c0 2.21.895 4.21 2.343 5.657l1.414-1.366z"
        ></path>
      </svg>
      Logging in...
    </div>
  ) : (
    "Log in"
  )}
</button>


      </form>
      <div className="flex items-center my-4">
        <hr className="flex-grow border-[#3E0F0F]" />
        <span
          className={`mx-2 text-sm ${isMobile ? "text-[#101720]" : "text-gray-600"}`}
        >
          or continue with
        </span>
        <hr className="flex-grow border-[#3E0F0F]" />
      </div>
      <GoogleLoginButton />
      <div className="text-center mt-2">
      <p className={`text-${isMobile ? "md text-[#101720]" : "lg text-gray-700"} `}>
  Don&apos;t have an account?{" "}
          <span className="text-lg text-[#101720] text-center mt-4">
            <NavLink
              to="/register"
              className="underline font-semibold hover:text-orange-600"
            >
              Sign up
            </NavLink>
          </span>
</p>
      </div>
    </div>
    </div> 
  );
};

export default LoginForm;
