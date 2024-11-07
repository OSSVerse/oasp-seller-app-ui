// validationOrderStore.test.ts
import { describe, it, expect } from "vitest";
import { act } from "@testing-library/react";
import { useValidationOrder } from "../validation-order-store";

describe("useValidationOrder Store", () => {
  it("should update currentStatus correctly using updateCurrentStatus", () => {
    const { updateCurrentStatus } = useValidationOrder.getState();

    act(() => {
      updateCurrentStatus("new status");
    });

    const state = useValidationOrder.getState();

    expect(state.currentStatus).toBe("new status");
  });
});
