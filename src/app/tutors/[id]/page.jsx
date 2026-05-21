// "use client";

// import React, { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import {
//   MapPin,
//   BookOpen,
//   Calendar,
//   DollarSign,
//   Layers,
//   GraduationCap,
//   Laptop,
//   Clock,
//   ArrowLeft,
//   CheckCircle2,
//   AlertTriangle,
//   User,
//   Mail,
//   Phone,
// } from "lucide-react";

// export default function DynamicTutorDetails() {
//   const params = useParams();
//   const router = useRouter();

//   const id = params?.id || "";

//   const [matchedTutor, setMatchedTutor] = useState([]);
//   const [loading, setLoading] = useState(true);
//   // // ২. 🌟 স্লট ট্র্যাকিং স্টেট (লকাল স্টোরেজ চেক সহ)
//   // const [currentSlots, setCurrentSlots] = useState(() => {
//   //   if (typeof window !== "undefined") {
//   //     const dynamicSlots = localStorage.getItem(`slots_${matchedTutor.id}`);
//   //     return dynamicSlots !== null
//   //       ? parseInt(dynamicSlots, 10)
//   //       : matchedTutor.totalSlot;
//   //   }
//   //   return matchedTutor.totalSlot;
//   // });

//   // // ৩. UI কন্ট্রোল স্টেটস
//   // const [modalOpen, setModalOpen] = useState(false);
//   // const [isSubmitting, setIsSubmitting] = useState(false);
//   // const [successBanner, setSuccessBanner] = useState(false);

//   // // ৪. ইনপুট ফর্ম স্টেট (সরাসরি matchedTutor থেকে সুরক্ষিতভাবে ডাটা ইনজেক্ট করা)
//   // const [studentForm, setStudentForm] = useState({
//   //   studentName: "Najmul Huda",
//   //   studentEmail: "najmul@example.com",
//   //   phone: "",
//   //   tutorId: matchedTutor.id,
//   //   tutorName: matchedTutor.name,
//   // });

//   // // ৫. 🌟 সিনক্রোনাস বিজনেস রুলস ভ্যালিডেশন
//   // const currentDate = new Date();
//   // const sessionDate = new Date(matchedTutor.sessionStartDate);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const apiUrl =
//           process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
//         const res = await fetch(`${apiUrl}/tutors/${id}`);
//         const data = await res.json();
//         setMatchedTutor(data);
//       } catch (error) {
//         console.error("Error fetching tutor Details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
//         Loading verified tutors...
//       </div>
//     );
//   }
//   console.log("tutorDetailsPage: ", matchedTutor);

//   // let businessAlert = "";
//   // if (currentSlots === 0) {
//   //   businessAlert = "No available slots left.";
//   // } else if (currentDate < sessionDate) {
//   //   businessAlert = "Booking is not available yet for this tutor";
//   // }

//   // const handlePhoneChange = (e) => {
//   //   setStudentForm({ ...studentForm, phone: e.target.value });
//   // };

//   // // ৬. বুকিং ট্রান্সজেকশন হ্যান্ডলার
//   // const handleBookingTransaction = async (e) => {
//   //   e.preventDefault();
//   //   setIsSubmitting(true);

//   //   // নেটওয়ার্ক ডিলে সিমুলেশন
//   //   await new Promise((resolve) => setTimeout(resolve, 1000));

//   //   // নতুন স্লট সংখ্যা হিসাব করা
//   //   const nextSlotValue = Math.max(0, currentSlots - 1);

//   //   // লকাল স্টোরেজ ও স্টেটে স্লট আপডেট
//   //   localStorage.setItem(`slots_${matchedTutor.id}`, nextSlotValue);
//   //   setCurrentSlots(nextSlotValue);

//   //   // কনসোলে পেলোড লগ জেনারেট করা
//   //   console.log("Booking Confirmed Payload Log:", {
//   //     studentName: studentForm.studentName,
//   //     studentEmail: studentForm.studentEmail,
//   //     phone: studentForm.phone,
//   //     tutorId: studentForm.tutorId,
//   //     tutorName: studentForm.tutorName,
//   //     bookStatus: "Confirmed",
//   //   });

//   //   setIsSubmitting(false);
//   //   setModalOpen(false);
//   //   setSuccessBanner(true);

//   //   // সাকসেস ব্যানার ৫ সেকেন্ড পর হাইড করা
//   //   setTimeout(() => setSuccessBanner(false), 5000);
//   // };

