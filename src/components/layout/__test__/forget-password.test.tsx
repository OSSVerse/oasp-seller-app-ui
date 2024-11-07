import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ForgetPassword from "../forget-password";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useModal } from "@/store/modal-store";

// Mock the `forgetPassword` function
vi.mock("@/services/authentication-services", () => ({
  forgetPassword: vi.fn().mockResolvedValue(true),
}));

// Mock the `useModal` hook
vi.mock("@/store/modal-store", () => ({
  useModal: vi.fn(),
}));

describe("ForgetPassword", () => {
  const closeMock = vi.fn();
  const backtoLoginMock = vi.fn();
  const onOpenMock = vi.fn();
  const onCloseMock = vi.fn();

  // Reset mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();

    // Configure `useModal` to return our mock functions
    useModal.mockReturnValue({
      onOpen: onOpenMock,
      onClose: onCloseMock,
    });
  });

  it("should render the input and buttons", () => {
    render(<ForgetPassword close={closeMock} backtoLogin={backtoLoginMock} />);

    expect(
      screen.getByPlaceholderText("Enter email address"),
    ).toBeInTheDocument();
    expect(screen.getByText("Reset Password")).toBeInTheDocument();
    expect(screen.getByText("Back to Login")).toBeInTheDocument();
  });

  it("should show error message for invalid email", async () => {
    render(<ForgetPassword close={closeMock} backtoLogin={backtoLoginMock} />);

    const input = screen.getByPlaceholderText("Enter email address");
    const button = screen.getByText("Reset Password");

    fireEvent.change(input, { target: { value: "invalid-email" } });
    fireEvent.click(button);

    expect(
      await screen.findByText("Invalid email address"),
    ).toBeInTheDocument();
  });

  it("should call backtoLogin when Back to Login button is clicked", () => {
    render(<ForgetPassword close={closeMock} backtoLogin={backtoLoginMock} />);

    const button = screen.getByText("Back to Login");
    fireEvent.click(button);

    expect(backtoLoginMock).toHaveBeenCalled();
  });

  it("calls onOpen with correct arguments on successful submission", async () => {
    render(<ForgetPassword close={closeMock} backtoLogin={backtoLoginMock} />);

    const input = screen.getByPlaceholderText("Enter email address");
    const button = screen.getByText("Reset Password");

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(onOpenMock).toHaveBeenCalledWith("confirmationDialog", {
        confirmationDialog: {
          title: "Reset Password",
          content:
            "A link has been sent to your email. Please check your inbox and follow the instructions.",
          onConfirm: expect.any(Function),
        },
      });
    });

    // Optionally, test the onConfirm function's behavior if needed
    onOpenMock.mock.calls[0][1].confirmationDialog.onConfirm();
    expect(onCloseMock).toHaveBeenCalled();
    expect(closeMock).toHaveBeenCalled();
  });
});
