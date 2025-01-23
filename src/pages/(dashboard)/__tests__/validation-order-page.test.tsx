import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ValidationOrderPage from "../validation-order/validation-order-page";
import { MemoryRouter } from "react-router-dom";
import { useOrders } from "@/services/orders-service";

// Mock the useOrders hook
vi.mock("@/services/orders-service", () => ({
    useOrders: vi.fn(),
}));

const mockOrders = {
    data: {
        data: [
            {
                _id: "5bfe47c1-9d56-45bf-bb29-54b33b53c62d",
                billing: {
                    tax_number: "22AAAAA0000A1Z5",
                    phone: "0987654321",
                    email: "openfort@example.com",
                    created_at: "2024-10-25T13:23:14.433Z",
                    updated_at: "2024-10-25T13:23:14.433Z",
                },
                items: [
                    {
                        descriptor: {
                            name: "Happy-1",
                        },
                        price: {
                            currency: "INR",
                            value: "500",
                        },
                        category_id: "OSS Project",
                        productSubcategory1: "sub cate-1",
                        description: "desc-1",
                        longDescription: "desc details",
                        quantity: {
                            count: 1,
                            measure: {
                                unit: "Unit-count",
                                value: 1,
                            },
                        },
                        details: null,
                    },
                ],
                quote: {
                    ttl: "P1D",
                    price: {
                        value: "500",
                        currency: "INR",
                    },
                    breakup: [
                        {
                            item: {
                                price: {
                                    value: "500",
                                    currency: "INR",
                                },
                            },
                            price: {
                                value: "500",
                                currency: "INR",
                            },
                            title: "Happy-1",
                            "@ondc/org/item_id": "8bf47283-7151-4971-b6d7-20a6b9f066cb",
                            "@ondc/org/title_type": "item",
                            "@ondc/org/item_quantity": {
                                count: 1,
                            },
                        },
                        {
                            price: {
                                value: "0",
                                currency: "INR",
                            },
                            title: "Delivery charges",
                            "@ondc/org/item_id": "fullfillment_id_0",
                            "@ondc/org/title_type": "delivery",
                        },
                    ],
                },
                fulfillments: [],
                payment: {
                    "@ondc/org/settlement_details": [
                        {
                            bank_name: "Bank of Springfield",
                            branch_name: "Main Branch",
                            settlement_type: "neft",
                            beneficiary_name: "openfort",
                            settlement_phase: "sale-amount",
                            settlement_ifsc_code: "IFSC0001234",
                            settlement_counterparty: "seller-app",
                            settlement_bank_account_no: "1234567890",
                        },
                    ],
                    "@ondc/org/buyer_app_finder_fee_type": "Percent",
                    "@ondc/org/buyer_app_finder_fee_amount": "3.0",
                },
                state: "Completed Order",
                orderId:
                    "order-$2a$10$J6GW6Zs9Y6oMjc88aHl4cOD57npAwopKUo5y0pZVJ8mat1REbtUEK",
                createdOn: "2024-10-25T13:23:14.433Z",
                organization: {
                    _id: "9356f300-050d-4799-9064-2596f72c9a7c",
                    name: "Openfort",
                    storeDetails: {
                        fulfillments: [],
                        custom_area: [],
                    },
                },
                createdAt: "2024-10-25T13:23:24.449Z",
                updatedAt: "2024-10-25T13:25:19.284Z",
                __v: 0,
            },
        ],
    },
};

describe("ValidationOrderPage", () => {
    beforeEach(() => {
        // Setup default mock implementation
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                (useOrders as any).mockReturnValue({ data: mockOrders.data });
    });

    it("renders the page title correctly", () => {
        render(
            <MemoryRouter>
                <ValidationOrderPage />
            </MemoryRouter>,
        );
        screen.debug();
        expect(screen.getByTestId("page-title")).toBeInTheDocument();
    });

    it("renders search input", () => {
        render(
            <MemoryRouter>
                <ValidationOrderPage />
            </MemoryRouter>,
        );
        expect(
            screen.getByPlaceholderText("Search by Order/Business Name or #.."),
        ).toBeInTheDocument();
    });

    // it("toggles between grid and list view", () => {
    //     render(
    //         <MemoryRouter>
    //             <ValidationOrderPage />
    //         </MemoryRouter>
    //     );

    //     const listButton = screen.getByTestId("list-view-button");

    //     fireEvent.click(listButton);
    //     screen.debug()
    //     expect(screen.getByTestId("grid-view")).toBeInTheDocument();
    //     const gridButton = screen.getByTestId("grid-view-button");
    //     fireEvent.click(gridButton);
    //     expect(screen.getByTestId("list-view")).toBeInTheDocument();
    // });

    it("renders order tabs with correct counts", () => {
        render(
            <MemoryRouter>
                <ValidationOrderPage />
            </MemoryRouter>,
        );

        expect(screen.getByText("Pending")).toBeInTheDocument();
        expect(screen.getByText("Rejected")).toBeInTheDocument();
        expect(screen.getByText("Accepted")).toBeInTheDocument();
        expect(screen.getByText("Completed")).toBeInTheDocument();
    });

    // it("renders filter and sort buttons", () => {
    //     render(
    //         <MemoryRouter>
    //             <ValidationOrderPage />
    //         </MemoryRouter>
    //     );

    //     expect(screen.getByText("Filter")).toBeInTheDocument();
    //     expect(screen.getByText("Sort By")).toBeInTheDocument();
    // });

    // it("displays orders from the API", () => {
    //     render(
    //         <MemoryRouter>
    //             <ValidationOrderPage />
    //         </MemoryRouter>
    //     );

    //     expect(screen.getByText("AutoSync Project")).toBeInTheDocument();
    //     expect(screen.getByText("Business ABC")).toBeInTheDocument();
    // });

    // it("handles empty orders state", () => {
    //     (useOrders as any).mockReturnValue({ data: { data: [] } });

    //     render(
    //         <MemoryRouter>
    //             <ValidationOrderPage />
    //         </MemoryRouter>
    //     );

    //     // Verify that the page still renders without orders
    //     expect(screen.getByText("Validation Orders")).toBeInTheDocument();
    // });

    // it("toggles filter when filter button is clicked", () => {
    //     render(
    //         <MemoryRouter>
    //             <ValidationOrderPage />
    //         </MemoryRouter>
    //     );

    //     const filterButton = screen.getByText("Filter");
    //     fireEvent.click(filterButton);

    //     // You might want to add specific assertions here based on what should change
    //     // when the filter is toggled
    // });
});
