import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const ZonalForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [tempToken, setTempToken] = useState("");

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://apiv2.kashiyatra.org/api/user/forgotPassword/zonal",
        { gmail: email }
      );
      if (data.temp_token) {
        setTempToken(data.temp_token);
        setShowOtpForm(true);
        toast.success("OTP sent to your zonal email.");
      }
    } catch (error) {
      toast.error("Invalid zonal email address");
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://apiv2.kashiyatra.org/api/user/recoverPassword/zonal",
        {
          otp,
          temp_token: tempToken,
          new_password: newPassword,
        }
      );
      toast.success("New zonal password set successfully.");
      setTimeout(() => {
        window.location.href = "/zonal-login";
      }, 2000);
    } catch (error) {
      toast.error("Invalid temp_token/otp");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#2C1A4F] via-[#1E1440] to-[#120C2E] px-4">
      <div className="w-full max-w-md bg-gradient-to-br from-[#1B103A] to-[#2A1A4F] p-6 rounded-lg shadow-xl border border-[#3E2D6D] backdrop-blur-md">
        <h2 className="text-3xl font-bold mb-6 text-center gradient-text">Zonal Forgot Password</h2>

        <a
          href="#"
          onClick={() => setShowOtpForm(false)}
          className="block text-sm gradient-text text-center mb-4 hover:underline"
        >
          {showOtpForm ? "Back to Email" : "Need help resetting?"}
        </a>

        {!showOtpForm ? (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your zonal email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-[#2A2A3D] text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="w-full gradient-text font-semibold py-2 rounded border border-yellow-400 hover:bg-yellow-500 transition"
            >
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full px-4 py-2 bg-[#2A2A3D] text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-[#2A2A3D] text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="w-full gradient-text font-semibold py-2 rounded border border-yellow-400 hover:bg-yellow-500 transition"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ZonalForgotPassword;
