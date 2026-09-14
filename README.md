# Servora Customer Web

The customer-facing web application for Servora — a service for finding,
comparing, and booking local professionals. This repository is a
**standalone frontend**, independent of any other Servora repository. It
contains no backend, no database, and no payment integration of its own.

**Phase 1** established the application shell — design system, routing,
navigation, and the auth/location/API integration points. **Phase 2**
(this milestone) builds the first real marketplace experience on top of
that shell: a customer home page, service/category browsing, provider
discovery, and a working search architecture — all against clearly
temporary mock data (see [Marketplace data](#marketplace-data) below),
since no `servora-services`/`servora-provider`-style backend contract
exists for this app to call yet. See
["What's intentionally not here"](#whats-intentionally-not-here).

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript** (strict mode)
- **Tailwind CSS v4** — every design token is a CSS custom property in
  [`src/app/globals.css`](src/app/globals.css), exposed to Tailwind
  utilities via `@theme`. These tokens are shared across every Servora
  frontend (copied from `servora-web`'s token set) so the apps read as
  one product.
- **lucide-react** — the app's icon library

No new dependencies were added in Phase 2 — the marketplace UI, search
state, and mock repositories are all built on the Phase 1 stack.

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
app runs with zero configuration. No feature calls a real backend
endpoint yet; `NEXT_PUBLIC_API_BASE_URL` is plumbing for the API client
layer (see below), not a live integration.

## Project structure

```
src/
├── app/
│   ├── page.tsx                    # / — home: hero search, categories, recommended services, featured providers
│   ├── search/                     # /search — full search experience (query, category, filters, sort, list/map)
│   ├── services/                   # /services — category browser
│   ├── providers/                  # /providers — provider discovery
│   ├── bookings/                   # /bookings — placeholder (unchanged from Phase 1)
│   ├── favorites/                  # /favorites — placeholder (unchanged from Phase 1)
│   └── profile/                    # /profile — auth states demo (unchanged from Phase 1)
├── components/
│   ├── ui/                         # Design-system primitives (Button, Card, Input, Select, Badge,
│   │                                # Skeleton, EmptyState, ErrorState, Modal, ConfirmDialog, Toast, Container)
│   ├── layout/                     # Navbar, BottomTabBar, Footer, Logo, PlaceholderPage
│   └── marketplace/                # Cross-feature presentation components — see below
├── features/
│   ├── discovery/components/       # DiscoveryLayout — the list+map split-view primitive
│   ├── services/                   # Category/service types, mock data, repository, category-icon lookup
│   ├── providers/                  # Provider types, mock data, repository
│   └── search/                     # SearchQuery/SearchResultsState types, useSearchState, searchRepository,
│                                    # FiltersPanel, SortControl, ViewToggle, SearchResultsGrid, MapPanelPlaceholder
├── lib/
│   ├── api/                        # Generic fetch client + error types — still no domain endpoints (see below)
│   ├── auth/                       # AuthProvider/useAuth/AuthGuard — unchanged from Phase 1
│   ├── location/                   # LocationProvider/useLocation — unchanged from Phase 1
│   ├── mock/simulateLatency.ts     # Artificial delay for mock repositories, so loading states are real
│   ├── env.ts
│   └── utils.ts                    # cn() class merging
├── hooks/                          # useMediaQuery, useDisclosure, useFocusTrap, useAsyncData
├── constants/                      # ROUTES, PRIMARY_NAV, MOBILE_TAB_NAV
├── types/                          # Small shared utility types (AsyncStatus, Nullable)
└── test/                           # renderWithProviders test helper
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
frontend.

- **Typography** — [Fraunces](https://fonts.google.com/specimen/Fraunces)
  (display) paired with [Inter](https://fonts.google.com/specimen/Inter)
  (UI/body), loaded via `next/font`.
- **Primitives** (`src/components/ui`) — Button, Input, **Select** (new
  in Phase 2, matching Input's pattern), Badge, Card, Container, Spinner,
  Skeleton, EmptyState, ErrorState, Modal, ConfirmDialog, Toast.
- **Focus states** — a single, visible `:focus-visible` ring, defined
  once and inherited everywhere.

## Routing & navigation

Routes: `/`, `/search`, `/services`, `/providers`, `/bookings`,
`/favorites`, `/profile` (`src/constants/routes.ts`). `/`, `/search`,
`/services`, and `/providers` are now real marketplace surfaces;
`/bookings`, `/favorites`, and `/profile` remain Phase 1 placeholders —
per scope, booking and favorites logic is a later phase.

Navigation is unchanged from Phase 1: a desktop sticky header (nav
links, search entry, location entry, Favorites/Bookings icons, account
area) and, on mobile, a compact header plus an always-visible bottom tab
bar (Home/Search/Bookings/Favorites/Profile).

## Marketplace data

**No backend contract exists yet** for services, providers, or search
(no `servora-services`/`servora-provider`-equivalent API this app has
verified) — so all marketplace content is temporary, clearly-marked mock
data:

- `src/features/services/data/categories.mock.ts` and `services.mock.ts`
- `src/features/providers/data/providers.mock.ts`

Every mock file opens with a comment marking it as temporary, and **no
UI component imports these files directly.** Instead, each feature
exposes a repository module —
`src/features/services/api/servicesRepository.ts` and
`src/features/providers/api/providersRepository.ts` — with async
functions (`listCategories`, `listServices`, `listProviders`, …) that
today resolve the mock data (through `simulateLatency()`, so loading
states are genuinely exercised, not skipped) and later will make real
`apiRequest()` calls with the exact same signatures. Swapping mock for
real data is a change contained to these two files — no component needs
to change.

`distanceKm` is `null` on every mock record, and stays `null` in the UI
unless a real distance is known — this app never fabricates a distance
or implies a provider is nearby without real location data (see
[Location integration](#location-integration) below).

## Search architecture

`src/features/search/types.ts` defines the full query and results shape:

- `SearchQuery` — `query`, `category`, `sort`, `filters`, `viewMode`, all
  flat primitives so the shape maps cleanly onto
  `/search?q=&category=` URL params later.
- `SearchResultsState` — `status` (`AsyncStatus`), `items`
  (`SearchResultItem[]`, a `{kind:"service"}|{kind:"provider"}` union),
  `error`.

`src/features/search/state/useSearchState.ts` owns this entire
lifecycle in one hook — no component scatters query/filter/sort/results
state on its own. It re-runs `searchRepository.search()` whenever the
query text, category, sort, or filters change (not `viewMode`, which
only toggles whether the map panel renders), using React 19's async
`startTransition` for the loading indicator rather than a manual
`setState("loading")` inside an effect (the same pattern
`AuthProvider`'s mount effect uses, and for the same reason — see the
inline comments in both files).

`src/features/search/api/searchRepository.ts` combines the service and
provider repositories, then filters/sorts the combined list in memory.
This local filtering logic is isolated here — not in any component —
specifically so it can be deleted in favor of a real search endpoint
later without touching the UI. A distance filter never excludes an item
whose distance is unknown (excluding it would hide real results just
because location data doesn't exist yet, which would be dishonest).

**URL sync today is one-directional and intentionally minimal**: `/search`
reads `q` and `category` from the URL once on load (`src/app/search/page.tsx`
→ `SearchPageClient`) to seed `useSearchState`'s initial values — enough
to make category cards and the home search bar's submit action actually
work — but the query never writes itself back to the URL as the user
types/filters. Full two-way sync wasn't built, per scope ("do not
over-engineer URL synchronization if it is not necessary yet").

## Marketplace components

`src/components/marketplace/` — used from Home, `/search`, `/services`,
and `/providers` today, and meant for any future recommendation surface:

- **ServiceCard** / **ProviderCard** — image placeholder, name, category,
  provider name (services) or verification badge (providers), rating +
  review count, price (services) or service area (providers), a distance
  line that only renders when `distanceKm` is known, and a CTA.
- **CategoryCard** — links to `/search?category=<slug>`.
- **RatingStars**, **PlaceholderThumbnail** (a deterministic,
  brand-palette placeholder — never presented as a real photo),
  **AsyncCardGrid** (the shared loading/empty/error/success grid every
  discovery surface renders through), **CardSkeletons**, **SearchBar**.

**No service or provider detail page exists yet** (a later phase, same
as booking) — rather than link to a route that doesn't exist, each
card's CTA shows an honest "not available yet" toast, the same pattern
already used by `/profile`'s Log in/Sign up buttons in Phase 1.

## Location integration

Unchanged from Phase 1's `src/lib/location` foundation — this phase
*uses* it rather than extending it. `/providers` and `/search`'s map
panel both read `useLocation()` and reflect its real state honestly (no
fake address, no fake "near you" claim); the header's location button
still exercises the real browser geolocation permission flow end to end.

## Authentication foundation

Unchanged from Phase 1 — see `src/lib/auth`. Still no real backend call;
`/profile` still demonstrates all three states directly.

## API layer

`src/lib/api/client.ts` — unchanged from Phase 1, still not connected to
any domain endpoint. Phase 2's marketplace data flows through the mock
repositories described above, not through this client, since no real
services/providers/search contract exists yet to call.

## Reusable UI states

`AsyncCardGrid` centralizes loading (skeletons)/empty/error(+retry)/success
rendering for every discovery grid. `useAsyncData` (new in Phase 2,
`src/hooks/useAsyncData.ts`) is the one safe "fetch on mount, track
status, support retry" hook every marketplace section builds on, so the
same effect-safety pattern (no synchronous `setState` inside an effect
body) doesn't get re-solved per component.

## Testing

[Vitest](https://vitest.dev) + [React Testing Library](https://testing-library.com/react).
In addition to Phase 1's coverage:

- `searchRepository` — text/category filtering, sorting (rating, price,
  the "unpriced providers sort last" rule), the minimum-rating filter,
  and that an unknown distance is never used to exclude a result.
- `useAsyncData` — loading→success, loading→error, and retry.
- `AsyncCardGrid` — loading (skeleton count), empty, error+retry, success.
- `ServiceCard` / `ProviderCard` — core fields render, the
  distance line only appears when known, the verified badge only appears
  when true, and the CTA's honest toast.
- `CategoryCard` — renders and links to the right `/search` href.
- `HomePage` — hero, all three sections render, and each resolves real
  mock data.
- `SearchPageClient` — initial render, seeding from a URL query, live
  search-as-you-type, category-selection filtering, and the empty state
  for a query that matches nothing.
- `BottomTabBar` — every destination links correctly and marks the
  active route (the practical proxy available for verifying mobile
  navigation under jsdom, which can't evaluate the CSS breakpoints that
  actually show/hide it).

## What's intentionally not here

- **No real backend integration.** Every marketplace list, card, and
  filter reads from the mock repositories described above — nothing
  here calls `servora-services`, `servora-provider`, or any other
  backend, because no verified contract exists yet for this app to call.
- **No service or provider detail pages, and no booking flow.** Card
  CTAs show an honest "not available yet" toast instead of a dead link.
  Later phases.
- **No real map.** `/search`'s map panel is the same kind of integration
  seam as Phase 1 — ready for the existing map/places implementation,
  not rebuilt here.
- **No availability filtering.** The Availability filter control exists
  in `/search`'s filters panel but is disabled with a "Coming soon" hint
  — there's no availability/scheduling data model yet to filter against.
- **No full two-way URL sync for search state** — see
  [Search architecture](#search-architecture) above.
- **No provider-side concepts.** Provider dashboards, catalog
  management, onboarding, business management, and analytics belong to
  `servora-provider-web`/`servora-services-web`, not here.
