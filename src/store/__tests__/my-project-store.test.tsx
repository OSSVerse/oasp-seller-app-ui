// myProjectStore.test.ts
import { describe, it, expect } from "vitest";
import { act } from "@testing-library/react";
import { useMyProject } from "../my-project-store";

describe("useMyProject Store", () => {
  it("should update currentStatus using updateCurrentStatus", () => {
    const { updateCurrentStatus } = useMyProject.getState();

    act(() => {
      updateCurrentStatus("new status");
    });

    const state = useMyProject.getState();
    expect(state.currentStatus).toBe("new status");
  });

  it("should set createProjectDetails correctly using setCreateProjectDetails", () => {
    const { setCreateProjectDetails } = useMyProject.getState();

    act(() => {
      setCreateProjectDetails({ productName: "Test Product", MRP: "100" });
    });

    const state = useMyProject.getState();
    expect(state.createProjectDetails.commonDetails.productName).toBe(
      "Test Product",
    );
    expect(state.createProjectDetails.commonDetails.MRP).toBe(100);
  });

  it("should reset createProjectDetails to initial state using resetCreateProjectDetails", () => {
    const { resetCreateProjectDetails } = useMyProject.getState();

    act(() => {
      resetCreateProjectDetails();
    });

    const state = useMyProject.getState();
    expect(state.createProjectDetails).toEqual({
      commonDetails: {
        productCode: "",
        productName: "",
        MRP: 0,
        purchasePrice: 0,
        productCategory: "OSS Project",
        productSubcategory1: "",
        longDescription: "",
        description: "",
        type: "item",
      },
    });
  });

  it("should update filters with new sort and toggle order correctly using setFilters", () => {
    const { setFilters } = useMyProject.getState();

    // First call to setFilters with new sort
    act(() => {
      setFilters({ sort: "Oldest" });
    });

    let state = useMyProject.getState();
    expect(state.filters.sort).toBe("Oldest");
    expect(state.filters.order).toBe(-1); // Default order after new sort

    // Second call to toggle order
    act(() => {
      setFilters({ sort: "Oldest" });
    });

    state = useMyProject.getState();
    expect(state.filters.order).toBe(1);

    // Third call to toggle order back
    act(() => {
      setFilters({ sort: "Oldest" });
    });

    state = useMyProject.getState();
    expect(state.filters.order).toBe(0);
  });
});
