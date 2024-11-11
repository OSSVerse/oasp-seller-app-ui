import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ChangePasswordModal from "../chnage-password-modal";
import { useModal } from "../../../store/modal-store";
import { changePassword } from "../../../services/authentication-services";
import { vi, describe, test, expect, beforeEach } from "vitest";
import "@testing-library/jest-dom";

// Mock useModal hook to control the modal state
vi.mock("../../../store/modal-store", () => ({
    useModal: vi.fn(),
}));

// Mock changePassword service
vi.mock("../../../services/authentication-services", () => ({
    changePassword: vi.fn(),
}));

describe("ChangePasswordModal", () => {
    const mockOnClose = vi.fn();

    beforeEach(() => {
        // Reset mocks and set up default mock state
        vi.clearAllMocks();
        useModal.mockReturnValue({
            isOpen: true,
            onClose: mockOnClose,
            type: "changePassword",
        });
    });

    test("should not render if the modal is not open", () => {
        useModal.mockReturnValue({
            isOpen: false,
            onClose: mockOnClose,
            type: "changePassword",
        });

        const { queryByTestId } = render(<ChangePasswordModal />);
        expect(queryByTestId("change-password-modal")).toBeNull();
    });

    test("should render correctly when modal is open", () => {
        render(<ChangePasswordModal />);
        // expect(screen.getByText("Change Password")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Username or Email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("New Password")).toBeInTheDocument();
    });

    test("should show validation error when fields are empty", async () => {
        render(<ChangePasswordModal />);

        fireEvent.click(screen.getByRole("button", { name: /change password/i }));

        await waitFor(() => {
            expect(screen.getByText("Username or Email is required")).toBeInTheDocument();
            expect(screen.getByText("Password is required")).toBeInTheDocument();
            expect(screen.getByText("New Password is required")).toBeInTheDocument();
        });
    });

    test("should call changePassword and close modal on successful submit", async () => {
        changePassword.mockResolvedValueOnce({}); // Mock successful password change

        render(<ChangePasswordModal />);

        fireEvent.change(screen.getByPlaceholderText("Username or Email"), {
            target: { value: "user@example.com" },
        });
        fireEvent.change(screen.getByPlaceholderText("Password"), {
            target: { value: "oldpassword" },
        });
        fireEvent.change(screen.getByPlaceholderText("New Password"), {
            target: { value: "newpassword" },
        });

        fireEvent.click(screen.getByRole("button", { name: /change password/i }));

        await waitFor(() => {
            expect(changePassword).toHaveBeenCalledWith({
                email: "user@example.com",
                password: "oldpassword",
                newPassword: "newpassword",
            });
            expect(mockOnClose).toHaveBeenCalled();
        });
    });

    test("should handle errors when changePassword fails", async () => {
        changePassword.mockRejectedValueOnce(new Error("Password change failed"));

        render(<ChangePasswordModal />);

        fireEvent.change(screen.getByPlaceholderText("Username or Email"), {
            target: { value: "user@example.com" },
        });
        fireEvent.change(screen.getByPlaceholderText("Password"), {
            target: { value: "oldpassword" },
        });
        fireEvent.change(screen.getByPlaceholderText("New Password"), {
            target: { value: "newpassword" },
        });

        fireEvent.click(screen.getByRole("button", { name: /change password/i }));

        await waitFor(() => {
            expect(changePassword).toHaveBeenCalledWith({
                email: "user@example.com",
                password: "oldpassword",
                newPassword: "newpassword",
            });
            expect(mockOnClose).not.toHaveBeenCalled();
        });
    });

    test("should disable the submit button when isSubmitting is true", async () => {
        render(<ChangePasswordModal />);

        fireEvent.change(screen.getByPlaceholderText("Username or Email"), {
            target: { value: "user@example.com" },
        });
        fireEvent.change(screen.getByPlaceholderText("Password"), {
            target: { value: "oldpassword" },
        });
        fireEvent.change(screen.getByPlaceholderText("New Password"), {
            target: { value: "newpassword" },
        });

        fireEvent.click(screen.getByRole("button", { name: /change password/i }));

        expect(screen.getByRole("button", { name: /changing.../i })).toBeDisabled();
    });
});
