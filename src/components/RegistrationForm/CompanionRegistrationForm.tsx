"use client";

import { useState, useRef } from "react";
import AvailabilityPicker, { type Availability } from "@/components/AvailabilityPicker";
import { useAuth } from "@/context/AuthContext";
import type { CompanionUser } from "@/types";

const INPUT_CLS = "w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary";

const UNIVERSITIES = [
  "Florida International University (FIU)",
  "University of Miami (UM)",
  "Miami Dade College (MDC)",
];
const GENDERS = ["Male", "Female", "Non-binary", "Prefer not to say"];
const PERSONALITY_TYPES = ["Introvert", "Extrovert", "Ambivert"];
const TECH_LEVELS = ["Low", "Medium", "High"];
const INTERESTS_OPTIONS = ["Reading", "Music", "Movies", "Cooking", "Sports", "Travel", "Arts & Crafts", "Technology", "Volunteering"];
const LANGUAGES = ["English", "Spanish", "French", "Mandarin", "Arabic", "Portuguese", "Other"];

export default function CompanionRegistrationForm() {
  const { setProfile } = useAuth();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    universityName: "",
    universityEmail: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    city: "",
    interests: [] as string[],
    availability: {} as Availability,
    personalityType: "",
    languages: [] as string[],
    techComfortLevel: "",
    motivation: "",
    terms: false,
    privacy: false,
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (field: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggle = (field: "interests" | "languages", value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.universityEmail.toLowerCase().endsWith(".edu")) {
      alert("Please use a valid university email (.edu required).");
      return;
    }
    if (form.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    if (!form.terms || !form.privacy) {
      alert("Please accept the Terms & Conditions and Privacy Policy.");
      return;
    }

    // Store credentials for login
    localStorage.setItem("ally_credentials", JSON.stringify({ email: form.universityEmail, password: form.password }));

    const companionProfile: CompanionUser = {
      id: `companion-${Date.now()}`,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.universityEmail,
      universityName: form.universityName,
      universityEmail: form.universityEmail,
      age: parseInt(form.age, 10),
      gender: form.gender,
      city: "Miami",
      profilePhotoUrl: photoPreview ?? "",
      interests: form.interests,
      availability: form.availability,
      personalityType: form.personalityType,
      languagesSpoken: form.languages,
      techComfortLevel: form.techComfortLevel,
      motivation: form.motivation,
      role: "companion",
      status: "pending",
    };

    setProfile(companionProfile);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md text-center space-y-4 max-w-sm mx-auto">
          <div className="text-5xl">🎉</div>
          <h2 className="text-2xl font-bold text-green-600">Application Submitted!</h2>
          <p className="text-gray-600 leading-relaxed">
            Thank you for applying. Our team will verify your university email and details — you'll hear from us within 24 hours.
          </p>
          <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-700">
            📬 Check your <strong>.edu inbox</strong> for a confirmation email.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Become a Companion</h2>
          <p className="text-sm text-gray-500 mt-1">For verified Miami university students · Flexible, meaningful, and fairly compensated</p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Photo upload */}
          <div className="flex flex-col items-center gap-3">
            <div
              onClick={() => fileRef.current?.click()}
              className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden hover:border-primary transition-colors"
            >
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 text-xs text-center px-2">Add Photo</span>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
            <button type="button" onClick={() => fileRef.current?.click()} className="text-sm text-primary hover:underline">
              {photoPreview ? "Change photo" : "Upload profile photo"}
            </button>
          </div>

          <div className="flex gap-3">
            <input type="text" placeholder="First Name" value={form.firstName}
              onChange={(e) => set("firstName", e.target.value)} required className={INPUT_CLS} />
            <input type="text" placeholder="Last Name" value={form.lastName}
              onChange={(e) => set("lastName", e.target.value)} required className={INPUT_CLS} />
          </div>

          <select value={form.universityName} onChange={(e) => set("universityName", e.target.value)} required className={INPUT_CLS}>
            <option value="">Select your university</option>
            {UNIVERSITIES.map((u) => <option key={u}>{u}</option>)}
          </select>

          <div>
            <label className="block text-sm text-gray-600 mb-1 font-medium">
              University Email <span className="text-red-500">*</span>
              <span className="text-gray-400 font-normal"> — must end in .edu</span>
            </label>
            <input
              type="email"
              placeholder="you@university.edu"
              value={form.universityEmail}
              onChange={(e) => set("universityEmail", e.target.value)}
              pattern="[^@\s]+@[^@\s]+\.[Ee][Dd][Uu]"
              title="Must be a valid .edu email address"
              required
              className={INPUT_CLS}
            />
            {form.universityEmail && !form.universityEmail.toLowerCase().endsWith(".edu") && (
              <p className="text-xs text-red-500 mt-1">⚠ Only institutional (.edu) emails are accepted</p>
            )}
          </div>

          <div className="flex gap-3">
            <input type="password" placeholder="Password" value={form.password}
              onChange={(e) => set("password", e.target.value)} required minLength={6} className={INPUT_CLS} />
            <input type="password" placeholder="Confirm Password" value={form.confirmPassword}
              onChange={(e) => set("confirmPassword", e.target.value)} required className={INPUT_CLS} />
          </div>
          {form.confirmPassword && form.password !== form.confirmPassword && (
            <p className="text-xs text-red-500 -mt-3">Passwords do not match</p>
          )}

          <div className="flex gap-3">
            <input type="number" placeholder="Age" value={form.age}
              onChange={(e) => set("age", e.target.value)} min={18} max={30} required className={INPUT_CLS} />
            <select value={form.gender} onChange={(e) => set("gender", e.target.value)} required className={INPUT_CLS}>
              <option value="">Gender</option>
              {GENDERS.map((g) => <option key={g}>{g}</option>)}
            </select>
          </div>

          <div className={`${INPUT_CLS} bg-gray-50 text-gray-500 cursor-not-allowed flex items-center gap-2`}>
            📍 Miami, FL <span className="text-xs text-gray-400">(service area)</span>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Interests</p>
            <div className="flex flex-wrap gap-2">
              {INTERESTS_OPTIONS.map((interest) => (
                <button type="button" key={interest} onClick={() => toggle("interests", interest)}
                  className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                    form.interests.includes(interest)
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-600 border-gray-300 hover:border-primary"
                  }`}>
                  {interest}
                </button>
              ))}
            </div>
          </div>

          <AvailabilityPicker value={form.availability} onChange={(v) => set("availability", v)} />

          <select value={form.personalityType} onChange={(e) => set("personalityType", e.target.value)} className={INPUT_CLS}>
            <option value="">Personality Type</option>
            {PERSONALITY_TYPES.map((p) => <option key={p}>{p}</option>)}
          </select>

          <div>
            <p className="text-sm text-gray-600 mb-2">Languages Spoken</p>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map((lang) => (
                <button type="button" key={lang} onClick={() => toggle("languages", lang)}
                  className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                    form.languages.includes(lang)
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-600 border-gray-300 hover:border-primary"
                  }`}>
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <select value={form.techComfortLevel} onChange={(e) => set("techComfortLevel", e.target.value)} className={INPUT_CLS}>
            <option value="">Tech Comfort Level</option>
            {TECH_LEVELS.map((t) => <option key={t}>{t}</option>)}
          </select>

          <div>
            <textarea placeholder="Short Motivation — why do you want to be a companion? (max 300 characters)"
              value={form.motivation} onChange={(e) => set("motivation", e.target.value)}
              maxLength={300} rows={3} className={INPUT_CLS} />
            <p className="text-xs text-gray-400 text-right mt-1">{form.motivation.length}/300</p>
          </div>

          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.terms} onChange={(e) => set("terms", e.target.checked)}
              className="h-4 w-4 text-primary border-gray-300 rounded" />
            <span className="text-sm text-gray-900">I accept the Terms & Conditions</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.privacy} onChange={(e) => set("privacy", e.target.checked)}
              className="h-4 w-4 text-primary border-gray-300 rounded" />
            <span className="text-sm text-gray-900">I accept the Privacy Policy</span>
          </label>

          <button type="submit" className="w-full bg-primary text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}
