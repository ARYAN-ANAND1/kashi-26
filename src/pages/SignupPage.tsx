import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router";
import AuthContext from "@/Context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Importing toast from react-toastify
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const VITE_BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000/";

export function SignupPage() {
  const { userInfo, clearTokens, setAuthTokens, setInfoFromToken, loginUserKY } = useContext(AuthContext);

  useEffect(() => {
    console.log("clearing tokens");
    clearTokens();
  }, [clearTokens]);

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    college: "",
    degree: "",
    year: "",
    mobile_number: "",
    gmail: "",
    referred_by: "",
    password: "",
    confirm_password: "",
    is_ca: false,
  });

  // OTP flow state (make registration OTP-gated like zonal)
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const [requesting, setRequesting] = useState(false);
  const navigator = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    const parsedValue =
      id === "year"
        ? value === ""
          ? ""
          : Math.max(0, Number(value))
        : value;

    setFormData((prevData) => ({
      ...prevData,
      [id]: parsedValue,
    }));
  };

  // Email change handler for OTP flow
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setFormData((prev) => ({ ...prev, gmail: newEmail }));
    if (otpSent && newEmail !== email) {
      setOtpSent(false);
      setOtpVerified(false);
      setOtp("");
      setResendTimer(0);
      toast.info("Email changed. Please send OTP again.");
    }
  };

  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer((s) => s - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendTimer]);

  const sendOtp = async () => {
    if (!email) return toast.error("Email cannot be empty");
    setSendingOtp(true);
    try {
      await axios.post(`${VITE_BACKEND_URL}/api/user/send-otp`, { gmail: email });
      toast.success("OTP sent to your email");
      setOtpSent(true);
      setResendTimer(30);
    } catch (e) {
      toast.error("Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) return toast.error("Enter OTP");
    setVerifyingOtp(true);
    try {
      await axios.post(`${VITE_BACKEND_URL}/api/user/verify-otp`, { gmail: email, otp });
      toast.success("OTP verified!");
      setOtpVerified(true);
    } catch (e) {
      toast.error("OTP verification failed");
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!formData.college) {
      toast.error("College cannot be empty");
      return;
    }
    if (!formData.confirm_password) {
      toast.error("Confirm Password cannot be empty");
      return;
    }
    if (!formData.gmail) {
      toast.error("Email cannot be empty");
      return;
    }
    if (!formData.mobile_number) {
      toast.error("Mobile Number cannot be empty");
      return;
    }
    if (!formData.name) {
      toast.error("Name cannot be empty");
      return;
    }
    if (!formData.gender) {
      toast.error("Gender cannot be empty");
      return;
    }
    if (!formData.password) {
      toast.error("Password cannot be empty");
      return;
    }
    if (!formData.year) {
      toast.error("Year cannot be empty");
      return;
    }
    if (isNaN(Number(formData.year))) {
      toast.error("Year must be a number!");
      return;
    }
    if (isNaN(Number(formData.mobile_number))) {
      toast.error("Mobile Number must be a number!");
      return;
    }

    console.log(formData);
    if (formData.password === formData.confirm_password) {
      setRequesting(true);
      try {
        let response = await axios.post(
          `${VITE_BACKEND_URL}/api/user/create`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Register res", response.data);


        if (response.status === 201) {
          toast.success(response.data.msg, {
            position: "top-center",
            autoClose: 3000,
          });
          if (userInfo) {
            toast.success("Login again to access ambassador dashboard!", {
              position: "top-center",
              autoClose: 3000,
            });
          }
          // If backend returned tokens, set them and fetch profile, else try to auto-login
          if (response.data && response.data.access) {
            try {
              setAuthTokens(response.data);
              await setInfoFromToken(response.data.access);
              navigator("/profile");
            } catch (err) {
              navigator("/");
            }
          } else {
            // fallback: attempt login with provided credentials
            try {
              await loginUserKY(formData.gmail, formData.password);
              // loginUserKY navigates on success; ensure we land on profile
              navigator("/profile");
            } catch (err) {
              navigator("/");
            }
          }
        } else if (response.status === 406 || response.status === 226) {
          toast.error(response.data.msg, {
            position: "top-center",
            autoClose: 3000,
          });
        } else if (response.status === 400) {
          toast.error("Email already registered!", {
            position: "top-center",
            autoClose: 3000,
          });
        }
        setRequesting(false);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          // Check for specific error message
          if (error.response.data.message === "gmail already registered") {
            toast.error("This email is already registered. Please use a different email.", {
              position: "top-center",
              autoClose: 3000,
            });
          } else {
            toast.error("Server Error! Try again later.", {
              position: "top-center",
              autoClose: 3000,
            });
          }
        } else {
          toast.error("Server Error! Try again later.", {
            position: "top-center",
            autoClose: 3000,
          });
        }
        setRequesting(false);
      }
    } else {
      toast.error("Password and confirm password should be the same");
      setRequesting(false);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[url(/singupBg.jpg)] bg-cover bg-center">
      <Link to="/">
        <img
          src="/KY_logo.svg"
          className="absolute top-4 left-4 bg-[#101720] rounded-full w-20 md:w-40 filter invert"
          alt="Logo"
        />
      </Link>

      <div className="w-full max-w-lg bg-[#D2C1A1] backdrop-blur-lg rounded-lg shadow-lg p-6 max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
        <div className="text-center mb-10">
          <p className="text-4xl text-[#101720] font-semibold mb-2">
            Register
          </p>
          <p className="text-xs text-[#3E0F0F] font-bold">For IIT BHU students, use @itbhu.ac.in in email</p>
          <p className="text-xs text-[#3E0F0F] font-bold">(If you havent recieved any OTP on your Email, use 4026)</p>
        </div>
        { !otpVerified ? (
          <div className="space-y-4">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Email"
                value={email || formData.gmail}
                onChange={handleEmailChange}
                className="w-full rounded-full p-3 border bg-[#D2C1A1] border-[#3E0F0F] placeholder:text-[#3E0F0F] focus:outline-none focus:ring focus:ring-[#101720]"
              />
              <button
                type="button"
                onClick={sendOtp}
                disabled={sendingOtp || resendTimer > 0}
                className={`px-4 rounded-full ${sendingOtp ? 'bg-gray-400' : 'bg-[#3E0F0F] text-white'}`}
              >
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : sendingOtp ? 'Sending...' : 'Send OTP'}
              </button>
            </div>
            {otpSent && (
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full rounded-full p-3 border bg-[#D2C1A1] border-[#3E0F0F] placeholder:text-[#3E0F0F] focus:outline-none focus:ring focus:ring-[#101720]"
                />
                <button
                  type="button"
                  onClick={verifyOtp}
                  disabled={verifyingOtp}
                  className={`px-4 rounded-full ${verifyingOtp ? 'bg-gray-400' : 'bg-[#3E0F0F] text-white'}`}
                >
                  {verifyingOtp ? 'Verifying...' : 'Verify OTP'}
                </button>
              </div>
            )}
            <div className="text-center mt-2">
              <p className="text-sm">Already have an account? <NavLink to="/login" className="underline">Login</NavLink></p>
            </div>
          </div>
        ) : (
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              id="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-full p-3 border bg-[#D2C1A1] border-[#3E0F0F] placeholder:text-[#3E0F0F] focus:outline-none focus:ring focus:ring-[#101720]"
            />
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              id="college"
              placeholder="College"
              value={formData.college}
              onChange={handleChange}
              className="w-full rounded-full p-3 border bg-[#D2C1A1] border-[#3E0F0F] placeholder:text-[#3E0F0F] focus:outline-none focus:ring focus:ring-[#101720]"
            />
            <select
              title="gender"
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full rounded-full p-3 border bg-[#D2C1A1] border-[#3E0F0F] placeholder:text-[#3E0F0F] focus:outline-none focus:ring focus:ring-[#101720]"
            >
              <option value="">Your Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex gap-4">
            <input
              type="number"
              id="year"
              placeholder="Year of study"
              value={formData.year}
              onChange={handleChange}
              className="w-full rounded-full p-3 border bg-[#D2C1A1] border-[#3E0F0F] placeholder:text-[#3E0F0F] focus:outline-none focus:ring focus:ring-[#101720] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />

            <input
              type="tel"
              id="mobile_number"
              placeholder="Mobile number"
              value={formData.mobile_number}
              onChange={handleChange}
              className="w-full rounded-full p-3 border bg-[#D2C1A1] border-[#3E0F0F] placeholder:text-[#3E0F0F] focus:outline-none focus:ring focus:ring-[#101720]"
            />
          </div>

          <div className="flex gap-4">
            <input
              type="email"
              id="gmail"
              placeholder="Email"
              value={formData.gmail}
              onChange={handleChange}
              className="w-full rounded-full p-3 border bg-[#D2C1A1] border-[#3E0F0F] placeholder:text-[#3E0F0F] focus:outline-none focus:ring focus:ring-[#101720]"
            />
            <input
              type="text"
              id="referred_by"
              placeholder="Referral code (Optional)"
              value={formData.referred_by}
              onChange={handleChange}
              className="w-full rounded-full p-3 border bg-[#D2C1A1] border-[#3E0F0F] placeholder:text-[#3E0F0F] focus:outline-none focus:ring focus:ring-[#101720]"
            />
          </div>
          <div className="flex relative gap-4">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-full p-3 border bg-[#D2C1A1] border-[#3E0F0F] placeholder:text-[#3E0F0F] focus:outline-none focus:ring focus:ring-[#101720]"
            />
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "55%",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "18px",
                color: "#555",
              }} />


            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm_password"
              placeholder="Confirm Password"
              value={formData.confirm_password}
              onChange={handleChange}
              className="w-full rounded-full p-3 border bg-[#D2C1A1] border-[#3E0F0F] placeholder:text-[#3E0F0F] focus:outline-none focus:ring focus:ring-[#101720]"
              //add icon to show/hide password
            />
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEye : faEyeSlash}
              onClick={() => setShowConfirmPassword (!showConfirmPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "18px",
                color: "#555",
              }} />
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={requesting}
              className={`w-2/3 sm:w-1/3 py-3 rounded-full shadow-md focus:ring text-[#fafafa] ${requesting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#3E0F0F] hover:bg-[#4f1313] text-[#fafafa]"
                }`}
                style={{
                  backgroundColor: "#310D3D", // Dark purple
                }}
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
                  Loading...
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>

          <div className="text-lg text-[#101720] text-center mt-4">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="underline font-semibold hover:text-orange-600"
            >
              Login
            </NavLink>
          </div>
        </form>
        )}
      </div>
    </div>
  );
}

export default SignupPage;