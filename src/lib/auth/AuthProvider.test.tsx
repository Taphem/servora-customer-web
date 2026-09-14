import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "./AuthProvider";

function StatusProbe() {
  const { status } = useAuth();
  return <p>status: {status}</p>;
}

describe("AuthProvider", () => {
  it("starts loading and settles on unauthenticated with no real backend wired up", async () => {
    render(
      <AuthProvider>
        <StatusProbe />
      </AuthProvider>,
    );

    expect(screen.getByText("status: loading")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("status: unauthenticated")).toBeInTheDocument();
    });
  });

  it("throws when useAuth is used outside an AuthProvider", () => {
    expect(() => render(<StatusProbe />)).toThrow(
      "useAuth must be used within an AuthProvider",
    );
  });
});
