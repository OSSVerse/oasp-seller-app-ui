import { render, screen } from "@testing-library/react";
import { Stage } from "../stage"; // Adjust the path as necessary
import { describe, it, expect } from "vitest";

describe("Stage Component", () => {
  it("renders with default variant", () => {
    render(<Stage />);

    const stageElement = screen.getByTestId("stage");
    expect(stageElement).toBeInTheDocument();
    expect(stageElement).toHaveClass("text-white");
    expect(stageElement).toHaveClass("bg-black");
  });

  it("renders with pending variant", () => {
    render(<Stage variant="pending" />);

    const stageElement = screen.getByTestId("stage");

    expect(stageElement).toHaveClass("text-stone-400");
    expect(stageElement).toHaveClass("bg-stone-200");
  });

  it("renders with completed variant", () => {
    render(<Stage variant="completed" />);

    const stageElement = screen.getByTestId("stage");

    expect(stageElement).toHaveClass("border-black");
  });

  it("applies additional class names", () => {
    render(<Stage className="extra-class" />);

    const stageElement = screen.getByTestId("stage");

    expect(stageElement).toHaveClass("extra-class");
  });
});
