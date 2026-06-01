"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FiBookOpen, FiEdit, FiCheck, FiX, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function TutorsTableClient({ initialTutors }) {
  const [tutors, setTutors] = useState(initialTutors);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [isActionSubmitting, setIsActionSubmitting] = useState(false);

  const openUpdateModal = (tutor) => {
    setSelectedTutor(tutor);
    setIsUpdateModalOpen(true);
  };
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setIsActionSubmitting(true);

    const formData = new FormData(e.target);
    const rawData = Object.fromEntries(formData.entries());

    const updatedData = {
      ...rawData,
      totalSlot: parseInt(rawData.totalSlot, 10),
    };
    console.log("updatedData with tutorTable: ", updatedData);
    try {
      const res = await fetch(`${apiUrl}/tutors/${selectedTutor._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Profile Updated Successfully!");
        setTutors(
          tutors.map((t) =>
            t._id === selectedTutor._id ? { ...t, ...updatedData } : t,
          ),
        );
        setIsUpdateModalOpen(false);
      } else {
        toast.error(data.message || "Failed to update");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsActionSubmitting(false);
    }
  };
  const handleDeleteConfirm = async () => {
    setIsActionSubmitting(true);
    try {
      const { data: jwtData } = await authClient.token();
      const token = jwtData?.token;

      const res = await fetch(`${apiUrl}/tutors/${selectedTutor._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setTutors((prev) =>
          prev.filter((tutor) => tutor._id !== selectedTutor._id),
        );
        toast.success("Tutor profile deleted successfully.");
        setIsDeleteModalOpen(false);
      } else {
        toast.error(result.message || "Delete failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error connecting to server.");
    } finally {
      setIsActionSubmitting(false);
    }
  };
  if (tutors.length === 0) {
    return (
      <div className="text-center bg-[#1e293b]/40 backdrop-blur-md border border-gray-800 p-12 rounded-2xl shadow-xl">
        <FiBookOpen className="mx-auto text-5xl text-gray-600 mb-4" />
        <h3 className="text-xl font-bold text-gray-300">No Tutors Added Yet</h3>
        <p className="text-gray-500 mt-1 text-sm max-w-sm mx-auto">
          You haven't created any tutor profiles under your account.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto bg-[#1e293b]/50 backdrop-blur-md border border-gray-800 rounded-2xl shadow-2xl">
        <table className="table w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400 text-sm bg-[#0f172a]/40">
              <th className="p-4">Tutor Info</th>
              <th className="p-4">Subject</th>
              <th className="p-4">Hourly Fee</th>
              <th className="p-4">Available Slots</th>
              <th className="p-4">Start Date</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60 text-gray-300">
            {tutors.map((tutor, index) => (
              <tr
                key={tutor._id || index}
                className="hover:bg-[#1e293b]/70 transition-all"
              >
                <td className="p-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl border border-gray-700 overflow-hidden relative bg-[#0f172a]">
                    <Image
                      src={
                        tutor.photoUrl ||
                        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
                      }
                      alt={tutor.name}
                      fill
                      unoptimized
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-gray-100">{tutor.name}</div>
                    <div className="text-xs text-gray-500">
                      {tutor.location}
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2.5 py-1 text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg">
                    {tutor.category}
                  </span>
                </td>
                <td className="p-4 font-medium text-emerald-400">
                  ${tutor.hourlyFee}/hr
                </td>
                <td className="p-4 font-semibold">{tutor.totalSlot} Slots</td>
                <td className="p-4 text-sm text-gray-400">
                  {tutor.sessionStartDate}
                </td>
                <td className="p-4 text-center flex gap-2 justify-center">
                  <button
                    onClick={() => openUpdateModal(tutor)}
                    className="p-2 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500 text-amber-400 hover:text-white rounded-lg transition-all"
                    title="Edit Profile"
                  >
                    <FiEdit size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTutor(tutor);
                      setIsDeleteModalOpen(true);
                    }}
                    className="p-2 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500 text-rose-400 hover:text-white rounded-lg transition-all"
                    title="Delete Profile"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isUpdateModalOpen && selectedTutor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-x-hidden overflow-y-auto">
          <div className="relative bg-[#1e293b] border border-gray-700 w-full max-w-2xl rounded-2xl p-6 shadow-2xl my-8 flex flex-col max-h-[calc(100vh-4rem)] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-3 shrink-0">
              <h3 className="text-xl font-bold text-blue-400">
                Update Tutor Profile
              </h3>
              <button
                onClick={() => setIsUpdateModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 hover:bg-gray-800 rounded-lg"
              >
                <FiX size={20} />
              </button>
            </div>

            <form
              onSubmit={handleUpdateSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-1 custom-scrollbar pb-2"
            >
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Tutor Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={selectedTutor.name}
                  required
                  className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Tutor Image URL
                </label>
                <input
                  type="text"
                  name="photoUrl"
                  defaultValue={selectedTutor.photoUrl}
                  required
                  className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  defaultValue={selectedTutor.category}
                  required
                  className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Full-Stack Web Development">
                    Full-Stack Web Development
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Available Days
                </label>
                <input
                  type="text"
                  name="availableDays"
                  defaultValue={selectedTutor.availableDays}
                  required
                  className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Time Slot
                </label>
                <input
                  type="text"
                  name="availableTimeSlot"
                  defaultValue={selectedTutor.availableTimeSlot}
                  required
                  className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Hourly Fee ($)
                </label>
                <input
                  type="number"
                  name="hourlyFee"
                  defaultValue={selectedTutor.hourlyFee}
                  required
                  className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Total Slots
                </label>
                <input
                  type="number"
                  name="totalSlot"
                  defaultValue={selectedTutor.totalSlot}
                  required
                  className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="sessionStartDate"
                  defaultValue={selectedTutor.sessionStartDate}
                  required
                  className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none [color-scheme:dark]"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Institution
                </label>
                <input
                  type="text"
                  name="institution"
                  defaultValue={selectedTutor.institution}
                  required
                  className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  defaultValue={selectedTutor.location}
                  required
                  className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-400 mb-1">
                  Teaching Mode
                </label>
                <select
                  name="teachingMode"
                  defaultValue={selectedTutor.teachingMode}
                  required
                  className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none"
                >
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                  <option value="Both">Both</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-400 mb-1">
                  Experience
                </label>
                <textarea
                  name="experience"
                  defaultValue={selectedTutor.experience}
                  required
                  className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-3 py-2 text-sm h-20 resize-none text-gray-200 focus:outline-none"
                ></textarea>
              </div>

              <div className="md:col-span-2 pt-3 flex justify-end gap-3 border-t border-gray-700 mt-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="px-4 py-2 text-xs bg-gray-700 hover:bg-gray-600 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isActionSubmitting}
                  className="px-5 py-2 text-xs bg-blue-600 hover:bg-blue-500 rounded-lg font-bold flex items-center gap-1"
                >
                  {isActionSubmitting ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <>
                      <FiCheck /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isDeleteModalOpen && selectedTutor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#1e293b] border border-gray-700 w-full max-w-md rounded-2xl p-6 shadow-2xl text-center animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiTrash2 size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-100">
              Are you absolutely sure?
            </h3>
            <p className="text-gray-400 text-sm mt-2">
              Do you really want to delete the tutor profile of{" "}
              <span className="text-rose-400 font-semibold">
                {selectedTutor.name}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="flex justify-center gap-3 mt-6">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isActionSubmitting}
                className="px-5 py-2 text-sm bg-rose-600 hover:bg-rose-500 rounded-lg font-bold flex items-center gap-1 transition-all"
              >
                {isActionSubmitting ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "Yes, Delete It"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
