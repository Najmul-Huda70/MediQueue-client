"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  FiUser,
  FiImage,
  FiBookOpen,
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiLayers,
  FiMapPin,
  FiBriefcase,
  FiMonitor,
} from "react-icons/fi";
import toast from "react-hot-toast";

export default function AddTutorPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    photoUrl: "",
    category: "",
    availableDays: "",
    availableTimeSlot: "",
    hourlyFee: "",
    totalSlot: "",
    sessionStartDate: "",
    institution: "",
    experience: "",
    location: "",
    teachingMode: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) return toast.error("Please log in first!");

    setIsSubmitting(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const { data: jwtData } = await authClient.token();
    const token = jwtData?.token;

    const tutorData = {
      ...formData,
      hourlyFee: Number(formData.hourlyFee),
      totalSlot: Number(formData.totalSlot),
      userId: session.user.id || session.user._id,
      userEmail: session.user.email,
      userName: session.user.name,
      createdAt: new Date(),
    };

    try {
      const res = await fetch(`${apiUrl}/tutors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tutorData),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        toast.success("Tutor profile created beautifully!");
        router.push("/my-tutors");
      } else {
        toast.error(result.message || "Failed to create profile.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0f172a]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-[#1e293b]/50 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-700/50">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            Become a Tutor
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            Create a stunning profile to attract students instantly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tutor Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center gap-2">
                <FiUser className="text-blue-400" /> Tutor Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Dr. Najmul Huda"
                className="w-full bg-[#0f172a]/80 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center gap-2">
                <FiUser className="text-blue-400" /> Tutor Image URL
              </label>
              <input
                type="text"
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handleChange}
                required
                placeholder="https://images.unsplash.com/photo..."
                className="w-full bg-[#0f172a]/80 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Subject Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center gap-2">
                <FiBookOpen className="text-blue-400" /> Subject / Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full bg-[#0f172a]/80 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              >
                <option value="" className="bg-[#1e293b]">
                  Select Subject
                </option>
                <option value="Mathematics" className="bg-[#1e293b]">
                  Mathematics
                </option>
                <option value="Physics" className="bg-[#1e293b]">
                  Physics
                </option>
                <option value="Chemistry" className="bg-[#1e293b]">
                  Chemistry
                </option>
                <option
                  value="Full-Stack Web Development"
                  className="bg-[#1e293b]"
                >
                  Full-Stack Web Development
                </option>
                <option value="Machine Learning & AI" className="bg-[#1e293b]">
                  Machine Learning & AI
                </option>
              </select>
            </div>

            {/* Available Days */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center gap-2">
                <FiCalendar className="text-blue-400" /> Available Days
              </label>
              <input
                type="text"
                name="availableDays"
                value={formData.availableDays}
                onChange={handleChange}
                required
                placeholder="e.g. Sun - Thu"
                className="w-full bg-[#0f172a]/80 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>

            {/* Time Slot */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center gap-2">
                <FiClock className="text-blue-400" /> Available Time Slot
              </label>
              <input
                type="text"
                name="availableTimeSlot"
                value={formData.availableTimeSlot}
                onChange={handleChange}
                required
                placeholder="e.g. 5:00 PM - 8:00 PM"
                className="w-full bg-[#0f172a]/80 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>

            {/* Hourly Fee */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center gap-2">
                <FiDollarSign className="text-blue-400" /> Hourly Fee
              </label>
              <input
                type="number"
                name="hourlyFee"
                value={formData.hourlyFee}
                onChange={handleChange}
                required
                placeholder="e.g. 55"
                className="w-full bg-[#0f172a]/80 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>

            {/* Total Slot */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center gap-2">
                <FiLayers className="text-blue-400" /> Total Slots Available
              </label>
              <input
                type="number"
                name="totalSlot"
                value={formData.totalSlot}
                onChange={handleChange}
                required
                placeholder="e.g. 4"
                className="w-full bg-[#0f172a]/80 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>

            {/* Date Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center gap-2">
                <FiCalendar className="text-blue-400" /> Session Start Date
              </label>
              <input
                type="date"
                name="sessionStartDate"
                value={formData.sessionStartDate}
                onChange={handleChange}
                required
                className="w-full bg-[#0f172a]/80 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all [color-scheme:dark]"
              />
            </div>

            {/* Institution */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center gap-2">
                <FiBriefcase className="text-blue-400" /> Institution
              </label>
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                required
                placeholder="University of Dhaka"
                className="w-full bg-[#0f172a]/80 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center gap-2">
                <FiMapPin className="text-blue-400" /> Location (Area/City)
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="Banani, Dhaka"
                className="w-full bg-[#0f172a]/80 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>

            {/* Teaching Mode */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center gap-2">
                <FiMonitor className="text-blue-400" /> Teaching Mode
              </label>
              <select
                name="teachingMode"
                value={formData.teachingMode}
                onChange={handleChange}
                required
                className="w-full bg-[#0f172a]/80 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              >
                <option value="" className="bg-[#1e293b]">
                  Select Mode
                </option>
                <option value="Online" className="bg-[#1e293b]">
                  Online
                </option>
                <option value="Offline" className="bg-[#1e293b]">
                  Offline
                </option>
                <option value="Both" className="bg-[#1e293b]">
                  Both
                </option>
              </select>
            </div>

            {/* Experience Detail */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center gap-2">
                <FiBriefcase className="text-blue-400" /> Experience Detail
              </label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                placeholder="Describe your teaching experience and track record..."
                className="w-full bg-[#0f172a]/80 border border-gray-700 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 h-28 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full relative flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f172a] focus:ring-blue-500 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-[0.99]"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Publish Tutor Profile"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
