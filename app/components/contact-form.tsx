"use client";

import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<{
    type: "sending" | "success" | "error";
    message: string;
  } | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setStatus({
        type: "error",
        message: "The contact form is not configured. Please try again later.",
      });
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", accessKey);
    setStatus({ type: "sending", message: "Sending your message..." });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data: unknown = await response.json();

      if (
        !response.ok ||
        typeof data !== "object" ||
        data === null ||
        !("success" in data) ||
        data.success !== true
      ) {
        setStatus({
          type: "error",
          message: "We couldn't send your message. Please try again.",
        });
        return;
      }

      setStatus({
        type: "success",
        message: "Thanks for reaching out. Your message has been sent.",
      });
      form.reset();
    } catch {
      setStatus({
        type: "error",
        message: "We couldn't send your message. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-2 block text-sm font-medium"
          >
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            required
            minLength={2}
            className="w-full rounded-2xl border border-[var(--color-border)] bg-[#F9F7F3] px-4 py-3 outline-none"
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="mb-2 block text-sm font-medium"
          >
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            className="w-full rounded-2xl border border-[var(--color-border)] bg-[#F9F7F3] px-4 py-3 outline-none"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="contact-subject"
          className="mb-2 block text-sm font-medium"
        >
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          required
          className="w-full rounded-2xl border border-[var(--color-border)] bg-[#F9F7F3] px-4 py-3 outline-none"
          placeholder="How can we help?"
        />
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="mb-2 block text-sm font-medium"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          className="min-h-36 w-full rounded-2xl border border-[var(--color-border)] bg-[#F9F7F3] px-4 py-3 outline-none"
          placeholder="Write your message here"
        />
      </div>
      {status && (
        <p
          role={status.type === "error" ? "alert" : "status"}
          className={`rounded-xl p-3 text-sm ${
            status.type === "error"
              ? "bg-red-50 text-red-700"
              : status.type === "success"
                ? "bg-[#E8EFE3] text-[#405638]"
                : "bg-[#F9F7F3] text-[var(--color-text)]"
          }`}
        >
          {status.message}
        </p>
      )}
      <button
        type="submit"
        className="btn-primary"
        disabled={status?.type === "sending"}
      >
        {status?.type === "sending" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
