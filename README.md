# Servora Customer Web

The customer-facing web application for Servora — a service for finding,
comparing, and booking local professionals. This repository is a
**standalone frontend**, independent of any other Servora repository. It
contains no backend, no database, and no payment integration of its own.

This is a **foundation milestone**: it establishes the application shell,
design system, routing, and integration points the real customer
experience will be built on — not the experience itself. See
["What's intentionally not here"](#whats-intentionally-not-here) below.

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript** (strict mode)
- **Tailwind CSS v4** — every design token is a CSS custom property in
  [`src/app/globals.css`](src/app/globals.css), exposed to Tailwind
  utilities via `@theme`. These tokens are shared across every Servora
  frontend (copied from `servora-web`'s token set) so the apps read as
  one product.
- **lucide-react** — the app's icon library

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit
npm run test         # Vitest, single run
npm run test:watch    # Vitest, watch mode
npm run build          # production build
npm run start            # serve the production build (run build first)
```

## Environment variables

See [`.env.example`](.env.example). Every value has a safe default — the
app runs with zero configuration. No feature in this milestone calls a
real backend endpoint; `NEXT_PUBLIC_API_BASE_URL` is plumbing for the API
client layer (see below), not a live integration yet.

## Project structure

```
src/
├── app/                    # Next.js App Router — layout, globals.css, and route placeholders:
│   ├── page.tsx             #   / — home
│   ├── search/               #   /search — discovery, list + map split-view demo
│   ├── services/               #   /services — service catalog placeholder
│   ├── providers/                #   /providers — provider discovery placeholder
│   ├── bookings/                   #   /bookings — booking management placeholder
│   ├── favorites/                    #   /favorites — saved items placeholder
│   └── profile/                        #   /profile — account/auth states demo
├── components/
│   ├── ui/                  # Design-system primitives (Button, Card, Input, Badge,
│   │                        # Skeleton, EmptyState, ErrorState, Modal, ConfirmDialog, Toast, Container)
│   └── layout/               # Navbar, BottomTabBar, Footer, Logo, and the shared PlaceholderPage shell
├── features/
│   └── discovery/             # Feature-oriented home for discovery-specific code;
│       └── components/          # currently just DiscoveryLayout, the list+map split-view primitive
├── lib/
│   ├── api/                 # Generic fetch client + error types — no domain endpoints yet (see below)
│   ├── auth/                  # AuthProvider/useAuth/AuthGuard — session state foundation (see below)
│   ├── location/                # LocationProvider/useLocation — location state foundation (see below)
│   ├── env.ts                     # Centralized environment variable access
│   └── utils.ts                     # cn() class merging (tailwind-merge, extended for the custom type scale)
├── hooks/                  # useMediaQuery, useDisclosure, useFocusTrap
├── constants/              # ROUTES, PRIMARY_NAV, MOBILE_TAB_NAV — no hardcoded path/link literals elsewhere
├── types/                  # Small shared utility types (no speculative domain entities — see below)
└── test/                   # renderWithProviders test helper
```

## Design system

Every color, radius, shadow, and type-scale value used anywhere in the
app is a named CSS custom property in
[`src/app/globals.css`](src/app/globals.css), registered with Tailwind via
`@theme` so they're available as ordinary utility classes (`bg-primary`,
`text-h2`, `rounded-(--radius-lg)`, `shadow-md`, …). These tokens are
**copied verbatim from `servora-web`** — the same convention
`servora-provider-web` and `servora-services-web` already follow — so
color, type, radius, and shadow stay one system across every Servora
frontend. If `servora-web`'s tokens change, update this file to match.

- **Typography** — [Fraunces](https://fonts.google.com/specimen/Fraunces)
  (display) paired with [Inter](https://fonts.google.com/specimen/Inter)
  (UI/body), loaded via `next/font` (self-hosted, no layout shift). A
  named scale (`text-display`, `text-h1`…`text-h4`, `text-body`,
  `text-small`, `text-label`, `text-caption`) carries its own
  line-height/letter-spacing/weight.
- **Primitives** (`src/components/ui`) — Button (primary/secondary/ghost/
  destructive, with hover/active/focus/disabled/loading states), Input,
  Badge, Card, Container, Spinner, Skeleton, EmptyState, ErrorState,
  Modal (focus-trapped, see `useFocusTrap`), ConfirmDialog, Toast/
  ToastProvider.
- **Focus states** — a single, visible `:focus-visible` ring is defined
  once in `globals.css` and inherited everywhere; nothing suppresses the
  default outline without replacing it.
- **Motion** — deliberately minimal for this milestone. `globals.css`
  still ships the shared `prefers-reduced-motion` kill-switch and
  `data-motion-exempt` escape hatch (for spinners) used across Servora
  apps, ready for richer motion later.

## Routing & navigation

Placeholder routes exist for `/`, `/search`, `/services`, `/providers`,
`/bookings`, `/favorites`, and `/profile` (`src/constants/routes.ts` is
the single source of truth for these paths — components import from
there rather than hardcoding strings). Each renders through the shared
`PlaceholderPage` shell so navigating between them exercises real
layout/routing consistently, not five one-off page designs.

Navigation is customer-specific by design, not a relabeled provider nav:

- **Desktop** (`lg` and up): a single sticky header — logo, primary text
  links (Discover/Services/Providers), a search entry point, a location
  entry point, quick Favorites/Bookings icon links, and an account area
  (Log in/Sign up, or the signed-in customer once auth is real).
- **Mobile**: a compact header (logo, search icon, location icon) plus
  an always-visible **bottom tab bar** (Home/Search/Bookings/Favorites/
  Profile) — the standard mobile marketplace pattern, not a hamburger
  drawer, and not the scrollable-pill-row pattern `servora-provider-web`
  uses for its dashboard nav.

## Location foundation

Servora's map/location implementation already exists elsewhere (see
`servora-provider-web`'s `GoogleMap`/`PlaceAutocomplete`/`googleMaps.ts`,
built for provider onboarding) — this repo does **not** re-implement it.
Instead, `src/lib/location` establishes the clean integration surface a
future customer-facing map component plugs into:

- `LocationState` (`src/lib/location/types.ts`) — `status` (idle/loading/
  resolved/unavailable), `permission` (prompt/granted/denied/
  unsupported), the resolved `SelectedLocation` (coordinates + a display
  address), and a human-readable `error`.
- `LocationProvider`/`useLocation` — a real (not simulated) browser
  geolocation permission flow via `requestCurrentLocation()`. Because no
  reverse-geocoding integration exists yet, a browser-resolved location's
  `displayAddress` is the raw coordinates formatted as text — real data,
  not a fabricated address — until a real map/places component calls
  `setLocation()` with an actual place.
- The header's location button (`src/components/layout/LocationButton.tsx`)
  exercises this end-to-end today.

## Authentication foundation

No customer authentication backend is implemented or connected yet — see
`src/lib/auth/api.ts` for exactly what exists and why. What's here is the
**architecture** a real integration will slot into without changing any
consuming component:

- `AuthStatus`: `"loading" | "authenticated" | "unauthenticated"`.
- `AuthProvider`/`useAuth()` — resolves a session on mount via
  `getSession()`, which is currently a stub that always resolves
  `{ authenticated: false }`. Any thrown/rejected session check is also
  treated as unauthenticated — this app never assumes a customer is
  logged in on error or absence of data.
- `AuthGuard` — the shape a future protected route (bookings, favorites,
  profile) will wrap itself in. Not applied to any route yet, since there's
  no real session to gate against — see `/profile`, which demonstrates
  all three states (loading/signed-out/signed-in) directly instead.

## API layer

`src/lib/api/client.ts` is the one `fetch()` wrapper every future
domain module should build on — components should never call `fetch()`
directly. It targets the API Gateway (`env.apiBaseUrl`) with
`credentials: "include"`, a request timeout, and the shared
`{ error: { code, message, requestId } }` envelope / `ApiError` handling
used across Servora frontends. **No domain endpoints are wired up** —
this milestone doesn't invent a backend contract for services, providers,
bookings, or favorites. Adding a real feature means adding its own typed
module (e.g. `lib/api/services.ts`) on top of this client once a verified
backend contract exists to call.

## Reusable UI states

`Skeleton`, `EmptyState`, `ErrorState` (with an optional retry action),
`Spinner`, `Modal`/`ConfirmDialog`, and `Toast` are generic and used
across the placeholder routes today (e.g. `/services`'s skeleton grid,
`/search` and `/providers`'s `EmptyState`, `/profile`'s loading/error
handling) so every future feature reaches for the same states instead of
re-inventing them.

## Discovery layout

`src/features/discovery/components/DiscoveryLayout.tsx` is the layout
primitive discovery pages (search, services, providers) will share once
they pair a results list with a map: full-width when no map panel is
given, or a list + sticky map split (stacked below `lg`) when one is.
`/search` demonstrates it today with a placeholder map panel — no map
implementation is wired in.

## Testing

[Vitest](https://vitest.dev) + [React Testing Library](https://testing-library.com/react):
`cn()`'s Tailwind-merge behavior, `Button`'s interactive/loading/link
states, `AuthProvider`'s loading→unauthenticated resolution, `NavLink`'s
active-route detection, and `LocationProvider`'s real geolocation
success/unsupported paths.

## What's intentionally not here

Per scope, this milestone is the application shell — not the customer
experience itself:

- **No real backend integration.** Auth, services, providers, bookings,
  and favorites all have their state/architecture in place but no live
  data. Nothing fabricates a fake logged-in state or invented data to
  fill the gap.
- **No search, booking, review, notification, or provider-matching
  logic.** Their routes exist so navigation and layout can be verified
  ahead of those features, each showing an honest empty state instead.
- **No map implementation.** The location foundation's integration
  points are ready for the existing map/places work to plug into; this
  repo doesn't re-build it.
- **No provider-side concepts.** Provider dashboards, catalog management,
  provider onboarding, business management, and provider analytics
  belong to `servora-provider-web`, not here.
#   s e r v o r a - c u s t o m e r - w e b  
 