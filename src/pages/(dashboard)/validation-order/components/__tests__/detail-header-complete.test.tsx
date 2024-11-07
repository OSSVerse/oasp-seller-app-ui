import { render, screen } from "@testing-library/react";
import DetailHeaderComplete from "../detail-header-complete";
import { getDateInTimeZone, getTimeZoneName } from "@/lib/utils";
import { TIME_ZONE } from "@/lib/constant";
import { vi } from "vitest";

// Mock the entire utils module
vi.mock("@/lib/utils", () => ({
    getDateInTimeZone: vi.fn(),
    getTimeZoneName: vi.fn(),
    cn: (...inputs: any) => inputs.join(' '), // Add mock implementation for cn
}));

describe("DetailHeaderComplete", () => {
    beforeEach(() => {
        vi.mocked(getDateInTimeZone).mockReturnValue("2024-03-20");
        vi.mocked(getTimeZoneName).mockReturnValue("EST");
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("renders all elements correctly", () => {
        const currentStatus = "Completed";
        render(<DetailHeaderComplete currentStatus={currentStatus} />);

        // Check if date and timezone are rendered
        expect(screen.getByText("2024-03-20 EST")).toBeInTheDocument();

        // Check if status is rendered
        expect(screen.getByText("Completed")).toBeInTheDocument();

        // Check if View Response button is rendered
        const button = screen.getByRole("button", { name: /view response/i });
        expect(button).toBeInTheDocument();

        // Check if separator is rendered
        expect(screen.getByRole("separator")).toBeInTheDocument();
    });

    it("calls date utility functions with correct parameters", () => {
        render(<DetailHeaderComplete currentStatus="Completed" />);

        expect(getDateInTimeZone).toHaveBeenCalledWith(expect.any(Date), TIME_ZONE.EST);
        expect(getTimeZoneName).toHaveBeenCalledWith(TIME_ZONE.EST, expect.any(Date));
    });
});
