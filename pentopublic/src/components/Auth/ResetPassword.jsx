import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");

  const handleReset = async () => {
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await axios.post("/api/ForgotPassword/reset-password", { email, newPassword: password });
      localStorage.removeItem("resetEmail");
      navigate("/login");
    } catch {
      setError("Failed to reset password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
        <input
          type="password"
          placeholder="New password"
          className="w-full p-2 border rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm password"
          className="w-full p-2 border rounded mb-3"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          onClick={handleReset}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}
