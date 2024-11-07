import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FormRow from "../form-row";
import { MDEditorWrapper } from "../markdown-editor";

// Mock the MDEditorWrapper component
vi.mock("../markdown-editor", () => ({
    MDEditorWrapper: vi
        .fn()
        .mockImplementation(({ value, onChange, name }) => (
            <textarea
                data-testid="md-editor"
                value={value}
                onChange={(e) => onChange(e.target.value, name)}
            />
        )),
}));

describe("FormRow", () => {
    const mockOnChange = vi.fn();

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("renders input type correctly", () => {
        render(
            <FormRow name="test" value="" onChange={mockOnChange}>
                Test Input
            </FormRow>,
        );

        const label = screen.getByText("Test Input");
        expect(label).toBeInTheDocument();

        const input = screen.getByPlaceholderText("Please enter test input");
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("type", "text");
        expect(input).toHaveAttribute("name", "test");
    });

    it("renders markdown editor when variant is MD", () => {
        render(
            <FormRow name="description" value="" onChange={mockOnChange} variant="MD">
                Description
            </FormRow>,
        );

        const label = screen.getByText("Description");
        expect(label).toBeInTheDocument();

        const editor = screen.getByTestId("md-editor");
        expect(editor).toBeInTheDocument();
    });

    it("handles input change correctly", () => {
        render(
            <FormRow name="test" value="" onChange={mockOnChange}>
                Test Input
            </FormRow>,
        );

        const input = screen.getByPlaceholderText("Please enter test input");
        fireEvent.change(input, { target: { value: "New Value" } });

        expect(mockOnChange).toHaveBeenCalledWith("New Value", "test");
    });

    it("handles markdown editor change correctly", () => {
        render(
            <FormRow name="description" value="" onChange={mockOnChange} variant="MD">
                Description
            </FormRow>,
        );

        const editor = screen.getByTestId("md-editor");
        fireEvent.change(editor, { target: { value: "New MD Value" } });

        expect(mockOnChange).toHaveBeenCalledWith("New MD Value", "description");
    });

    it("renders required input when specified", () => {
        render(
            <FormRow name="test" value="" onChange={mockOnChange} required>
                Required Input
            </FormRow>,
        );

        const input = screen.getByPlaceholderText("Please enter required input");
        expect(input).toHaveAttribute("required");
    });

    it("renders different input types correctly", () => {
        render(
            <FormRow name="email" value="" onChange={mockOnChange} type="email">
                Email Input
            </FormRow>,
        );

        const input = screen.getByPlaceholderText("Please enter email input");
        expect(input).toHaveAttribute("type", "email");
    });

    it("passes the correct props to MDEditorWrapper", () => {
        render(
            <FormRow
                name="description"
                value="Initial value"
                onChange={mockOnChange}
                variant="MD"
                required
            >
                Description
            </FormRow>,
        );

        expect(MDEditorWrapper).toHaveBeenCalledWith(
            expect.objectContaining({
                id: "description",
                required: true,
                placeholder: "Please enter description",
                value: "Initial value",
                name: "description",
            }),
            expect.anything(),
        );
    });
});
