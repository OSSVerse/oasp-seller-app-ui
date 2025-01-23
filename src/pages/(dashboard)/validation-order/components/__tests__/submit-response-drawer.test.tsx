import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import SubmitResponseDrawer from "../submit-response-drawer";
import { useModal } from "@/store/modal-store";
import { useValidationOrder } from "@/store/validation-order-store";

// Mock the stores
vi.mock("@/store/modal-store");
vi.mock("@/lib/constant");
vi.mock("@/store/validation-order-store");

// Mock sample order data
const mockOrder = {
  type: "VALIDATION",
  title: "Test Order",
  requestId: "REQ123",
  buyer: "John Doe",
};

describe("SubmitResponseDrawer", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();

    // Setup default mock implementations
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        (useModal as any).mockReturnValue({
      onOpen: vi.fn(),
      onClose: vi.fn(),
    });
    const mockUpdateCurrentStatus = vi.fn();

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (useValidationOrder as any).mockReturnValue({
      currentStatus: "",
      updateCurrentStatus: mockUpdateCurrentStatus,
    });
  });

  // it("renders the component with order details", () => {
  //     render(
  //         <MemoryRouter>
  //             <SubmitResponseDrawer order={mockOrder} />
  //         </MemoryRouter>
  //     );
  //     screen.debug()

  //     expect(screen.getByText("Test Order")).toBeInTheDocument();
  //     expect(screen.getByText("REQ123")).toBeInTheDocument();
  //     expect(screen.getByText("John Doe")).toBeInTheDocument();
  // });

  it("shows validation buttons initially", () => {
    render(<SubmitResponseDrawer order={mockOrder} />);

    expect(screen.getByText("Valid Assessment")).toBeInTheDocument();
    expect(screen.getByText("Invalid Assessment")).toBeInTheDocument();
  });

  it("shows form when Valid Assessment is clicked", () => {
    render(<SubmitResponseDrawer order={mockOrder} />);
    fireEvent.click(screen.getByText("Valid Assessment"));
    expect(screen.getByLabelText("Notes")).toBeInTheDocument();
  });

  it("submits form and triggers modals in sequence", async () => {
    const { onOpen, updateCurrentStatus } = useModal();
    render(<SubmitResponseDrawer order={mockOrder} />);

    fireEvent.click(screen.getByText("Valid Assessment"));

    await waitFor(() => {
      expect(screen.getByLabelText("Notes")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText("Notes"), {
      target: { value: "Test notes" },
    });
    fireEvent.submit(screen.getByRole("form"));

    // Here you may need to simulate updating responseData
    // For example, if you can trigger that in the SubmitResponseDrawer component, do that
    // You might need to create a mock state and pass it down to the component if applicable

    // Verify first modal after form submission
    await waitFor(() => {
      expect(onOpen).toHaveBeenCalledWith("confirmationDialog", {
        confirmationDialog: expect.objectContaining({
          title: "Response Successful",
          content: expect.anything(), // Adjust according to your content expectation
        }),
      });
    });
    // fireEvent.click(await screen.findByText("Close"));
    // expect(updateCurrentStatus).toHaveBeenCalledWith(ORDER_STATUS.RESPONSE_SUBMITTED);

    // Verify second modal (after timeout)
    // await waitFor(() => {
    //     expect(onOpen).toHaveBeenCalledTimes(1);
    //     expect(updateCurrentStatus).toHaveBeenCalledWith(ORDER_STATUS.COMPLETED_ORDER);
    // }, { timeout: 4000 });
  });

  it("cancels form when Cancel button is clicked", () => {
    render(<SubmitResponseDrawer order={mockOrder} />);

    // Show form
    fireEvent.click(screen.getByText("Valid Assessment"));
    expect(screen.getByLabelText("Notes")).toBeInTheDocument();

    // Click cancel
    fireEvent.click(screen.getByText("Cancel"));

    // Form should be hidden
    expect(screen.queryByLabelText("Notes")).not.toBeInTheDocument();
  });

  it("validates required notes field", async () => {
    render(<SubmitResponseDrawer order={mockOrder} />);
    fireEvent.click(screen.getByText("Valid Assessment"));
    fireEvent.submit(screen.getByRole("form"));
    expect(screen.getByLabelText("Notes")).toBeInvalid();
  });

  it("disables Invalid Assessment button when Valid Assessment is selected", () => {
    render(<SubmitResponseDrawer order={mockOrder} />);

    fireEvent.click(screen.getByText("Valid Assessment"));

    expect(screen.getByText("Invalid Assessment")).toBeDisabled();
  });
});
