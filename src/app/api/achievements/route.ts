import { NextResponse } from "next/server";
import { getPublishedAchievements } from "@/lib/cms";

export async function GET() {
  const items = await getPublishedAchievements();
  return NextResponse.json({ items }, { headers: { "Cache-Control": "no-store" } });
}
