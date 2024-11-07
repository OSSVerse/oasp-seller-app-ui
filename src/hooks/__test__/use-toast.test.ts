import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useToast, toast } from "../use-toast";

describe("useToast", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should dismiss a toast", () => {
    const { result } = renderHook(() => useToast());
    let toastId: string;

    act(() => {
      const { id } = result.current.toast({ title: "Test Toast" });
      toastId = id;
    });

    act(() => {
      result.current.dismiss(toastId);
    });

    expect(result.current.toasts[0].open).toBe(false);
  });

  it("should remove a toast after delay", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: "Test Toast" });
    });

    act(() => {
      result.current.dismiss();
    });

    act(() => {
      vi.advanceTimersByTime(1000001); // TOAST_REMOVE_DELAY + 1
    });

    expect(result.current.toasts).toHaveLength(0);
  });

  it("should limit the number of toasts to TOAST_LIMIT", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: "Toast 1" });
      result.current.toast({ title: "Toast 2" });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe("Toast 2");
  });

  it("should handle onOpenChange callback", () => {
    const { result } = renderHook(() => useToast());
    let toastId: string;

    act(() => {
      const { id } = result.current.toast({ title: "Test Toast" });
      toastId = id;
    });

    act(() => {
      const toast = result.current.toasts.find((t) => t.id === toastId);
      toast?.onOpenChange(false);
    });

    expect(result.current.toasts[0].open).toBe(false);
  });

  it("should not add to remove queue if toast already exists", () => {
    const { result } = renderHook(() => useToast());
    let toastId: string;

    act(() => {
      const { id } = result.current.toast({ title: "Test Toast" });
      toastId = id;
    });

    // Trigger dismiss
    act(() => {
      result.current.dismiss(toastId);
    });

    // Manually trigger the timeout to simulate the delay
    act(() => {
      vi.advanceTimersByTime(1000001);
    });

    // Now, if we call the same dismiss again, it should not add to the remove queue
    act(() => {
      result.current.dismiss(toastId);
    });

    // Expect toasts to be empty after the timeout
    expect(result.current.toasts).toHaveLength(0);
  });

  it("should update a toast", () => {
    const { result } = renderHook(() => useToast());
    let toastId: string;
  
    act(() => {
      const { id } = result.current.toast({ title: "Initial Toast" });
      toastId = id;
    });
  
    act(() => {
      const { update } = result.current.toast({ title: "Initial Toast" });
      update({ title: "Updated Toast" }); 
    });
  
    expect(result.current.toasts[0].title).toBe("Updated Toast");
  });

  it("should remove all toasts if toastId is undefined", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: "Toast 1" });
      result.current.toast({ title: "Toast 2" });
    });

    act(() => {
      result.current.dismiss(); // Dismiss all
    });

    act(() => {
      vi.advanceTimersByTime(1000001); // Ensure the time passes for removal
    });

    expect(result.current.toasts).toHaveLength(0);
  });
});

describe("toast function", () => {
  it("should return an object with id, dismiss, and update methods", () => {
    const result = toast({ title: "Test Toast" });

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("dismiss");
    expect(result).toHaveProperty("update");
    expect(typeof result.id).toBe("string");
    expect(typeof result.dismiss).toBe("function");
    expect(typeof result.update).toBe("function");
  });
});
