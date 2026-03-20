/**
 * Form validation utilities (AI-3937)
 * Includes E.164 phone format validation.
 */

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Strip all non-digit characters (keeping leading +) */
export function stripPhone(phone: string): string {
  return phone.replace(/[^\d+]/g, "");
}

/**
 * Normalize a US phone number to E.164 format.
 * Accepts: (215) 839-4172, 215-839-4172, 2158394172, +12158394172
 * Returns: +12158394172 or null if invalid.
 */
export function toE164(phone: string): string | null {
  const stripped = phone.replace(/[\s\-().]/g, "");
  // Already E.164
  if (/^\+1\d{10}$/.test(stripped)) return stripped;
  // Has country code without +
  if (/^1\d{10}$/.test(stripped)) return `+${stripped}`;
  // 10-digit US number
  if (/^\d{10}$/.test(stripped)) return `+1${stripped}`;
  return null;
}

/**
 * Format phone for display: (215) 839-4172
 */
export function formatPhoneDisplay(phone: string): string {
  const e164 = toE164(phone);
  if (!e164) return phone;
  const digits = e164.slice(2); // remove +1
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export interface ValidationErrors {
  [field: string]: string;
}

export function validateContactForm(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.firstName || data.firstName.trim().length < 2) {
    errors.firstName = "First name must be at least 2 characters";
  }
  if (!data.lastName || data.lastName.trim().length < 2) {
    errors.lastName = "Last name must be at least 2 characters";
  }
  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }
  if (!data.phone || data.phone.trim().length < 7) {
    errors.phone = "Please enter a valid phone number";
  } else if (!toE164(data.phone)) {
    errors.phone = "Phone must be a valid US number (e.g., (215) 839-4172)";
  }

  return errors;
}

export function validateScheduleForm(data: {
  name: string;
  email: string;
  phone: string;
  preferredDate?: string;
  preferredTime?: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Please enter your name";
  }
  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }
  if (!data.phone || data.phone.trim().length < 7) {
    errors.phone = "Please enter a valid phone number";
  } else if (!toE164(data.phone)) {
    errors.phone = "Phone must be a valid US number (e.g., (215) 839-4172)";
  }
  if (data.preferredDate) {
    const date = new Date(data.preferredDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      errors.preferredDate = "Please select a future date";
    }
  }

  return errors;
}
