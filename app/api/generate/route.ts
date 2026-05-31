import { NextRequest, NextResponse } from "next/server";
import { generateFullPack } from "@/lib/gemini";
import { CreatorProfile, BrandInput } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const byokKey = req.headers.get("X-Google-Api-Key") ?? null;

    const body = await req.json();
    const creator = body.creator as CreatorProfile;
    const brand = body.brand as BrandInput;

    if (!creator || !brand?.brand_name?.trim()) {
      return NextResponse.json(
        { error: "Missing required fields: creator and brand." },
        { status: 400 }
      );
    }

    const result = await generateFullPack(creator, brand, byokKey);

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("API Route Error:", err);
    let errorMessage = err.message || "Failed to generate pack";
    
   
    try {
      if (errorMessage.startsWith("{")) {
        const parsed = JSON.parse(errorMessage);
        if (parsed.error && parsed.error.message) {
          errorMessage = parsed.error.message;
        }
      }
    } catch {

    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
