import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = loginData;

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result?.message || "Login failed");
        return;
      }

      // ✅ Save token (later you can switch to cookies)
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      toast.success("Login successful 🎉");

      setTimeout(() => {
        navigate("/home");
      }, 1000);

    } catch (error) {
      console.error("Login error:", error);
      toast.error("Server error, please try again");
    }
  };

  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="size-140 bg-green-500/30 rounded-full blur-[200px]" />
      </div>

      <div className="relative w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-white text-sm mb-2">Email</label>
            <input
              name="email"
              type="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-green-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-white text-sm mb-2">Password</label>
            <input
              name="password"
              type="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-green-900 to-green-500 hover:from-green-500 hover:to-green-900 text-white py-3 rounded-full transition"
          >
            Login
          </button>

          <p className="text-sm text-white/70 text-center mt-4">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-green-400 hover:text-green-300 font-medium"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
