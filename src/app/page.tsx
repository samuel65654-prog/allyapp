"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ElderlyRegistrationForm from "@/components/RegistrationForm/ElderlyRegistrationForm";
import CompanionRegistrationForm from "@/components/RegistrationForm/CompanionRegistrationForm";

type Step = "hero" | "roleSelection" | "inspiration" | "registration";
type Role = "elderly" | "companion";

const MESSAGES: Record<Role, { heading: string; sub: string; color: string }> = {
  elderly: {
    heading: "You deserve to feel seen, heard, and valued.",
    sub: "ALLY connects you with a carefully vetted, compassionate young companion — someone who genuinely wants to spend time with you, share stories, and make your days brighter.",
    color: "from-blue-600 to-indigo-700",
  },
  companion: {
    heading: "Make a real difference. Earn while you do it.",
    sub: "As an ALLY companion you build a genuine bond with an elder in Miami — someone who will value your time, your energy, and your presence. It's honest, flexible work that actually matters.",
    color: "from-violet-600 to-blue-600",
  },
};

export default function Home() {
  const [step, setStep] = useState<Step>("hero");
  const [role, setRole] = useState<Role | null>(null);

  const selectRole = (r: Role) => { setRole(r); setStep("inspiration"); };

  if (step === "registration" && role === "elderly") return <ElderlyRegistrationForm />;
  if (step === "registration" && role === "companion") return <CompanionRegistrationForm />;

  if (step === "inspiration" && role) {
    const msg = MESSAGES[role];
    return (
      <div className={`min-h-[calc(100vh-57px)] bg-gradient-to-br ${msg.color} flex items-center justify-center px-6`}>
        <div className="max-w-lg text-center text-white space-y-6">
          <div className="text-5xl">{role === "elderly" ? "🤝" : "⚡"}</div>
          <h2 className="text-3xl font-bold leading-snug">{msg.heading}</h2>
          <p className="text-white/80 text-lg leading-relaxed">{msg.sub}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => setStep("registration")}
              className="px-8 py-3 bg-white text-blue-700 font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              Create my profile
            </button>
            <button
              onClick={() => setStep("roleSelection")}
              className="px-6 py-3 border border-white/40 text-white rounded-2xl hover:bg-white/10 transition-colors"
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "roleSelection") {
    return (
      <div className="min-h-[calc(100vh-57px)] bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-6">
        <div className="text-center space-y-10 max-w-2xl w-full">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-800">Who are you joining as?</h2>
            <p className="text-gray-500 mt-3">Currently serving Miami, FL.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <button
              onClick={() => selectRole("elderly")}
              className="group relative bg-white border-2 border-gray-100 hover:border-blue-400 rounded-3xl p-8 text-left shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-5xl mb-4">👴</div>
              <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">I'm looking for a companion</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">Find someone who genuinely cares — a safe, vetted companion matched to your personality and interests.</p>
              <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                <span className="text-blue-500 text-lg">→</span>
              </div>
            </button>

            <button
              onClick={() => selectRole("companion")}
              className="group relative bg-white border-2 border-gray-100 hover:border-violet-400 rounded-3xl p-8 text-left shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-slate-800 group-hover:text-violet-600 transition-colors">I want to be a companion</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">Build a meaningful bond with an elder in Miami and earn an honest income doing something that matters.</p>
              <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-violet-50 group-hover:bg-violet-100 flex items-center justify-center transition-colors">
                <span className="text-violet-500 text-lg">→</span>
              </div>
            </button>
          </div>
          <button onClick={() => setStep("hero")} className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
            ← Back to home
          </button>
        </div>
      </div>
    );
  }

  // Hero
  return (
    <div className="overflow-x-hidden">
      {/* Hero — compact banner so sections below are immediately visible */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-6 py-16 text-white overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center max-w-3xl mx-auto space-y-6">
          <div className="flex justify-center">
            <Image src="/logo.svg" alt="ALLY" width={120} height={120} priority className="drop-shadow-2xl" />
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/80">
              📍 Now serving Miami, FL
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
              Bridging generations,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                one connection at a time.
              </span>
            </h1>
            <p className="text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
              ALLY brings Miami's elders and young adults together — genuine friendships rooted in trust, shared interests, and mutual respect.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setStep("roleSelection")}
              className="px-8 py-3.5 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-2xl shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all duration-200 text-base"
            >
              Sign up — it's free
            </button>
            <Link
              href="/login"
              className="px-8 py-3.5 border border-white/20 hover:bg-white/10 text-white font-semibold rounded-2xl transition-colors text-base"
            >
              Log in
            </Link>
          </div>
        </div>
      </section>

      {/* For elders */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-5">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">For elders</span>
            <h2 className="text-3xl font-extrabold text-slate-800 leading-snug">Safe, meaningful companionship — on your terms.</h2>
            <p className="text-gray-500 leading-relaxed">
              Every ALLY companion is a vetted, verified university student who genuinely wants to be there. We match you based on your personality, interests, and schedule — so every visit feels natural, not forced.
            </p>
            <ul className="space-y-3 text-sm text-gray-600">
              {[
                "✅ All companions background-checked and verified",
                "✅ Matched by personality, interests & availability",
                "✅ You stay in full control — accept, skip, or change anytime",
                "✅ Chat before you meet — no surprises",
              ].map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="bg-blue-50 rounded-3xl p-8 flex items-center justify-center min-h-[200px]">
            <p className="text-sm text-gray-400 italic">Photo coming soon</p>
          </div>
        </div>
      </section>

      {/* For companions */}
      <section className="bg-slate-50 py-24 px-6 border-t">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="bg-violet-50 rounded-3xl p-8 flex items-center justify-center min-h-[200px] order-2 md:order-1">
            <p className="text-sm text-gray-400 italic">Photo coming soon</p>
          </div>
          <div className="space-y-5 order-1 md:order-2">
            <span className="text-xs font-bold text-violet-500 uppercase tracking-widest">For companions</span>
            <h2 className="text-3xl font-extrabold text-slate-800 leading-snug">Earn honestly. Grow as a person.</h2>
            <p className="text-gray-500 leading-relaxed">
              Being an ALLY companion is more than a gig. You're building a real relationship with someone who will value your presence and teach you things no classroom can. Flexible hours, meaningful work, honest pay.
            </p>
            <ul className="space-y-3 text-sm text-gray-600">
              {[
                "💜 Flexible scheduling around your classes",
                "💜 Matched to elders who share your interests",
                "💜 Honest, reliable earnings for your time",
                "💜 Experience that shapes your character",
              ].map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-24 px-6 border-t">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-800">How ALLY works</h2>
            <p className="text-gray-500 mt-3">Simple. Personal. Meaningful.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            {[
              { icon: "📋", step: "1", title: "Create your profile", desc: "Tell us about your interests, personality, and availability. It takes under 5 minutes." },
              { icon: "🤝", step: "2", title: "Get matched", desc: "Our algorithm finds your best fits based on shared interests, personality, and schedule." },
              { icon: "💬", step: "3", title: "Connect & grow", desc: "Chat first, then meet in person. ALLY is more than a platform — it's a movement closing the gap between generations and rebuilding the human connections our society needs most." },
            ].map((item) => (
              <div key={item.step} className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl shadow-sm">
                  {item.icon}
                </div>
                <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Step {item.step}</span>
                <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-violet-600 py-20 px-6 text-white text-center">
        <div className="max-w-xl mx-auto space-y-6">
          <h2 className="text-3xl font-extrabold">Ready to find your ALLY in Miami?</h2>
          <p className="text-white/80">Join a community built on trust, care, and genuine human connection.</p>
          <button
            onClick={() => setStep("roleSelection")}
            className="px-10 py-4 bg-white text-blue-700 font-bold rounded-2xl shadow-lg hover:scale-105 transition-transform text-lg"
          >
            Join ALLY today
          </button>
        </div>
      </section>
    </div>
  );
}