//   return (
//     <>
//       <div>length:{matchedTutor.length}</div>
//     </>
//     // <main className="min-h-screen bg-gray-950 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//     //   <div className="max-w-4xl mx-auto space-y-6">
//     //     {/* Navigation Return Hook */}
//     //     <button
//     //       onClick={() => router.back()}
//     //       className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
//     //     >
//     //       <ArrowLeft size={14} /> Back to Tutors List
//     //     </button>

//     //     {/* --- SYSTEM AUTO-GENERATED CONFIRMATION BANNER --- */}
//     //     {successBanner && (
//     //       <div className="p-4 rounded-xl border bg-emerald-950/40 border-emerald-800 text-emerald-400 text-xs flex items-center gap-2.5 animate-fadeIn">
//     //         <CheckCircle2 size={16} className="text-emerald-400" />
//     //         <span>
//     //           Booking Successful! Status:{" "}
//     //           <strong className="uppercase">Confirmed</strong>. Available slot
//     //           decremented by 1.
//     //         </span>
//     //       </div>
//     //     )}

//     //     {/* Card Frame Showcase Panel Container */}
//     //     <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-3">
//     //       {/* Avatar Area */}
//     //       <div className="relative h-64 md:h-full bg-gray-950">
//     //         <img
//     //           src={matchedTutor.photoUrl}
//     //           alt={matchedTutor.name}
//     //           className="w-full h-full object-cover"
//     //         />
//     //         <span className="absolute top-4 right-4 bg-gray-950/80 backdrop-blur-md text-blue-400 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-800">
//     //           {matchedTutor.teachingMode}
//     //         </span>
//     //       </div>

//     //       {/* Details Specification Context Area */}
//     //       <div className="p-8 md:col-span-2 flex flex-col justify-between space-y-6">
//     //         <div className="space-y-4">
//     //           <span className="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-md uppercase tracking-wider inline-block">
//     //             {matchedTutor.category}
//     //           </span>
//     //           <h1 className="text-3xl font-extrabold text-white tracking-tight">
//     //             {matchedTutor.name}
//     //           </h1>

//     //           <p className="text-xs text-gray-400 flex items-center gap-1.5">
//     //             <GraduationCap size={15} className="text-gray-500" />
//     //             <span>{matchedTutor.institution}</span>
//     //           </p>

//     //           <p className="text-xs text-gray-400 leading-relaxed bg-gray-950/40 border border-gray-800/60 p-4 rounded-xl">
//     //             {matchedTutor.experience}
//     //           </p>

//     //           {/* Data Metric Grid Rows */}
//     //           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-400 pt-2">
//     //             <div>
//     //               <strong>Location:</strong> {matchedTutor.location}
//     //             </div>
//     //             <div>
//     //               <strong>Schedule Time:</strong>{" "}
//     //               {matchedTutor.availableTimeSlot}
//     //             </div>
//     //             <div>
//     //               <strong>Session Start Date:</strong>{" "}
//     //               <span className="text-gray-300 font-medium">
//     //                 {matchedTutor.sessionStartDate}
//     //               </span>
//     //             </div>
//     //             <div>
//     //               <strong>Total Slots Opened:</strong>{" "}
//     //               <span
//     //                 className={
//     //                   currentSlots === 0
//     //                     ? "text-rose-400 font-bold"
//     //                     : "text-emerald-400 font-bold"
//     //                 }
//     //               >
//     //                 {currentSlots} left
//     //               </span>
//     //             </div>
//     //           </div>
//     //         </div>

//     //         {/* CTA Execution Container */}
//     //         <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//     //           <div>
//     //             <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">
//     //               Hourly Allotment
//     //             </span>
//     //             <span className="text-2xl font-black text-white flex items-center">
//     //               <DollarSign size={18} className="text-emerald-500 -ml-1" />
//     //               <span>
//     //                 {matchedTutor.hourlyFee}
//     //                 <span className="text-xs text-gray-500 font-normal">
//     //                   /hr
//     //                 </span>
//     //               </span>
//     //             </span>
//     //           </div>

//     //           {/* Business Alert Validation Decision Checks */}
//     //           {businessAlert ? (
//     //             <div className="p-3.5 bg-rose-950/20 border border-rose-900/60 text-rose-400 text-xs font-semibold rounded-xl flex items-center gap-2 max-w-xs">
//     //               <AlertTriangle
//     //                 size={15}
//     //                 className="text-rose-500 flex-shrink-0"
//     //               />
//     //               <span>{businessAlert}</span>
//     //             </div>
//     //           ) : (
//     //             <button
//     //               onClick={() => setModalOpen(true)}
//     //               className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg active:scale-95"
//     //             >
//     //               Book Session
//     //             </button>
//     //           )}
//     //         </div>
//     //       </div>
//     //     </div>
//     //   </div>

