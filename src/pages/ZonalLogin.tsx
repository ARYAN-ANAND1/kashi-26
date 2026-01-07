import { useState, useContext, FormEvent } from "react";
import AuthContext from "@/Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ZonalLogin = () => {
  const { loginUserZonal } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  // --- Password Login ---
  const handlePasswordLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const passwordInput = document.getElementById(
        "zonal-password"
      ) as HTMLInputElement | null;
      const password = passwordInput?.value.trim() || "";

      if (!email || !password) {
        toast.error("Enter email and password");
        setLoading(false);
        return;
      }

      const ok = await loginUserZonal({ gmail: email, password });
      if (ok) navigate("/profile/zonal");
    } catch (err) {
      console.error(err);
      toast.error("Password login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#100318] via-[#310D3D] to-[#100318] p-6">
      <div className="w-full max-w-md bg-white/90 rounded-2xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.2)] backdrop-blur-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#2D0A0A] tracking-wide">
          Zonal Login
        </h2>

        {/* Password login only */}

        {/* --- Email Field --- */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:ring-2 focus:ring-[#DBAF7B] focus:border-[#DBAF7B] transition"
          placeholder="Enter your zonal email"
        />

        <form onSubmit={handlePasswordLogin} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="zonal-password"
              type="password"
              className="block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:ring-2 focus:ring-[#DBAF7B] focus:border-[#DBAF7B]"
              placeholder="Enter your zonal password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3E0F0F] text-white py-3 rounded-full font-semibold hover:bg-[#571919] transition"
          >
            {loading ? "Logging in..." : "Login with Password"}
          </button>
        </form>

        <hr className="my-6 border-gray-300" />

        <div className="text-center text-sm flex flex-col gap-2">
          <Link
            to="/zonal-forgot-password"
            className="text-[#3E0F0F] font-semibold hover:text-[#DBAF7B] transition"
          >
            Forgot password?
          </Link>
          <Link
            to="/zonals-register"
            className="text-[#3E0F0F] font-semibold hover:text-[#DBAF7B] transition"
          >
            Don't have a zonal account? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ZonalLogin;
