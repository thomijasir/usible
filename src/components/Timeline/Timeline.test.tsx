import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import { Timeline } from "./Timeline.component";

const items = [
  {
    title: "Step One",
    description: "First description",
    date: "2024-01-01",
    status: "completed" as const,
  },
  {
    title: "Step Two",
    description: "Second description",
    date: "2024-02-01",
    status: "failed" as const,
  },
  {
    title: "Step Three",
    description: "Third description",
    date: "2024-03-01",
    status: "pending" as const,
  },
];

describe("Timeline", () => {
  it("renders item titles", () => {
    render(() => <Timeline items={items} />);
    expect(screen.getByText("Step One")).toBeInTheDocument();
    expect(screen.getByText("Step Two")).toBeInTheDocument();
    expect(screen.getByText("Step Three")).toBeInTheDocument();
  });

  it("renders descriptions", () => {
    render(() => <Timeline items={items} />);
    expect(screen.getByText("First description")).toBeInTheDocument();
    expect(screen.getByText("Second description")).toBeInTheDocument();
    expect(screen.getByText("Third description")).toBeInTheDocument();
  });

  it("renders dates", () => {
    render(() => <Timeline items={items} />);
    expect(screen.getByText("2024-01-01")).toBeInTheDocument();
    expect(screen.getByText("2024-02-01")).toBeInTheDocument();
    expect(screen.getByText("2024-03-01")).toBeInTheDocument();
  });

  it("completed status applies text-success to the icon container", () => {
    const { container } = render(() => <Timeline items={items} />);
    const iconContainers = container.querySelectorAll(".text-success");
    expect(iconContainers.length).toBeGreaterThan(0);
  });

  it("failed status applies text-error to the icon container", () => {
    const { container } = render(() => <Timeline items={items} />);
    const errorContainers = container.querySelectorAll(".text-error");
    expect(errorContainers.length).toBeGreaterThan(0);
  });

  it("numbered variant shows index+1 as number", () => {
    render(() => <Timeline items={items} variant="numbered" />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
