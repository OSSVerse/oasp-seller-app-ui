import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import useDebounce from "../use-debounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("should initialize with the initial value", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));
    const [debouncedValue] = result.current;

    expect(debouncedValue).toBe("initial");
  });

  it("should update the debounced value after the specified delay", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));
    const [, setValue] = result.current;

    act(() => {
      setValue("updated");
      vi.advanceTimersByTime(500);
    });

    const [debouncedValue] = result.current;
    expect(debouncedValue).toBe("initial");

    act(() => {
      vi.advanceTimersByTime(500);
    });

    const [updatedDebouncedValue] = result.current;
    expect(updatedDebouncedValue).toBe("updated");
  });

  it("should not update the debounced value before the specified delay", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));
    const [, setValue] = result.current;

    act(() => {
      setValue("updated");
      vi.advanceTimersByTime(300);
    });

    const [debouncedValue] = result.current;
    expect(debouncedValue).toBe("initial");
  });
});
