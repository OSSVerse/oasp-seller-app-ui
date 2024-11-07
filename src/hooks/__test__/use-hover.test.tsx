import { render, fireEvent, screen } from "@testing-library/react";

import useHover from "../use-hover";

const TestComponent = () => {
  const [hoverRef, isHovered] = useHover();

  return (
    <div
      ref={hoverRef}
      data-testid="hover-target"
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: isHovered ? "rgb(0, 0, 255)" : "rgb(128, 128, 128)",
      }}
    >
      {isHovered ? "Hovered!" : "Not Hovered"}
    </div>
  );
};

describe("useHover", () => {
  it("should track hover state", () => {
    render(<TestComponent />);

    const hoverTarget = screen.getByTestId("hover-target");

    expect(hoverTarget).toHaveTextContent("Not Hovered");
    expect(hoverTarget).toHaveStyle("background-color: rgb(128, 128, 128)");

    fireEvent.mouseOver(hoverTarget);
    expect(hoverTarget).toHaveTextContent("Hovered!");
    expect(hoverTarget).toHaveStyle("background-color: rgb(0, 0, 255)");

    fireEvent.mouseOut(hoverTarget);
    expect(hoverTarget).toHaveTextContent("Not Hovered");
    expect(hoverTarget).toHaveStyle("background-color: rgb(128, 128, 128)");
  });
});
