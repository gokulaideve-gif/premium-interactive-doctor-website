import { NextRequest, NextResponse } from "next/server";
import { getCmsContent } from "@/lib/cms";

function normalizePage(value: string | null) {
  if (!value || value === "/") return "home";
  return value.replace(/^\//, "").split("/")[0]?.replace(/[^a-zA-Z0-9_-]/g, "") || "home";
}

export async function GET(request: NextRequest) {
  const page = normalizePage(request.nextUrl.searchParams.get("page"));
  const rows = await getCmsContent(page === "global" ? ["global"] : ["global", page]);
  return NextResponse.json({ items: rows }, { headers: { "Cache-Control": "no-store" } });
}
