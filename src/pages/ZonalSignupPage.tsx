import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "@/Context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const VITE_BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000/";

export function ZonalSignupPage() {
  const { clearTokens, loginUserZonal, setAuthTokens, setInfoFromToken } = useContext(AuthContext);
  const navigate = useNavigate();

  // OTP / Email state
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");

  // Form state (other fields)
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    college: "",
    degree: "",
    year: "",
    mobile_number: "",
    referred_by: "",
    password: "",
    confirm_password: "",
    is_ca: false,
  });

  const [requesting, setRequesting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    clearTokens();
  }, [clearTokens]);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    let parsedValue: string | number | boolean = value;

    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      parsedValue = e.target.checked;
    } else if (e.target.type === "number") {
      parsedValue = value === "" ? "" : Number(value);
    }

    setFormData((prev) => ({
      ...prev,
      [id]: parsedValue,
    }));
  };

  // --- Email Change Handler ---
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    // Reset OTP flow if email is changed after OTP was sent
    if (otpSent && newEmail !== email) {
      setOtpSent(false);
      setOtpVerified(false);
      setOtp("");
      setResendTimer(0);
      toast.info("Email changed. Please send OTP again.");
    }
  };

  // --- OTP Functions ---
  const sendOtp = async () => {
    if (!email) {
      toast.error("Email cannot be empty");
      return;
    }
    setSendingOtp(true);
    try {
      await axios.post(`${VITE_BACKEND_URL}/api/user/send-otp`, { gmail: email });
      toast.success("OTP sent to your email");
      setOtpSent(true);
      setResendTimer(30); // 30 second cooldown before resend
    } catch {
      toast.error("Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      toast.error("Enter OTP");
      return;
    }
    setVerifyingOtp(true);
    try {
      await axios.post(`${VITE_BACKEND_URL}/api/user/verify-otp`, { gmail: email, otp });
      toast.success("OTP verified!");
      setOtpVerified(true);
    } catch {
      toast.error("OTP verification failed");
    } finally {
      setVerifyingOtp(false);
    }
  };

  // --- Key Handlers ---
  const handleEmailKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !otpSent && !sendingOtp) {
      e.preventDefault();
      sendOtp();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && otpSent && !otpVerified && !verifyingOtp) {
      e.preventDefault();
      verifyOtp();
    }
  };

  // --- Submit Registration ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otpVerified) {
      toast.error("Verify your OTP first");
      return;
    }

    const requiredFields = [
      "name",
      "gender",
      "college",
      "year",
      "mobile_number",
      "password",
      "degree",
      "confirm_password",
    ];
    for (let field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        toast.error(`${field.replace("_", " ")} cannot be empty`);
        return;
      }
    }

    if (formData.password !== formData.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    console.log(formData);

    setRequesting(true);
    try {
      const res = await axios.post(`${VITE_BACKEND_URL}/api/user/create/zonal`, {
        gmail: email,
        ...formData,
      });
      toast.success("Registration successful!");

      // If backend returned tokens on create (Option A), use them directly
      if (res?.status === 201 && res.data?.access) {
        const data = res.data;
        setAuthTokens(data);
        localStorage.setItem("authTokens", JSON.stringify(data));
        await setInfoFromToken(data.access);
        navigate("/profile/zonal");
        return;
      }

      // Attempt to auto-login the newly created zonal user using email+password
      try {
        const ok = await loginUserZonal({ gmail: email, password: formData.password });
        if (ok) {
          navigate("/profile/zonal");
          return;
        }
      } catch (e) {
        // ignore and fall back to redirect
      }

      // Fallback redirect to home if auto-login didn't succeed
      navigate("/");
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Server Error! Try again later.");
      }
    } finally {
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
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          {/* Step 1: Email & OTP */}
          {!otpVerified && (
            <>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                onKeyDown={handleEmailKeyDown}
                className="w-full rounded-full p-3 border bg-[#D2C1A1] border-[#3E0F0F] focus:outline-none focus:ring-2 focus:ring-[#3E0F0F]"
              />
              {otpSent && (
                <p className="text-xs text-center text-[#3E0F0F] -mt-2">
                  Need to change email? Edit above and resend OTP.
                </p>
              )}

              {otpSent && (
                <>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      onKeyDown={handleOtpKeyDown}
                      className="w-full rounded-full p-3 border bg-[#D2C1A1] border-[#3E0F0F] focus:outline-none focus:ring-2 focus:ring-[#3E0F0F]"
                      disabled={verifyingOtp}
                    />
                    <button
                      type="button"
                      onClick={verifyOtp}
                      disabled={verifyingOtp}
                      className={`px-6 py-3 rounded-full whitespace-nowrap ${
                        verifyingOtp
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#3E0F0F] hover:bg-[#4f1313] text-white"
                      }`}
                    >
                      {verifyingOtp ? "Verifying..." : "Verify"}
                    </button>
                  </div>
                  {resendTimer > 0 ? (
                    <p className="text-sm text-center text-[#3E0F0F]">
                      Resend OTP in {resendTimer}s
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={sendOtp}
                      disabled={sendingOtp}
                      className="text-sm text-center w-full text-[#3E0F0F] underline hover:text-[#4f1313]"
                    >
                      {sendingOtp ? "Sending..." : "Resend OTP"}
                    </button>
                  )}
                </>
              )}

              {!otpSent && (
                <button
                  type="button"
                  onClick={sendOtp}
                  disabled={sendingOtp}
                  className={`w-full py-3 rounded-full ${
                    sendingOtp
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#3E0F0F] hover:bg-[#4f1313] text-white"
                  }`}
                >
                  {sendingOtp ? "Sending..." : "Send OTP"}
                </button>
              )}
            </>
          )}

          {/* Step 2: Full registration form after OTP verified */}
          {otpVerified && (
            <>
              <input
                type="text"
                id="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleFormChange}
                className="w-full rounded-full p-3 border bg-[#D2C1A1] border-[#3E0F0F] focus:outline-none focus:ring-2 focus:ring-[#3E0F0F]"
              />

              <div className="flex gap-4">
                <input
                  type="text"
                  id="college"
                  placeholder="College"
                  value={formData.college}
                  onChange={handleFormChange}
                  className="w-full rounded-full p-3 border bg-[#D2C1A1] border-[#3E0F0F] focus:outline-none focus:ring-2 focus:ring-[#3E0F0F]"
                />
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={handleFormChange}
                  className="w-full rounded-full p-3 border bg-[#D2C1A1] border-[#3E0F0F] focus:outline-none focus:ring-2 focus:ring-[#3E0F0F]"
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex gap-4">
                <input
                  type="text"
                  id="degree"
                  placeholder="Degree"
                  value={formData.degree}
                  onChange={handleFormChange}
                  className="w-full rounded-full p-3 border bg-[#D2C1A1] border-[#3E0F0F] focus:outline-none focus:ring-2 focus:ring-[#3E0F0F]"
                />
                <input
                  type="number"
                  id="year"
                  placeholder="Year"
                  value={formData.year}
                  onChange={handleFormChange}
                  className="w-full rounded-full p-3 border bg-[#D2C1A1] border-[#3E0F0F] focus:outline-none focus:ring-2 focus:ring-[#3E0F0F]"
                />
              </div>

              <div className="flex gap-4">
                <input
                  type="tel"
                  id="mobile_number"
                  placeholder="Mobile Number"
                  value={formData.mobile_number}
                  onChange={handleFormChange}
                  className="w-full rounded-full p-3 border bg-[#D2C1A1] border-[#3E0F0F] focus:outline-none focus:ring-2 focus:ring-[#3E0F0F]"
                />
                <input
                  type="text"
                  id="referred_by"
                  placeholder="Referral Code (Optional)"
                  value={formData.referred_by}
                  onChange={handleFormChange}
                  className="w-full rounded-full p-3 border bg-[#D2C1A1] border-[#3E0F0F] focus:outline-none focus:ring-2 focus:ring-[#3E0F0F]"
                />
              </div>

              <div className="flex gap-4">
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleFormChange}
                    className="w-full rounded-full p-3 pr-10 border bg-[#D2C1A1] border-[#3E0F0F] focus:outline-none focus:ring-2 focus:ring-[#3E0F0F]"
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#3E0F0F]"
                  />
                </div>

                <div className="relative w-full">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm_password"
                    placeholder="Confirm Password"
                    value={formData.confirm_password}
                    onChange={handleFormChange}
                    className="w-full rounded-full p-3 pr-10 border bg-[#D2C1A1] border-[#3E0F0F] focus:outline-none focus:ring-2 focus:ring-[#3E0F0F]"
                  />
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEye : faEyeSlash}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#3E0F0F]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={requesting}
                className={`w-full py-3 rounded-full ${
                  requesting
                    ? "bg-gray-400"
                    : "bg-[#3E0F0F] hover:bg-[#4f1313] text-white"
                }`}
              >
                {requesting ? "Submitting..." : "Submit"}
              </button>
            </>
          )}

          <div className="text-center mt-4">
            Already have an account?{" "}
            <NavLink
              to="/zonal-login"
              className="underline font-semibold hover:text-orange-600"
            >
              Login
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ZonalSignupPage;
