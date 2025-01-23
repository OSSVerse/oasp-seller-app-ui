// OrderDetailTracking.test.tsx
import { render, screen } from "@testing-library/react";
import OrderDetailTracking from "../order-detail-tracking";

describe("OrderDetailTracking", () => {
  const stages = [
    { name: "Stage 1", status: "completed" },
    { name: "Stage 2", status: "current" },
    { name: "Stage 3", status: "pending" },
  ];

  it("renders all stages with correct status", () => {
    render(<OrderDetailTracking stages={stages} currentStatus="current" />);

    // Check if each stage is rendered
    // biome-ignore lint/complexity/noForEach: <explanation>
    stages.forEach((stage) => {
      expect(screen.getByText(stage.name)).toBeInTheDocument();
    });
  });

  it("applies correct variant to each stage", () => {
    render(<OrderDetailTracking stages={stages} currentStatus="current" />);

    const stageElements = screen.getAllByTestId("stage");

    // Check the variant for each stage
    expect(stageElements[0]).toHaveClass("border-black"); // completed
    expect(stageElements[1]).toHaveClass("text-white bg-black"); // current
    expect(stageElements[2]).toHaveClass("text-stone-400 bg-stone-200"); // pending
  });
});
