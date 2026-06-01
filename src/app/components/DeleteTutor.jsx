"use client";
import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

export default function DeleteTutor({ tutor }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isActionSubmitting, setIsActionSubmitting] = useState(false);
  if (!tutor) return;
  const { name } = tutor;
  const handleDeleteConfirm = () => {
    setIsActionSubmitting(true);
  };
  return (
    <>
      <button
        onClick={() => {
          setIsDeleteModalOpen(true);
        }}
        className="p-2 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500 text-rose-400 hover:text-white rounded-lg transition-all"
        title="Delete Profile"
      >
        <FiTrash2 size={16} />
      </button>
      {isDeleteModalOpen && (
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
              <span className="text-rose-400 font-semibold">{name}</span>? This
              action cannot be undone.
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
