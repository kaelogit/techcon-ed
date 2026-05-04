"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const CATEGORIES = [
  "Education",
  "Housing",
  "Disaster / Fire Recovery",
  "Medical or Family Need",
  "Community or Nonprofit",
  "Other",
] as const;

// NEW: Country options for the contact form
const COUNTRIES = [
  { value: "USA", label: "United States" },
  { value: "Canada", label: "Canada" },
  { value: "UK", label: "United Kingdom" },
  { value: "Germany", label: "Germany" },
  { value: "France", label: "France" },
  { value: "Netherlands", label: "Netherlands" },
  { value: "Spain", label: "Spain" },
  { value: "Italy", label: "Italy" },
  { value: "Sweden", label: "Sweden" },
  { value: "Switzerland", label: "Switzerland" },
  { value: "Ireland", label: "Ireland" },
  { value: "Belgium", label: "Belgium" },
  { value: "Austria", label: "Austria" },
  { value: "Norway", label: "Norway" },
  { value: "Denmark", label: "Denmark" },
  { value: "Australia", label: "Australia" },
  { value: "New Zealand", label: "New Zealand" },
  { value: "Mexico", label: "Mexico" },
  { value: "Other", label: "Other — Not Listed" },
] as const;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  // NEW: Track selected country for dynamic labels
  const [selectedCountry, setSelectedCountry] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const body = {
      name: data.get("name"),
      email: data.get("email"),
      country: data.get("country"),
      state: data.get("state"),
      category: data.get("category"),
      story: data.get("story"),
    };

    setStatus("sending");
    setMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(json.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setMessage("Your message was sent. We'll be in touch.");
      form.reset();
      setSelectedCountry(""); // NEW: Reset country state
    } catch {
      setStatus("error");
      setMessage("Could not send. Please check your connection and try again.");
    }
  }

  // NEW: Dynamic label based on country
  const getRegionLabel = () => {
    if (selectedCountry === "Other") return "Country & Region";
    if (selectedCountry === "UK") return "Region / County";
    if (selectedCountry === "Germany") return "Bundesland";
    if (selectedCountry === "France") return "Department / Region";
    if (selectedCountry === "Netherlands") return "Province";
    if (selectedCountry === "Spain") return "Autonomous Community";
    if (selectedCountry === "Italy") return "Region";
    if (selectedCountry === "Sweden") return "County";
    if (selectedCountry === "Switzerland") return "Canton";
    if (selectedCountry === "Ireland") return "County";
    if (selectedCountry === "Belgium") return "Province";
    if (selectedCountry === "Austria") return "State";
    if (selectedCountry === "Norway") return "County";
    if (selectedCountry === "Denmark") return "Region";
    if (selectedCountry === "Canada") return "Province";
    if (selectedCountry === "Australia" || selectedCountry === "New Zealand") return "State / Territory";
    if (selectedCountry === "Mexico") return "State";
    return "State / Province";
  };

  // NEW: Dynamic placeholder based on country
  const getRegionPlaceholder = () => {
    if (selectedCountry === "Other") return "e.g. Brazil, São Paulo";
    if (selectedCountry === "UK") return "e.g. Greater London";
    if (selectedCountry === "Germany") return "e.g. Bavaria";
    if (selectedCountry === "France") return "e.g. Île-de-France";
    if (selectedCountry === "Netherlands") return "e.g. North Holland";
    if (selectedCountry === "Spain") return "e.g. Catalonia";
    if (selectedCountry === "Italy") return "e.g. Lombardy";
    if (selectedCountry === "Sweden") return "e.g. Stockholm County";
    if (selectedCountry === "Switzerland") return "e.g. Zurich";
    if (selectedCountry === "Ireland") return "e.g. County Dublin";
    if (selectedCountry === "Belgium") return "e.g. Flanders";
    if (selectedCountry === "Austria") return "e.g. Vienna";
    if (selectedCountry === "Norway") return "e.g. Oslo";
    if (selectedCountry === "Denmark") return "e.g. Capital Region";
    if (selectedCountry === "Canada") return "e.g. Ontario";
    if (selectedCountry === "Australia") return "e.g. New South Wales";
    if (selectedCountry === "New Zealand") return "e.g. Auckland";
    if (selectedCountry === "Mexico") return "e.g. Jalisco";
    return "e.g. California, Texas";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-xl space-y-6 rounded-3xl border border-gray-200 bg-white p-8 md:p-10 shadow-xl"
    >
      {/* Form Header */}
      <div className="text-center pb-6 border-b border-gray-100">
        <h3 className="font-serif text-2xl font-semibold text-gray-900 mb-2">
          Share Your Story
        </h3>
        <p className="text-sm text-gray-500">
          Every submission is read personally by our team
        </p>
      </div>

      {/* Name Field */}
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-700">
          Full name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Your full name"
          className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-5 py-4 text-gray-900 placeholder:text-gray-400 focus:border-[var(--accent-gold)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)]/20 transition-all"
        />
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-5 py-4 text-gray-900 placeholder:text-gray-400 focus:border-[var(--accent-gold)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)]/20 transition-all"
        />
      </div>

      {/* NEW: Country Field */}
      <div>
        <label htmlFor="country" className="mb-2 block text-sm font-semibold text-gray-700">
          Country <span className="text-red-500">*</span>
        </label>
        <select
          id="country"
          name="country"
          required
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-5 py-4 text-gray-900 focus:border-[var(--accent-gold)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)]/20 transition-all appearance-none cursor-pointer"
        >
          <option value="">Select your country</option>
          {COUNTRIES.map((country) => (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          ))}
        </select>
      </div>

      {/* UPDATED: State/Region Field — dynamic label & placeholder */}
      <div>
        <label htmlFor="state" className="mb-2 block text-sm font-semibold text-gray-700">
          {getRegionLabel()} <span className="text-red-500">*</span>
        </label>
        <input
          id="state"
          name="state"
          type="text"
          required
          placeholder={getRegionPlaceholder()}
          className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-5 py-4 text-gray-900 placeholder:text-gray-400 focus:border-[var(--accent-gold)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)]/20 transition-all"
        />
      </div>

      {/* Category Field */}
      <div>
        <label htmlFor="category" className="mb-2 block text-sm font-semibold text-gray-700">
          What kind of support are you seeking? <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          name="category"
          required
          className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-5 py-4 text-gray-900 focus:border-[var(--accent-gold)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)]/20 transition-all appearance-none cursor-pointer"
        >
          <option value="">Select a category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Story Field */}
      <div>
        <label htmlFor="story" className="mb-2 block text-sm font-semibold text-gray-700">
          Tell us about your situation
        </label>
        <textarea
          id="story"
          name="story"
          rows={5}
          placeholder="A brief description of how funding or support could help you or your community. Be honest and specific."
          className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50/50 px-5 py-4 text-gray-900 placeholder:text-gray-400 focus:border-[var(--accent-gold)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)]/20 transition-all"
        />
      </div>

      {/* Status Message */}
      {message && (
        <div className={`flex items-start gap-3 p-4 rounded-xl ${
          status === "success" 
            ? "bg-emerald-50 border border-emerald-100" 
            : "bg-red-50 border border-red-100"
        }`}>
          {status === "success" ? (
            <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          )}
          <p className={status === "success" ? "text-sm text-emerald-700" : "text-sm text-red-700"}>
            {message}
          </p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="group w-full rounded-2xl bg-[var(--trust)] px-6 py-5 font-semibold text-white transition-all hover:bg-[var(--trust-light)] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending your story...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            Submit — Reach out for support
          </>
        )}
      </button>

      {/* Privacy Note */}
      <p className="text-xs text-gray-400 text-center">
        Your information is kept strictly confidential. Read our{" "}
        <a href="/privacy" className="underline hover:text-[var(--accent-gold)] transition-colors">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}