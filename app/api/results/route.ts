import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { rollNo } = await req.json();

    if (!rollNo || !rollNo.trim()) {
      return NextResponse.json({ error: "Roll Number is required." }, { status: 400 });
    }

    const cleanRoll = rollNo.trim().toUpperCase();

    // Student ka record with marks aur award uthana
    const { data: student, error } = await supabase
      .from("students")
      .select("roll_no, full_name, grade, school_name, payment_status, exam_status, total_marks, obtained_marks, award_title")
      .eq("roll_no", cleanRoll)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!student) {
      return NextResponse.json(
        { error: "No registration found with this Roll Number. Please check and try again." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      student,
    });
  } catch (err) {
    return NextResponse.json({ error: "Server connection failed." }, { status: 500 });
  }
}
