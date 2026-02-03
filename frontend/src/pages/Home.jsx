import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  User,
  ShieldCheck,
  Activity,
  Layers,
  LogOut,
  Rocket,
  CheckCircle2,
  Database,
  Clock,
} from "lucide-react";

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  // for the products data
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setLoggedInUser(JSON.parse(user));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    setTimeout(() => navigate("/login"), 800);
  };

  // fetch products api call
const fetchProducts = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/products`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message || "Failed to fetch products");
      return;
    }

    setProducts(data);
  } catch (error) {
    console.error("Error fetching products:", error);
    toast.error("Error fetching products");
  } finally {
    setLoadingProducts(false);
  }
};


  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setLoggedInUser(JSON.parse(user));
      fetchProducts();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
        <div className="size-[560px] bg-green-500/25 rounded-full blur-[240px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-10 py-4 border-b border-white/10 backdrop-blur">
        <h1 className="text-xl font-semibold">
          MERN<span className="text-green-400">Auth</span>
        </h1>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-gradient-to-r from-red-900 to-red-500 hover:from-red-500 hover:to-red-900 transition"
        >
          <LogOut size={16} />
          Logout
        </button>
      </nav>

      {/* Bento Grid */}
      <main className="relative z-10 px-6 md:px-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[160px]">
          {/* HERO USER */}
          <div className="md:col-span-4 row-span-2 rounded-3xl bg-gradient-to-br from-green-900/40 to-green-600/20 border border-white/10 p-8 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <User className="text-green-400" />
              <span className="uppercase tracking-wider text-xs text-white/70">
                Authenticated User
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-semibold text-green-400">
              {loggedInUser?.name}
            </h2>

            <p className="text-white/70 max-w-xl">
              You are logged into a secure MERN authentication system featuring
              JWT-based authorization, protected routes, and modern UI patterns.
            </p>
          </div>

          {/* PROJECT PURPOSE */}
          <div className="md:col-span-2 row-span-1 rounded-2xl bg-white/5 border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Rocket className="text-green-400" />
              <h3 className="font-medium">Project Goal</h3>
            </div>
            <p className="text-sm text-white/60">
              Demonstrate a complete authentication flow with security,
              validation, and clean frontend UX.
            </p>
          </div>

          {/* TECH STACK */}
          <div className="md:col-span-2 row-span-1 rounded-2xl bg-white/5 border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Layers className="text-green-400" />
              <h3 className="font-medium">Tech Stack</h3>
            </div>
            <ul className="text-sm text-white/60 space-y-1">
              <li>• React + Tailwind CSS</li>
              <li>• Node.js & Express</li>
              <li>• MongoDB & Mongoose</li>
              <li>• JWT, bcrypt & Joi</li>
            </ul>
          </div>

          {/* SECURITY */}
          <div className="md:col-span-3 row-span-1 rounded-2xl bg-white/5 border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="text-green-400" />
              <h3 className="font-medium">Security Design</h3>
            </div>
            <p className="text-sm text-white/60">
              Passwords are hashed using bcrypt, tokens are verified using JWT,
              and all inputs are validated server-side using Joi.
            </p>
          </div>

          {/* AUTH FLOW */}
          <div className="md:col-span-3 row-span-1 rounded-2xl bg-white/5 border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="text-green-400" />
              <h3 className="font-medium">Authentication Flow</h3>
            </div>
            <p className="text-sm text-white/60">
              Signup → Login → Token stored → Protected routes → Logout with
              session cleanup.
            </p>
          </div>

          {/* FEATURES */}
          <div className="md:col-span-2 row-span-1 rounded-2xl bg-white/5 border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="text-green-400" />
              <h3 className="font-medium">Key Features</h3>
            </div>
            <ul className="text-sm text-white/60 space-y-1">
              <li>• Secure signup & login</li>
              <li>• Protected dashboard</li>
              <li>• Toast-based feedback</li>
            </ul>
          </div>

          {/* FUTURE SCOPE */}
          <div className="md:col-span-2 row-span-1 rounded-2xl bg-white/5 border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Database className="text-green-400" />
              <h3 className="font-medium">Future Scope</h3>
            </div>
            <p className="text-sm text-white/60">
              Role-based access, refresh tokens, profile management, activity
              logs, and admin dashboards.
            </p>
          </div>
          {/* SESSION STATUS */}
          <div className="md:col-span-2 row-span-1 rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <Clock className="text-green-400" />
              <h3 className="font-medium">Session Status</h3>
            </div>

            <p className="text-sm text-white/60">
              Your session is currently active and secured using JWT-based
              authentication.
            </p>

            <span className="text-xs text-green-400 font-medium">
              Status: Active
            </span>
          </div>
        </div>
      </main>
      <div>
        {/* PRODUCTS */}
<div className="md:col-span-3 row-span-1 rounded-2xl bg-white/5 border border-white/10 p-6">
  <h3 className="text-lg font-medium mb-3 text-green-400">
    Products
  </h3>

  {loadingProducts ? (
    <p className="text-sm text-white/60">Loading products...</p>
  ) : products.length === 0 ? (
    <p className="text-sm text-white/60">No products available</p>
  ) : (
    <ul className="space-y-3">
      {products.map((product, index) => (
        <li
          key={index}
          className="flex items-center justify-between bg-black/30 border border-white/10 rounded-lg px-4 py-2"
        >
          <div>
            <p className="text-sm font-medium">{product.name}</p>
            <p className="text-xs text-white/60">
              {product.description}
            </p>
          </div>
          <span className="text-sm text-green-400 font-medium">
            ₹{product.price}
          </span>
        </li>
      ))}
    </ul>
  )}
</div>

      </div>
    </div>
  );
};

export default Home;
