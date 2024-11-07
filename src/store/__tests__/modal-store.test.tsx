import { describe, it, expect } from "vitest";
import { act } from "@testing-library/react";
import { useModal } from "../modal-store";

describe("useModal Store", () => {
  it("should open the modal with correct type and data using onOpen", () => {
    const { onOpen } = useModal.getState();

    act(() => {
      onOpen("confirmationDialog", {
        confirmationDialog: {
          title: "Test Title",
          content: "Test Content",
          onConfirm: () => {},
          onClose: () => {},
          closeLabel: "Cancel",
          confirmLabel: "Confirm",
        },
      });
    });

    const state = useModal.getState();
    expect(state.isOpen).toBe(true);
    expect(state.type).toBe("confirmationDialog");
    expect(state.data).toEqual({
      confirmationDialog: {
        title: "Test Title",
        content: "Test Content",
        onConfirm: expect.any(Function),
        onClose: expect.any(Function),
        closeLabel: "Cancel",
        confirmLabel: "Confirm",
      },
    });
  });

  it("should close the modal and reset data using onClose", () => {
    const { onClose } = useModal.getState();

    act(() => {
      onClose();
    });

    const state = useModal.getState();
    expect(state.isOpen).toBe(false);
    expect(state.type).toBeNull();
    expect(state.data).toEqual({});
  });
});
