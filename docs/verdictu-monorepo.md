# Verdictu — Current Features

> This document describes what is **actually implemented in the codebase today** (2026-07-01). Verdictu is an early-stage project: the marketing site and auth/data plumbing exist, but no authenticated product surface (dashboard, chat, research tool) has been built yet. Where the code hints at planned-but-unbuilt functionality, that is called out explicitly as "Planned / referenced but not built."

---

## 1. Marketing homepage

**Where:** [apps/web/app/(marketing)/page.tsx](apps/web/app/(marketing)/page.tsx), [apps/web/app/(marketing)/layout.tsx](apps/web/app/(marketing)/layout.tsx)

The public homepage. The `(marketing)` route group wraps every marketing page with a persistent `Navbar` and renders a single `Hero` section below it. This is currently the only page in the app besides the auth routes implied by the middleware.

### 1.1 Navbar

**Where:** [packages/ui-web/src/components/marketing-general/navbars](packages/ui-web/src/components/marketing-general/navbars)

Three responsive variants are rendered simultaneously and shown/hidden via CSS breakpoints — there is no shared "current nav" state, each just uses Tailwind visibility classes:

- **Desktop nav** ([desktop-nav.tsx](packages/ui-web/src/components/marketing-general/navbars/desktop-nav.tsx)) — visible `md:` and up. Shows the logo, the nav links, and a primary CTA button reading **"Try it now"** linking to `/sign-up`.
- **Mobile nav** ([mobile-nav.tsx](packages/ui-web/src/components/marketing-general/navbars/mobile-nav.tsx)) — visible below `md:`. A hamburger button toggles a full-screen overlay menu (animated with Framer Motion: fade-in overlay, staggered slide-up for each link at `index * 0.1s` delay). The overlay's CTA button reads **"Start building"** → `/sign-up`. Closing is via an `X` icon button or by tapping a link.
- **Floating nav** ([floating-nav.tsx](packages/ui-web/src/components/marketing-general/navbars/floating-nav.tsx)) — a `fixed` pill-shaped bar that slides down into view once `window.scrollY >= 100`. Same links, CTA reads **"Start building"** → `/sign-up`.

**Nav link data** ([data.ts](packages/ui-web/src/components/marketing-general/navbars/data.ts)) — the same 4 links are shared across all three variants:

| Title | Href |
|---|---|
| Pricing | `/pricing` |
| About | `/about` |
| Careers | `/careers` |
| Blog | `/blog` |

None of these destination pages exist yet (no `pricing/`, `about/`, `careers/`, or `blog/` routes in `apps/web/app`) — the links currently 404.

**Logo** ([logo.tsx](packages/ui-shared/src/components/logo.tsx)) — an inline SVG wordmark ("Verdictu" as vector paths, not a raster image), wrapped in a link to `/`.

### 1.2 Hero section

**Where:** [packages/ui-web/src/components/marketing-sections/hero](packages/ui-web/src/components/marketing-sections/hero)

`Hero` ([hero.tsx](packages/ui-web/src/components/marketing-sections/hero/hero.tsx)) is a simple stack of two blocks (currently on placeholder background colors — `bg-green-300` / `bg-amber-100` — indicating this is mid-build, not final styling):

1. **Animated tagline badge** — uses the shared `Badge` + `ShimmerText` components to display the copy:
   > **"Devoted to You. Dangerous to Everyone Else."**

   This is the only piece of product-positioning copy in the codebase. Combined with the word cloud below, it frames Verdictu as a fiercely loyal, adversarial AI legal ally.

2. **`HeroImageSection`** ([hero-image-section.tsx](packages/ui-web/src/components/marketing-sections/hero/hero-image-section.tsx)) — a full-viewport-height (`100vh`) background image (`/images/hero-image.webp`) with a 30%-opacity black overlay, and a centered word-cloud overlaid on top reading:

   > `UNCENSORED` · `PRIVACY` · `WORKING` · `DEVOTED` · `RESEARCH` · `DEFENDS` · `PRIVATE` · `LOCAL` · `MEMORY`

   These words are the clearest signal of the product's intended value proposition: an AI that does legal **research**, **defends** the user, keeps things **private/local** (implying on-device or non-logged processing), remembers context (**memory**), and is **uncensored** (i.e., won't refuse or hedge on legal questions the way a general-purpose chatbot might).

   There is also a **`ScrollVideo`** component ([scroll-video.tsx](packages/ui-web/src/components/marketing-sections/hero/scroll-video.tsx)) with the identical word list and layout, but using an autoplaying looped background video (`/videos/hero-video.mp4`) instead of a static image. It is not currently wired into `Hero` — it appears to be an alternate version of the same section, built but not (yet) swapped in.

### 1.3 Shared building-block components

**Where:** [packages/ui-shared/src/components](packages/ui-shared/src/components) and [packages/ui-web/src/components/marketing-general](packages/ui-web/src/components/marketing-general)

