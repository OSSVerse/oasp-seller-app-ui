import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useRef } from "react";
import useOnClickOutside from "../use-onclick-outside";

describe("useOnClickOutside", () => {
  it("should call handler when clicking outside of the ref element", () => {
    const handler = vi.fn(); // Mock function to track calls
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      useOnClickOutside(ref, handler);
      return ref;
    });

    // Create a div element and attach the ref
    const div = document.createElement("div");
    result.current.current = div;

    // Append the div to the document body to ensure it's in the DOM
    document.body.appendChild(div);

    // Simulate a click outside the ref element
    act(() => {
      document.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });

    // Assert that the handler was called
    expect(handler).toHaveBeenCalledTimes(1);

    // Clean up the div element from the document body
    document.body.removeChild(div);
  });

  it("should not call handler when clicking inside the ref element", () => {
    const handler = vi.fn(); // Mock function to track calls
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      useOnClickOutside(ref, handler);
      return ref;
    });

    // Create a div element and attach the ref
    const div = document.createElement("div");
    result.current.current = div;

    // Append the div to the document body
    document.body.appendChild(div);

    // Simulate a click inside the ref element
    act(() => {
      div.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });

    // Assert that the handler was not called
    expect(handler).toHaveBeenCalledTimes(0);

    // Clean up the div element from the document body
    document.body.removeChild(div);
  });
});
