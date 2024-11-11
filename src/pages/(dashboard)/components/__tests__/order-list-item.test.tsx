import { render, screen } from "@testing-library/react";
import OrderListItem from "../order-list-item";
import { BrowserRouter } from "react-router-dom";
import { calDiffDay } from "../../../../lib/utils";
import { beforeEach, expect, vi } from "vitest";

// Mock dependencies
vi.mock("../../../../lib/utils", () => ({
    calDiffDay: vi.fn(),
    cn: vi.fn(),
}));

vi.mock("../icons/ml-model-icon", () => ({
    __esModule: true,
    default: () => <span data-testid="ml-model-icon">ML Icon</span>,
}));

vi.mock("../ui/badge", () => ({
    Badge: ({ children, variant }) => (
        <div data-testid="badge" data-variant={variant}>
            {children}
        </div>
    ),
}));

vi.mock("../ui/button", () => ({
    Button: ({ children }) => <button>{children}</button>,
}));

vi.mock("../ui/card", () => ({
    Card: ({ children }) => <div data-testid="card">{children}</div>,
    CardContent: ({ children }) => <div>{children}</div>,
}));

vi.mock("./service-order-badge", () => ({
    __esModule: true,
    default: ({ serviceOrder }) => (
        <span data-testid="service-order-badge">{serviceOrder.productSubcategory1}</span>
    ),
}));

vi.mock("./deliver-due", () => ({
    __esModule: true,
    default: ({ dayDiff }) => <span data-testid="delivery-due">Due in {dayDiff} days</span>,
}));

// Mock order data
const mockOrder = {
    _id: "order123",
    createdAt: "2024-11-01",
    billing: {
        tax_number: "123456",
        phone: "9876543210",
    },
    items: [
        { descriptor: { name: "Service Name" }, productSubcategory1: "subcategory" },
    ],
    quote: { price: { value: "1000" } },
};

const mockTableHeaders = ["Service", "Price", "Due Date"];

describe("OrderListItem Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("renders the OrderListItem component with correct structure", () => {
        calDiffDay.mockReturnValue(2);

        render(
            <BrowserRouter>
                <OrderListItem order={mockOrder} tableHeaders={mockTableHeaders} />
            </BrowserRouter>
        );

        expect(screen.getByText("Service Name")).toBeInTheDocument();
        expect(screen.getByText("Request #123456 . 9876543210")).toBeInTheDocument();
        expect(screen.getByText("₹1000")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "View Details" })).toBeInTheDocument();
    });




    test("renders ServiceOrderBadge components for each item in the order", () => {
        render(
            <BrowserRouter>
                <OrderListItem order={mockOrder} tableHeaders={mockTableHeaders} />
            </BrowserRouter>
        );

        // expect(screen.getAllByTestId("service-order-badge").length).toBe(mockOrder.items.length);
        expect(screen.getByText("subcategory")).toBeInTheDocument();
    });

    test("displays the correct link to order details based on order ID", () => {
        render(
            <BrowserRouter>
                <OrderListItem order={mockOrder} tableHeaders={mockTableHeaders} />
            </BrowserRouter>
        );

        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", expect.stringContaining(`/order123`));
    });

    test("handles missing order data gracefully", () => {
        const incompleteOrder = { _id: "order123", items: [], quote: {} };

        render(
            <BrowserRouter>
                <OrderListItem order={incompleteOrder} tableHeaders={mockTableHeaders} />
            </BrowserRouter>
        );

        expect(screen.queryByText("Request #")).not.toBeInTheDocument();
        expect(screen.getByText("₹")).toBeInTheDocument(); // Default display for missing price
    });
});
