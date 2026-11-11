import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "settings.json");

const defaultSettings = {
  deadline: "30 November 2026",
  examDate: "15 December 2026",
  resultsDate: "25 December 2026",
  fee: 1100,
  whatsapp: "923097864722",
  bankTitle: "MINDMORY MEGA EVENTS",
  bankName: "Meezan Bank Ltd",
  iban: "PK00MEZN0001234567890123",
  sheetUrl: "https://docs.google.com/spreadsheets/",
  subscribersSheetUrl: "https://docs.google.com/spreadsheets/",
  masterPin: "2026"
};

function getSettings() {
  try {
    if (!fs.existsSync(dataFilePath)) return defaultSettings;
    return JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
  } catch {
    return defaultSettings;
  }
}

// 1. GET: Public dynamic settings without caching
export async function GET(req: Request) {
  const settings = getSettings();
  const { masterPin, ...publicSettings } = settings;

  return NextResponse.json(publicSettings, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
    },
  });
}

// 2. POST: Settings update aur save karta hai
export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("mindmory_admin_session");

    if (!session || session.value !== "authenticated_super_admin") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await req.json();
    const current = getSettings();

    if (body.action === "change_pin") {
      current.masterPin = String(body.newPin);
      fs.writeFileSync(dataFilePath, JSON.stringify(current, null, 2), "utf8");
      return NextResponse.json({ success: true });
    }

    if (body.action === "save_settings") {
      const updated = {
        ...current,
        deadline: body.deadline ?? current.deadline,
        examDate: body.examDate ?? current.examDate,
        resultsDate: body.resultsDate ?? current.resultsDate,
        fee: Number(body.fee) || current.fee,
        whatsapp: body.whatsapp ?? current.whatsapp,
        bankTitle: body.bankTitle ?? current.bankTitle,
        bankName: body.bankName ?? current.bankName,
        iban: body.iban ?? current.iban,
        sheetUrl: body.sheetUrl ?? current.sheetUrl,
        subscribersSheetUrl: body.subscribersSheetUrl ?? current.subscribersSheetUrl,
      };

      fs.writeFileSync(dataFilePath, JSON.stringify(updated, null, 2), "utf8");
      return NextResponse.json({ success: true, data: updated });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
