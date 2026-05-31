// src/components/Hero.jsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import {
  Search,
  Sparkles,
  Users,
  CheckCircle,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full bg-gray-950 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-125 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-100 h-100 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute top-[20%] right-[-5%] w-87.5 h-87.5 bg-indigo-200/20 rounded-full blur-3xl" />
      </div>

      <Swiper
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <section className="relative min-h-[500px] sm:min-h-[600px] flex items-center justify-center px-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-950 to-gray-950 border-b border-gray-900">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 pointer-events-none" />
            <div className="max-w-4xl text-center space-y-6 relative z-10 animate-in fade-in zoom-in-95 duration-500">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-medium">
                <Sparkles size={12} /> Empower Your Learning Journey
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Find Expert Tutors for <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Premium Digital Sessions
                </span>
              </h1>
              <p className="text-gray-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
                Browse through our verified educator directory. Book premium
                one-on-one sessions tailored specifically to match your academic
                curriculum and timing matrix.
              </p>
              <div className="pt-4">
                <Link
                  href="/tutors"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-600/10 active:scale-95 group"
                >
                  Explore Tutors{" "}
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide>
          <section className="relative min-h-[500px] sm:min-h-[600px] flex items-center justify-center px-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/10 via-gray-950 to-gray-950 border-b border-gray-900">
            <div className="max-w-4xl text-center space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-medium">
                <Clock size={12} /> Automated Token Matrix
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Zero Slot Conflicts. <br />
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Instant Booking Generation.
                </span>
              </h1>
              <p className="text-gray-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
                Eliminate manual scheduling errors. Our intelligent matrix
                dynamically syncs tutor slots, decrementing active availability
                instantly upon booking confirmation.
              </p>
              <div className="pt-4">
                <Link
                  href="/tutors"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-600/10 active:scale-95 group"
                >
                  Find a Tutor Slot{" "}
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide>
          <section className="relative min-h-[500px] sm:min-h-[600px] flex items-center justify-center px-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-gray-950 to-gray-950">
            <div className="max-w-4xl text-center space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-xs font-medium">
                <ShieldCheck size={12} /> High-Security Environment
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Secure Sessions Backed <br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  By Cryptographic Tokens
                </span>
              </h1>
              <p className="text-gray-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
                Every booking generates a unique digital session token. Your
                private dashboard routes are fully protected using cutting-edge
                authentication protocols.
              </p>
              <div className="pt-4">
                <Link
                  href="/tutors"
                  className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-purple-600/10 active:scale-95 group"
                >
                  Book Premium Class{" "}
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </section>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
