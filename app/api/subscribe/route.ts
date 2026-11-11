import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const subscribersFilePath = path.join(process.cwd(), "data", "subscribers.json");

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    let subscribers: { email: string; date: string }[] = [];
    if (fs.existsSync(subscribersFilePath)) {
      subscribers = JSON.parse(fs.readFileSync(subscribersFilePath, "utf8"));
    }

    // Duplicate check
    const exists = subscribers.some((sub) => sub.email.toLowerCase() === email.toLowerCase());
    if (!exists) {
      subscribers.push({
        email: email.trim().toLowerCase(),
        date: new Date().toISOString()
      });
      fs.writeFileSync(subscribersFilePath, JSON.stringify(subscribers, null, 2), "utf8");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
