export const getTutors = async () => {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${apiURL}/tutors`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch tutors: ${res.status}`);
    }

    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching tutors data in frontend:", error);
    return [];
  }
};
export const getTutorDetails = async (id, token) => {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${apiURL}/tutors/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch tutor: ${res.status}`);
    }

    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching tutor data in frontend:", error);
    return [];
  }
};
export const tutorsDataFetch = async (email, token) => {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${apiURL}/tutors?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch tutors: ${res.status}`);
    }

    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching tutors data in frontend:", error);
    return [];
  }
};
export const bookedDataFetch = async (email, token) => {
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
