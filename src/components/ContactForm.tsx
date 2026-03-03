"use client";

import { useState } from "react";

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
      setMessage("Your message was sent. We’ll be in touch.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Could not send. Please check your connection and try again.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-xl space-y-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-sm"
    >
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-[var(--foreground)]">
          Full name *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Your name"
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-[var(--foreground)]">
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
      </div>
      <div>
        <label htmlFor="state" className="mb-1 block text-sm font-medium text-[var(--foreground)]">
          State (USA) *
        </label>
        <input
          id="state"
          name="state"
          type="text"
          required
          placeholder="e.g. California, Texas"
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
      </div>
      <div>
        <label htmlFor="category" className="mb-1 block text-sm font-medium text-[var(--foreground)]">
          What kind of support are you seeking? *
        </label>
        <select
          id="category"
          name="category"
          required
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        >
          <option value="">Select one</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="story" className="mb-1 block text-sm font-medium text-[var(--foreground)]">
          Tell us about your situation (optional but helpful)
        </label>
        <textarea
          id="story"
          name="story"
          rows={4}
          placeholder="A brief description of how funding or support could help you or your community."
          className="w-full resize-y rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
      </div>

      {message && (
        <p
          className={
            status === "success"
              ? "text-sm text-[var(--trust)]"
              : "text-sm text-red-600"
          }
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-xl bg-[var(--accent)] px-6 py-4 font-semibold text-white transition hover:bg-[var(--accent-hover)] disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Submit — Reach out for support"}
      </button>
    </form>
  );
}
