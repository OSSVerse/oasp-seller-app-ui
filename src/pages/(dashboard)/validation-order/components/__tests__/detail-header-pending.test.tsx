import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import DetailHeaderPending from "../detail-header-pending";
import { useModal } from "@/store/modal-store";

// Mock the useModal hook
vi.mock("@/store/modal-store", () => ({
    useModal: vi.fn(),
}));

const mockOrder = {
    id: "123",
    title: "Test Order",
    status: "PENDING",
    createdAt: "2024-03-20",
    // Add other required order properties as needed
};

describe("DetailHeaderPending", () => {
    it("renders current status and upload button", () => {
        const mockOnOpen = vi.fn();
        (useModal as any).mockReturnValue({ onOpen: mockOnOpen });

        render(
            <DetailHeaderPending currentStatus="In Progress" order={mockOrder} />
        );

        // Check if status text is rendered
        expect(screen.getByText("In Progress")).toBeInTheDocument();

        // Check if upload button is rendered
        expect(screen.getByText("Upload Deliverable")).toBeInTheDocument();
    });

    it("opens drawer when upload button is clicked", async () => {
        const mockOnOpen = vi.fn();
        (useModal as any).mockReturnValue({ onOpen: mockOnOpen });
        const user = userEvent.setup();

        render(
            <DetailHeaderPending currentStatus="In Progress" order={mockOrder} />
        );

        // Click the upload button
        const uploadButton = screen.getByText("Upload Deliverable");
        await user.click(uploadButton);

        // Verify that onOpen was called with correct arguments
        expect(mockOnOpen).toHaveBeenCalledWith("drawer", {
            drawer: {
                title: "Submit Response",
                content: expect.any(Object),
                showFooter: false,
            },
        });
    });

    it("renders separator between status and button", () => {
        const mockOnOpen = vi.fn();
        (useModal as any).mockReturnValue({ onOpen: mockOnOpen });

        render(
            <DetailHeaderPending currentStatus="In Progress" order={mockOrder} />
        );

        // Check if separator is rendered
        expect(screen.getByRole("separator")).toBeInTheDocument();
    });
});
