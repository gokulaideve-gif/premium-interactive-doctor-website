import "server-only";

import { createHash, randomBytes } from "crypto";
import bcrypt from "bcryptjs";
import { and, eq, gt } from "drizzle-orm";
import { cookies } from "next/headers";
import { db } from "@/db";
import { adminSessions, adminUsers } from "@/db/schema";

export const ADMIN_COOKIE_NAME = "rudra_admin_session";
const SESSION_DAYS = 7;

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function ensureDefaultAdmin() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    throw new Error("ADMIN_USERNAME and ADMIN_PASSWORD must be configured");
  }

  const [existing] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.username, username.toLowerCase()))
    .limit(1);

  if (existing) return existing;

  const passwordHash = await bcrypt.hash(password, 12);
  const [created] = await db
    .insert(adminUsers)
    .values({
      username: username.toLowerCase(),
      displayName: "Dr. Swathy Priya",
      passwordHash,
      role: "admin",
    })
    .returning();

  return created;
}

export async function authenticateAdmin(username: string, password: string) {
  await ensureDefaultAdmin();
  const [user] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.username, username.trim().toLowerCase()))
    .limit(1);

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) return null;
  return user;
}

export async function createAdminSession(userId: number) {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);

  await db.insert(adminSessions).values({
    userId,
    tokenHash: hashToken(token),
    expiresAt,
  });

  return { token, expiresAt };
}

export async function getAdminFromToken(token?: string | null) {
  if (!token) return null;

  const [record] = await db
    .select({
      sessionId: adminSessions.id,
      expiresAt: adminSessions.expiresAt,
      id: adminUsers.id,
      username: adminUsers.username,
      displayName: adminUsers.displayName,
      role: adminUsers.role,
    })
    .from(adminSessions)
    .innerJoin(adminUsers, eq(adminSessions.userId, adminUsers.id))
    .where(
      and(
        eq(adminSessions.tokenHash, hashToken(token)),
        gt(adminSessions.expiresAt, new Date()),
      ),
    )
    .limit(1);

  return record ?? null;
}

export async function getCurrentAdmin() {
  const cookieStore = await cookies();
  return getAdminFromToken(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
}

export async function deleteAdminSession(token?: string | null) {
  if (!token) return;
  await db.delete(adminSessions).where(eq(adminSessions.tokenHash, hashToken(token)));
}

export async function updateAdminPassword(userId: number, currentPassword: string, newPassword: string) {
  const [user] = await db.select().from(adminUsers).where(eq(adminUsers.id, userId)).limit(1);
  if (!user || !(await bcrypt.compare(currentPassword, user.passwordHash))) return false;

  const passwordHash = await bcrypt.hash(newPassword, 12);
  await db
    .update(adminUsers)
    .set({ passwordHash, updatedAt: new Date() })
    .where(eq(adminUsers.id, userId));
  return true;
}
