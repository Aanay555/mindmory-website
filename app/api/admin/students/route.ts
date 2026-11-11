import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

// Backend-only secure client initialize karein
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const adminSupabase = createClient(supabaseUrl, serviceRoleKey);

// 1. GET: Students list with Auth Guard
export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("mindmory_admin_session");

    // Strict security check
    if (!session || session.value !== "authenticated_super_admin") {
      return NextResponse.json({ error: "Unauthorized access blocked." }, { status: 401 });
    }

    const { data: students, error } = await adminSupabase
      .from("students")
      .select("id, roll_no, full_name, grade, school_name, whatsapp, trx_id, fee_amount, payment_status, exam_status, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ students: students || [] });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// 2. POST: Status Update with Auth Guard
export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("mindmory_admin_session");

    if (!session || session.value !== "authenticated_super_admin") {
      return NextResponse.json({ error: "Unauthorized action blocked." }, { status: 401 });
    }

    const { rollNo, status } = await req.json();

    if (!rollNo || !["approved", "rejected", "pending"].includes(status)) {
      return NextResponse.json({ error: "Invalid parameters supplied" }, { status: 400 });
    }

    const { error } = await adminSupabase
      .from("students")
      .update({ payment_status: status })
      .eq("roll_no", rollNo);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
