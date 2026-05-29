export interface CreatorProfile {
  name: string;
  creatorName: string;

  bio: string;
  uniqueAngle?: string;

  tone: string;

  tiktokFollowers: number;
  youtubeFollowers: number;

  portfolioLinks: string[];

  services: string[];
}

export interface BrandInput {
  brand_name: string;
  website: string;
  creative_context: string;
}

export interface OutreachPackDetails {
  initial_email: {
    subject: string;
    body: string;
  };
  follow_up_email: {
    subject: string;
    body: string;
  };
  dm_version: {
    body: string;
  };
  no_budget_response: {
    body: string;
  };
}

export interface BrandSnapshot {
  brand_name: string;
  creative_tone: string;
  target_audience: string;
  core_connection_hook: string;
  suggested_angle: string;
}

export interface OutreachPackResponse {
  brand_snapshot?: BrandSnapshot;
  outreach_pack: OutreachPackDetails;
  subject_lines: string[];
  animation_ideas: string[];
  strategy_notes: string;
}
