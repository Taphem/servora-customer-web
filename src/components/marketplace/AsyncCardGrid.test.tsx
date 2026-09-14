import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AsyncCardGrid } from "./AsyncCardGrid";

interface Item {
  id: string;
  label: string;
}

const items: Item[] = [
  { id: "1", label: "First" },
  { id: "2", label: "Second" },
];

describe("AsyncCardGrid", () => {
  it("renders skeletons while loading", () => {
    render(
      <AsyncCardGrid<Item>
        status="loading"
        items={[]}
        getKey={(item) => item.id}
        renderItem={(item) => <p>{item.label}</p>}
        renderSkeleton={() => <p data-testid="skeleton">Loading placeholder</p>}
        skeletonCount={3}
        emptyTitle="No items"
      />,
    );

    expect(screen.getAllByTestId("skeleton")).toHaveLength(3);
  });

  it("renders an empty state with no items after success", () => {
    render(
      <AsyncCardGrid<Item>
        status="success"
        items={[]}
        getKey={(item) => item.id}
        renderItem={(item) => <p>{item.label}</p>}
        renderSkeleton={() => <p>Loading</p>}
        emptyTitle="No results found"
        emptyDescription="Try a different search."
      />,
    );

    expect(screen.getByText("No results found")).toBeInTheDocument();
    expect(screen.getByText("Try a different search.")).toBeInTheDocument();
  });

  it("renders an error state with a retry action", () => {
    const onRetry = vi.fn();
    render(
      <AsyncCardGrid<Item>
        status="error"
        items={[]}
        getKey={(item) => item.id}
        renderItem={(item) => <p>{item.label}</p>}
        renderSkeleton={() => <p>Loading</p>}
        emptyTitle="No items"
        errorDescription="Couldn't load results."
        onRetry={onRetry}
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Couldn't load results.");
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("renders items on success", () => {
    render(
      <AsyncCardGrid<Item>
        status="success"
        items={items}
        getKey={(item) => item.id}
        renderItem={(item) => <p>{item.label}</p>}
        renderSkeleton={() => <p>Loading</p>}
        emptyTitle="No items"
      />,
    );

    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });
});
