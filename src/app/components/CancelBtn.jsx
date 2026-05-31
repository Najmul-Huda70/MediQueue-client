"use client";
import React, { useState } from "react";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
export default function CancelBtn({ id }) {
  const router = useRouter();
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const handleConfirmCancel = async () => {
    if (!id) return;

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/booked/${id}`;
    console.log("apiUrl: ", apiUrl);
    try {
      setIsCancelling(true);

      const { data: jwtData } = await authClient.token();
      const token = jwtData?.token;

      if (!token) {
        toast.error("Authentication failed. Cannot cancel session.");
        return;
      }
      const res = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "cancelled" }),
      });

      const result = await res.json();
      // console.log("result: ", result);
      if (res.ok) {
        toast.success("Session cancelled successfully.");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to cancel the session.");
      }
    } catch (error) {
      console.error("Cancel Request Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsCancelling(false);
      setIsModalOpen(false);
    }
  };
  return (
    <>
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="inline-flex items-center gap-1.5 bg-gray-950 hover:bg-rose-950/40 border border-gray-800 hover:border-rose-900/60 text-gray-400 hover:text-rose-400 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-95"
      >
        <Trash2 size={13} /> Cancel
      </button>
      {/* CONFIRMATION MODAL LAYER */}
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
    </>
  );
}
