import { NextRequest, NextResponse } from "next/server";
import { generateFullPack } from "@/lib/gemini";
import { checkRateLimit } from "@/lib/rate-limit";
import { CreatorProfile, BrandInput } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const byokKey = req.headers.get("X-Google-Api-Key") ?? null;

    if (!byokKey) {
      const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
        req.headers.get("x-real-ip") ??
        "unknown";

      const { allowed, remaining } = checkRateLimit(ip);

      if (!allowed) {
        return NextResponse.json(
          { error: "Free tier limit reached. Add your own Google AI Studio key to keep generating." },
          { status: 429 }
        );
      }
      // Surface remaining count for the client
      NextResponse.next()?.headers.set("X-RateLimit-Remaining", String(remaining));
    }

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
    
    // Parse Google SDK JSON error messages
    try {
      if (errorMessage.startsWith("{")) {
        const parsed = JSON.parse(errorMessage);
        if (parsed.error && parsed.error.message) {
          errorMessage = parsed.error.message;
        }
      }
    } catch {
      // Ignore parse errors
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
