// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { registerUser } from "../../services/authService";

// const Register = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     userName: "",
//     email: "",
//     password: "",
//     role: "reader", // default
//     bio: "",
//     isSubscribed: false,
//   });

//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     // Capture needed values before async call
//     const { email, role, isSubscribed } = formData;

//     try {
//       await registerUser(formData);

//       // Redirect based on role and subscription status
//       if (role === "reader" && isSubscribed) {
//         navigate("/subscription", {
//           state: { email }, // pass email to subscription page
//         });
//       } else {
//         navigate("/login");
//       }
//     } catch (err) {
//       setError("Registration failed. Try a different username or email.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#fdf4e4] flex items-center justify-center px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-md rounded-2xl p-6 w-full max-w-sm space-y-4"
//       >
//         <h2 className="text-2xl font-serif font-bold text-center">Register</h2>
//         {error && <p className="text-red-500 text-sm">{error}</p>}

//         <input
//           type="text"
//           placeholder="Username"
//           value={formData.userName}
//           onChange={(e) =>
//             setFormData({ ...formData, userName: e.target.value })
//           }
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//           required
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={(e) =>
//             setFormData({ ...formData, email: e.target.value })
//           }
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={(e) =>
//             setFormData({ ...formData, password: e.target.value })
//           }
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//           required
//         />

//         <select
//           value={formData.role}
//           onChange={(e) => {
//             const role = e.target.value;
//             setFormData({
//               ...formData,
//               role,
//               bio: "",
//               isSubscribed: false,
//             });
//           }}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//           required
//         >
//           <option value="reader">reader</option>
//           <option value="author">author</option>
//           <option value="admin">admin</option>
//         </select>

//         {formData.role === "author" && (
//           <textarea
//             placeholder="Author Bio"
//             value={formData.bio}
//             onChange={(e) =>
//               setFormData({ ...formData, bio: e.target.value })
//             }
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//             required
//           />
//         )}

//         {formData.role === "reader" && (
//           <label className="text-sm flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={formData.isSubscribed}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   isSubscribed: e.target.checked,
//                 })
//               }
//             />
//             Subscribe to newsletters and premium content
//           </label>
//         )}

//         <button
//           type="submit"
//           className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-900 transition"
//         >
//           Register
//         </button>

//         <div className="text-sm text-center">
//           Already have an account?{" "}
//           <a href="/login" className="text-blue-600 hover:underline">
//             Login
//           </a>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Register;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    role: "reader", // default
    bio: "",
    isSubscribed: false,
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Validation functions
  const validateUsername = (username) => {
    if (!username) return "Username is required";
    if (username.length < 3) return "Username must be at least 3 characters";
    if (username.length > 20) return "Username must be less than 20 characters";
    if (!/^[a-zA-Z0-9_.-]+$/.test(username)) {
      return "Username can only contain letters, numbers, dots, hyphens, and underscores";
    }
    return "";
  };

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    if (email.length > 254) return "Email is too long";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (password.length > 128) return "Password is too long";
    if (!/(?=.*[a-z])/.test(password)) return "Password must contain at least one lowercase letter";
    if (!/(?=.*[A-Z])/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/(?=.*\d)/.test(password)) return "Password must contain at least one number";
    if (!/(?=.*[@$!%*?&])/.test(password)) return "Password must contain at least one special character (@$!%*?&)";
    return "";
  };

  const validateBio = (bio, role) => {
    if (role === "author") {
      if (!bio) return "Bio is required for authors";
      if (bio.length < 50) return "Bio must be at least 50 characters";
      if (bio.length > 500) return "Bio must be less than 500 characters";
    }
    return "";
  };

  const validateForm = () => {
    const errors = {};
    const usernameError = validateUsername(formData.userName);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const bioError = validateBio(formData.bio, formData.role);

    if (usernameError) errors.userName = usernameError;
    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;
    if (bioError) errors.bio = bioError;

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

  const handleRoleChange = (role) => {
    setFormData({
      ...formData,
      role,
      bio: "", // Reset bio when role changes
      isSubscribed: false, // Reset subscription when role changes
    });
    
    // Clear bio error when switching roles
    if (fieldErrors.bio) {
      setFieldErrors({ ...fieldErrors, bio: "" });
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "", color: "" };
    
    let score = 0;
    const checks = [
      password.length >= 8,
      /[a-z]/.test(password),
      /[A-Z]/.test(password),
      /\d/.test(password),
      /[@$!%*?&]/.test(password),
      password.length >= 12
    ];
    
    score = checks.filter(Boolean).length;
    
    if (score <= 2) return { strength: score, label: "Weak", color: "text-red-500" };
    if (score <= 4) return { strength: score, label: "Medium", color: "text-yellow-500" };
    return { strength: score, label: "Strong", color: "text-green-500" };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Capture needed values before async call
    const { email, role, isSubscribed } = formData;
    setIsLoading(true);

    try {
      await registerUser(formData);

      // Redirect based on role and subscription status
      if (role === "reader" && isSubscribed) {
        navigate("/subscription", {
          state: { email }, // pass email to subscription page
        });
      } else {
        navigate("/login");
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError("Username or email already exists. Please try different ones.");
      } else if (err.response && err.response.status === 400) {
        setError("Invalid registration data. Please check your inputs.");
      } else if (err.response && err.response.status >= 500) {
        setError("Server error. Please try again later.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf4e4] flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-serif font-bold text-center">Register</h2>
        
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

        {/* Email Field */}
        <div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg transition-colors ${
              fieldErrors.email 
                ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200" 
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
            } focus:outline-none focus:ring-2`}
            required
          />
          {fieldErrors.email && (
            <p className="text-red-500 text-xs mt-1 flex items-center space-x-1">
              <AlertCircle className="h-3 w-3" />
              <span>{fieldErrors.email}</span>
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
          
          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="mt-2">
              <div className="flex items-center space-x-2 mb-1">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      passwordStrength.strength <= 2 ? 'bg-red-500' :
                      passwordStrength.strength <= 4 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${(passwordStrength.strength / 6) * 100}%` }}
                  ></div>
                </div>
                <span className={`text-xs font-medium ${passwordStrength.color}`}>
                  {passwordStrength.label}
                </span>
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                <div className="grid grid-cols-2 gap-1">
                  <div className={`flex items-center space-x-1 ${formData.password.length >= 8 ? 'text-green-600' : 'text-gray-400'}`}>
                    <CheckCircle className="h-3 w-3" />
                    <span>8+ chars</span>
                  </div>
                  <div className={`flex items-center space-x-1 ${/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`}>
                    <CheckCircle className="h-3 w-3" />
                    <span>Uppercase</span>
                  </div>
                  <div className={`flex items-center space-x-1 ${/[a-z]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`}>
                    <CheckCircle className="h-3 w-3" />
                    <span>Lowercase</span>
                  </div>
                  <div className={`flex items-center space-x-1 ${/\d/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`}>
                    <CheckCircle className="h-3 w-3" />
                    <span>Number</span>
                  </div>
                  <div className={`flex items-center space-x-1 ${/[@$!%*?&]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`}>
                    <CheckCircle className="h-3 w-3" />
                    <span>Special</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {fieldErrors.password && (
            <p className="text-red-500 text-xs mt-1 flex items-center space-x-1">
              <AlertCircle className="h-3 w-3" />
              <span>{fieldErrors.password}</span>
            </p>
          )}
        </div>

        {/* Role Selection */}
        <div>
          <select
            value={formData.role}
            onChange={(e) => handleRoleChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200"
            required
          >
            <option value="reader">Reader</option>
            <option value="author">Author</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Author Bio Field */}
        {formData.role === "author" && (
          <div>
            <textarea
              placeholder="Author Bio (Tell readers about yourself, your writing style, experience, etc.)"
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg h-24 resize-none transition-colors ${
                fieldErrors.bio 
                  ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200" 
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              } focus:outline-none focus:ring-2`}
              required
            />
            <div className="flex justify-between items-center mt-1">
              <div className="text-xs text-gray-500">
                {formData.bio.length}/500 characters
              </div>
              {formData.bio && (
                <div className={`text-xs ${formData.bio.length >= 50 ? 'text-green-600' : 'text-gray-400'}`}>
                  {formData.bio.length >= 50 ? '✓ Minimum reached' : `${50 - formData.bio.length} more needed`}
                </div>
              )}
            </div>
            {fieldErrors.bio && (
              <p className="text-red-500 text-xs mt-1 flex items-center space-x-1">
                <AlertCircle className="h-3 w-3" />
                <span>{fieldErrors.bio}</span>
              </p>
            )}
          </div>
        )}

        {/* Reader Subscription */}
        {formData.role === "reader" && (
          <label className="text-sm flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors">
            <input
              type="checkbox"
              checked={formData.isSubscribed}
              onChange={(e) => handleInputChange("isSubscribed", e.target.checked)}
              className="mt-0.5 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <div>
              <div className="font-medium text-blue-900">Subscribe to Premium Content</div>
              <div className="text-blue-700 text-xs mt-1">
                Get access to exclusive books, newsletters, and premium features
              </div>
            </div>
          </label>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              Creating Account...
            </>
          ) : (
            "Register"
          )}
        </button>

        <div className="text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default Register;