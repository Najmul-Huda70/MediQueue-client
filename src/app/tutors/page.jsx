import Link from "next/link";
import {
  MapPin,
  BookOpen,
  Calendar,
  DollarSign,
  Layers,
  GraduationCap,
} from "lucide-react";
import { Suspense } from "react";
import { getTutors } from "@/lib/data";
import Image from "next/image";

export default async function TutorsDirectory() {
  const tutorsData = await getTutors();
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
          Loading verified tutors...
        </div>
      }
    >
      <main className="min-h-screen bg-gray-950 text-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Top Directory Heading Info */}
          <div className="space-y-3 text-center sm:text-left">
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Available Expert Tutors
            </h1>
            <p className="text-gray-400 max-w-2xl text-sm leading-relaxed">
              Browse verified academic professionals, secure session matrix
              openings, and plan structured system scheduling tokens.
            </p>
          </div>

          {/* Essential 3-Column Grid Configuration Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutorsData.map((tutor, index) => {
              const isOutofSlots = tutor.totalSlot === 0;

              return (
                <div
                  key={index}
                  className="flex flex-col bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl hover:border-gray-700 transition-all group"
                >
                  {/* Tutor Profile Banner Frame */}
                  <div className="relative h-48 w-full bg-gray-950 overflow-hidden">
                    <Image
                      src={tutor.photoUrl}
                      alt={tutor.name}
                      fill
                      unoptimized
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Mode Badge Layer */}
                    <span className="absolute top-4 right-4 bg-gray-950/80 backdrop-blur-md text-blue-400 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-800">
                      {tutor.teachingMode}
                    </span>
                  </div>

                  {/* Card Main Info Content Space */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-3">
                      {/* Category Label */}
                      <div className="flex items-center gap-1.5 text-xs font-medium text-blue-500 uppercase tracking-wider">
                        <BookOpen size={12} />
                        <span>{tutor.category}</span>
                      </div>

                      {/* Name & Academic Institution info */}
                      <div className="space-y-1">
                        <h2 className="text-xl font-bold text-white tracking-tight">
                          {tutor.name}
                        </h2>
                        <p className="text-xs text-gray-400 flex items-center gap-1 line-clamp-1">
                          <GraduationCap
                            size={13}
                            className="text-gray-500 shrink-0"
                          />
                          <span>{tutor.institution}</span>
                        </p>
                      </div>

                      <hr className="border-gray-800" />

                      {/* Meta Parameter Listings */}
                      <div className="grid grid-cols-2 gap-y-2.5 gap-x-2 text-xs text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={13} className="text-gray-500" />
                          <span className="truncate">{tutor.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5 justify-end">
                          <Layers size={13} className="text-gray-500" />
                          <span
                            className={`${isOutofSlots ? "text-rose-400 font-semibold" : ""}`}
                          >
                            {isOutofSlots
                              ? "No Slots Left"
                              : `${tutor.totalSlot} Slots Open`}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 col-span-2">
                          <Calendar size={13} className="text-gray-500" />
                          <span className="truncate text-gray-300">
                            {tutor.availableTimeSlot}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Pricing Matrix & Redirection CTA Actions Trigger Bar */}
                    <div className="pt-2 flex items-center justify-between gap-4 border-t border-gray-800/60">
                      <div>
                        <p className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider">
                          Hourly Cost
                        </p>
                        <p className="text-lg font-bold text-white flex items-center">
                          <DollarSign
                            size={16}
                            className="text-emerald-500 -ml-0.5"
                          />
                          <span>
                            {tutor.hourlyFee}
                            <span className="text-xs text-gray-500 font-normal">
                              /hr
                            </span>
                          </span>
                        </p>
                      </div>

                      {/* Redirecting Target Routing Path Component */}
                      <Link
                        href={`/tutors/${tutor._id}`}
                        className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-3 rounded-xl transition-all active:scale-[0.98] shadow-md shadow-blue-500/10"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </Suspense>
  );
}
