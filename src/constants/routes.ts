/**
 * Every internal route this app owns, in one place — components should
 * import from here instead of hardcoding path strings, so a route rename
 * never means hunting through the app for stray literals.
 */
export const ROUTES = {
  home: "/",
  search: "/search",
  services: "/services",
  providers: "/providers",
  bookings: "/bookings",
  favorites: "/favorites",
  profile: "/profile",
} as const;

export type RouteKey = keyof typeof ROUTES;
