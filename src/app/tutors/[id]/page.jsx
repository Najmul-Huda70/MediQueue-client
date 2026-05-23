import React, { Suspense } from "react";
import {
  DollarSign,
  GraduationCap,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";
import Image from "next/image";
import BookSessionBtn from "@/app/components/BookSessionBtn";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
const fetchTutor = async (id, token) => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/tutors/${id}`;
  const res = await fetch(URL, {
    headers: {
      authorization: `Bearer ${token}` || "",
    },
    cache: "no-store",
  });
  const data = await res.json();
  return data || [];
};
export default async function DynamicTutorDetails({ params }) {
  const { id } = await params;
  // console.log("id : ", id);
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  //console.log(token);
  const tutor = await fetchTutor(id, token);
  console.log("tutor: ", tutor);
  const currentDate = new Date();
  const currentSlots = 2;
  const totalSlot = 5;
  const {
    name,
    institution,
    experience,
    category,
    teachingMode,
    photoUrl,
    location,
    availableTimeSlot,
    sessionStartDate,
    hourlyFee,
  } = tutor;
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
          Loading verified tutor Profile...
        </div>
      }
    >
      <main className="min-h-screen bg-gray-950 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Navigation Return Hook */}
          <Link
            href="/tutors"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to Tutors List
          </Link>

          {/* --- SYSTEM AUTO-GENERATED CONFIRMATION BANNER --- */}
          {/*//! false */}
          {/* {successBanner && (
            <div className="p-4 rounded-xl border bg-emerald-950/40 border-emerald-800 text-emerald-400 text-xs flex items-center gap-2.5 animate-fadeIn">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>
                Booking Successful! Status:{" "}
                <strong className="uppercase">Confirmed</strong>. Available slot
                decremented by 1.
              </span>
            </div>
          )} */}

          {/* Card Frame Showcase Panel Container */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-3">
            {/* Avatar Area */}
            <div className="relative h-64 md:h-full bg-gray-950">
              <Image
                src={photoUrl}
                alt={name}
                className="w-full h-full object-cover"
                fill
                unoptimized
              />
              <span className="absolute top-4 right-4 bg-gray-950/80 backdrop-blur-md text-blue-400 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-800">
                {teachingMode}
              </span>
            </div>

            {/* Details Specification Context Area */}
            <div className="p-8 md:col-span-2 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-md uppercase tracking-wider inline-block">
                  {category}
                </span>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">
                  {name}
                </h1>

                <p className="text-xs text-gray-400 flex items-center gap-1.5">
                  <GraduationCap size={15} className="text-gray-500" />
                  <span>{institution}</span>
                </p>

                <p className="text-xs text-gray-400 leading-relaxed bg-gray-950/40 border border-gray-800/60 p-4 rounded-xl">
                  {experience}
                </p>

                {/* Data Metric Grid Rows */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-400 pt-2">
                  <div>
                    <strong>Location:</strong> {location}
                  </div>
                  <div>
                    <strong>Schedule Time:</strong> {availableTimeSlot}
                  </div>
                  <div>
                    <strong>Session Start Date:</strong>{" "}
                    <span className="text-gray-300 font-medium">
                      {sessionStartDate}
                    </span>
                  </div>
                  <div>
                    <strong>Total Slots Opened:</strong>{" "}
                    <span
                      className={
                        currentSlots === 0
                          ? "text-rose-400 font-bold"
                          : "text-emerald-400 font-bold"
                      }
                    >
                      {currentSlots} left
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Execution Container */}
              <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">
                    Hourly Allotment
                  </span>
                  <span className="text-2xl font-black text-white flex items-center">
                    <DollarSign size={18} className="text-emerald-500 -ml-1" />
                    <span>
                      {hourlyFee}
                      <span className="text-xs text-gray-500 font-normal">
                        /hr
                      </span>
                    </span>
                  </span>
                </div>

                {/* Business Alert Validation Decision Checks */}
                {!totalSlot || totalSlot <= 0 ? (
                  <div className="p-3.5 bg-rose-950/20 border border-rose-900/60 text-rose-400 text-xs font-semibold rounded-xl flex items-center gap-2 max-w-xs">
                    <AlertTriangle
                      size={15}
                      className="text-rose-500 shrink-0"
                    />
                    <span>No available slots left.</span>
                  </div>
                ) : (
                  <BookSessionBtn />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Suspense>
  );
}
