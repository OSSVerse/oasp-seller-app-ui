import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Uploader from "../uploader";

describe("Uploader", () => {
    const mockOnFilesSelected = vi.fn();
    const defaultProps = {
        ID: "test-uploader",
        options: {
            type: "image",
            multiple: false,
            allowed: "image/*",
        },
        onFilesSelected: mockOnFilesSelected,
    };

    beforeEach(() => {
        mockOnFilesSelected.mockClear();
    });

    it("renders uploader component", () => {
        render(<Uploader {...defaultProps} />);
        expect(
            screen.getByTestId("drag-drop-text")
        ).toBeInTheDocument();
        // expect(screen.getByText("(File type image)")).toBeInTheDocument();
    });





    it('handles file selection', () => {
        render(<Uploader {...defaultProps} />);
        const input = screen.getByTestId("file-input");
        const file = new File(['test'], 'test.png', { type: 'image/png' });
        fireEvent.change(input, { target: { files: [file] } });
        expect(mockOnFilesSelected).toHaveBeenCalledWith([file]);
    });

    it('displays selected file name', async () => {
        render(<Uploader {...defaultProps} />);
        const input = screen.getByTestId("file-input");
        const file = new File(['test'], 'test.png', { type: 'image/png' });
        fireEvent.change(input, { target: { files: [file] } });
        expect(await screen.findByText('test.png')).toBeInTheDocument();
    });

    it('allows multiple file selection when multiple option is true', () => {
        const multipleProps = { ...defaultProps, options: { ...defaultProps.options, multiple: true } };
        render(<Uploader {...multipleProps} />);
        const input = screen.getByTestId("file-input");
        const file1 = new File(['test1'], 'test1.png', { type: 'image/png' });
        const file2 = new File(['test2'], 'test2.png', { type: 'image/png' });
        fireEvent.change(input, { target: { files: [file1] } });
        fireEvent.change(input, { target: { files: [file2] } });
        expect(mockOnFilesSelected).toHaveBeenCalledWith([file1, file2]);
    });

    it('removes file when remove icon is clicked', async () => {
        render(<Uploader {...defaultProps} />);
        const input = screen.getByTestId("file-input");
        const file = new File(['test'], 'test.png', { type: 'image/png' });
        fireEvent.change(input, { target: { files: [file] } });
        const removeIcon = await screen.findByTestId('x-icon');
        fireEvent.click(removeIcon);
        expect(screen.queryByText('test.png')).not.toBeInTheDocument();
        expect(mockOnFilesSelected).toHaveBeenCalledWith([]);
    });

    // Add more tests as needed for other functionalities like drag and drop, file type handling, etc.
});
