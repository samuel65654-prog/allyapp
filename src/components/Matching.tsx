import UserProfile from "./UserProfile";
import type { AppUser } from "@/types";
import type { MatchResult } from "@/lib/matching";

interface MatchingProps {
  potentialMatch: AppUser;
  score?: number;
  breakdown?: MatchResult["breakdown"];
  onAccept: () => void;
  onSkip: () => void;
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  const color = value >= 70 ? "bg-green-400" : value >= 40 ? "bg-yellow-400" : "bg-red-300";
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-20 text-gray-500 shrink-0">{label}</span>
      <div className="flex-grow bg-gray-100 rounded-full h-2">
        <div className={`${color} h-2 rounded-full transition-all`} style={{ width: `${value}%` }} />
      </div>
      <span className="w-8 text-right text-gray-600">{value}%</span>
    </div>
  );
}

export default function Matching({ potentialMatch, score, breakdown, onAccept, onSkip }: MatchingProps) {
  const scoreColor = score !== undefined
    ? score >= 70 ? "text-green-600 bg-green-50 border-green-200"
      : score >= 40 ? "text-yellow-600 bg-yellow-50 border-yellow-200"
      : "text-red-500 bg-red-50 border-red-200"
    : "";

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-57px)] py-8 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm overflow-hidden">
        <UserProfile user={potentialMatch} />

        {score !== undefined && (
          <div className="px-6 pb-4 space-y-2">
            <div className={`flex items-center justify-between p-3 rounded-xl border ${scoreColor} mb-3`}>
              <span className="font-semibold text-sm">Match Score</span>
              <span className="text-2xl font-bold">{score}%</span>
            </div>
            {breakdown && (
              <div className="space-y-1.5">
                <ScoreBar label="Interests" value={breakdown.interests} />
                <ScoreBar label="City" value={breakdown.city} />
                <ScoreBar label="Personality" value={breakdown.personality} />
                <ScoreBar label="Tech level" value={breakdown.techLevel} />
                <ScoreBar label="Availability" value={breakdown.availability} />
              </div>
            )}
          </div>
        )}

        <div className="flex gap-3 p-4 border-t">
          <button
            onClick={onSkip}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
          >
            Skip
          </button>
          <button
            onClick={onAccept}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Connect ✓
          </button>
        </div>
      </div>
    </div>
  );
}
