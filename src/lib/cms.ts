import { asc, desc, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { achievements, siteContent } from "@/db/schema";

export type CmsFieldDefinition = {
  page: string;
  key: string;
  label: string;
  value: string;
  valueType: "text" | "textarea" | "image" | "url";
  groupName: string;
  sortOrder: number;
};

export const cmsDefaults: CmsFieldDefinition[] = [
  { page: "global", key: "brand.name", label: "Centre name", value: "DR. RUDRA WELLNESS CENTRE", valueType: "text", groupName: "Brand", sortOrder: 1 },
  { page: "global", key: "brand.shortName", label: "Short brand name", value: "Dr. Rudra", valueType: "text", groupName: "Brand", sortOrder: 2 },
  { page: "global", key: "brand.tagline", label: "Brand tagline", value: "Wellness Centre", valueType: "text", groupName: "Brand", sortOrder: 3 },
  { page: "global", key: "brand.logo", label: "Website logo", value: "/images/rudra-logo.svg", valueType: "image", groupName: "Brand", sortOrder: 4 },
  { page: "global", key: "contact.phone", label: "Phone number", value: "+1 (234) 567-890", valueType: "text", groupName: "Contact", sortOrder: 10 },
  { page: "global", key: "contact.email", label: "Email address", value: "care@drswathypriya.com", valueType: "text", groupName: "Contact", sortOrder: 11 },
  { page: "global", key: "contact.address", label: "Centre address", value: "123 Wellness Avenue, Medical District", valueType: "textarea", groupName: "Contact", sortOrder: 12 },
  { page: "global", key: "contact.whatsapp", label: "WhatsApp number", value: "+1234567890", valueType: "text", groupName: "Contact", sortOrder: 13 },
  { page: "home", key: "hero.eyebrow", label: "Opening availability label", value: "Compassionate care • Appointments available", valueType: "text", groupName: "Opening page", sortOrder: 20 },
  { page: "home", key: "hero.title", label: "Main opening title", value: "DR. SWATHY PRIYA", valueType: "text", groupName: "Opening page", sortOrder: 21 },
  { page: "home", key: "hero.accent", label: "Main opening title – second line", value: "WELLNESS CENTRE", valueType: "text", groupName: "Opening page", sortOrder: 22 },
  { page: "home", key: "hero.subtitle", label: "Opening description", value: "Whole-person healthcare delivered with clinical excellence, kindness and a genuine commitment to your family’s wellbeing.", valueType: "textarea", groupName: "Opening page", sortOrder: 23 },
  { page: "home", key: "hero.primaryCta", label: "Primary button text", value: "Book a consultation", valueType: "text", groupName: "Opening page", sortOrder: 24 },
  { page: "home", key: "hero.secondaryCta", label: "Secondary button text", value: "Meet Dr. Swathy Priya", valueType: "text", groupName: "Opening page", sortOrder: 25 },
  { page: "home", key: "hero.doctorImage", label: "Main doctor photo", value: "/images/doctor.jpg", valueType: "image", groupName: "Opening media", sortOrder: 30 },
  { page: "home", key: "hero.mascotImage", label: "Animated doctor doll", value: "/images/doctor.jpg", valueType: "image", groupName: "Opening media", sortOrder: 31 },
  { page: "home", key: "hero.photoLabel", label: "Doctor photo caption", value: "Dr. Swathy Priya MBBS", valueType: "text", groupName: "Opening media", sortOrder: 32 },
  { page: "home", key: "stats.experience.value", label: "Experience value", value: "20+", valueType: "text", groupName: "Opening statistics", sortOrder: 40 },
  { page: "home", key: "stats.experience.label", label: "Experience label", value: "Years of care", valueType: "text", groupName: "Opening statistics", sortOrder: 41 },
  { page: "home", key: "stats.patients.value", label: "Patient value", value: "50K+", valueType: "text", groupName: "Opening statistics", sortOrder: 42 },
  { page: "home", key: "stats.patients.label", label: "Patient label", value: "Happy patients", valueType: "text", groupName: "Opening statistics", sortOrder: 43 },
  { page: "home", key: "stats.success.value", label: "Success value", value: "99%", valueType: "text", groupName: "Opening statistics", sortOrder: 44 },
  { page: "home", key: "stats.success.label", label: "Success label", value: "Patient satisfaction", valueType: "text", groupName: "Opening statistics", sortOrder: 45 },
  { page: "home", key: "stats.access.value", label: "Access value", value: "24/7", valueType: "text", groupName: "Opening statistics", sortOrder: 46 },
  { page: "home", key: "stats.access.label", label: "Access label", value: "Care access", valueType: "text", groupName: "Opening statistics", sortOrder: 47 },
  { page: "home", key: "achievements.eyebrow", label: "Achievements label", value: "Milestones", valueType: "text", groupName: "Achievements section", sortOrder: 50 },
  { page: "home", key: "achievements.title", label: "Achievements heading", value: "Recognition built on meaningful care", valueType: "text", groupName: "Achievements section", sortOrder: 51 },
  { page: "home", key: "achievements.description", label: "Achievements introduction", value: "New qualifications, research, awards and moments from Dr. Swathy Priya’s continuing wellness journey.", valueType: "textarea", groupName: "Achievements section", sortOrder: 52 },
];

const defaultAchievements = [
  {
    title: "Compassionate Care Recognition",
    description: "Recognised for a patient-first approach that brings clinical care and human kindness together.",
    category: "Recognition",
    achievementDate: "2025-03-15",
    imageUrl: "/images/doctor-doll.png",
    published: true,
    sortOrder: 1,
  },
  {
    title: "Preventive Wellness Certification",
    description: "Advanced certification in personalised prevention and whole-family wellness planning.",
    category: "Certification",
    achievementDate: "2025-01-20",
    imageUrl: null,
    published: true,
    sortOrder: 2,
  },
];

let seedPromise: Promise<void> | null = null;

export async function ensureCmsSeeded() {
  if (!seedPromise) {
    seedPromise = (async () => {
      await db.insert(siteContent).values(cmsDefaults).onConflictDoNothing();
      const existing = await db.select({ id: achievements.id }).from(achievements).limit(1);
      if (existing.length === 0) {
        await db.insert(achievements).values(defaultAchievements);
      }
    })().catch((error) => {
      seedPromise = null;
      throw error;
    });
  }
  return seedPromise;
}

export async function getCmsContent(pages: string[] = ["global", "home"]) {
  await ensureCmsSeeded();
  const rows = await db
    .select()
    .from(siteContent)
    .where(inArray(siteContent.page, pages))
    .orderBy(asc(siteContent.sortOrder), asc(siteContent.id));

  return rows;
}

export function cmsMap(rows: Array<{ page: string; key: string; value: string }>) {
  return Object.fromEntries(rows.map((row) => [`${row.page}:${row.key}`, row.value]));
}

export async function getPublishedAchievements(limit?: number) {
  await ensureCmsSeeded();
  const query = db
    .select()
    .from(achievements)
    .where(eq(achievements.published, true))
    .orderBy(desc(achievements.achievementDate), asc(achievements.sortOrder));

  return limit ? query.limit(limit) : query;
}
