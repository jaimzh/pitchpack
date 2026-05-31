import { CreatorProfile, BrandInput } from "@/types";

const NEGATIVE_CONSTRAINTS = `
CRITICAL RULES:
- DO NOT use emojis anywhere in the output.
- DO NOT use em-dashes (—). Use standard commas or periods instead.
- Avoid robotic corporate jargon (e.g., "I hope this email finds you well").
`;

const EMAIL_EXAMPLES = `

EXAMPLE GOOD EMAIL:
Subject: [Converse] x [Jaimz Art]
Body:  Hi Team Converse,

I'm Jaimz (Jaimz Art), a 2D animator and digital artist with 1.8M+ followers on TikTok and 80K+ subscribers on YouTube.

TikTok: @jaimz.art
YouTube: youtube.com/c/jaimz.art

Converse has already been a part of my character's design for a while, so I thought I'd reach out to see if there might be an opportunity to work together.

If that sounds interesting, I'd be happy to share some ideas.

Thanks,
Jaimz


EXAMPLE GOOD EMAIL:
Subject: [Block Blast] x [Jaimz Art]
Body:  Hi Team Block Blast,

I'm Jaimz (Jaimz Art), a 2D animator and digital artist with over 1.8M followers on TikTok and 80K subscribers on YouTube.

TikTok: @jaimz.art
YouTube: youtube.com/c/jaimz.art

I'm reaching out because I'm a genuine fan of Block Blast and play it pretty regularly.

I think there are some fun ways to incorporate the game into my animated content that would feel natural and entertaining for my audience rather than just feeling like an ad.

If you'd be interested in exploring a collaboration, I'd be happy to share a few ideas.

Thanks,
Jaimz

`;

function formatProfile(profile: CreatorProfile): string {
  return `Creator Name: ${profile.creatorName} (${profile.name})
Bio: ${profile.bio}
Unique Angle: ${profile.uniqueAngle ?? "N/A"}
Tone: ${profile.tone}
TikTok Followers: ${profile.tiktokFollowers.toLocaleString()}
YouTube Followers: ${profile.youtubeFollowers.toLocaleString()}
Portfolio: ${profile.portfolioLinks.join(", ")}
Services: ${profile.services.join(", ")}`.trim();
}

function formatBrand(brand: BrandInput): string {
  return `Brand Name: ${brand.brand_name}
Website: ${brand.website || "N/A"}
Creative Context / Notes: ${brand.creative_context}`.trim();
}

export function buildPitchPackPrompt(
  profile: CreatorProfile,
  brand: BrandInput,
): string {
  return `
## Creator Profile
${formatProfile(profile)}

## Brand to Pitch
${formatBrand(brand)}

${EMAIL_EXAMPLES}
${NEGATIVE_CONSTRAINTS}

Generate a complete outreach pack matching this exact JSON schema (no extra keys):
{
  "brand_snapshot": {
    "brand_name": "string",
    "creative_tone": "one sentence describing the brand's visual/creative style",
    "target_audience": "who the brand speaks to",
    "core_connection_hook": "why THIS creator is a natural fit for THIS brand",
    "suggested_angle": "a concrete creative concept for the collab"
  },
  "outreach_pack": {
    "initial_email": {
      "subject": "punchy email subject line",
      "body": "full email body, warm but professional, 150-220 words"
    },
    "follow_up_email": {
      "subject": "string",
      "body": "concise follow-up, 80-120 words"
    },
    "dm_version": {
      "body": "casual DM, 60-90 words, conversational tone"
    },
    "no_budget_response": {
      "body": "graceful reply for when brand says no budget, offer alternatives"
    }
  },
  "subject_lines": ["string", "string", "string"],
  "animation_ideas": ["string", "string", "string"],
  "strategy_notes": "3-4 bullet points on negotiation strategy and next steps"
}`.trim();
}
