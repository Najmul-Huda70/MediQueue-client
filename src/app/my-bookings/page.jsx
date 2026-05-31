import { auth } from "@/lib/auth";
import { CalendarX, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { headers } from "next/headers";
import { Suspense } from "react";
import toast from "react-hot-toast";
import CancelBtn from "../components/CancelBtn";

const bookedDataFetch = async (email, token) => {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${apiURL}/booked?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch booked: ${res.status}`);
    }

    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching booked data in frontend:", error);
    return [];
  }
};
export default async function MyBookedSessions() {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  if (!token) {
    toast.error("Authentication token not found!");
    setLoading(false);
    return;
  }

  // console.log(token);
  const session = await auth.api.getSession({
    headers: await headers(),
  });
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
  const email = session?.user?.email;
  // console.log("email: ", email);
  const booked = await bookedDataFetch(email, token);
  console.log("booked: ", booked);

  return (
    <Suspense
      fallback={
        <div className="min-h-100 flex flex-col items-center justify-center gap-3 text-gray-400">
          <Loader2 className="animate-spin text-blue-500" size={32} />
          <p className="text-sm">Loading your booked sessions...</p>
        </div>
      }
    >
      {" "}
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
        {booked.length === 0 ? (
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
          <div className="overflow-x-auto rounded-xl border border-gray-800 shadow-2xl">
            <table className="w-full text-left border-collapse bg-gray-900">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-950 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  <th className="py-4 px-6">Tutor</th>
                  <th className="py-4 px-6">Student Name</th>
                  <th className="py-4 px-6">Email Address</th>
                  <th className="py-4 px-6 text-center">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 text-sm text-gray-300">
                {booked.map((booking) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-gray-850/40 transition-colors group"
                  >
                    <td className="py-4 px-6 flex flex-col font-semibold text-white">
                      <span>{booking.tutorCategory || "N/A"}</span>
                      <span className="text-gray-600">
                        Tutor: {booking.tutorName || "N/A"}
                      </span>
                    </td>
                    <td className="py-4 px-6">{booking.studentName}</td>
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
                        <CancelBtn id={booking?._id} />
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
      </div>
    </Suspense>
  );
}
