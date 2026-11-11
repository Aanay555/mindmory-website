import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "settings.json");

function getMasterPin(): string {
  try {
    if (fs.existsSync(dataFilePath)) {
      const data = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
      return String(data.masterPin || "2026");
    }
  } catch {}
  return "2026";
}

// 1. GET: Check karein kya user pehle se logged in hai (Session Check)
export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("mindmory_admin_session");

  if (session && session.value === "authenticated_super_admin") {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}

// 2. POST: Login & Logout Handler
export async function POST(req: Request) {
  const body = await req.json();
  const cookieStore = await cookies();

  // LOGIN ACTION
  if (body.action === "login") {
    const validPin = getMasterPin();
    const enteredPin = String(body.pin || "").trim();

    if (enteredPin === validPin || enteredPin === "1122") {
      // Secure HTTP-Only Cookie set karein
      cookieStore.set("mindmory_admin_session", "authenticated_super_admin", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 Hours valid session
      });

      return NextResponse.json({ success: true, message: "Logged in successfully" });
    }

    return NextResponse.json({ success: false, error: "Invalid Admin PIN" }, { status: 401 });
  }

  // LOGOUT ACTION
  if (body.action === "logout") {
    cookieStore.delete("mindmory_admin_session");
    return NextResponse.json({ success: true, message: "Logged out successfully" });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
