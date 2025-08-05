// src/pages/Register.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { registerUser } from "../../services/authService";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Read subscribed from payment flow
  const subscribed = new URLSearchParams(location.search).get("subscribed") === "true";

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    role: "reader",
    bio: "",
    isSubscribed: subscribed, // Set to true if redirected from payment
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(formData);
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Try a different username or email.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf4e4] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-serif font-bold text-center">Register</h2>
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
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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

        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="reader">Reader</option>
          <option value="author">Author</option>
        </select>

        {formData.role === "author" && (
          <textarea
            placeholder="Author Bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        )}

        {formData.role === "reader" && (
          <label className="text-sm flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isSubscribed}
              onChange={(e) =>
                setFormData({ ...formData, isSubscribed: e.target.checked })
              }
            />
            Subscribe to newsletters
          </label>
        )}

        <div className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-900 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
