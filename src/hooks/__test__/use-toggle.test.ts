import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import useToggle from "../use-toggle"; // Adjust the import path as necessary

describe("useToggle", () => {
  it("should initialize with the initial value", () => {
    const { result } = renderHook(() => useToggle(false));
    const [value] = result.current;

    expect(value).toBe(false); // Should start with the initial value (false)
  });

  it("should toggle the value when the toggle function is called", () => {
    const { result } = renderHook(() => useToggle(false));

    // Call the toggle function
    const [, toggle] = result.current;
    act(() => {
      toggle(); // First toggle
    });

    let [value] = result.current;
    expect(value).toBe(true); // After first toggle, value should be true

    act(() => {
      toggle(); // Second toggle
    });

    [value] = result.current;
    expect(value).toBe(false); // After second toggle, value should revert to false
  });

  it("should work with an initial value of true", () => {
    const { result } = renderHook(() => useToggle(true));
    const [value] = result.current;

    expect(value).toBe(true); // Should start with the initial value (true)
  });

  it("should toggle back and forth correctly with initial value of true", () => {
    const { result } = renderHook(() => useToggle(true));

    // Call the toggle function
    const [, toggle] = result.current;
    act(() => {
      toggle(); // First toggle
    });

    let [value] = result.current;
    expect(value).toBe(false); // After first toggle, value should be false

    act(() => {
      toggle(); // Second toggle
    });

    [value] = result.current;
    expect(value).toBe(true); // After second toggle, value should revert to true
  });
});