- **`Badge`** ([badge.tsx](packages/ui-web/src/components/marketing-general/badge.tsx)) — wraps any text string in the shimmer animation below; used for the hero tagline.
- **`ShimmerText`** ([shimmer-text.tsx](packages/ui-web/src/components/marketing-general/shimmer-text.tsx)) — a text component with a looping CSS gradient "shine sweep" animation (via a `<style>` tag injecting `@keyframes`), polymorphic (`as` prop), configurable `duration`/`spread`. Used for animated marketing copy.
- **`Button`** ([button.tsx](packages/ui-shared/src/components/button.tsx)) — polymorphic (`as="button" | "a" | any component`) button with `primary` / `secondary` / `link` variants and `sm`/`md`/`lg` sizes. Primary/secondary variants have a hover "sweep" overlay effect; `link` variant has an animated underline that grows from 0 to full width on hover.
- **`Text`** ([text.tsx](packages/ui-shared/src/components/text.tsx)) — a typography primitive with props for `size`, `font` (sans/inter/lora/mono), `weight`, `color` (default/muted/subtle/inverted/brand/success/warning/danger/inherit), and an optional `hoverColor` that reacts when a parent has the Tailwind `group` class (used for nav-link hover states).
- **`Container`** ([container.tsx](packages/ui-shared/src/components/marketing-general/container.tsx)) — polymorphic max-width (`max-w-7xl`) centering wrapper used to constrain page content width.
- **Icons** — `CloseIcon` and `HamburgerIcon` ([icons/](packages/ui-shared/src/components/icons)), simple stroke-based SVGs (Tabler-icon style) used by the mobile nav toggle.
- **`ThemeProvider`** ([apps/web/components/theme-provider.tsx](apps/web/components/theme-provider.tsx)) — wraps `next-themes`, defaults to `system` theme, and adds a keyboard shortcut: pressing **`D`** (when not typing in an input/textarea/select/contenteditable, and no modifier key held) toggles light/dark mode instantly. This is a developer/power-user convenience, not surfaced in any UI (no visible theme toggle button exists yet).
- **`chat-bubble`** ([packages/ui-web/src/components/marketing-general/chat-bubble](packages/ui-web/src/components/marketing-general/chat-bubble)) — directory exists but is **empty**. This is a scaffolded placeholder for a future chat-widget marketing component (consistent with the "RESEARCH"/chat-driven product concept), not yet implemented.

---

## 2. Authentication

**Where:** [apps/web/proxy.ts](apps/web/proxy.ts), [apps/web/providers/convex-clerk-client-provider.tsx](apps/web/providers/convex-clerk-client-provider.tsx), [packages/db/convex/http.ts](packages/db/convex/http.ts), [packages/db/convex/auth.config.ts](packages/db/convex/auth.config.ts)

Auth is handled by **Clerk**, wired into Next.js middleware and synced into Convex.

