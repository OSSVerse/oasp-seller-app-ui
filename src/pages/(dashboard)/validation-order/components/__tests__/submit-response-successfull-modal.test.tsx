import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SubmitResponseSuccessfull from "../submit-response-successfull-modal";
import { TIME_ZONE } from "@/lib/constant";
import * as utils from "@/lib/utils";

describe("SubmitResponseSuccessfull", () => {
    it("renders success messages correctly", () => {
        render(<SubmitResponseSuccessfull />);

        expect(screen.getByText("Your response has been submitted successfully")).toBeInTheDocument();
        expect(screen.getByText("Thank you.")).toBeInTheDocument();
        expect(screen.getByText("Timestamp")).toBeInTheDocument();
    });

    it("displays correct timestamp with timezone", () => {
        // Mock the date utils
        const mockDate = "2024-03-15 10:30 AM";
        const mockTimeZone = "EDT";

        vi.spyOn(utils, "getDateInTimeZone").mockReturnValue(mockDate);
        vi.spyOn(utils, "getTimeZoneName").mockReturnValue(mockTimeZone);

        render(<SubmitResponseSuccessfull />);

        // Check if the mocked date and timezone are displayed
        expect(screen.getByText(`${mockDate} ${mockTimeZone}`)).toBeInTheDocument();

        // Verify the utils were called with correct parameters
        expect(utils.getDateInTimeZone).toHaveBeenCalledWith(expect.any(Date), TIME_ZONE.EST);
        expect(utils.getTimeZoneName).toHaveBeenCalledWith(TIME_ZONE.EST, expect.any(Date));
    });

    it("renders clock icon", () => {
        render(<SubmitResponseSuccessfull />);

        // Check if the icon is rendered with correct props
        const icon = screen.getByTestId("icon-clock");
        expect(icon).toBeInTheDocument();
    });
});
