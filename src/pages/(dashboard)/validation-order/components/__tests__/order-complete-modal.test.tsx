import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import OrderComplete from "../order-complete-modal";
import * as utils from "@/lib/utils";

describe("OrderComplete", () => {
    it("renders success message correctly", () => {
        render(<OrderComplete />);

        expect(screen.getByText(/Your recent validation has been reviewed and approved by the client/i))
            .toBeInTheDocument();
        expect(screen.getByText(/The payment is available in your account/i))
            .toBeInTheDocument();
    });

    it("displays timestamp with correct timezone", () => {
        // Mock the date utils
        const mockDate = "2024-03-15 10:30 AM";
        const mockTimeZone = "EDT";

        vi.spyOn(utils, "getDateInTimeZone").mockReturnValue(mockDate);
        vi.spyOn(utils, "getTimeZoneName").mockReturnValue(mockTimeZone);

        render(<OrderComplete />);

        expect(screen.getByText("Timestamp")).toBeInTheDocument();
        expect(screen.getByText(`${mockDate} ${mockTimeZone}`)).toBeInTheDocument();
    });

    // it("renders clock icon", () => {
    //     render(<OrderComplete />);

    //     const clockIcon = screen.getByTestId("icon-clock");
    //     expect(clockIcon).toBeInTheDocument();
    // });
});
