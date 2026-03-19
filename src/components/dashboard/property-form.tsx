"use client";

import { useState, useCallback, type FormEvent, type KeyboardEvent } from "react";
import type { PropertyRow } from "@/types/database";
import { ImageUpload } from "@/components/ImageUpload";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const PROPERTY_TYPES = [
  "Single Family",
  "Condo",
  "Townhouse",
  "Multi-Family",
  "Land",
] as const;

const STATUS_OPTIONS = ["Active", "Pending", "Sold", "Open House", "New"] as const;

interface AgentOption {
  id: string;
  full_name: string;
}

interface PropertyFormProps {
  property?: PropertyRow;
  agents: AgentOption[];
  onSubmit: () => void;
  onCancel: () => void;
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* Tag input sub-component */
function TagInput({
  label,
  tags,
  onChange,
}: {
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
}) {
  const [inputValue, setInputValue] = useState("");

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setInputValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-off-white/70">
        {label}
      </label>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type and press Enter to add"
        className="w-full rounded-lg border border-white/10 bg-[#111111] px-3 py-2 text-sm text-off-white placeholder:text-off-white/30 focus:border-gold/50 focus:outline-none"
      />
      {tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-medium text-gold"
            >
              {tag}
              <button
                type="button"
                onClick={() => onChange(tags.filter((t) => t !== tag))}
                className="text-gold/60 hover:text-gold"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* Main form */
export function PropertyForm({
  property,
  agents,
  onSubmit,
  onCancel,
}: PropertyFormProps) {
  const isEdit = !!property;

  const [address, setAddress] = useState(property?.address ?? "");
  const [city, setCity] = useState(property?.city ?? "Philadelphia");
  const [state, setState] = useState(property?.state ?? "PA");
  const [zip, setZip] = useState(property?.zip ?? "");
  const [neighborhood, setNeighborhood] = useState(property?.neighborhood ?? "");
  const [slug, setSlug] = useState(property?.slug ?? "");

  const [price, setPrice] = useState(property?.price?.toString() ?? "");
  const [beds, setBeds] = useState(property?.beds?.toString() ?? "");
  const [baths, setBaths] = useState(property?.baths?.toString() ?? "");
  const [sqft, setSqft] = useState(property?.sqft?.toString() ?? "");
  const [lotSqft, setLotSqft] = useState(property?.lot_sqft?.toString() ?? "0");
  const [yearBuilt, setYearBuilt] = useState(property?.year_built?.toString() ?? "");
  const [propertyType, setPropertyType] = useState(property?.property_type ?? "Single Family");
  const [status, setStatus] = useState(property?.status ?? "Active");

  const [description, setDescription] = useState(property?.description ?? "");
  const [featuresInterior, setFeaturesInterior] = useState<string[]>(property?.features_interior ?? []);
  const [featuresExterior, setFeaturesExterior] = useState<string[]>(property?.features_exterior ?? []);
  const [featuresCommunity, setFeaturesCommunity] = useState<string[]>(property?.features_community ?? []);

  const [images, setImages] = useState<string[]>(property?.images ?? []);
  const [videoUrl, setVideoUrl] = useState(property?.video_url ?? "");
  const [virtualTourUrl, setVirtualTourUrl] = useState(property?.virtual_tour_url ?? "");

  const [listingAgentId, setListingAgentId] = useState(property?.listing_agent_id ?? "");
  const [lat, setLat] = useState(property?.lat?.toString() ?? "");
  const [lng, setLng] = useState(property?.lng?.toString() ?? "");
  const [openHouse, setOpenHouse] = useState(property?.open_house ?? "");
  const [featured, setFeatured] = useState(property?.featured ?? false);

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddressChange = (val: string) => {
    setAddress(val);
    if (!isEdit) {
      setSlug(slugify(val));
    }
  };

  const handleImageUpload = useCallback((url: string) => {
    setImages((prev) => [...prev, url]);
  }, []);

  const removeImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!address.trim()) errs.address = "Address is required";
    if (!zip.trim() || zip.length < 5) errs.zip = "Valid ZIP is required";
    if (!neighborhood.trim()) errs.neighborhood = "Neighborhood is required";
    if (!slug.trim()) errs.slug = "Slug is required";
    if (!price || Number(price) <= 0) errs.price = "Price must be positive";
    if (!beds) errs.beds = "Beds is required";
    if (!baths) errs.baths = "Baths is required";
    if (!sqft || Number(sqft) <= 0) errs.sqft = "Sqft must be positive";
    if (!description.trim() || description.trim().length < 10)
      errs.description = "Description must be at least 10 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    const body: Record<string, unknown> = {
      slug,
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      zip: zip.trim(),
      neighborhood: neighborhood.trim(),
      price: Number(price),
      beds: Number(beds),
      baths: Number(baths),
      sqft: Number(sqft),
      lot_sqft: Number(lotSqft) || 0,
      status,
      property_type: propertyType,
      images,
      description: description.trim(),
      features_interior: featuresInterior,
      features_exterior: featuresExterior,
      features_community: featuresCommunity,
      featured,
    };

    if (yearBuilt) body.year_built = Number(yearBuilt);
    if (listingAgentId) body.listing_agent_id = listingAgentId;
    if (lat) body.lat = Number(lat);
    if (lng) body.lng = Number(lng);
    if (openHouse) body.open_house = openHouse;
    if (videoUrl) body.video_url = videoUrl;
    if (virtualTourUrl) body.virtual_tour_url = virtualTourUrl;

    try {
      const url = isEdit
        ? `/api/properties/${property.slug}`
        : "/api/properties";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrors({ form: data.error || "Something went wrong" });
        setSubmitting(false);
        return;
      }

      onSubmit();
    } catch {
      setErrors({ form: "Network error. Please try again." });
      setSubmitting(false);
    }
  };

  const inputClasses =
    "w-full rounded-lg border border-white/10 bg-[#111111] px-3 py-2 text-sm text-off-white placeholder:text-off-white/30 focus:border-gold/50 focus:outline-none";
  const labelClasses = "mb-1.5 block text-xs font-medium text-off-white/70";
  const errorClasses = "mt-1 text-xs text-red-400";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl font-semibold text-off-white">
          {isEdit ? "Edit Property" : "Add New Property"}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-off-white/50 hover:text-off-white transition-colors"
        >
          Cancel
        </button>
      </div>

      {errors.form && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {errors.form}
        </div>
      )}

      {/* Section 1: Basic Info */}
      <section className="space-y-4 rounded-xl border border-white/10 bg-[#1E1E32] p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
          Basic Info
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClasses}>Address *</label>
            <input type="text" value={address} onChange={(e) => handleAddressChange(e.target.value)} className={inputClasses} placeholder="123 Main St" />
            {errors.address && <p className={errorClasses}>{errors.address}</p>}
          </div>
          <div>
            <label className={labelClasses}>City</label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className={inputClasses} />
          </div>
          <div>
            <label className={labelClasses}>State</label>
            <input type="text" value={state} onChange={(e) => setState(e.target.value)} className={inputClasses} />
          </div>
          <div>
            <label className={labelClasses}>ZIP *</label>
            <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} className={inputClasses} placeholder="19103" />
            {errors.zip && <p className={errorClasses}>{errors.zip}</p>}
          </div>
          <div>
            <label className={labelClasses}>Neighborhood *</label>
            <input type="text" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} className={inputClasses} placeholder="Rittenhouse Square" />
            {errors.neighborhood && <p className={errorClasses}>{errors.neighborhood}</p>}
          </div>
          <div className="sm:col-span-2">
            <label className={labelClasses}>Slug *</label>
            <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className={inputClasses} placeholder="123-main-st" />
            {errors.slug && <p className={errorClasses}>{errors.slug}</p>}
          </div>
        </div>
      </section>

      {/* Section 2: Details */}
      <section className="space-y-4 rounded-xl border border-white/10 bg-[#1E1E32] p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">Details</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className={labelClasses}>Price *</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className={inputClasses} placeholder="450000" min="0" />
            {errors.price && <p className={errorClasses}>{errors.price}</p>}
          </div>
          <div>
            <label className={labelClasses}>Beds *</label>
            <input type="number" value={beds} onChange={(e) => setBeds(e.target.value)} className={inputClasses} min="0" />
            {errors.beds && <p className={errorClasses}>{errors.beds}</p>}
          </div>
          <div>
            <label className={labelClasses}>Baths *</label>
            <input type="number" value={baths} onChange={(e) => setBaths(e.target.value)} className={inputClasses} min="0" step="0.5" />
            {errors.baths && <p className={errorClasses}>{errors.baths}</p>}
          </div>
          <div>
            <label className={labelClasses}>Sqft *</label>
            <input type="number" value={sqft} onChange={(e) => setSqft(e.target.value)} className={inputClasses} min="0" />
            {errors.sqft && <p className={errorClasses}>{errors.sqft}</p>}
          </div>
          <div>
            <label className={labelClasses}>Lot Sqft</label>
            <input type="number" value={lotSqft} onChange={(e) => setLotSqft(e.target.value)} className={inputClasses} min="0" />
          </div>
          <div>
            <label className={labelClasses}>Year Built</label>
            <input type="number" value={yearBuilt} onChange={(e) => setYearBuilt(e.target.value)} className={inputClasses} placeholder="1920" />
          </div>
          <div>
            <label className={labelClasses}>Property Type</label>
            <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className={inputClasses}>
              {PROPERTY_TYPES.map((t) => (<option key={t} value={t}>{t}</option>))}
            </select>
          </div>
          <div>
            <label className={labelClasses}>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputClasses}>
              {STATUS_OPTIONS.map((s) => (<option key={s} value={s}>{s}</option>))}
            </select>
          </div>
        </div>
      </section>

      {/* Section 3: Description & Features */}
      <section className="space-y-4 rounded-xl border border-white/10 bg-[#1E1E32] p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">Description & Features</h3>
        <div>
          <label className={labelClasses}>Description *</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className={cn(inputClasses, "resize-y")} placeholder="Describe the property..." />
          {errors.description && <p className={errorClasses}>{errors.description}</p>}
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <TagInput label="Interior Features" tags={featuresInterior} onChange={setFeaturesInterior} />
          <TagInput label="Exterior Features" tags={featuresExterior} onChange={setFeaturesExterior} />
          <TagInput label="Community Features" tags={featuresCommunity} onChange={setFeaturesCommunity} />
        </div>
      </section>

      {/* Section 4: Media */}
      <section className="space-y-4 rounded-xl border border-white/10 bg-[#1E1E32] p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">Media</h3>
        <ImageUpload bucket="property-images" onUpload={handleImageUpload} multiple label="Upload property photos" />
        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {images.map((url, idx) => (
              <div key={url} className="group relative">
                <img src={url} alt={`Property image ${idx + 1}`} className="h-20 w-full rounded-md object-cover" />
                <button type="button" onClick={() => removeImage(idx)} className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClasses}>Video URL</label>
            <input type="url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} className={inputClasses} placeholder="https://youtube.com/..." />
          </div>
          <div>
            <label className={labelClasses}>Virtual Tour URL</label>
            <input type="url" value={virtualTourUrl} onChange={(e) => setVirtualTourUrl(e.target.value)} className={inputClasses} placeholder="https://matterport.com/..." />
          </div>
        </div>
      </section>

      {/* Section 5: Listing Info */}
      <section className="space-y-4 rounded-xl border border-white/10 bg-[#1E1E32] p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">Listing Info</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className={labelClasses}>Listing Agent</label>
            <select value={listingAgentId} onChange={(e) => setListingAgentId(e.target.value)} className={inputClasses}>
              <option value="">-- None --</option>
              {agents.map((a) => (<option key={a.id} value={a.id}>{a.full_name}</option>))}
            </select>
          </div>
          <div>
            <label className={labelClasses}>Latitude</label>
            <input type="number" value={lat} onChange={(e) => setLat(e.target.value)} className={inputClasses} step="any" placeholder="39.9526" />
          </div>
          <div>
            <label className={labelClasses}>Longitude</label>
            <input type="number" value={lng} onChange={(e) => setLng(e.target.value)} className={inputClasses} step="any" placeholder="-75.1652" />
          </div>
          <div>
            <label className={labelClasses}>Open House</label>
            <input type="text" value={openHouse} onChange={(e) => setOpenHouse(e.target.value)} className={inputClasses} placeholder="Sat & Sun 1-3 PM" />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="h-4 w-4 rounded border-white/20 bg-[#111111] accent-gold" />
              <span className="text-sm text-off-white/70">Featured Property</span>
            </label>
          </div>
        </div>
      </section>

      {/* Submit */}
      <div className="flex items-center gap-3">
        <button type="submit" disabled={submitting} className="gold-shimmer inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-near-black transition-opacity hover:opacity-90 disabled:opacity-50">
          {submitting ? "Saving..." : isEdit ? "Save Changes" : "Create Property"}
        </button>
        <button type="button" onClick={onCancel} className="rounded-lg border border-white/10 px-6 py-2.5 text-sm font-medium text-off-white/60 transition-colors hover:bg-white/5 hover:text-off-white">
          Cancel
        </button>
      </div>
    </form>
  );
}
