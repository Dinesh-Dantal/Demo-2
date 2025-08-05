import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { login as loginApi } from "../../services/authService";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginApi(formData);
      const userRole = res.data.role;

      // Save user and token to context + localStorage
      login({ userName: formData.userName, role: userRole }, res.data.token);

      // Redirect user based on role
      switch (userRole) {
        case "reader":
          navigate("/reader-dashboard");
          break;
        case "writer":
          navigate("/writer-dashboard");
          break;
        case "admin":
          navigate("/admin-dashboard");
          break;
        default:
          setError("Unknown user role");
      }
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf4e4] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-serif font-bold text-center">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={formData.userName}
          onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          required
        />
        <div className="flex justify-between text-sm">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot Password?
          </Link>
          <Link to="/register" className="text-blue-600 hover:underline">
            Create Account
          </Link>
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-900 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
