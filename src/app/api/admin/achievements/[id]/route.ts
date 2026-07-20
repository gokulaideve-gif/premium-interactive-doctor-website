import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { achievements } from "@/db/schema";
import { getCurrentAdmin } from "@/lib/auth";
import { achievementInputSchema } from "@/lib/validation";

function parseId(value: string) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = parseId((await context.params).id);
  if (!id) return NextResponse.json({ error: "Invalid achievement" }, { status: 400 });

  const parsed = achievementInputSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });

  const [item] = await db
    .update(achievements)
    .set({ ...parsed.data, imageUrl: parsed.data.imageUrl || null, updatedAt: new Date() })
    .where(eq(achievements.id, id))
    .returning();
  if (!item) return NextResponse.json({ error: "Achievement not found" }, { status: 404 });
  return NextResponse.json({ item });
}

export async function DELETE(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = parseId((await context.params).id);
  if (!id) return NextResponse.json({ error: "Invalid achievement" }, { status: 400 });

  const [item] = await db.delete(achievements).where(eq(achievements.id, id)).returning({ id: achievements.id });
  if (!item) return NextResponse.json({ error: "Achievement not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