//     //   {/* --- FORM SUBMISSION INTERACTIVE MODAL COMPONENT --- */}
//     //   {modalOpen && (
//     //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-sm">
//     //       <div className="bg-gray-900 border border-gray-800 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-5 relative">
//     //         <div>
//     //           <h3 className="text-base font-bold text-white tracking-tight">
//     //             Confirm Session Reservation
//     //           </h3>
//     //           <p className="text-xs text-gray-400">
//     //             Review system metadata logs and complete phone verification
//     //             parameters down below.
//     //           </p>
//     //         </div>

//     //         <form onSubmit={handleBookingTransaction} className="space-y-4">
//     //           {/* Field 1: Student Name */}
//     //           <div className="space-y-1">
//     //             <label className="text-[10px] uppercase font-bold tracking-wider text-gray-500 flex items-center gap-1">
//     //               <User size={11} /> Student Name
//     //             </label>
//     //             <input
//     //               type="text"
//     //               disabled
//     //               value={studentForm.studentName}
//     //               className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-gray-500 cursor-not-allowed opacity-60"
//     //             />
//     //           </div>

//     //           {/* Field 2: Student Email */}
//     //           <div className="space-y-1">
//     //             <label className="text-[10px] uppercase font-bold tracking-wider text-gray-500 flex items-center gap-1">
//     //               <Mail size={11} /> Student Email
//     //             </label>
//     //             <input
//     //               type="email"
//     //               disabled
//     //               value={studentForm.studentEmail}
//     //               className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-gray-500 cursor-not-allowed opacity-60"
//     //             />
//     //           </div>

//     //           {/* Field 3 & 4: Tutor Details Reference Parameters Blocks */}
//     //           <div className="grid grid-cols-2 gap-3">
//     //             <div className="space-y-1">
//     //               <label className="text-[10px] uppercase font-bold tracking-wider text-gray-500">
//     //                 Tutor ID
//     //               </label>
//     //               <input
//     //                 type="text"
//     //                 disabled
//     //                 value={studentForm.tutorId}
//     //                 className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-gray-500 cursor-not-allowed opacity-60"
//     //               />
//     //             </div>
//     //             <div className="space-y-1">
//     //               <label className="text-[10px] uppercase font-bold tracking-wider text-gray-500">
//     //                 Tutor Name
//     //               </label>
//     //               <input
//     //                 type="text"
//     //                 disabled
//     //                 value={studentForm.tutorName}
//     //                 className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-gray-500 cursor-not-allowed opacity-60"
//     //               />
//     //             </div>
//     //           </div>

//     //           {/* Field 5: Manual Phone Number Input Entry Required */}
//     //           <div className="space-y-1">
//     //             <label className="text-[10px] uppercase font-bold tracking-wider text-gray-300 flex items-center gap-1">
//     //               <Phone size={11} className="text-blue-500" /> Phone Number
//     //             </label>
//     //             <input
//     //               type="tel"
//     //               required
//     //               value={studentForm.phone}
//     //               onChange={handlePhoneChange}
//     //               placeholder="+880 17XX-XXXXXX"
//     //               className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
//     //             />
//     //           </div>

//     //           {/* Action Rows */}
//     //           <div className="flex items-center justify-end gap-3 pt-2">
//     //             <button
//     //               type="button"
//     //               onClick={() => setModalOpen(false)}
//     //               className="px-4 py-2 text-xs font-semibold rounded-lg text-gray-400 hover:text-white transition-colors"
//     //             >
//     //               Cancel
//     //             </button>
//     //             <button
//     //               type="submit"
//     //               disabled={isSubmitting}
//     //               className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-all active:scale-95"
//     //             >
//     //               {isSubmitting ? "Processing..." : "Confirm Booking"}
//     //             </button>
//     //           </div>
//     //         </form>
//     //       </div>
//     //     </div>
//     //   )}
//     // </main>
//   );
// }
"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  // const router = useRouter();

  const id = params?.id || "";

  const [matchedTutor, setMatchedTutor] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        const res = await fetch(`${apiUrl}/tutors/${id}`);
        const data = await res.json();
        setMatchedTutor(data);
      } catch (error) {
        console.error("Error fetching tutor Details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        Loading verified tutors...
      </div>
    );
  }
  console.log("tutorDetailsPage: ", matchedTutor);

  return <div>tutorDetailsPage: {matchedTutor.length}</div>;
}
