import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PlaceOrderConfirm from "../placeorder-comfirm";

describe("PlaceOrderConfirm", () => {
    const mockProps = {
        name: "Test Artifact",
        services: [
            { id: "1", name: "Service 1" },
            { id: "2", name: "Service 2" },
        ],
        osaps: [
            { id: "1", name: "OSAP 1" },
            { id: "2", name: "OSAP 2" },
        ],
        total_payment_amount: 1000,
    };

    it("renders summary paragraph", () => {
        render(<PlaceOrderConfirm {...mockProps} />);
        expect(
            screen.getByText(
                /Below are a summary of the artifact, selected services basedon selected OASPs, and pricing./i
            )
        ).toBeInTheDocument();
    });

    it("displays artifact name correctly", () => {
        render(<PlaceOrderConfirm {...mockProps} />);
        expect(screen.getByText("Artifact Name")).toBeInTheDocument();
        expect(screen.getByText("Test Artifact")).toBeInTheDocument();
    });

    it("displays all selected services", () => {
        render(<PlaceOrderConfirm {...mockProps} />);
        expect(screen.getByText("Selected Services")).toBeInTheDocument();
        expect(screen.getByText("Service 1")).toBeInTheDocument();
        expect(screen.getByText("Service 2")).toBeInTheDocument();
    });

    it("displays all selected OSAPs", () => {
        render(<PlaceOrderConfirm {...mockProps} />);
        expect(screen.getByText("Selected OSAPs")).toBeInTheDocument();
        expect(screen.getByText("OSAP 1")).toBeInTheDocument();
        expect(screen.getByText("OSAP 2")).toBeInTheDocument();
    });

    it("displays total pricing with currency symbol", () => {
        render(<PlaceOrderConfirm {...mockProps} />);
        expect(screen.getByText("Total Pricing")).toBeInTheDocument();
        expect(screen.getByText("₹1000")).toBeInTheDocument();
    });

    it("renders with empty services and osaps arrays", () => {
        const emptyProps = {
            ...mockProps,
            services: [],
            osaps: [],
        };
        render(<PlaceOrderConfirm {...emptyProps} />);
        expect(screen.getByText("Selected Services")).toBeInTheDocument();
        expect(screen.getByText("Selected OSAPs")).toBeInTheDocument();
    });
});
