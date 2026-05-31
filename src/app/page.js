import { getTutors } from "@/lib/data";
import AvailableTutors from "./components/AvailableTutors";
import Hero from "./components/Hero";
export default async function Home() {
  const tutors = await getTutors();
  return (
    <>
      <Hero tutors={tutors} />
      <AvailableTutors tutors={tutors} />
    </>
  );
}
