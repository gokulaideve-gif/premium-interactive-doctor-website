import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]);
const MAX_BYTES = 3 * 1024 * 1024;

export async function POST(request: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Choose an image." }, { status: 400 });
  if (!allowedTypes.has(file.type)) return NextResponse.json({ error: "Use JPG, PNG, WebP, GIF or SVG." }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "Image must be under 3 MB." }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const url = `data:${file.type};base64,${buffer.toString("base64")}`;
  return NextResponse.json({ url, name: file.name, size: file.size });
}
