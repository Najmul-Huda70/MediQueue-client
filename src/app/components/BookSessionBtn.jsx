"use client";
import React, { useState } from "react";
import { User, Mail, Phone } from "lucide-react";
export default function BookSessionBtn() {
  //  const params = useParams();
  //   const router = useRouter();

  //   const _id = params?.id || "";

  //   const [matchedTutor, setMatchedTutor] = useState([]);

  //   const [currentSlots, setCurrentSlots] = useState(() => {
  //     if (typeof window !== "undefined") {
  //       const dynamicSlots = localStorage.getItem(`slots_${matchedTutor.id}`);
  //       return dynamicSlots !== null
  //         ? parseInt(dynamicSlots, 10)
  //         : matchedTutor.totalSlot;
  //     }
  //     return matchedTutor.totalSlot;
  //   });

  //   const [isSubmitting, setIsSubmitting] = useState(false);
  //   const [successBanner, setSuccessBanner] = useState(false);

  //   const sessionDate = new Date(matchedTutor.sessionStartDate);

  //   }
  //   // console.log("matchedTutorPage: ", matchedTutor);
  //   const { id, name, totalSlot } = matchedTutor;

  //   // ৬. বুকিং ট্রান্সজেকশন হ্যান্ডলার
  //   const handleBookingTransaction = async (e) => {
  //     e.preventDefault();
  //     setIsSubmitting(true);

  //     // নেটওয়ার্ক ডিলে সিমুলেশন
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     // নতুন স্লট সংখ্যা হিসাব করা
  //     const nextSlotValue = Math.max(0, currentSlots - 1);

  //     // লকাল স্টোরেজ ও স্টেটে স্লট আপডেট
  //     localStorage.setItem(`slots_${matchedTutor.id}`, nextSlotValue);
  //     setCurrentSlots(nextSlotValue);

  //     // কনসোলে পেলোড লগ জেনারেট করা
  //     console.log("Booking Confirmed Payload Log:", {
  //       studentName: studentForm.studentName,
  //       studentEmail: studentForm.studentEmail,
  //       phone: studentForm.phone,
  //       tutorId: id,
  //       tutorName: name,
  //       bookStatus: "Confirmed",
  //     });

  //     setIsSubmitting(false);
  //     setModalOpen(false);
  //     setSuccessBanner(true);

  //     // সাকসেস ব্যানার ৫ সেকেন্ড পর হাইড করা
  //     setTimeout(() => setSuccessBanner(false), 5000);
  //   };
  //   const [studentForm, setStudentForm] = useState({
  //     studentName: "",
  //     studentEmail: "najmul@example.com",
  //     phone: "",
  //     tutorId: matchedTutor.id,
  //     tutorName: matchedTutor.name,
  //   });
  //   const handlePhoneChange = (e) => {
  //     setStudentForm({ ...studentForm, phone: e.target.value });
  //   };
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <button
        // onClick={() => setModalOpen(true)}
        className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg active:scale-95"
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

            <form onSubmit={handleBookingTransaction} className="space-y-4">
              {/* Field 1: Student Name */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-wider text-gray-500 flex items-center gap-1">
                  <User size={11} /> Student Name
                </label>
                <input
                  type="text"
                  value={studentForm.studentName}
                  placeholder="Enter your name"
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-gray-500 cursor-not-allowed opacity-60"
                />
              </div>

              {/* Field 2: Student Email */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-wider text-gray-500 flex items-center gap-1">
                  <Mail size={11} /> Student Email
                </label>
                <input
                  type="email"
                  disabled
                  value={studentForm.studentEmail}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-gray-500 cursor-not-allowed opacity-60"
                />
              </div>

              {/* Field 3 & 4: Tutor Details Reference Parameters Blocks */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-gray-500">
                    Tutor ID
                  </label>
                  <input
                    type="text"
                    disabled
                    defaultValue={id}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-gray-500 cursor-not-allowed opacity-60"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-gray-500">
                    Tutor Name
                  </label>
                  <input
                    type="text"
                    disabled
                    defaultValue={name}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-gray-500 cursor-not-allowed opacity-60"
                  />
                </div>
              </div>

              {/* Field 5: Manual Phone Number Input Entry Required */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-wider text-gray-300 flex items-center gap-1">
                  <Phone size={11} className="text-blue-500" /> Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={studentForm.phone}
                  onChange={handlePhoneChange}
                  placeholder="+880 17XX-XXXXXX"
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Action Rows */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-all active:scale-95"
                >
                  {isSubmitting ? "Processing..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
