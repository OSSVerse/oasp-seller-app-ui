import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import usePrevious from "../use-previous";

describe("usePrevious", () => {
  it("should return undefined on the first render", () => {
    const { result } = renderHook(() => usePrevious(0));
    expect(result.current).toBeUndefined(); // Should be undefined on the first render
  });

  it("should return the previous value after the value changes", () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 0 },
    });

    expect(result.current).toBeUndefined(); // First render returns undefined

    // Update the value
    rerender({ value: 1 });
    expect(result.current).toBe(0); // Should return the previous value

    // Update the value again
    rerender({ value: 2 });
    expect(result.current).toBe(1); // Should return the previous value
  });

  it("should return the previous value even if the value is the same", () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 0 },
    });

    // Update to a new value
    rerender({ value: 1 });
    expect(result.current).toBe(0); // First change

    // Re-render with the same value
    rerender({ value: 1 });
    expect(result.current).toBe(1); // Previous value remains the same
  });
});
