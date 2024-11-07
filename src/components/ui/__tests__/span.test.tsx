import { render, screen } from "@testing-library/react";
import { Span } from "../span"; 
import { describe, it, expect } from "vitest";

describe("Span Component", () => {
  it("renders with default variant", () => {
    render(<Span />);

    const spanElement = screen.getByTestId("span"); // Match empty text if no children are provided
    expect(spanElement).toBeInTheDocument();
    expect(spanElement).toHaveClass("text-primary");
  });

  it("renders with success variant", () => {
    render(<Span variant="success">Success Message</Span>);

    const spanElement = screen.getByTestId("span")
    expect(spanElement).toBeInTheDocument();
    expect(spanElement).toHaveClass("text-green-500");
  });

  it("renders with progress variant", () => {
    render(<Span variant="progress">Progress Message</Span>);

    const spanElement = screen.getByTestId("span")
    expect(spanElement).toBeInTheDocument();
    expect(spanElement).toHaveClass("text-sky-500");
  });

  it("renders with pending variant", () => {
    render(<Span variant="pending">Pending Message</Span>);

    const spanElement = screen.getByTestId("span")
    expect(spanElement).toBeInTheDocument();
    expect(spanElement).toHaveClass("text-amber-500");
  });

  it("renders with destructive variant", () => {
    render(<Span variant="destructive">Error Message</Span>);

    const spanElement = screen.getByTestId("span")
    expect(spanElement).toBeInTheDocument();
    expect(spanElement).toHaveClass("text-destructive");
  });

  it("applies additional class names", () => {
    render(<Span className="extra-class">Extra Class Test</Span>);

    const spanElement = screen.getByTestId("span")
    expect(spanElement).toBeInTheDocument();
    expect(spanElement).toHaveClass("extra-class");
  });
});
