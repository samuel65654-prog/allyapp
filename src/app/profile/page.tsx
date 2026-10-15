"use client";

import UserProfile from "@/components/UserProfile";

// Mock data for demonstration purposes
const mockUser = {
  firstName: "Jane",
  ageRange: "65-75",
  gender: "Female",
  city: "New York",
  profilePhotoUrl: "https://via.placeholder.com/150",
  interests: ["Reading", "Gardening", "Knitting"],
  personalityType: "Introvert",
  activityLevel: "Low",
  techComfortLevel: "Medium",
};

export default function ProfilePage() {
  return (
    <div>
      <UserProfile user={mockUser} />
    </div>
  );
}
