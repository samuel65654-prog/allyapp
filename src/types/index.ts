import type { Availability } from "@/components/AvailabilityPicker";

export interface ElderlyUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  ageRange: string;
  gender: string;
  city: string;
  profilePhotoUrl: string;
  interests: string[];
  availability?: Availability;
  personalityType: string;
  activityLevel: string;
  techComfortLevel: string;
  role: "elderly";
  status: "pending" | "approved" | "suspended";
}

export interface CompanionUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  universityName: string;
  universityEmail: string;
  age: number;
  gender: string;
  city: string;
  profilePhotoUrl: string;
  interests: string[];
  availability?: Availability;
  personalityType: string;
  languagesSpoken: string[];
  techComfortLevel: string;
  motivation?: string;
  role: "companion";
  status: "pending" | "approved" | "suspended";
}

export type AppUser = ElderlyUser | CompanionUser;

export interface ChatMessage {
  sender: "me" | "them";
  text: string;
  timestamp?: string;
}
