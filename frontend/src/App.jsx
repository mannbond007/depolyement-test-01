import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

// 🔐 Private Route
const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" replace />;
};

// 🌍 Public Route (login/signup)
const PublicRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/home" replace /> : element;
};

const App = () => {
  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#111",
            color: "#fff",
          },
          success: {
            style: { background: "#064e3b", color: "#d1fae5" },
          },
          error: {
            style: { background: "#7f1d1d", color: "#fee2e2" },
          },
        }}
      />

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public */}
        <Route path="/login" element={<PublicRoute element={<Login />} />} />
        <Route path="/signup" element={<PublicRoute element={<Signup />} />} />

        {/* Private */}
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </>
  );
};

export default App;
