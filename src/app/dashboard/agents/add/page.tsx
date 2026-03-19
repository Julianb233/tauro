"use client";

import { useState, useRef } from "react";
import { Upload, UserPlus, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AddAgentPage() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-[#141425] px-3 py-2.5 text-sm text-off-white placeholder:text-off-white/30 focus-visible:border-gold/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/30 transition-colors";

  const labelClass =
    "mb-1.5 block text-xs font-medium uppercase tracking-wider text-off-white/40";

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/agents/add", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Failed to add agent");
      }

      setSuccess(json.message || "Agent added successfully");
      form.reset();
      setPhotoPreview(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/agents"
          className="rounded-lg p-2 text-off-white/40 hover:bg-white/5 hover:text-off-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-off-white">Add New Agent</h1>
          <p className="mt-1 text-sm text-off-white/50">
            Fill in the details below to add a new team member
          </p>
        </div>
      </div>

      {/* Success banner */}
      {success && (
        <div className="flex items-center gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
          <CheckCircle className="h-5 w-5 shrink-0" />
          {success}
        </div>
      )}

      {/* Error banner */}
      {error && (
        <div className="flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <AlertCircle className="h-5 w-5 shrink-0" />
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-auto text-red-400/60 hover:text-red-400 text-xs"
          >
            dismiss
          </button>
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="rounded-xl border border-white/10 bg-[#1E1E32] p-6 space-y-8"
      >
        {/* Photo upload */}
        <div className="flex items-start gap-6">
          <div
            onClick={() => fileRef.current?.click()}
            className="group relative flex h-28 w-28 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-white/10 bg-[#141425] hover:border-gold/40 transition-colors"
          >
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-1 text-off-white/30 group-hover:text-gold/60 transition-colors">
                <Upload className="h-6 w-6" />
                <span className="text-[10px] uppercase tracking-wider">Photo</span>
              </div>
            )}
          </div>
          <div className="pt-2">
            <p className="text-sm font-medium text-off-white">Agent Photo</p>
            <p className="mt-1 text-xs text-off-white/40">
              JPG or PNG, max 5 MB. Will be saved as a square headshot.
            </p>
            <input
              ref={fileRef}
              type="file"
              name="photo"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="mt-2 rounded-md border border-white/10 px-3 py-1.5 text-xs text-off-white/60 hover:bg-white/5 transition-colors"
            >
              Choose File
            </button>
          </div>
        </div>

        {/* Personal info */}
        <fieldset>
          <legend className="mb-4 border-b border-white/5 pb-2 text-sm font-semibold text-gold">
            Personal Information
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className={labelClass}>
                First Name *
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                placeholder="Tony"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="lastName" className={labelClass}>
                Last Name *
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                placeholder="Goodman"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="title" className={labelClass}>
                Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                placeholder="Licensed Realtor"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="role" className={labelClass}>
                Role *
              </label>
              <select
                id="role"
                name="role"
                required
                className={inputClass}
              >
                <option value="agent">Agent</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </fieldset>

        {/* Contact */}
        <fieldset>
          <legend className="mb-4 border-b border-white/5 pb-2 text-sm font-semibold text-gold">
            Contact Details
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className={labelClass}>
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="agent@exitbenchmark.com"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="(215) 555-0100"
                className={inputClass}
              />
            </div>
          </div>
        </fieldset>

        {/* Professional info */}
        <fieldset>
          <legend className="mb-4 border-b border-white/5 pb-2 text-sm font-semibold text-gold">
            Professional Details
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="licenseNumber" className={labelClass}>
                License Number
              </label>
              <input
                id="licenseNumber"
                name="licenseNumber"
                type="text"
                placeholder="RS-123456"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="specialties" className={labelClass}>
                Specialties (comma-separated)
              </label>
              <input
                id="specialties"
                name="specialties"
                type="text"
                placeholder="Residential Sales, Investment Properties"
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="neighborhoods" className={labelClass}>
                Neighborhoods (comma-separated)
              </label>
              <input
                id="neighborhoods"
                name="neighborhoods"
                type="text"
                placeholder="North Philadelphia, Germantown, Fishtown"
                className={inputClass}
              />
            </div>
          </div>
        </fieldset>

        {/* Bio */}
        <fieldset>
          <legend className="mb-4 border-b border-white/5 pb-2 text-sm font-semibold text-gold">
            Biography
          </legend>
          <div className="space-y-4">
            <div>
              <label htmlFor="shortBio" className={labelClass}>
                Short Bio
              </label>
              <input
                id="shortBio"
                name="shortBio"
                type="text"
                placeholder="One-line summary for cards and previews"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="bio" className={labelClass}>
                Full Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={5}
                placeholder="Detailed biography for the agent's profile page..."
                className={inputClass + " resize-none"}
              />
            </div>
          </div>
        </fieldset>

        {/* Social & Password */}
        <fieldset>
          <legend className="mb-4 border-b border-white/5 pb-2 text-sm font-semibold text-gold">
            Social Media & Account
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="instagram" className={labelClass}>
                Instagram URL
              </label>
              <input
                id="instagram"
                name="instagram"
                type="url"
                placeholder="https://instagram.com/username"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="linkedin" className={labelClass}>
                LinkedIn URL
              </label>
              <input
                id="linkedin"
                name="linkedin"
                type="url"
                placeholder="https://linkedin.com/in/username"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="facebook" className={labelClass}>
                Facebook URL
              </label>
              <input
                id="facebook"
                name="facebook"
                type="url"
                placeholder="https://facebook.com/username"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="password" className={labelClass}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Initial login password"
                className={inputClass}
              />
            </div>
          </div>
        </fieldset>

        {/* Submit */}
        <div className="flex items-center gap-4 border-t border-white/5 pt-6">
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-near-black hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <UserPlus className="h-4 w-4" />
            {submitting ? "Adding Agent..." : "Add Agent"}
          </button>
          <Link
            href="/dashboard/agents"
            className="rounded-lg border border-white/10 px-5 py-2.5 text-sm text-off-white/60 hover:bg-white/5 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
