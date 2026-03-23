"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ArrowLeft, Bookmark, Search, Trash2, ExternalLink, Bell, BellOff, Mail } from "lucide-react";
import { properties } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";
import { useFavorites } from "@/hooks/useFavorites";
import {
  useSavedSearches,
  buildFilterSummary,
  buildSearchUrl,
  type AlertFrequency,
} from "@/hooks/useSavedSearches";
import { cn } from "@/lib/utils";

type Tab = "properties" | "searches";

export default function FavoritesClient() {
  const { getAll, count } = useFavorites();
  const { searches, remove: removeSearch, updateAlert, count: searchCount } = useSavedSearches();
  const [activeTab, setActiveTab] = useState<Tab>("properties");
  const [editingAlertId, setEditingAlertId] = useState<string | null>(null);
  const [alertEmail, setAlertEmail] = useState("");

  const favoriteIds = getAll();
  const favoriteProperties = properties.filter((p) =>
    favoriteIds.includes(p.id),
  );

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/properties"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Properties
          </Link>
          <h1 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
            Saved Items
          </h1>
          <p className="mt-2 text-muted-foreground">
            Your saved properties and searches, stored locally on this device.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-1 rounded-lg border border-border bg-card p-1">
          <button
            onClick={() => setActiveTab("properties")}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors",
              activeTab === "properties"
                ? "bg-gold text-near-black"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Heart className="h-4 w-4" />
            Properties{count > 0 && ` (${count})`}
          </button>
          <button
            onClick={() => setActiveTab("searches")}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors",
              activeTab === "searches"
                ? "bg-gold text-near-black"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Bookmark className="h-4 w-4" />
            Saved Searches{searchCount > 0 && ` (${searchCount})`}
          </button>
        </div>

        {/* Properties Tab */}
        {activeTab === "properties" && (
          <>
            {favoriteProperties.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {favoriteProperties.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-20 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                  <Heart className="h-8 w-8 text-gold" />
                </div>
                <h2 className="mt-6 font-heading text-xl font-bold">
                  No Saved Properties Yet
                </h2>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  Tap the heart icon on any property to save it here for later.
                  Your favorites are stored locally on this device.
                </p>
                <Link
                  href="/properties"
                  className="mt-6 inline-flex items-center rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light"
                >
                  Browse Properties
                </Link>
              </div>
            )}
          </>
        )}

        {/* Saved Searches Tab */}
        {activeTab === "searches" && (
          <>
            {searches.length > 0 ? (
              <div className="space-y-3">
                {searches.map((search) => {
                  const isEditing = editingAlertId === search.id;
                  const hasAlert = search.alertFrequency && search.alertFrequency !== "none";

                  return (
                    <div
                      key={search.id}
                      className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-gold/30 sm:p-5"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <Search className="h-4 w-4 shrink-0 text-gold" />
                            <h3 className="truncate font-medium text-foreground">
                              {search.name}
                            </h3>
                            {hasAlert && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-gold/10 px-2 py-0.5 text-xs font-medium text-gold">
                                <Bell className="h-3 w-3" />
                                {search.alertFrequency}
                              </span>
                            )}
                          </div>
                          <p className="mt-1 truncate text-sm text-muted-foreground">
                            {buildFilterSummary(search.filters)}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground/60">
                            Saved {new Date(search.createdAt).toLocaleDateString()}
                            {search.alertEmail && (
                              <> &middot; Alerts to {search.alertEmail}</>
                            )}
                          </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingAlertId(isEditing ? null : search.id);
                              setAlertEmail(search.alertEmail || "");
                            }}
                            className={cn(
                              "rounded-lg border p-2 transition-colors",
                              hasAlert
                                ? "border-gold/40 text-gold hover:border-gold"
                                : "border-border text-muted-foreground hover:border-gold/30 hover:text-gold",
                            )}
                            aria-label="Set alert frequency"
                          >
                            {hasAlert ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
                          </button>
                          <Link
                            href={buildSearchUrl(search.filters)}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">View Results</span>
                          </Link>
                          <button
                            onClick={() => removeSearch(search.id)}
                            className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-red-300 hover:text-red-500"
                            aria-label="Remove saved search"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Alert Settings Panel */}
                      {isEditing && (
                        <div className="mt-4 rounded-lg border border-border/60 bg-cream/50 p-4">
                          <p className="mb-3 text-sm font-medium text-foreground">
                            Email Alert Frequency
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {(["none", "daily", "weekly"] as AlertFrequency[]).map(
                              (freq) => (
                                <button
                                  key={freq}
                                  onClick={() => {
                                    updateAlert(search.id, freq, alertEmail || search.alertEmail);
                                    if (freq === "none") setEditingAlertId(null);
                                  }}
                                  className={cn(
                                    "rounded-lg border px-4 py-2 text-sm font-medium capitalize transition-colors",
                                    (search.alertFrequency || "none") === freq
                                      ? "border-gold bg-gold text-near-black"
                                      : "border-border text-muted-foreground hover:border-gold/40 hover:text-foreground",
                                  )}
                                >
                                  {freq === "none" ? "Off" : freq}
                                </button>
                              ),
                            )}
                          </div>

                          {(search.alertFrequency === "daily" ||
                            search.alertFrequency === "weekly") && (
                            <div className="mt-3">
                              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                                Send alerts to
                              </label>
                              <div className="flex gap-2">
                                <div className="relative flex-1">
                                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                  <input
                                    type="email"
                                    value={alertEmail}
                                    onChange={(e) => setAlertEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full rounded-lg border border-border bg-white py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                                  />
                                </div>
                                <button
                                  onClick={() => {
                                    if (alertEmail) {
                                      updateAlert(search.id, search.alertFrequency || "daily", alertEmail);
                                      setEditingAlertId(null);
                                    }
                                  }}
                                  disabled={!alertEmail}
                                  className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light disabled:opacity-50"
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-20 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                  <Bookmark className="h-8 w-8 text-gold" />
                </div>
                <h2 className="mt-6 font-heading text-xl font-bold">
                  No Saved Searches Yet
                </h2>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  Apply filters on the properties page and tap &ldquo;Save This Search&rdquo;
                  to quickly revisit your favorite filter combinations.
                </p>
                <Link
                  href="/properties"
                  className="mt-6 inline-flex items-center rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light"
                >
                  Browse Properties
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
