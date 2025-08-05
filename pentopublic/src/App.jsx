import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Unauthorized from "./pages/Unauthorized";
import ReaderDashboard from "./components/Book/ReaderDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AuthRouting from "./routes/AuthRouting";
import Register from "./components/Auth/Register";
import ForgotPassword from "./components/Auth/ForgotPassword";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/register" element={<Register />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/reader-dashboard"
          element={
            <AuthRouting allowedRoles={["reader"]}>
              <ReaderDashboard />
            </AuthRouting>
          }
        />

        <Route
          path="/writer-dashboard"
          element={
            <AuthRouting allowedRoles={["writer"]}>
              <div>Auther DashBoard</div>
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

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
