# PitchPack

PitchPack is an AI-powered outreach tool built for content creators. You enter a brand name, add some optional context about the campaign you have in mind, and PitchPack generates a complete outreach pack -- emails, DMs, follow-ups, and strategy notes -- all tailored to your creator profile and the brand you are pitching.

## What It Does

1. **Creator Profile** -- Set up your profile once (name, bio, follower counts, portfolio links, services, tone) and it gets used in every pitch you generate.
2. **Campaign Brief** -- Enter the brand/sponsor name, their website, and any creative context or ideas you already have.
3. **Generate** -- Hit the button and PitchPack sends your brief to the Gemini API, which returns a structured outreach pack.
4. **Review the Pack** -- The generated pack is split across tabs:
   - **Emails** -- A ready-to-send initial outreach email and a follow-up email, each with subject lines.
   - **DMs** -- A shorter, casual DM version of the pitch plus a "no budget" graceful response.
   - **Strategy** -- Brand snapshot, suggested creative angle, content ideas, alternative subject lines, and negotiation notes.
5. **Save and Load** -- Packs are saved locally so you can revisit past pitches from the Recents panel.

## Tech Stack

- **Next.js 16** (App Router) -- framework and API routes
- **React 19** -- UI
- **TypeScript** -- type safety across the codebase
- **Tailwind CSS 4** -- styling
- **Zustand** -- client-side state management
- **Google Gemini API** (`@google/genai`) -- AI generation
- **Framer Motion** -- animations
- **shadcn/ui + Base UI** -- UI primitives
- **Phosphor Icons** -- iconography

## Getting Started

### Prerequisites

- Node.js 18+
- A Google Gemini API key

### Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env.local` file with your Gemini API key:
   ```
   GOOGLE_API_KEY=your_key_here
   ```
   Alternatively, you can enter your API key directly in the app via the API Key button in the header.

3. Start the dev server:
   ```
   npm run dev
   ```

4. Open http://localhost:3000.

## Project Structure

```
app/
  page.tsx              -- main page (brief + workspace)
  api/generate/route.ts -- POST endpoint that calls Gemini
components/
  campaign-brief.tsx    -- brand/campaign input form
  main-tab-nav.tsx      -- top-level tab navigation
  features/pitch-pack/  -- workspace, tab views (emails, DMs, strategy)
  modals/               -- creator profile, saved packs, API key modals
  ui/                   -- shared UI primitives
lib/
  gemini.ts             -- Gemini client wrapper
  prompts/              -- prompt builder
  rate-limit.ts         -- rate limiting for the API route
store/
  usePitchPackStore.ts  -- Zustand store (all app state)
types/
  index.ts              -- shared TypeScript interfaces
```

## Building

```
npm run build
```

## License

MIT
