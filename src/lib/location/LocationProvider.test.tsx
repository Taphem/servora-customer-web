import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LocationProvider, useLocation } from "./LocationProvider";

function LocationProbe() {
  const { status, location, requestCurrentLocation } = useLocation();
  return (
    <div>
      <p>status: {status}</p>
      <p>address: {location?.displayAddress ?? "none"}</p>
      <button onClick={() => void requestCurrentLocation()}>Locate me</button>
    </div>
  );
}

describe("LocationProvider", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("starts idle and resolves real coordinates on request, without inventing an address", async () => {
    const getCurrentPosition = vi.fn((success: PositionCallback) => {
      success({
        coords: { latitude: 12.9716, longitude: 77.5946 },
      } as GeolocationPosition);
    });
    vi.stubGlobal("navigator", { geolocation: { getCurrentPosition } });

    render(
      <LocationProvider>
        <LocationProbe />
      </LocationProvider>,
    );

    expect(screen.getByText("status: idle")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Locate me" }));

    await waitFor(() => {
      expect(screen.getByText("status: resolved")).toBeInTheDocument();
    });
    expect(screen.getByText("address: 12.9716, 77.5946")).toBeInTheDocument();
  });

  it("reports unavailable when the browser has no geolocation support", async () => {
    vi.stubGlobal("navigator", {});

    render(
      <LocationProvider>
        <LocationProbe />
      </LocationProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Locate me" }));

    await waitFor(() => {
      expect(screen.getByText("status: unavailable")).toBeInTheDocument();
    });
  });
});
