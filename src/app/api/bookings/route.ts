import { NextResponse } from "next/server";
import { groupBookingSchema } from "@/utils/validation/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = groupBookingSchema.parse(body);

    // Here you would typically save the data to your database
    // For now, we'll just return a success response
    return NextResponse.json({
      success: true,
      message: "Booking request received successfully",
      data: validatedData,
    });
  } catch (error) {
    console.error("Error processing booking:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process booking request",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 }
    );
  }
}
