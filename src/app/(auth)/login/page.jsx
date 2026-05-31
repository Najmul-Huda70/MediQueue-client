"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Mail, Lock, LogIn } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailLogin = async (e) => {
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
    // const { data: tokenData } = await authClient.token();
    // console.log("tokenData with login: ", tokenData);

    setLoading(false);

    if (error) {
      toast.error(error.message || "Invalid email or password!");
      return;
    }

    toast.success("Logged in successfully!");
    router.push("/");
  };
  // const handleGoogleLogin = async () => {
  //     await authClient.signIn.social({
  //       provider: "google",
  //       callbackURL: redirectTo,
  //       onSuccess: () => {
  //         toast.success("Authenticated with Google successfully.");
  //       },
  //       onError: (ctx) => {
  //         toast.error(ctx.error.message || "Google Authentication failed.");
  //       }
  //     });
  //   };
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Welcome Back
          </h1>
          <p className="text-xs text-gray-400">Log in to your account</p>
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400">
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                size={16}
              />
              <input
                name="email"
                type="email"
                required
                placeholder="name@example.com"
                className="w-full bg-gray-950 border border-gray-800/80 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-gray-400">
                Password
              </label>
              {/* রিকোয়ারমেন্ট অনুযায়ী বাটন থাকবে কিন্তু কোনো মেথড ইমপ্লিমেন্ট হবে না */}
              <button
                type="button"
                onClick={() =>
                  toast.info(
                    "Password reset feature is disabled for examination parameters.",
                  )
                }
                className="text-[11px] text-blue-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                size={16}
              />
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-gray-950 border border-gray-800/80 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white text-sm font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-98 shadow-lg shadow-blue-600/10"
          >
            {loading ? (
              "Authenticating..."
            ) : (
              <>
                Login <LogIn size={15} />
              </>
            )}
          </button>
        </form>
        <div className="relative flex py-2 items-center text-xs text-gray-600">
          <div className="grow border-t border-gray-800/80"></div>
          <span className="shrink mx-4 uppercase tracking-wider text-[10px] font-bold">
            Or Continue With
          </span>
          <div className="grow border-t border-gray-800/80"></div>
        </div>
        <button
          // onClick={handleGoogleLogin}
          type="button"
          className="w-full bg-gray-950 hover:bg-gray-900 border border-gray-800 text-gray-200 text-xs font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.103C18.435 1.231 15.543 0 12.24 0 5.58 0 0 5.37 0 12s5.58 12 12.24 12c6.96 0 11.57-4.83 11.57-11.61 0-.78-.085-1.38-.19-2.105H12.24z"
            />
          </svg>
          Sign in with Google
        </button>

        <p className="text-center text-xs text-gray-500">
          New to MediQueue?{" "}
          <Link
            href="/register"
            className="text-blue-400 font-semibold hover:underline"
          >
            Register Here
          </Link>
        </p>
      </div>
    </main>
  );
}
