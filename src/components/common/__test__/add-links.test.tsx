import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddLinks from "../add-links";
import { INVALID_URL_MESSAGE } from "@/lib/constant";

describe("AddLinks", () => {
    const mockSetLinks = vi.fn();
    let links: string[];

    beforeEach(() => {
        links = ["https://example.com"];
        vi.clearAllMocks();
    });

    it("renders the component with initial links", () => {
        render(<AddLinks links={links} setLinks={mockSetLinks} />);
        expect(screen.getByText("https://example.com")).toBeInTheDocument();
    });

    // it("adds a valid link when the button is clicked", async () => {
    //     render(<AddLinks links={links} setLinks={mockSetLinks} />);
    //     const input = screen.getByPlaceholderText("Type Here..");
    //     const addButton = screen.getByText("+ Link");

    //     await userEvent.type(input, "https://newexample.com");
    //     await userEvent.click(addButton);

    //     expect(mockSetLinks).toHaveBeenCalledWith(expect.arrayContaining([...links, "https://newexample.com"]));
    // });

    // it("adds a valid link when Enter key is pressed", async () => {
    //     render(<AddLinks links={links} setLinks={mockSetLinks} />);
    //     const input = screen.getByPlaceholderText("Type Here..");

    //     await userEvent.type(input, "https://newexample.com{enter}");

    //     expect(mockSetLinks).toHaveBeenCalledWith(expect.arrayContaining([...links, "https://newexample.com"]));
    // });

    it("displays an error message for invalid URLs", async () => {
        render(<AddLinks links={links} setLinks={mockSetLinks} />);
        const input = screen.getByPlaceholderText("Type Here..");

        await userEvent.type(input, "invalid-url");

        expect(screen.getByText(INVALID_URL_MESSAGE)).toBeInTheDocument();
    });

    it("removes a link when the remove icon is clicked", async () => {
        render(<AddLinks links={links} setLinks={mockSetLinks} />);
        const removeIcon = screen.getByTestId("x-icon");

        await userEvent.click(removeIcon);

        expect(mockSetLinks).toHaveBeenCalledWith(expect.arrayContaining([]));
    });

    it("disables the add button when input is empty", () => {
        render(<AddLinks links={links} setLinks={mockSetLinks} />);
        const addButton = screen.getByText("+ Link");

        expect(addButton).toBeDisabled();
    });

    it("disables the add button when input contains an invalid URL", async () => {
        render(<AddLinks links={links} setLinks={mockSetLinks} />);
        const input = screen.getByPlaceholderText("Type Here..");
        const addButton = screen.getByText("+ Link");

        await userEvent.type(input, "invalid-url");

        expect(addButton).toBeDisabled();
    });

    it("clears the input after adding a link", async () => {
        render(<AddLinks links={links} setLinks={mockSetLinks} />);
        const input = screen.getByPlaceholderText("Type Here..");
        const addButton = screen.getByText("+ Link");

        await userEvent.type(input, "https://newexample.com");
        await userEvent.click(addButton);

        expect(input).toHaveValue("");
    });
});
