import { describe, expect, it } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { useAsyncData } from "./useAsyncData";

function Probe({ fetcher }: { fetcher: () => Promise<string> }) {
  const { status, data, retry } = useAsyncData(fetcher, "initial");
  return (
    <div>
      <p>status: {status}</p>
      <p>data: {data}</p>
      <button onClick={retry}>Retry</button>
    </div>
  );
}

describe("useAsyncData", () => {
  it("resolves from loading to success with the fetched data", async () => {
    render(<Probe fetcher={() => Promise.resolve("loaded")} />);

    expect(screen.getByText("status: loading")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("status: success")).toBeInTheDocument();
    });
    expect(screen.getByText("data: loaded")).toBeInTheDocument();
  });

  it("resolves to error when the fetcher rejects", async () => {
    render(<Probe fetcher={() => Promise.reject(new Error("boom"))} />);

    await waitFor(() => {
      expect(screen.getByText("status: error")).toBeInTheDocument();
    });
  });

  it("retry sets status back to loading and re-runs the fetcher", async () => {
    let callCount = 0;
    const fetcher = () => {
      callCount += 1;
      return callCount === 1 ? Promise.reject(new Error("first fails")) : Promise.resolve("second succeeds");
    };

    render(<Probe fetcher={fetcher} />);
    await waitFor(() => expect(screen.getByText("status: error")).toBeInTheDocument());

    fireEvent.click(screen.getByRole("button", { name: "Retry" }));
    expect(screen.getByText("status: loading")).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText("status: success")).toBeInTheDocument());
    expect(screen.getByText("data: second succeeds")).toBeInTheDocument();
  });
});
