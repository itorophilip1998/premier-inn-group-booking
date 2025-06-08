import { NextResponse } from "next/server";
import { groupBookingSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = groupBookingSchema.parse(body);

    // TODO: Implement actual data storage
    // For now, just log the data
    console.log("Received booking:", validatedData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Validation error:", error);
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }
}
