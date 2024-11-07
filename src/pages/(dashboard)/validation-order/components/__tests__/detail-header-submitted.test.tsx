import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DetailHeaderSubmitted from "../detail-header-submitted";
import { getDateInTimeZone, getTimeZoneName } from "@/lib/utils";
import { TIME_ZONE } from "@/lib/constant";

describe("DetailHeaderSubmitted", () => {
    const mockCurrentStatus = "Validation Order Submitted";
    const mockDate = new Date("2024-03-20T10:00:00");
    const expectedDate = getDateInTimeZone(mockDate, TIME_ZONE.EST);
    const expectedTimeZone = getTimeZoneName(TIME_ZONE.EST, mockDate);

    it("renders all components correctly", () => {
        render(<DetailHeaderSubmitted currentStatus={mockCurrentStatus} />);

        // Check if the status text is rendered
        expect(screen.getByText(mockCurrentStatus)).toBeInTheDocument();

        // Check if the date and timezone are rendered
        // const dateElement = screen.getByText(new RegExp(`${expectedDate}.*${expectedTimeZone}`));
        // expect(dateElement).toBeInTheDocument();

        // Check if the View Response button is rendered with correct text and icon
        const button = screen.getByRole("button", { name: /view response/i });
        expect(button).toBeInTheDocument();
        expect(button.querySelector("svg")).toBeInTheDocument();
    });

    it("applies correct styling to status text", () => {
        render(<DetailHeaderSubmitted currentStatus={mockCurrentStatus} />);

        const statusElement = screen.getByText(mockCurrentStatus);
        expect(statusElement).toHaveClass("relative");
    });

    it("renders separator", () => {
        render(<DetailHeaderSubmitted currentStatus={mockCurrentStatus} />);

        const separator = screen.getByRole("separator");
        expect(separator).toBeInTheDocument();
        expect(separator).toHaveClass("h-5");
    });
});
