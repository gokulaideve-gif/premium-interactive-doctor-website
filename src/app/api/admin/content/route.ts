import { NextRequest, NextResponse } from "next/server";
import { asc } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { siteContent } from "@/db/schema";
import { getCurrentAdmin } from "@/lib/auth";
import { ensureCmsSeeded } from "@/lib/cms";

const itemSchema = z.object({
  page: z.string().trim().min(1).max(80).regex(/^[a-zA-Z0-9_\/-]+$/),
  key: z.string().trim().min(1).max(180).regex(/^[a-zA-Z0-9_.:\/-]+$/),
  label: z.string().trim().min(1).max(180),
  value: z.string().max(4_500_000),
  valueType: z.enum(["text", "textarea", "image", "url"]).default("text"),
  groupName: z.string().trim().min(1).max(80).default("General"),
  sortOrder: z.number().int().min(0).max(100000).default(0),
});

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensureCmsSeeded();
  const items = await db.select().from(siteContent).orderBy(asc(siteContent.page), asc(siteContent.sortOrder));
  return NextResponse.json({ items });
}

export async function PUT(request: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = z.object({ items: z.array(itemSchema).min(1).max(250) }).safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid content" }, { status: 400 });
  }

  await db.transaction(async (tx) => {
    for (const item of parsed.data.items) {
      await tx
        .insert(siteContent)
        .values({ ...item, updatedBy: admin.id, updatedAt: new Date() })
        .onConflictDoUpdate({
          target: [siteContent.page, siteContent.key],
          set: {
            label: item.label,
            value: item.value,
            valueType: item.valueType,
            groupName: item.groupName,
            sortOrder: item.sortOrder,
            updatedBy: admin.id,
            updatedAt: new Date(),
          },
        });
    }
  });

  return NextResponse.json({ ok: true });
}

export async function PATCH(request: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = itemSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });

  const [item] = await db
    .insert(siteContent)
    .values({ ...parsed.data, updatedBy: admin.id, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: [siteContent.page, siteContent.key],
      set: { ...parsed.data, updatedBy: admin.id, updatedAt: new Date() },
    })
    .returning();

  return NextResponse.json({ item });
}
