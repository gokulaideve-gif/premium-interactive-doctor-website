import { NextRequest, NextResponse } from "next/server";
import { asc, desc } from "drizzle-orm";
import { db } from "@/db";
import { achievements } from "@/db/schema";
import { getCurrentAdmin } from "@/lib/auth";
import { ensureCmsSeeded } from "@/lib/cms";
import { achievementInputSchema } from "@/lib/validation";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensureCmsSeeded();
  const items = await db.select().from(achievements).orderBy(desc(achievements.achievementDate), asc(achievements.sortOrder));
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = achievementInputSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });

  const [item] = await db
    .insert(achievements)
    .values({ ...parsed.data, imageUrl: parsed.data.imageUrl || null, createdBy: admin.id })
    .returning();
  return NextResponse.json({ item }, { status: 201 });
}
