import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ADMIN_COOKIE_NAME, authenticateAdmin, createAdminSession } from "@/lib/auth";

const schema = z.object({
  username: z.string().trim().min(1).max(80),
  password: z.string().min(8).max(200),
});

export async function POST(request: NextRequest) {
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Enter a valid username and password." }, { status: 400 });
    }

    const user = await authenticateAdmin(parsed.data.username, parsed.data.password);
    if (!user) {
      return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
    }

    const session = await createAdminSession(user.id);
    const response = NextResponse.json({
      user: { id: user.id, username: user.username, displayName: user.displayName, role: user.role },
    });

    response.cookies.set(ADMIN_COOKIE_NAME, session.token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: session.expiresAt,
    });

    return response;
  } catch (error) {
    console.error("Admin login failed", error);
    return NextResponse.json({ error: "Unable to sign in right now." }, { status: 500 });
  }
}
