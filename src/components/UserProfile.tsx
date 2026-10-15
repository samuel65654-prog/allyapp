const UNI_STYLES: Record<string, { badge: string; label: string }> = {
  "Florida International University (FIU)": { badge: "bg-blue-100 text-blue-700 border-blue-200", label: "FIU" },
  "University of Miami (UM)":               { badge: "bg-orange-100 text-orange-700 border-orange-200", label: "UM" },
  "Miami Dade College (MDC)":               { badge: "bg-green-100 text-green-700 border-green-200", label: "MDC" },
};

interface UserProfileProps {
  user: {
    firstName: string;
    age?: number;
    ageRange?: string;
    gender: string;
    city: string;
    profilePhotoUrl: string;
    interests: string[];
    personalityType: string;
    activityLevel?: string;
    techComfortLevel: string;
    universityName?: string;
    languagesSpoken?: string[];
    motivation?: string;
  };
}

export default function UserProfile({ user }: UserProfileProps) {
  const uni = user.universityName ? UNI_STYLES[user.universityName] : null;

  return (
    <div className="p-5">
      {/* Avatar */}
      <div className="flex flex-col items-center gap-2 mb-4">
        <img
          src={user.profilePhotoUrl}
          alt={`${user.firstName}'s profile`}
          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
        />
        <h1 className="text-xl font-bold text-slate-800">{user.firstName}</h1>

        {/* University badge — shown only as generic "University Student" */}
        {user.universityName && (
          <span className="border border-blue-200 bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
            🎓 University Student · Miami
          </span>
        )}

        <div className="flex gap-2 text-xs text-gray-500 flex-wrap justify-center">
          <span>📍 {user.city}, FL</span>
          <span>·</span>
          <span>{user.gender}</span>
          {(user.age || user.ageRange) && (
            <>
              <span>·</span>
              <span>{user.age ? `${user.age} yrs` : user.ageRange}</span>
            </>
          )}
        </div>
      </div>

      {/* Motivation */}
      {user.motivation && (
        <p className="text-sm text-gray-600 italic text-center mb-4 px-2 leading-relaxed">
          "{user.motivation}"
        </p>
      )}

      {/* Details */}
      <div className="space-y-2 text-sm text-gray-700 border-t pt-4">
        <div className="flex justify-between">
          <span className="text-gray-400">Personality</span>
          <span className="font-medium">{user.personalityType}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Tech comfort</span>
          <span className="font-medium">{user.techComfortLevel}</span>
        </div>
        {user.activityLevel && (
          <div className="flex justify-between">
            <span className="text-gray-400">Activity level</span>
            <span className="font-medium">{user.activityLevel}</span>
          </div>
        )}
        {user.languagesSpoken && user.languagesSpoken.length > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-400">Languages</span>
            <span className="font-medium">{user.languagesSpoken.join(", ")}</span>
          </div>
        )}
      </div>

      {/* Interests */}
      <div className="mt-4">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Interests</p>
        <div className="flex flex-wrap gap-1.5">
          {user.interests.map((interest) => (
            <span key={interest} className="bg-slate-100 text-slate-600 rounded-full px-3 py-1 text-xs font-medium">
              {interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
