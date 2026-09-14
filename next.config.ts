import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // next build's built-in type check otherwise walks tsconfig.json's
    // full include set, which sweeps up test files — those need
    // devDependency-only tooling (vitest, @testing-library/*) that has
    // no reason to be a production dependency. tsconfig.build.json is
    // the same project config minus test files; `npm run typecheck`
    // still uses the unmodified tsconfig.json and keeps checking tests.
    tsconfigPath: "tsconfig.build.json",
  },
};

export default nextConfig;
