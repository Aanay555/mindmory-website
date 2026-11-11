import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Check if env keys exist
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("CRITICAL ERROR: Supabase environment variables are missing in .env.local!");
      return NextResponse.json(
        { error: "Supabase configuration missing on server. Check .env.local keys." },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const body = await req.json();
    const { fullName, grade, schoolName, whatsapp, trxId, feeAmount } = body;

    if (!fullName || !grade || !schoolName || !whatsapp || !trxId) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Unique Roll No
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const rollNo = `MM-2026-${randomNum}`;

    // Insert student record
    const { data, error } = await supabase
      .from("students")
      .insert([
        {
          roll_no: rollNo,
          full_name: fullName.trim(),
          grade: grade.trim(),
          school_name: schoolName.trim(),
          whatsapp: whatsapp.trim(),
          trx_id: trxId.trim().toUpperCase(),
          fee_amount: Number(feeAmount) || 1100,
          payment_status: "pending",
          exam_status: "not_started",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("SUPABASE DATABASE ERROR:", error);
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "This Transaction ID (TRX) has already been submitted." },
          { status: 400 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, student: data });
  } catch (err: any) {
    console.error("SERVER CRASH ERROR:", err);
    return NextResponse.json({ error: err?.message || "Internal server error" }, { status: 500 });
  }
}
