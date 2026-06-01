import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { tutorsDataFetch } from "@/lib/data";
import Link from "next/link";
import TutorsTableClient from "../components/TutorTable";

export default async function MyTutorsPage() {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  if (!token) {
    return (
      <div className="p-8 text-center bg-gray-900 border border-gray-800 rounded-2xl max-w-md mx-auto my-12">
        <p className="text-rose-400 font-medium">Access Denied</p>
        <p className="text-gray-400 text-sm mt-1">
          Authentication token not found!
        </p>
      </div>
    );
  }

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
  const tutors = await tutorsDataFetch(email, token);

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
              My Tutor Profiles
            </h2>
            <p className="text-gray-400 mt-1 text-sm">
              Manage and track all the slots you have published.
            </p>
          </div>
          <Link
            href={"/add-tutor"}
            className="bg-linear-to-r from-blue-600 to-indigo-600 font-bold px-5 py-2.5 rounded-xl text-sm shadow-lg hover:from-blue-500 hover:to-indigo-500 transition-all"
          >
            + Add New Tutor
          </Link>
        </div>

        <TutorsTableClient initialTutors={tutors} />
      </div>
    </div>
  );
}
