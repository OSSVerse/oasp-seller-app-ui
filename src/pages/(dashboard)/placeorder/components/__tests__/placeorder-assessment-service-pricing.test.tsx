import { render, screen, } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AssessmentServicePricing from "../placeorder-assessment-service-pricing";
import { MemoryRouter } from "react-router-dom";

describe("AssessmentServicePricing", () => {
    const defaultProps = {
        type: "PROJECT",
        creator: "Test Creator",
        pricing_overall_info: ["Info 1", "Info 2"],
    };

    it("renders component with initial state", () => {
        render(<AssessmentServicePricing {...defaultProps} />);

        // Check if main headings are present
        expect(
            screen.getByText("OASP and Service List Provided"),
        ).toBeInTheDocument();
        expect(screen.getByText("Assessment Service Pricing")).toBeInTheDocument();
        expect(screen.getByText(defaultProps.creator)).toBeInTheDocument();

        // Check if pricing info badges are rendered
        // biome-ignore lint/complexity/noForEach: <explanation>
        defaultProps.pricing_overall_info.forEach((info) => {
            expect(screen.getByText(info)).toBeInTheDocument();
        });

        // Check if search inputs are present
        expect(screen.getByPlaceholderText("Search Service..")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Search OASP..")).toBeInTheDocument();
    });

    it("renders ML Model icon when type is MODEL", () => {
        render(
            <MemoryRouter>
                <AssessmentServicePricing {...defaultProps} type="MODEL" />
            </MemoryRouter>,
        );
        const mlModelIcon = screen.getByTestId("icon-MLModelIcon");
        expect(mlModelIcon).toBeInTheDocument();
    });

    it("renders Project icon when type is PROJECT", () => {
        render(
            <MemoryRouter>
                <AssessmentServicePricing {...defaultProps} type="PROJECT" />
            </MemoryRouter>,
        );
        const projectIcon = screen.getByTestId("icon-ProjectIcon");
        expect(projectIcon).toBeInTheDocument();
    });

    // it("calculates total amount correctly when services are selected", () => {
    //     render(
    //         <MemoryRouter>
    //             <AssessmentServicePricing {...defaultProps} />
    //         </MemoryRouter>,
    //     );

    //     // Find and click some service checkboxes
    //     const assessmentCheckbox = screen.getByRole("checkbox", {
    //         name: /Assessment/,
    //     });
    //     const attestationCheckbox = screen.getByRole("checkbox", {
    //         name: /Attestation/,
    //     });

    //     fireEvent.click(assessmentCheckbox);
    //     fireEvent.click(attestationCheckbox);

    //     // Check if total amount is calculated correctly (400 + 400 = 800)
    //     expect(screen.getAllByText("₹800")[0]).toBeInTheDocument();
    // });

    // it("limits OASP selection to maximum 2 items", () => {
    //     render(<AssessmentServicePricing {...defaultProps} />);

    //     // Select 3 OASPs
    //     // const tocomoCheckbox = screen.getByRole("checkbox", { name: /Tocomo/ });
    //     // const greenHilCheckbox = screen.getByRole("checkbox", { name: /GreenHil/ });
    //     // const innoTechCheckbox = screen.getByRole("checkbox", { name: /InnoTech/ });

    //     fireEvent.click(tocomoCheckbox);
    //     fireEvent.click(greenHilCheckbox);
    //     fireEvent.click(innoTechCheckbox);

    //     // Verify only 2 are selected by checking the total amount (400 + 400 = 800)
    //     expect(screen.getByText("₹800")).toBeInTheDocument();
    // });

    it("displays search inputs and filter button", () => {
        render(<AssessmentServicePricing {...defaultProps} />);

        const serviceSearchInput = screen.getByPlaceholderText("Search Service..");
        const oaspSearchInput = screen.getByPlaceholderText("Search OASP..");
        const filterButton = screen.getByRole("button", { name: /filter/i });

        expect(serviceSearchInput).toBeInTheDocument();
        expect(oaspSearchInput).toBeInTheDocument();
        expect(filterButton).toBeInTheDocument();
    });

    it("displays the recommendation criteria text", () => {
        render(<AssessmentServicePricing {...defaultProps} />);

        expect(screen.getByText(/Recommendation Criteria:/)).toBeInTheDocument();
        expect(
            screen.getByText(
                /Suitable expertise,95% successful track record or above, 4.8customer ratings or above and same geographical proximity./,
            ),
        ).toBeInTheDocument();
    });

    it("displays the OASP selection note", () => {
        render(<AssessmentServicePricing {...defaultProps} />);

        expect(
            screen.getByText(
                /Note: lf you want to change the OASP recommended by the platform, please uncheck it first and replace with your choice./,
            ),
        ).toBeInTheDocument();
    });
});
