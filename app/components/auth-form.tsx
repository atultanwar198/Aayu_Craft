"use client";

import Link from "next/link";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMarketplaceStore } from "@/app/stores/useMarketplaceStore";

const authSchema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(8, "Use at least 8 characters."),
  role: z.enum(["customer", "artisan", "admin"]),
});

type AuthFields = z.infer<typeof authSchema>;

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const setCurrentUser = useMarketplaceStore((state) => state.setCurrentUser);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFields>({
    defaultValues: { name: "", email: "", password: "", role: "customer" },
  });

  const submit = (values: AuthFields) => {
    setError("");
    const parsed = authSchema.safeParse({
      ...values,
      name: values.name.trim() || values.email.split("@")[0],
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check the form fields.");
      return;
    }
    const displayName = parsed.data.name || parsed.data.email.split("@")[0];
    setCurrentUser({
      name: displayName,
      email: parsed.data.email,
      role: parsed.data.role,
    });
    router.push(`/${parsed.data.role}/dashboard`);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="mt-8 space-y-5">
      {mode === "register" && (
        <label className="block text-sm font-medium">
          Name
          <input
            {...register("name")}
            className="mt-2 w-full rounded-2xl border border-[var(--color-border)] bg-[#F9F7F3] px-4 py-3 outline-none"
            placeholder="Your name"
          />
          {errors.name && (
            <span className="mt-1 block text-xs text-red-700">
              {errors.name.message}
            </span>
          )}
        </label>
      )}
      <label className="block text-sm font-medium">
        Email
        <input
          type="email"
          {...register("email")}
          className="mt-2 w-full rounded-2xl border border-[var(--color-border)] bg-[#F9F7F3] px-4 py-3 outline-none"
          placeholder="you@example.com"
        />
        {errors.email && (
          <span className="mt-1 block text-xs text-red-700">
            {errors.email.message}
          </span>
        )}
      </label>
      <label className="block text-sm font-medium">
        Password
        <input
          type="password"
          {...register("password")}
          className="mt-2 w-full rounded-2xl border border-[var(--color-border)] bg-[#F9F7F3] px-4 py-3 outline-none"
          placeholder="At least 8 characters"
        />
        {errors.password && (
          <span className="mt-1 block text-xs text-red-700">
            {errors.password.message}
          </span>
        )}
      </label>
      <label className="block text-sm font-medium">
        Demo role
        <select
          {...register("role")}
          className="mt-2 w-full rounded-2xl border border-[var(--color-border)] bg-[#F9F7F3] px-4 py-3 outline-none"
        >
          <option value="customer">Customer</option>
          <option value="artisan">Artisan</option>
          <option value="admin">Admin</option>
        </select>
      </label>
      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}
      <button type="submit" className="btn-primary w-full">
        {mode === "login" ? "Login to demo" : "Create demo account"}
      </button>
      <p className="text-center text-xs leading-5 text-[var(--color-text)]/60">
        Demo mode only: account details stay in this browser and are not sent to
        a server.
      </p>
      <p className="text-center text-sm text-[var(--color-text)]/70">
        {mode === "login"
          ? "Don't have an account?"
          : "Already have an account?"}{" "}
        <Link
          href={mode === "login" ? "/register" : "/login"}
          className="font-semibold text-[var(--color-primary)]"
        >
          {mode === "login" ? "Register" : "Login"}
        </Link>
      </p>
    </form>
  );
}
