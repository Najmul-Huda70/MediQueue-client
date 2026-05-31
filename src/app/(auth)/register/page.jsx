"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Image, Lock, UserPlus, Loader2 } from "lucide-react";
import { signUp } from "@/lib/auth-client";
import toast from "react-hot-toast";
const validatePassword = (password) => {
  if (password.length === 0) return null;
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  } else if (!/[A-Z]/.test(password) && !/[a-z]/.test(password)) {
    return "Password must contain at least one uppercase and lowercase letter.";
  } else if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  } else if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  } else return null;
};
export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [Password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const registerData = Object.fromEntries(formData.entries());
    if (
      registerData.password < 8 ||
      !/[A-Z]/.test(registerData.password) ||
      !/[a-z]/.test(registerData.password)
    ) {
      toast.error(
        "Please satisfy all password validation conditions before submitting.",
      );

      return;
    }
    setLoading(true);
    console.log("registerData: ", registerData);
    try {
      const { error } = await signUp.email({
        email: registerData.email,
        password: registerData.password,
        name: registerData.name,
        image: registerData.photoUrl || "",
      });

      if (error) {
        toast.error(error.message || "Registration failed!");
        setLoading(false);
        return;
      }

      toast.success("Registration successful!");
      router.push("/login");
    } catch (err) {
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  // ২. গুগল সোশ্যাল লগইন হ্যান্ডলার
  const handleGoogleLogin = async () => {
    try {
      console.log("Initiating Google Register/Login...");
    } catch (err) {
      // toast.error("Google authentication failed.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl space-y-6">
        {/* Title Section */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-extrabold text-white tracking-tight sm:text-3xl">
            Create Account
          </h1>
          <p className="text-xs text-gray-400">
            Join MediQueue to browse expert tutors and book sessions.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400 flex items-center gap-1.5">
              <User size={12} className="text-gray-500" /> Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Your name"
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400 flex items-center gap-1.5">
              <Mail size={12} className="text-gray-500" /> Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="name@example.com"
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Photo-URL Field */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400 flex items-center gap-1.5">
              <Image
                size={12}
                alt="Profile photo URL"
                className="text-gray-500"
              />{" "}
              Profile Photo URL
            </label>
            <input
              type="url"
              name="photoUrl"
              required
              placeholder="https://example.com/avatar.jpg"
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400 flex items-center gap-1.5">
              <Lock size={12} className="text-gray-500" /> Password
            </label>
            <input
              type="password"
              name="password"
              required
              minLength={8}
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder="••••••••"
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <div className="flex items-center gap-1.5 transition-colors">
              {validatePassword(Password)}
            </div>
          </div>

          {/* Register Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/10"
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <UserPlus size={14} />
                <span>Register</span>
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex py-2 items-center text-xs text-gray-600">
          <div className="grow border-t border-gray-800/80"></div>
          <span className="shrink mx-4 font-medium uppercase tracking-widest text-[9px]">
            Or sign up with
          </span>
          <div className="grow border-t border-gray-800/80"></div>
        </div>

        {/* Social Registration Button (Google) */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full h-11 bg-gray-950 hover:bg-gray-900 border border-gray-800 text-gray-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-2.5 transition-all active:scale-[0.99]"
        >
          <svg
            className="w-4 h-4 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 2.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              fill="#EA4335"
            />
          </svg>
          <span>Sign up with Google</span>
        </button>

        {/* Link back to Login Page */}
        <p className="text-center text-xs text-gray-500 pt-2">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-500 hover:text-blue-400 font-semibold transition-colors underline underline-offset-4"
          >
            Log in here
          </Link>
        </p>
      </div>
    </main>
  );
}
