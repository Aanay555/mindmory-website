import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { rollNo } = await req.json();

    if (!rollNo) {
      return NextResponse.json({ error: "Roll number is required" }, { status: 400 });
    }

    const { data: student, error } = await supabase
      .from("students")
      .select("*")
      .eq("roll_no", rollNo.trim().toUpperCase())
      .single();

    if (error || !student) {
      return NextResponse.json(
        { allowed: false, message: "Invalid Roll Number. No student found with this ID." },
        { status: 404 }
      );
    }

    // Check payment status
    if (student.payment_status === "pending") {
      return NextResponse.json(
        { 
          allowed: false, 
          message: "Payment Pending: Your fee verification is under review by admin. Exam desk will unlock once approved." 
        },
        { status: 403 }
      );
    }

    if (student.payment_status === "rejected") {
      return NextResponse.json(
        { 
          allowed: false, 
          message: "Payment Rejected: Your TRX ID could not be verified in the official bank statement. Please contact support." 
        },
        { status: 403 }
      );
    }

    // Check if exam already finished
    if (student.exam_status === "completed") {
      return NextResponse.json(
        { allowed: false, message: "Exam already submitted. Multiple attempts are not permitted." },
        { status: 403 }
      );
    }

    return NextResponse.json({ allowed: true, student });
  } catch (err) {
    return NextResponse.json({ error: "Failed to verify access" }, { status: 500 });
  }
}
