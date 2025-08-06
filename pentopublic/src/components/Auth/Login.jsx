// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { login as loginApi } from "../../services/authService";

// const Login = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({ userName: "", password: "" });
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await loginApi(formData);
//       const userRole = res.data.role;

//       // Save user and token to context + localStorage
//       login({ userName: formData.userName, role: userRole }, res.data.token);

//       // Redirect user based on role
//       switch (userRole) {
//         case "reader":
//           navigate("/reader-dashboard");
//           break;
//         case "author":
//           navigate("/author-dashboard");
//           break;
//         case "admin":
//           navigate("/admin-dashboard");
//           break;
//         default:
//           setError("Unknown user role");
//       }
//     } catch (err) {
//       setError("Invalid credentials");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#fdf4e4] flex items-center justify-center px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-md rounded-2xl p-6 w-full max-w-sm space-y-4"
//       >
//         <h2 className="text-2xl font-serif font-bold text-center">Login</h2>
//         {error && <p className="text-red-500 text-sm">{error}</p>}
//         <input
//           type="text"
//           placeholder="Username"
//           value={formData.userName}
//           onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//           required
//         />
//         <div className="flex justify-between text-sm">
//           <Link to="/forgot-password" className="text-blue-600 hover:underline">
//             Forgot Password?
//           </Link>
//           <Link to="/register" className="text-blue-600 hover:underline">
//             Create Account
//           </Link>
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-900 transition"
//         >
//           Sign In
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { login as loginApi } from "../../services/authService";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Validation functions
  const validateUsername = (username) => {
    if (!username) return "Username is required";
    if (username.length < 3) return "Username must be at least 3 characters";
    if (username.length > 20) return "Username must be less than 20 characters";
    if (!/^[a-zA-Z0-9_.-]+$/.test(username)) return "Username can only contain letters, numbers, dots, hyphens, and underscores";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const validateForm = () => {
    const errors = {};
    const usernameError = validateUsername(formData.userName);
    const passwordError = validatePassword(formData.password);

    if (usernameError) errors.userName = usernameError;
    if (passwordError) errors.password = passwordError;

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors({ ...fieldErrors, [field]: "" });
    }
    
    // Clear general error
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

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
        case "author":
          navigate("/author-dashboard");
          break;
        case "admin":
          navigate("/admin-dashboard");
          break;
        default:
          setError("Unknown user role");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid username or password");
      } else if (err.response && err.response.status === 404) {
        setError("User not found. Please check your username.");
      } else if (err.response && err.response.status >= 500) {
        setError("Server error. Please try again later.");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf4e4] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-serif font-bold text-center">Login</h2>
        
        {/* General Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Username Field */}
        <div>
          <input
            type="text"
            placeholder="Username"
            value={formData.userName}
            onChange={(e) => handleInputChange("userName", e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg transition-colors ${
              fieldErrors.userName 
                ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200" 
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
            } focus:outline-none focus:ring-2`}
            required
          />
          {fieldErrors.userName && (
            <p className="text-red-500 text-xs mt-1 flex items-center space-x-1">
              <AlertCircle className="h-3 w-3" />
              <span>{fieldErrors.userName}</span>
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={`w-full px-4 py-2 pr-12 border rounded-lg transition-colors ${
                fieldErrors.password 
                  ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200" 
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              } focus:outline-none focus:ring-2`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {fieldErrors.password && (
            <p className="text-red-500 text-xs mt-1 flex items-center space-x-1">
              <AlertCircle className="h-3 w-3" />
              <span>{fieldErrors.password}</span>
            </p>
          )}
        </div>

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
          disabled={isLoading}
          className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
