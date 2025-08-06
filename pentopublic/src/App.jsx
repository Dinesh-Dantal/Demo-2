// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/Auth/Login";
// import Register from "./components/Auth/Register";
// import ForgotPassword from "./components/Auth/ForgotPassword";
// import Unauthorized from "./pages/Unauthorized";
// import Subscription from "./pages/Subscription";
// import ReaderDashboard from "./components/Book/ReaderDashboard";
// import AuthorDashboard from "./pages/AuthorDashboard"; // ✅ fixed typo
// import AdminDashboard from "./pages/AdminDashboard";
// import Profile from "./pages/Profile";
// import AuthRouting from "./routes/AuthRouting";
// import LandingPage from "./pages/LandingPage";
// import LandingPageWithSubscription from "./pages/LandingPage";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Public routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/unauthorized" element={<Unauthorized />} />
//         {/* <Route path="/subscription" element={<Subscription />} /> */}
// <Route path="/land" element={<LandingPage />} />
//  <Route path="/subscription" element={<Subscription />} />
//         {/* Protected routes */}
//         <Route
//           path="/reader-dashboard"
//           element={
//             <AuthRouting allowedRoles={["reader"]}>
//               <ReaderDashboard />
//             </AuthRouting>
//           }
//         />
//         <Route
//   path="/author-dashboard"  // ✅ changed from /writer-dashboard
//   element={
//     <AuthRouting allowedRoles={["author"]}>  
//       <AuthorDashboard />
//     </AuthRouting>
//   }
// />

//         <Route
//           path="/admin-dashboard"
//           element={
//             <AuthRouting allowedRoles={["admin"]}>
//               <AdminDashboard />
//             </AuthRouting>
//           }
//         />
//         <Route
//           path="/profile"
//           element={
//             <AuthRouting allowedRoles={["reader", "author", "admin"]}>
//               <Profile />
//             </AuthRouting>
//           }
//         />

//         {/* Catch-all: redirect to login */}
//         <Route path="*" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Unauthorized from "./pages/Unauthorized";
import Subscription from "./pages/Subscription";
import ReaderDashboard from "./components/Book/ReaderDashboard";
import AuthorDashboard from "./pages/AuthorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import AuthRouting from "./routes/AuthRouting";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page - First page users see */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Public authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Public pages */}
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Protected dashboard routes */}
        <Route
          path="/reader-dashboard"
          element={
            <AuthRouting allowedRoles={["reader"]}>
              <ReaderDashboard />
            </AuthRouting>
          }
        />
        
        <Route
          path="/author-dashboard"
          element={
            <AuthRouting allowedRoles={["author"]}>
              <AuthorDashboard />
            </AuthRouting>
          }
        />
        
        <Route
          path="/admin-dashboard"
          element={
            <AuthRouting allowedRoles={["admin"]}>
              <AdminDashboard />
            </AuthRouting>
          }
        />
        
        {/* Protected user routes */}
        <Route
          path="/profile"
          element={
            <AuthRouting allowedRoles={["reader", "author", "admin"]}>
              <Profile />
            </AuthRouting>
          }
        />
        
        {/* Catch-all: redirect to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;