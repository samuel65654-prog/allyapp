"use client";

import { useMemo, useState } from "react";
import Matching from "@/components/Matching";
import { scoreMatches } from "@/lib/matching";
import type { CompanionUser, ElderlyUser } from "@/types";
import { useAuth } from "@/context/AuthContext";

// Fallback elder used only when no real profile exists
const fallbackElder: Pick<ElderlyUser, "interests" | "city" | "personalityType" | "techComfortLevel"> & { availability: Record<string, string[]> } = {
  interests: ["Reading", "Music", "Cooking"],
  city: "Miami",
  personalityType: "Ambivert",
  techComfortLevel: "Medium",
  availability: { Mon: ["Morning"], Sat: ["Afternoon", "Evening"], Sun: ["Morning"] },
};

const mockCompanions: CompanionUser[] = [
  {
    id: "1",
    firstName: "Carlos",
    lastName: "Rivera",
    email: "carlos@fiu.edu",
    universityName: "Florida International University (FIU)",
    universityEmail: "carlos@fiu.edu",
    age: 21,
    gender: "Male",
    city: "Miami",
    profilePhotoUrl: "https://via.placeholder.com/150",
    interests: ["Reading", "Music", "Cooking"],
    personalityType: "Ambivert",
    languagesSpoken: ["English", "Spanish"],
    motivation: "I grew up with my grandparents and want to give that same warmth to others.",
    techComfortLevel: "Medium",
    availability: { Mon: ["Morning", "Afternoon"], Sat: ["Afternoon", "Evening"] },
    role: "companion",
    status: "approved",
  },
  {
    id: "2",
    firstName: "Sofia",
    lastName: "Mendez",
    email: "sofia@miami.edu",
    universityName: "University of Miami (UM)",
    universityEmail: "sofia@miami.edu",
    age: 22,
    gender: "Female",
    city: "Miami",
    profilePhotoUrl: "https://via.placeholder.com/150",
    interests: ["Cooking", "Travel", "Music"],
    personalityType: "Extrovert",
    languagesSpoken: ["English", "Spanish", "Portuguese"],
    motivation: "Building bridges between generations is what drives me.",
    techComfortLevel: "High",
    availability: { Sat: ["Afternoon", "Evening"], Sun: ["Morning"] },
    role: "companion",
    status: "approved",
  },
  {
    id: "3",
    firstName: "Jaylen",
    lastName: "Brooks",
    email: "jaylen@mdc.edu",
    universityName: "Miami Dade College (MDC)",
    universityEmail: "jaylen@mdc.edu",
    age: 20,
    gender: "Male",
    city: "Miami",
    profilePhotoUrl: "https://via.placeholder.com/150",
    interests: ["Sports", "Reading", "Volunteering"],
    personalityType: "Introvert",
    languagesSpoken: ["English"],
    motivation: "I believe every elder has a story worth listening to.",
    techComfortLevel: "Medium",
    availability: { Mon: ["Morning"], Sat: ["Morning"], Sun: ["Morning", "Afternoon"] },
    role: "companion",
    status: "approved",
  },
];

export default function MatchingPage() {
  const { profile } = useAuth();

  // If the logged-in user is a companion, they're pending approval — show a holding screen
  if (profile?.role === "companion") {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-57px)] text-center px-6 space-y-4">
        <div className="text-5xl">⏳</div>
        <h2 className="text-2xl font-bold text-slate-800">Application Under Review</h2>
        <p className="text-gray-500 max-w-sm leading-relaxed">
          Hi {profile.firstName}! Your application is being verified by our team. Once approved, you'll start receiving match requests from elders in Miami.
        </p>
        <p className="text-sm text-gray-400">Check your .edu email for updates.</p>
      </div>
    );
  }

  // Use the real elder profile if available, otherwise fall back to demo data
  const elderInput = profile?.role === "elderly" ? profile : fallbackElder;

  const ranked = useMemo(() => scoreMatches(elderInput, mockCompanions), [elderInput]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [accepted, setAccepted] = useState<string[]>([]);

  const current = ranked[currentIndex];

  const handleAccept = () => {
    if (current) setAccepted((prev) => [...prev, current.companion.id]);
    setCurrentIndex((i) => i + 1);
  };

  const handleSkip = () => setCurrentIndex((i) => i + 1);

  if (!current) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-57px)] text-gray-500">
        <p className="text-lg font-medium">You've reviewed all matches!</p>
        {accepted.length > 0 && (
          <p className="text-sm mt-2 text-green-600">
            You connected with {accepted.length} companion{accepted.length > 1 ? "s" : ""} 🎉
          </p>
        )}
        <button
          onClick={() => { setCurrentIndex(0); setAccepted([]); }}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
        >
          Start over
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center py-3 text-sm text-gray-500">
        Match {currentIndex + 1} of {ranked.length}
      </div>
      <Matching
        potentialMatch={current.companion}
        score={current.score}
        breakdown={current.breakdown}
        onAccept={handleAccept}
        onSkip={handleSkip}
      />
    </div>
  );
}
