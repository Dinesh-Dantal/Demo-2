import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      await axios.post("/api/ForgotPassword/send-otp", { email });
      localStorage.setItem("resetEmail", email);
      navigate("/verify-otp");
    } catch (err) {
      setError("Failed to send OTP. Please check email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          onClick={handleSendOtp}
        >
          Send OTP
        </button>
      </div>
    </div>
  );
}
