import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const email = localStorage.getItem("resetEmail");
  const navigate = useNavigate();

  const handleVerifyOtp = async () => {
    try {
      await axios.post("/api/ForgotPassword/verify-otp", { email, otp });
      navigate("/reset-password");
    } catch {
      setError("Invalid OTP. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Verify OTP</h2>
        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full p-2 border rounded mb-3"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          onClick={handleVerifyOtp}
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
}
