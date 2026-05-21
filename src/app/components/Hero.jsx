// src/components/Hero.jsx
"use strict";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Sparkles,
  Users,
  CheckCircle,
  GraduationCap,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full bg-gradient-to-b from-blue-50/50 via-white to-white overflow-hidden">
      {/* Decorative Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute top-[20%] right-[-5%] w-[350px] h-[350px] bg-indigo-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mx-auto lg:mx-0">
              <Sparkles size={14} className="animate-pulse" />
              <span>Smart Solutions for Student Success</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.15]">
              Simplifying Tutor Bookings for an{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Organized Learning
              </span>{" "}
              Experience.
            </h1>

            {/* Sub-headline */}
            <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Find and book real-time online learning sessions based on subject
              and time availability. Eliminate conflicts, manage digital tokens,
              and track your schedules seamlessly.
            </p>

            {/* Search Bar Wrapper */}
            <div className="max-w-xl mx-auto lg:mx-0 p-2 bg-white rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1 flex items-center">
                <Search
                  className="absolute left-3.5 text-gray-400 pointer-events-none"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search by subject or tutor name..."
                  className="w-full bg-transparent pl-11 pr-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none text-base"
                />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-md shadow-blue-200 flex items-center justify-center gap-2">
                <span>Find Tutors</span>
              </button>
            </div>

            {/* Trust Markers / Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle size={18} className="text-emerald-500" />
                <span className="text-sm font-medium">
                  Conflict-free Booking
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle size={18} className="text-emerald-500" />
                <span className="text-sm font-medium">
                  Instant Digital Tokens
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle size={18} className="text-emerald-500" />
                <span className="text-sm font-medium">Verified Tutors</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Graphics / Image */}
          <div className="lg:col-span-5 relative w-full flex justify-center items-center">
            {/* Main Image Container */}
            <div className="relative w-full max-w-[440px] aspect-square rounded-3xl overflow-hidden border-[6px] border-white shadow-2xl bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                alt="Students collaborating online"
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Floating Card 1: Tutors Count */}
            <div className="absolute top-8 -left-6 bg-white p-3.5 rounded-xl shadow-lg border border-gray-50 flex items-center gap-3 animate-bounce [animation-duration:4s]">
              <div className="p-2.5 bg-blue-50 rounded-lg text-blue-600">
                <Users size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">
                  Active Tutors
                </p>
                <h4 className="text-base font-bold text-gray-800">
                  250+ Experts
                </h4>
              </div>
            </div>

            {/* Floating Card 2: Booked Session */}
            <div className="absolute bottom-8 -right-4 bg-white p-3.5 rounded-xl shadow-lg border border-gray-50 flex items-center gap-3 animate-bounce [animation-duration:5s]">
              <div className="p-2.5 bg-indigo-50 rounded-lg text-indigo-600">
                <GraduationCap size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">
                  Sessions Hosted
                </p>
                <h4 className="text-base font-bold text-gray-800">
                  10k+ Lessons
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
