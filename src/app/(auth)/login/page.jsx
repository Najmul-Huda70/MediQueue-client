"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Mail, Lock, LogIn } from "lucide-react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const loginData = Object.fromEntries(formData.entries());
    console.log("Attempting login for:", loginData.email);

    const { error } = await signIn.email({
      email: loginData.email,
      password: loginData.password,
      // callbackURL: "/",
    });
    // token
    const { data: tokenData } = await authClient.token();
    console.log("tokenData with login: ", tokenData);

    setLoading(false);

    if (error) {
      toast.error(error.message || "Invalid email or password!");
      return;
    }

    toast.success("Logged in successfully!");
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Welcome Back
          </h1>
          <p className="text-xs text-gray-400">Log in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400 flex items-center gap-1.5">
              <Mail size={12} /> Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="name@example.com"
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400 flex items-center gap-1.5">
              <Lock size={12} /> Password
            </label>
            <input
              type="password"
              name="password"
              required
              minLength={8}
              placeholder="••••••••"
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogIn size={14} />
            {loading ? "Signing in..." : "Log In"}
          </button>
        </form>
      </div>
    </main>
  );
}
