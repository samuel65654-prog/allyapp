import type { ElderlyUser, CompanionUser } from "@/types";
import type { Availability } from "@/components/AvailabilityPicker";

/**
 * Scoring weights (must sum to 1.0 for a clean 0–100 score)
 */
const WEIGHTS = {
  interests: 0.35,   // shared interests overlap
  city: 0.20,        // same city
  personality: 0.20, // compatible personality types
  techLevel: 0.15,   // similar tech comfort
  availability: 0.10, // overlapping availability slots
};

/** Personality compatibility matrix */
const PERSONALITY_COMPAT: Record<string, Record<string, number>> = {
  Introvert:  { Introvert: 0.6, Ambivert: 0.9, Extrovert: 0.5 },
  Ambivert:   { Introvert: 0.9, Ambivert: 1.0, Extrovert: 0.9 },
  Extrovert:  { Introvert: 0.5, Ambivert: 0.9, Extrovert: 0.7 },
};

const TECH_ORDER = ["Low", "Medium", "High"];

function interestScore(a: string[], b: string[]): number {
  if (!a.length || !b.length) return 0;
  const setB = new Set(b);
  const overlap = a.filter((i) => setB.has(i)).length;
  const union = new Set([...a, ...b]).size;
  return overlap / union; // Jaccard similarity
}

function personalityScore(a: string, b: string): number {
  return PERSONALITY_COMPAT[a]?.[b] ?? 0.5;
}

function techScore(a: string, b: string): number {
  const ia = TECH_ORDER.indexOf(a);
  const ib = TECH_ORDER.indexOf(b);
  if (ia === -1 || ib === -1) return 0.5;
  const diff = Math.abs(ia - ib);
  return diff === 0 ? 1 : diff === 1 ? 0.6 : 0.2;
}

function availabilityScore(a: Availability, b: Availability): number {
  const aSlots = Object.entries(a).flatMap(([day, slots]) => slots.map((s) => `${day}:${s}`));
  const bSlots = Object.entries(b).flatMap(([day, slots]) => slots.map((s) => `${day}:${s}`));
  if (!aSlots.length || !bSlots.length) return 0.5; // neutral if not set
  const setB = new Set(bSlots);
  const overlap = aSlots.filter((s) => setB.has(s)).length;
  const union = new Set([...aSlots, ...bSlots]).size;
  return overlap / union;
}

export interface MatchResult {
  companion: CompanionUser;
  score: number; // 0–100
  breakdown: {
    interests: number;
    city: number;
    personality: number;
    techLevel: number;
    availability: number;
  };
}

export function scoreMatches(
  elder: Pick<ElderlyUser, "interests" | "city" | "personalityType" | "techComfortLevel"> & { availability?: Availability },
  companions: CompanionUser[]
): MatchResult[] {
  return companions
    .map((companion) => {
      const interests = interestScore(elder.interests, companion.interests);
      const city = elder.city.toLowerCase() === companion.city.toLowerCase() ? 1 : 0;
      const personality = personalityScore(elder.personalityType, companion.personalityType);
      const techLevel = techScore(elder.techComfortLevel, companion.techComfortLevel);
      const elderAvail: Availability = (elder.availability && typeof elder.availability === "object") ? elder.availability as Availability : {};
      const companionAvail: Availability = (companion.availability && typeof companion.availability === "object") ? companion.availability as Availability : {};
      const availability = availabilityScore(elderAvail, companionAvail);

      const score = Math.round(
        (interests * WEIGHTS.interests +
          city * WEIGHTS.city +
          personality * WEIGHTS.personality +
          techLevel * WEIGHTS.techLevel +
          availability * WEIGHTS.availability) *
          100
      );

      return {
        companion,
        score,
        breakdown: {
          interests: Math.round(interests * 100),
          city: city * 100,
          personality: Math.round(personality * 100),
          techLevel: Math.round(techLevel * 100),
          availability: Math.round(availability * 100),
        },
      };
    })
    .sort((a, b) => b.score - a.score);
}
