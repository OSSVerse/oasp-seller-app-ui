// validationOrderStore.test.ts
import { describe, it, expect } from "vitest";
import { act } from "@testing-library/react";
import { useAssessmentOrder } from "../assessment-order-store";

describe("useAssessmentOrder Store", () => {
  it("should update currentStatus correctly using updateCurrentStatus", () => {
    const { updateCurrentStatus } = useAssessmentOrder.getState();

    act(() => {
      updateCurrentStatus("new status");
    });

    const state = useAssessmentOrder.getState();

    expect(state.currentStatus).toBe("new status");
  });
});
