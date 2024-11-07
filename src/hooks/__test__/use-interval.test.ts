import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import useInterval from "../use-interval";

describe("useInterval", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("should call the callback at the specified interval", () => {
    const callback = vi.fn();
    renderHook(() => useInterval(callback, 1000));

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(callback).toHaveBeenCalledTimes(3);
  });

  it("should not call the callback before the specified delay", () => {
    const callback = vi.fn();
    renderHook(() => useInterval(callback, 1000));

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(callback).toHaveBeenCalledTimes(0);
  });

  it("should clear the interval when delay is null", () => {
    const callback = vi.fn();
    const { rerender } = renderHook(
      ({ delay }) => useInterval(callback, delay),
      {
        initialProps: { delay: 1000 },
      },
    );

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(callback).toHaveBeenCalledTimes(2);

    rerender({ delay: null });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(callback).toHaveBeenCalledTimes(2);
  });
});
