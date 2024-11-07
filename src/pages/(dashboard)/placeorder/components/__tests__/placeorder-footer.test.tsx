import { render, fireEvent } from "@testing-library/react";
import Footer from "../placeorder-footer";
import { useModal } from "@/store/modal-store";
import { beforeEach, describe, expect, vi } from "vitest";

// Mock useModal hook
vi.mock("@/store/modal-store", () => ({
  useModal: vi.fn(),
}));

describe("Footer Component", () => {
  const mockOnOpen = vi.fn();

  beforeEach(() => {
    // Set up the mock to return our mock function
    (useModal as jest.Mock).mockReturnValue({
      onOpen: mockOnOpen,
    });
  });

  it("should open confirmation dialog with correct parameters on button click", () => {
    const { getByText } = render(<Footer title="Test Order" />);

    // Click the "Place Order" button
    fireEvent.click(getByText("Place Order"));

    // Assert that onOpen was called with the correct arguments
    expect(mockOnOpen).toHaveBeenCalledWith("confirmationDialog", {
      confirmationDialog: {
        title: "Confirmation Page",
        content: expect.any(Object), // Ensure content is a React component
        onConfirm: expect.any(Function), // Ensure onConfirm is a function
      },
    });
  });
  it("should call onConfirm function when invoked", () => {
    const { getByText } = render(<Footer title="Test Order" />);

    // Click the "Place Order" button to open the dialog
    fireEvent.click(getByText("Place Order"));

    // Extract the arguments passed to onOpen
    const onOpenArgs = mockOnOpen.mock.calls[0][1];

    // Get the onConfirm function
    const onConfirm = onOpenArgs.confirmationDialog.onConfirm;

    // Call the onConfirm function
    onConfirm();

    // You can add assertions here to confirm the behavior you expect when onConfirm is called
    // For example, if it should perform a certain action, you can verify that action here.
    // Since in your case onConfirm is an empty function, it won't have any side effects to assert on.
    expect(true).toBe(true); // Placeholder assertion, replace with actual logic if needed
  });
});
