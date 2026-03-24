import fs from "fs";
import path from "path";

const AGENTS_FILE = path.join(process.cwd(), "src/data/agents.ts");

export interface NewAgentInput {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  photo: string;
  bio: string;
  shortBio: string;
  specialties: string[];
  neighborhoods: string[];
  licenseNumber: string;
  social: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
  };
}

/**
 * Reads the agents.ts file, extracts the agents array, adds a new agent,
 * and writes the file back while preserving the TypeScript interfaces and
 * helper functions.
 */
export async function addAgentToFile(input: NewAgentInput): Promise<{
  slug: string;
  id: string;
}> {
  const fileContent = fs.readFileSync(AGENTS_FILE, "utf-8");

  // Find the highest existing ID
  const idMatches = fileContent.matchAll(/id:\s*"(\d+)"/g);
  let maxId = 0;
  for (const m of idMatches) {
    const num = parseInt(m[1], 10);
    if (num > maxId) maxId = num;
  }
  const newId = String(maxId + 1);

  const slug = `${input.firstName}-${input.lastName}`
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");

  const fullName = `${input.firstName} ${input.lastName}`;

  // Build the social object string
  const socialParts: string[] = [];
  if (input.social.instagram) {
    socialParts.push(`      instagram: ${JSON.stringify(input.social.instagram)},`);
  }
  if (input.social.linkedin) {
    socialParts.push(`      linkedin: ${JSON.stringify(input.social.linkedin)},`);
  }
  if (input.social.facebook) {
    socialParts.push(`      facebook: ${JSON.stringify(input.social.facebook)},`);
  }

  const socialStr = socialParts.length > 0
    ? `{\n${socialParts.join("\n")}\n    }`
    : "{}";

  const specialtiesStr = JSON.stringify(input.specialties);
  const neighborhoodsStr = JSON.stringify(input.neighborhoods);

  const agentEntry = `  {
    id: ${JSON.stringify(newId)},
    slug: ${JSON.stringify(slug)},
    firstName: ${JSON.stringify(input.firstName)},
    lastName: ${JSON.stringify(input.lastName)},
    fullName: ${JSON.stringify(fullName)},
    title: ${JSON.stringify(input.title)},
    email: ${JSON.stringify(input.email)},
    phone: ${JSON.stringify(input.phone)},
    photo: ${JSON.stringify(input.photo)},
    bio: ${JSON.stringify(input.bio)},
    shortBio: ${JSON.stringify(input.shortBio)},
    specialties: ${specialtiesStr},
    neighborhoods: ${neighborhoodsStr},
    stats: {
      propertiesSold: 0,
      totalVolume: "$0",
      avgDaysOnMarket: 0,
      yearsExperience: 0,
    },
    certifications: [],
    awards: [],
    videoIntroUrl: null,
    videoIntroId: null,
    activeListingIds: [],
    soldListingIds: [],
    soldListings: [],
    social: ${socialStr},
    languages: ["English"],
    licenseNumber: ${JSON.stringify(input.licenseNumber)},
  }`;

  // Insert the new agent before the closing "];" of the agents array.
  // We find the last "];" that closes the array and insert before it.
  const closingBracketIndex = fileContent.lastIndexOf("];");

  if (closingBracketIndex === -1) {
    throw new Error("Could not find the agents array closing bracket in agents.ts");
  }

  // Check if there's a trailing comma situation -- look at what's before the bracket
  const beforeBracket = fileContent.substring(0, closingBracketIndex).trimEnd();
  const needsComma = !beforeBracket.endsWith(",");

  const newContent =
    beforeBracket +
    (needsComma ? "," : "") +
    "\n" +
    agentEntry +
    ",\n" +
    fileContent.substring(closingBracketIndex);

  fs.writeFileSync(AGENTS_FILE, newContent, "utf-8");

  return { slug, id: newId };
}
