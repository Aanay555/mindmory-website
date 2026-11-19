import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// 1. GET: Admin Panel ke Master Result Sheet ke liye Supabase se sab completed results fetch karein
export async function GET() {
  try {
    const resultsList: any[] = [];

    // Check 'students' table
    const { data: studentsData } = await supabase
      .from("students")
      .select("*");

    if (Array.isArray(studentsData)) {
      studentsData.forEach((st: any) => {
        if (st.exam_status === "Completed" || st.obtained_marks !== null && st.obtained_marks !== undefined) {
          const total = Number(st.total_marks) || 5;
          const obtained = Number(st.obtained_marks) || 0;
          resultsList.push({
            rollNo: st.roll_no,
            name: st.full_name || st.name || "Candidate",
            fatherName: st.father_name || "",
            school: st.school_name || st.school || "Registered School",
            grade: st.grade || "Grade 1",
            category: st.category || "General Knowledge",
            score: obtained,
            total,
            scoreText: `${obtained}/${total}`,
            percentage: st.percentage ?? Math.round((obtained / total) * 100),
            status: "Completed",
            submittedAt: st.updated_at || st.created_at || new Date().toISOString(),
          });
        }
      });
    }

    // Check 'candidates' table as well
    const { data: candidatesData } = await supabase
      .from("candidates")
      .select("*");

    if (Array.isArray(candidatesData)) {
      candidatesData.forEach((cand: any) => {
        const rNo = cand.roll_no || cand.rollNo;
        const alreadyAdded = resultsList.some(
          (r) => String(r.rollNo).toUpperCase() === String(rNo).toUpperCase()
        );
        if (
          !alreadyAdded &&
          (cand.exam_status === "Completed" ||
            cand.test_status === "Completed" ||
            (cand.obtained_marks !== null && cand.obtained_marks !== undefined))
        ) {
          const total = Number(cand.total_marks) || 5;
          const obtained = Number(cand.obtained_marks) || 0;
          resultsList.push({
            rollNo: rNo,
            name: cand.full_name || cand.name || "Candidate",
            fatherName: cand.father_name || cand.fatherName || "",
            school: cand.school_name || cand.school || "Registered School",
            grade: cand.grade || "Grade 1",
            category: cand.category || "General Knowledge",
            score: obtained,
            total,
            scoreText: `${obtained}/${total}`,
            percentage: cand.percentage ?? Math.round((obtained / total) * 100),
            status: "Completed",
            submittedAt: cand.updated_at || cand.created_at || new Date().toISOString(),
          });
        }
      });
    }

    return NextResponse.json({ success: true, results: resultsList });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to load results", results: [] },
      { status: 500 }
    );
  }
}

// 2. POST: Exam Terminal se aane wala result SAVE karein OR Public Results page ka lookup chalayein
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { rollNo } = body;

    if (!rollNo || !String(rollNo).trim()) {
      return NextResponse.json({ error: "Roll Number is required." }, { status: 400 });
    }

    const cleanRoll = String(rollNo).trim().toUpperCase();

    // CASE A: Exam Terminal se student ne test submit kiya hai (score & total maujood hain)
    if (body.score !== undefined && body.total !== undefined) {
      const obtained = Number(body.score);
      const total = Number(body.total);
      const pct = body.percentage !== undefined ? Number(body.percentage) : Math.round((obtained / Math.max(total, 1)) * 100);
      const awardTitle =
        pct >= 90
          ? "National Gold Medal Distinction"
          : pct >= 80
          ? "National Silver Medal Honor"
          : pct >= 70
          ? "National Bronze Medal Merit"
          : "Certificate of Participation";

      // 1) Update 'students' table if record exists
      const { data: updatedStudent } = await supabase
        .from("students")
        .update({
          exam_status: "Completed",
          obtained_marks: obtained,
          total_marks: total,
          award_title: awardTitle,
        })
        .eq("roll_no", cleanRoll)
        .select();

      // 2) Update 'candidates' table if record exists
      await supabase
        .from("candidates")
        .update({
          exam_status: "Completed",
          obtained_marks: obtained,
          total_marks: total,
          award_title: awardTitle,
        })
        .eq("roll_no", cleanRoll);

      // 3) Agar roll number pehle se 'students' table mein nahi tha (e.g. demo/new candidate), to insert/upsert kar dein
      if (!updatedStudent || updatedStudent.length === 0) {
        await supabase.from("students").upsert(
          {
            roll_no: cleanRoll,
            full_name: body.name || "Verified Candidate",
            grade: body.grade || "Grade 1",
            school_name: body.school || "Registered School",
            payment_status: "Approved",
            exam_status: "Completed",
            obtained_marks: obtained,
            total_marks: total,
            award_title: awardTitle,
          },
          { onConflict: "roll_no" }
        );
      }

      return NextResponse.json({
        success: true,
        saved: true,
        rollNo: cleanRoll,
        obtained_marks: obtained,
        total_marks: total,
        percentage: pct,
        award_title: awardTitle,
      });
    }

    // CASE B: Public /results page se kisi ne sirf Roll Number search kiya hai
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
  } catch {
    return NextResponse.json({ error: "Server connection failed." }, { status: 500 });
  }
}
