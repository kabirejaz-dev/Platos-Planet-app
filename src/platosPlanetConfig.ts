export interface PlatosPlanetConfigType {
  officialCompanyName: string;
  officialBranches: string[];
  officialAddress: string;
  officialPhone: string;
  officialEmail: string;
  officialCurriculums: string[];
  officialSubjects: string[];
  approvedClaims: {
    tagline: string;             // Replacing "UAE’s #1 tuition centre"
    tuitionCapacity: string;     // Replacing "100,000+ students"
    multiBranchClaims: string;   // Replacing "Multiple UAE branches"
    approvals: string;           // Replacing "KHDA approved"
    curriculumProof: string;
  };
  disclaimer: string;
}

export const defaultPlatosPlanetConfig: PlatosPlanetConfigType = {
  officialCompanyName: "Plato’s Planet",
  officialBranches: ["Main Branch", "Online Campus"],
  officialAddress: "Main Campus Building, Dubai, UAE",
  officialPhone: "+971 4 456 1234",
  officialEmail: "info@platosplanet.com",
  officialCurriculums: ["British IGCSE", "A-Level Stream", "CBSE National boards"],
  officialSubjects: ["Physics", "Chemistry", "Mathematics", "Biology", "English", "Business", "Accounting", "Computer Science"],
  approvedClaims: {
    tagline: "AI-powered tuition centre and learning platform",
    tuitionCapacity: "Built to scale for growing tuition centres",
    multiBranchClaims: "Supports multi-branch operations",
    approvals: "Designed to support education operations and reporting",
    curriculumProof: "Syllabus metrics aligned to respective benchmark guidelines"
  },
  disclaimer: "Platform features are inspired by common education management workflows. Plato’s Planet is not affiliated with third-party brands."
};

// Prohibited list for auditing display data
export const prohibitedWords = [
  "KHDA approved",
  "KHDA-approved",
  "UAE's #1",
  "UAE’s #1",
  "100,000+ students",
  "100,000+",
  "Multiple UAE branches",
  "Allen",
  "Aakash",
  "Byju",
  "Physics Wallah"
];

export interface ValidationIssue {
  id: string;
  type: string;
  field: string;
  message: string;
  severity: "warning" | "error";
  foundValue?: string;
}

/**
 * Audit displaying datasets or local components state for illegal claims, unverified branches and placeholders.
 */
export function validateDisplayData(data: Record<string, any>, currentConfig: PlatosPlanetConfigType): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // Convert object to string to sweep for bad substrings
  const dataString = JSON.stringify(data);

  // 1. Audit prohibited words
  prohibitedWords.forEach(word => {
    // Escape special characters for safe regex matching
    const escaped = word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(escaped, 'gi');
    if (regex.test(dataString)) {
      issues.push({
        id: `prohibited-${word.toLowerCase().replace(/\s+/g, '-')}`,
        type: "Prohibited Claim",
        field: "Global context sweep",
        message: `Found prohibited or unapproved claim: "${word}"`,
        severity: "error",
        foundValue: word
      });
    }
  });

  // 2. Audit branch values
  if (data.branch && typeof data.branch === "string") {
    const matched = currentConfig.officialBranches.some(b => b.toLowerCase().includes(data.branch.toLowerCase()) || data.branch.toLowerCase().includes(b.toLowerCase()));
    if (!matched) {
      issues.push({
        id: `invalid-branch-${data.branch.replace(/\s+/g, '-')}`,
        type: "Unapproved Branch",
        field: "branch",
        message: `"${data.branch}" is not listed in official approved branches.`,
        severity: "error",
        foundValue: data.branch
      });
    }
  }

  // 3. Audit contact details
  if (data.email && typeof data.email === "string" && data.email !== currentConfig.officialEmail) {
    issues.push({
      id: "unverified-email",
      type: "Contact Discrepancy",
      field: "email",
      message: `Email "${data.email}" does not match official contact registry "${currentConfig.officialEmail}".`,
      severity: "warning",
      foundValue: data.email
    });
  }

  if (data.phone && typeof data.phone === "string" && data.phone !== currentConfig.officialPhone) {
    issues.push({
      id: "unverified-phone",
      type: "Contact Discrepancy",
      field: "phone",
      message: `Phone number "${data.phone}" does not match official registered contact "${currentConfig.officialPhone}".`,
      severity: "warning",
      foundValue: data.phone
    });
  }

  return issues;
}

// Global hook/state manager helper to load/save configuration in localStorage
export function getStoredPlatosPlanetConfig(): PlatosPlanetConfigType {
  try {
    const raw = localStorage.getItem("platos_planet_official_config");
    if (raw) {
      const parsed = JSON.parse(raw);
      // Ensure essential fields exist
      if (parsed.officialCompanyName && parsed.officialBranches && parsed.approvedClaims) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("Failed to parse plato configuration", err);
  }
  return { ...defaultPlatosPlanetConfig };
}

export function savePlatosPlanetConfig(config: PlatosPlanetConfigType): void {
  try {
    localStorage.setItem("platos_planet_official_config", JSON.stringify(config));
    // Also trigger custom event to notify components
    window.dispatchEvent(new Event("platos_planet_config_updated"));
  } catch (err) {
    console.error("Failed to save plato configuration", err);
  }
}
