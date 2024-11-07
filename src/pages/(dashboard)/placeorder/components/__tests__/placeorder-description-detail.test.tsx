import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DescriptionDetail from "../placeorder-description-detail";

describe("DescriptionDetail", () => {
    const mockDescriptionDetail = {
        open_pilot: "This is an open pilot description",
        input: [
            {
                id: "1",
                title: "Input Title 1",
                lists: ["Input item 1", "Input item 2"],
            },
            {
                id: "2",
                title: "Input Title 2",
                lists: ["Input item 3", "Input item 4"],
            },
        ],
        output: "This is the output description",
        feature_enhancements: [
            {
                id: "3",
                title: "Enhancement Title 1",
                lists: ["Enhancement item 1", "Enhancement item 2"],
            },
        ],
    };

    it("renders all sections when all data is provided", () => {
        render(<DescriptionDetail description_detail={mockDescriptionDetail} />);

        // Check OpenPilot section
        expect(screen.getByText("OpenPilot")).toBeInTheDocument();
        expect(
            screen.getByText("This is an open pilot description"),
        ).toBeInTheDocument();

        // Check Input section
        expect(screen.getByText("Input")).toBeInTheDocument();
        expect(screen.getByText("Input Title 1")).toBeInTheDocument();
        expect(screen.getByText("Input item 1")).toBeInTheDocument();
        expect(screen.getByText("Input item 2")).toBeInTheDocument();
        expect(screen.getByText("Input Title 2")).toBeInTheDocument();
        expect(screen.getByText("Input item 3")).toBeInTheDocument();
        expect(screen.getByText("Input item 4")).toBeInTheDocument();

        // Check Output section
        expect(screen.getByText("Output")).toBeInTheDocument();
        expect(
            screen.getByText("This is the output description"),
        ).toBeInTheDocument();

        // Check Feature Enhancement section
        expect(screen.getByText("Feature Enhancement")).toBeInTheDocument();
        expect(screen.getByText("Enhancement Title 1")).toBeInTheDocument();
        expect(screen.getByText("Enhancement item 1")).toBeInTheDocument();
        expect(screen.getByText("Enhancement item 2")).toBeInTheDocument();
    });

    it("does not render OpenPilot section when open_pilot is empty", () => {
        const descriptionWithoutOpenPilot = {
            ...mockDescriptionDetail,
            open_pilot: "",
        };

        render(
            <DescriptionDetail description_detail={descriptionWithoutOpenPilot} />,
        );

        expect(screen.queryByText("OpenPilot")).not.toBeInTheDocument();
    });

    it("does not render Input section when input array is empty", () => {
        const descriptionWithoutInput = {
            ...mockDescriptionDetail,
            input: [],
        };

        render(<DescriptionDetail description_detail={descriptionWithoutInput} />);

        expect(screen.queryByText("Input")).not.toBeInTheDocument();
    });

    it("does not render Output section when output is empty", () => {
        const descriptionWithoutOutput = {
            ...mockDescriptionDetail,
            output: "",
        };

        render(<DescriptionDetail description_detail={descriptionWithoutOutput} />);

        expect(screen.queryByText("Output")).not.toBeInTheDocument();
    });

    it("does not render Feature Enhancement section when feature_enhancements is empty", () => {
        const descriptionWithoutEnhancements = {
            ...mockDescriptionDetail,
            feature_enhancements: [],
        };

        render(
            <DescriptionDetail description_detail={descriptionWithoutEnhancements} />,
        );

        expect(screen.queryByText("Feature Enhancement")).not.toBeInTheDocument();
    });

    // it("renders input items without lists when lists array is empty", () => {
    //     const descriptionWithEmptyLists = {
    //         ...mockDescriptionDetail,
    //         input: [
    //             {
    //                 id: "1",
    //                 title: "Input Title Without Lists",
    //                 lists: [],
    //             },
    //         ],
    //     };

    //     render(
    //         <MemoryRouter>
    //             <DescriptionDetail description_detail={descriptionWithEmptyLists} />
    //         </MemoryRouter>,
    //     );

    //     expect(screen.getByText("Input Title Without Lists")).toBeInTheDocument();
    //     expect(screen.queryByRole("list")).not.toBeInTheDocument();
    // });
});
