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

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const body = {
      name: data.get("name"),
      email: data.get("email"),
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
    } catch {
      setStatus("error");
      setMessage("Could not send. Please check your connection and try again.");
    }
  }

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

      {/* State Field */}
      <div>
        <label htmlFor="state" className="mb-2 block text-sm font-semibold text-gray-700">
          State (USA) <span className="text-red-500">*</span>
        </label>
        <input
          id="state"
          name="state"
          type="text"
          required
          placeholder="e.g. California, Texas"
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
