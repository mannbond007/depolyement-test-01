import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copysignupData = { ...signupData };
    copysignupData[name] = value;
    setSignupData(copysignupData);

    console.log("Login Info =>", copysignupData);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const { name, email, password } = signupData;

  if (!name || !email || !password) {
    toast.error("All fields are required");
    return;
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      const message =
        result?.error ||
        result?.message ||
        "Signup failed";

      toast.error(message);
      return;
    }

    toast.success("Signup successful 🎉");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  } catch (error) {
    console.error("Signup error:", error);
    toast.error("Server error, please try again");
  }
};


  return (
    <>
      <section className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div className="size-140 bg-green-500/30 rounded-full blur-[200px]" />
        </div>

        <div className="relative w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white text-center mb-6">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-white text-sm mb-2">Name</label>
              <input
                name="name"
                type="text"
                value={signupData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-green-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-white text-sm mb-2">Email</label>
              <input
                name="email"
                type="email"
                value={signupData.email}
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
                value={signupData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-green-500"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-gradient-to-r from-green-900 to-green-500 hover:from-green-500 hover:to-green-900 text-white py-3 rounded-full transition"
            >
              Sign Up
            </button>

            {/* Login link */}
            <p className="text-sm text-white/70 text-center mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green-400 hover:text-green-300 font-medium"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Signup;
