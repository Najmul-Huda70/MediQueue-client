import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(), // headers containing the user's session token
  });

  //   console.log("session with proxy: ", session);
  if (!session && !session?.user) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/tutors/:id",
    "/add-tutor/:path*",
    "/my-tutors/:path*",
    "/my-bookings/:path*",
  ],
};