- **Route protection** ([proxy.ts](apps/web/proxy.ts), Next.js middleware) — every route requires a signed-in session **except**: `/`, `/sign-in(.*)`, `/sign-up(.*)`. All other paths call `auth.protect()`, which redirects unauthenticated visitors to sign-in. No dedicated `/sign-in` or `/sign-up` pages exist yet in `apps/web/app` — the routes are reserved but not implemented (likely intended to use Clerk's hosted or embeddable components).
- **Client wiring** ([convex-clerk-client-provider.tsx](apps/web/providers/convex-clerk-client-provider.tsx)) — wraps the whole app in `ClerkProvider` + Convex's `ConvexProviderWithClerk`, so any Convex query/mutation automatically carries the signed-in user's identity.
- **Convex JWT trust** ([auth.config.ts](packages/db/convex/auth.config.ts)) — configures Convex to trust Clerk-issued JWTs (via `CLERK_JWT_ISSUER_DOMAIN`) for the `"convex"` application ID.
- **User sync webhook** ([http.ts](packages/db/convex/http.ts)) — an HTTP endpoint at `/clerk`, verified with Svix signatures (`CLERK_WEBHOOK_SECRET`). Listens for three Clerk events and mirrors them into the Convex `users` table:
  - `user.created` → creates a Convex user record, defaulting to `subscriptionTier: "free"`, `credits: 0`.
  - `user.updated` → patches name/email/image on the matching record.
  - `user.deleted` → deletes the matching record.
  - All other event types are acknowledged (200) and ignored.
  - Name resolution prefers the primary email address, falling back to the first listed one; if no email is present at all, the webhook responds `422`.

There's also an unused, simpler `ConvexClientProvider` ([packages/ui-shared/src/providers/convex-client-provider.tsx](packages/ui-shared/src/providers/convex-client-provider.tsx)) that wires Convex without Clerk — likely a leftover from before Clerk was integrated, or scaffolding for a future non-authenticated Convex context.

---

## 3. Data layer (Convex)

**Where:** [packages/db/convex](packages/db/convex)

### 3.1 `users` table

**Schema:** [schema.ts](packages/db/convex/schema.ts), [schemas/users.ts](packages/db/convex/schemas/users.ts)

| Field | Type | Notes |
|---|---|---|
| `clerkId` | string | Foreign key to Clerk's user ID (indexed: `by_clerkId`) |
| `email` | string | Indexed: `by_email` |
| `name` | string | |
| `imageUrl` | string? | Avatar |
| `subscriptionTier` | `"free" \| "premium" \| "business"` | Plan tier |
| `jurisdiction` | string? | The legal jurisdiction relevant to the user — confirms the legal-advice/legal-research product angle |
| `credits` | number | A metered usage balance |
| `createdAt` / `updatedAt` | number (ms timestamp) | |

### 3.2 User functions

**Where:** [convex/orders/users.ts](packages/db/convex/orders/users.ts) — despite living under an `orders/` folder (likely meant for "mutations/queries organized by domain", not e-commerce orders), this file is entirely about user account management:

- `getUserById(clerkId)` / `getUserByEmail(email)` — lookups, return `null` if not found.
- `createUser` / `updateUser` / `deleteUser` — internal mutations, only callable from the Clerk webhook (not exposed to the client directly).
- `deductCredits(userId, amount)` — subtracts credits, throwing if the balance would go negative. Comment notes intended use: *"template purchases or premium analysis."*
- `addCredits(userId, amount)` — adds credits (purchases, refunds, promotions).
- `getCreditBalance(clerkId)` — returns current credit balance (`0` if user not found).
- `getSubscriptionTier(clerkId)` — returns the plan tier (defaults to `"free"`).
- `getJurisdiction` / `updateJurisdiction` — read/write the user's jurisdiction.
- `checkFreeTierLimits(clerkId)` — **references two tables that do not exist yet in the schema**: `chatHistories` and `researchResults`. It counts how many chat queries and research queries a free-tier user has made in the trailing 30 days. This is the strongest evidence in the codebase of the two core product features being planned: an **AI chat** feature and a **legal research** feature, both metered for free-tier users. Since the tables aren't defined in `schema.ts`, calling this function today would fail at runtime — it's forward-looking code, not yet functional.

### 3.3 Convex scaffolding leftovers

- [tasks.ts](packages/db/convex/tasks.ts) — a single `get` query returning all rows from a `tasks` table. This is the default demo file from Convex's project template and is unrelated to Verdictu's product; the `tasks` table also isn't in `schema.ts`, so this query would currently error too.
- [sampleData.jsonl](packages/db/sampleData.jsonl) — Convex's default sample dataset, also template boilerplate.

---

## 4. Backend package (`@workspace/api`)

**Where:** [packages/api](packages/api)

Currently just a `package.json` with dependencies (`@clerk/backend`, `@workspace/db`) and no source files — a reserved package for shared server-side logic (e.g., webhook handlers, privileged Clerk operations) that hasn't been written yet.

---

## 5. Tooling / non-product infrastructure

These aren't user-facing features, but are part of "what the app uses":

- **Turborepo** monorepo ([turbo.json](turbo.json)) orchestrating `build`/`dev`/`lint`/`format`/`typecheck` across all apps/packages.
- **npm workspaces** ([package.json](package.json)) — `apps/*` and `packages/*`.
- **Shared ESLint config** ([packages/eslint-config](packages/eslint-config)) and **shared TypeScript config** ([packages/typescript-config](packages/typescript-config)).
- **shadcn/ui** ([apps/web/components.json](apps/web/components.json)) — configured with the `"radix-lyra"` style, `neutral` base color, Lucide icons; used to scaffold new UI primitives via the `shadcn` CLI (per the template README).
- **Fonts** — Inter (sans), Lora (serif accent, used for the word-cloud "DEVOTED / UNCENSORED / …" text), Geist Mono — all loaded via `next/font/google` in the root layout.
- **Tailwind CSS v4** with `tailwind-merge`, `class-variance-authority`, `tw-animate-css`, and `prettier-plugin-tailwindcss` for class sorting.
- **Framer Motion** — used for the mobile nav overlay animation and floating nav slide-in.

---

## Summary: built vs. planned

| Feature | Status |
|---|---|
| Marketing homepage, hero, nav (3 responsive variants) | ✅ Built |
| Shared design-system primitives (Button, Text, Container, ShimmerText, Badge, icons, Logo) | ✅ Built |
| Dark/light theme + `D` hotkey | ✅ Built (no visible toggle UI yet) |
| Clerk authentication + route protection | ✅ Built |
| Clerk → Convex user sync webhook | ✅ Built |
| User accounts: subscription tier, credits, jurisdiction | ✅ Built (data model + CRUD functions) |
| Sign-in / sign-up pages | ❌ Not built (routes reserved in middleware only) |
| Pricing / About / Careers / Blog pages | ❌ Not built (linked from nav, 404 today) |
| AI chat feature | ❌ Not built (only referenced via `chatHistories` table name in a limits-check function; no schema, no UI) |
| Legal research feature | ❌ Not built (same — referenced via `researchResults`, no schema, no UI) |
| Chat bubble marketing component | ❌ Not built (empty directory) |
| Scroll-video hero variant | 🟡 Built but not wired into the live page |
