// src/components/Navbar.jsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  CalendarCheck,
  User,
  LogOut,
  LayoutDashboard,
  PlusCircle,
  Users2,
  BookmarkCheck,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Simulated authentication states for testing UI branches
  // Toggle this true/false to check both logged-in and logged-out states
  const isLoggedIn = true;
  const user = {
    name: "Najmul Huda",
    email: "najmul@example.com",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Helper to apply active route color stylings
  const isActive = (path) =>
    pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-600 hover:text-blue-600 font-medium";

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm shadow-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left: Brand Identity */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-2xl text-blue-600 tracking-tight"
            >
              <CalendarCheck className="w-7 h-7 text-blue-600" />
              <span>
                Medi<span className="text-gray-800">Queue</span>
              </span>
            </Link>
          </div>

          {/* Center/Right: Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={`${isActive("/")} transition-colors text-sm`}
            >
              Home
            </Link>
            <Link
              href="/tutors"
              className={`${isActive("/tutors")} transition-colors text-sm`}
            >
              Tutors
            </Link>

            {/* Authenticated Links block */}
            {isLoggedIn && (
              <>
                <Link
                  href="/add-tutor"
                  className={`${isActive("/add-tutor")} flex items-center gap-1 transition-colors text-sm`}
                >
                  <PlusCircle size={15} />
                  <span>Add Tutor</span>
                </Link>
                <Link
                  href="/my-tutors"
                  className={`${isActive("/my-tutors")} flex items-center gap-1 transition-colors text-sm`}
                >
                  <Users2 size={15} />
                  <span>My Tutors</span>
                </Link>
                <Link
                  href="/my-bookings"
                  className={`${isActive("/my-bookings")} flex items-center gap-1 transition-colors text-sm`}
                >
                  <BookmarkCheck size={15} />
                  <span>My Booked Sessions</span>
                </Link>
              </>
            )}
          </div>

          {/* Right Area: Profile / Auth CTA */}
          <div className="hidden md:flex items-center">
            {isLoggedIn ? (
              /* Profile Image Dropdown Trigger */
              <div className="relative ml-3" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex text-sm rounded-full focus:outline-none ring-2 ring-gray-100 hover:ring-blue-200 transition-all"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="relative w-9 h-9 rounded-full overflow-hidden">
                    <Image
                      src={user.avatar}
                      alt="User profile"
                      fill
                      className="object-cover"
                    />
                  </div>
                </button>

                {/* Dropdown Card */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white py-2 shadow-xl border border-gray-100 origin-top-right transform scale-100 transition-all">
                    <div className="px-4 py-2 border-b border-gray-50">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/dashboard"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <LayoutDashboard size={16} className="text-gray-400" />
                      <span>Dashboard</span>
                    </Link>

                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        /* Add manual logout trigger context function here */
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50/50 transition-colors text-left"
                    >
                      <LogOut size={16} />
                      <span>Log out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* CTA for Unauthenticated Users */
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all shadow-sm shadow-blue-100"
              >
                <User className="w-4 h-4" />
                <span>Login / Register</span>
              </Link>
            )}
          </div>

          {/* Handheld Device Mobile Hamburger Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-900 focus:outline-none p-2 rounded-xl hover:bg-gray-50"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Home
            </Link>
            <Link
              href="/tutors"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Tutors
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  href="/add-tutor"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  <PlusCircle size={18} className="text-gray-400" />
                  <span>Add Tutor</span>
                </Link>
                <Link
                  href="/my-tutors"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  <Users2 size={18} className="text-gray-400" />
                  <span>My Tutors</span>
                </Link>
                <Link
                  href="/my-bookings"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  <BookmarkCheck size={18} className="text-gray-400" />
                  <span>My Booked Sessions</span>
                </Link>

                <div className="pt-4 mt-2 border-t border-gray-100 px-3 flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={user.avatar}
                      alt="Avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-xl"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              </>
            ) : (
              <div className="pt-4 border-t border-gray-100 px-3">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold px-4 py-2.5 rounded-xl"
                >
                  <User className="w-4 h-4" />
                  <span>Login / Register</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
