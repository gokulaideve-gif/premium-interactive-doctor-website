import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentAdmin, updateAdminPassword } from "@/lib/auth";

const schema = z.object({
  currentPassword: z.string().min(8).max(200),
  newPassword: z.string().min(12, "Use at least 12 characters").max(200),
});

export async function PUT(request: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });

  const updated = await updateAdminPassword(admin.id, parsed.data.currentPassword, parsed.data.newPassword);
  if (!updated) return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
  return NextResponse.json({ ok: true });
}
