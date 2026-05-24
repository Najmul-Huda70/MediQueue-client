"use client";

import React, { useEffect, useState } from "react";
import {
  CalendarX,
  Trash2,
  Loader2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";

export default function MyBookedSessions() {
  const { data: session, isPending: authLoading } = useSession();
  const [bookedSessions, setBookedSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);

  // গ্লোবাল এপিআই ইউআরএল এনভায়রনমেন্ট ভ্যারিয়েবল
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";

  useEffect(() => {
    const fetchMyBookings = async () => {
      const { data: jwtData } = await authClient.token();
      const token = jwtData?.token;

      if (!token) {
        toast.error("Authentication token not found!");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${apiUrl}/booked?email=${session?.user?.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();

        if (res.ok) {
          setBookedSessions(data);
        } else {
          toast.error("Failed to load data");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Network error occurred.");
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && session?.user?.email) {
      fetchMyBookings();
    }
  }, [session, authLoading, apiUrl]);

  const handleCancelClick = (id) => {
    setSelectedBookingId(id);
    setIsModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (!selectedBookingId) return;

    // টোকেন রিসিভ করা মিডলওয়্যারের জন্য
    const { data: jwtData } = await authClient.token();
    const token = jwtData?.token;
    //  console.log(token);
    try {
      setIsCancelling(true);
      const res = await fetch(`${apiUrl}/booked/${selectedBookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` || "", // 🌟 সিকিউরিটি টোকেন যুক্ত করা হলো
        },
        body: JSON.stringify({ status: "cancelled" }),
      });
      console.log("res: ", res);
      const result = await res.json();

      if (res.ok) {
        // 🌟 ফিক্স: সঠিক স্টেট সেট করা হলো (setBookedSessions)
        setBookedSessions((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === selectedBookingId
              ? { ...booking, status: "cancelled" }
              : booking,
          ),
        );
        toast.success("Session cancelled successfully.");
      } else {
        toast.error(result.message || "Failed to cancel the session.");
      }
    } catch (error) {
      console.error("Cancel Request Error:", error);
      toast.error("Something went wrong. Try again.");
    } finally {
      setIsCancelling(false);
      setIsModalOpen(false);
      setSelectedBookingId(null);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-3 text-gray-400">
        <Loader2 className="animate-spin text-blue-500" size={32} />
        <p className="text-sm">Loading your booked sessions...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="p-8 text-center bg-gray-900 border border-gray-800 rounded-2xl max-w-md mx-auto my-12">
        <p className="text-rose-400 font-medium">Access Denied</p>
        <p className="text-gray-400 text-sm mt-1">
          Please log in to view your booked sessions.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 text-gray-100 p-6 sm:p-8 rounded-2xl border border-gray-900 max-w-6xl mx-auto my-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <CheckCircle2 className="text-blue-500" size={24} /> My Booked
          Sessions
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Manage and track all your scheduled premium sessions matrix here.
        </p>
      </div>

      {/* 🌟 ফিক্স: সঠিক স্টেট দিয়ে লেন্থ চেক করা হলো (bookedSessions) */}
      {bookedSessions.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-12 border border-dashed border-gray-800 rounded-2xl bg-gray-900/30">
          <div className="p-4 bg-gray-900 border border-gray-800 rounded-full text-gray-500 mb-4">
            <CalendarX size={36} />
          </div>
          <h3 className="text-lg font-semibold text-white">
            No Bookings Found
          </h3>
          <p className="text-gray-400 text-xs max-w-xs mt-1 leading-relaxed">
            You haven't booked any academic sessions yet. Explore our expert
            tutors directory to start learning!
          </p>
        </div>
      ) : (
        /* 📊 SESSIONS DATA TABLE FORMAT */
        <div className="overflow-x-auto rounded-xl border border-gray-800 shadow-2xl">
          <table className="w-full text-left border-collapse bg-gray-900">
            <thead>
              <tr className="border-b border-gray-800 bg-gray-950 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                <th className="py-4 px-6">Tutor Category</th>
                <th className="py-4 px-6">Student Name</th>
                <th className="py-4 px-6">Email Address</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 text-sm text-gray-300">
              {/* 🌟 ফিক্স: bookedSessions ম্যাপ করা হলো */}
              {bookedSessions.map((booking) => (
                <tr
                  key={booking._id}
                  className="hover:bg-gray-850/40 transition-colors group"
                >
                  <td className="py-4 px-6 font-semibold text-white">
                    {booking.tutorCategory || booking.courseTitle || "N/A"}
                  </td>
                  <td className="py-4 px-6">{booking.studentName}</td>
                  {/* 🌟 ফিক্স: আপনার ডাটা প্রোপার্টি 'studentEmail' রেন্ডার করা হলো */}
                  <td className="py-4 px-6 text-gray-400">
                    {booking.studentEmail}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium border ${
                        booking.status === "cancelled"
                          ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                          : booking.status === "completed"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                      }`}
                    >
                      {booking.status || "pending"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    {booking.status !== "cancelled" ? (
                      <button
                        onClick={() => handleCancelClick(booking._id)}
                        className="inline-flex items-center gap-1.5 bg-gray-950 hover:bg-rose-950/40 border border-gray-800 hover:border-rose-900/60 text-gray-400 hover:text-rose-400 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-95"
                      >
                        <Trash2 size={13} /> Cancel
                      </button>
                    ) : (
                      <span className="text-xs text-gray-600 italic select-none pr-3">
                        No Actions
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🌟 CONFIRMATION MODAL LAYER */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-gray-900 border border-gray-800 w-full max-w-md p-6 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl">
                <AlertTriangle size={22} />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">
                  Cancel Session Booking?
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Are you sure you want to cancel this scheduled session? This
                  action will update your dashboard matrix status and cannot be
                  undone.
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                disabled={isCancelling}
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-950 border border-gray-800 hover:bg-gray-800 text-gray-300 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
              >
                No, Keep It
              </button>
              <button
                disabled={isCancelling}
                onClick={handleConfirmCancel}
                className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-rose-600/10 active:scale-98"
              >
                {isCancelling ? (
                  <>
                    <Loader2 className="animate-spin" size={13} /> Cancelling...
                  </>
                ) : (
                  "Yes, Cancel"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
