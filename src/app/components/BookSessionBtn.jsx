"use client";

import React, { useState } from "react";
import { User, Mail, Phone, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
export default function BookSessionBtn({ tutor }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentDate = new Date();
  const sessionDate = new Date(tutor.sessionStartDate);
  const isValid = currentDate >= sessionDate;
  const handleBooked = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    console.log("e: ", e);
    const { data: jwtData } = await authClient.token();
    const token = jwtData?.token;
    if (!token) {
      toast.error("authentication falid. Booking session not add.");
      return;
    }
    const user = session?.user;
    const { id, email } = user;
    const updatedData = {
      _id: tutor?._id,
      tutorId: tutor?.id,
      userId: id,
      studentName: formData.name,
      studentEmail: email,
      tutorCategory: tutor?.category,
      phone: formData.phone,
      status: "pending",
    };
    console.log("updateData: ", updatedData);
    try {
      setIsSubmitting(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/booked/${tutor?._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` || "",
          },
          body: JSON.stringify(updatedData),
        },
      );

      const data = await res.json();
      if (!data) {
        toast.error("Something went wrong");
        return;
      }

      toast.success("Session booked successfully!");
      setModalOpen(false);
      router.push("/my-bookings");
    } catch (error) {
      console.error(error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        disabled={!isValid}
        className={`bg-blue-600 ${isValid ? "bg-blue-600 hover:bg-blue-500" : "bg-gray-800 text-gray-500 cursor-not-allowed"}  text-white text-xs font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg active:scale-95 flex items-center gap-2`}
      >
        Book Session
      </button>

      {/* --- FORM SUBMISSION INTERACTIVE MODAL COMPONENT --- */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-sm">
          <div className="bg-gray-900 border border-gray-800 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-5 relative">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Confirm Session Reservation
              </h3>
              <p className="text-xs text-gray-400">
                Review system metadata logs and complete phone verification
                parameters down below.
              </p>
            </div>

            <form onSubmit={handleBooked} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-wider text-gray-500 flex items-center gap-1">
                  <User size={11} /> Student Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-gray-400 opacity-60 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-wider text-gray-500 flex items-center gap-1">
                  <Mail size={11} /> Student Email
                </label>
                <input
                  type="email"
                  readOnly
                  value={session?.user?.email || ""}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-gray-400 cursor-not-allowed opacity-60 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-gray-500">
                    Tutor ID
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={tutor?.id || ""}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-gray-400 cursor-not-allowed opacity-60 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-gray-500">
                    Tutor Category
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={tutor?.category || ""}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-gray-400 cursor-not-allowed opacity-60 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-wider text-gray-300 flex items-center gap-1">
                  <Phone size={11} className="text-blue-500" /> Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+880 17XX-XXXXXX"
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Action Rows */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-all active:scale-95 flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={12} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
