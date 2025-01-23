import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DashboardPage from "../dashboard-page";
import { BrowserRouter } from "react-router-dom";
import { useOrders } from "@/services/orders-service";

// Mock the orders service
vi.mock("@/services/orders-service", () => ({
    useOrders: vi.fn(),
}));

// Mock Chart.js to avoid canvas rendering issues in tests
vi.mock("chart.js", () => ({
    Chart: {
        register: vi.fn(),
    },
    CategoryScale: vi.fn(),
    LinearScale: vi.fn(),
    PointElement: vi.fn(),
    LineElement: vi.fn(),
    BarElement: vi.fn(),
    ArcElement: vi.fn(),
    Title: vi.fn(),
    Tooltip: vi.fn(),
    Legend: vi.fn(),
}));

// Mock react-chartjs-2 components
vi.mock("react-chartjs-2", () => ({
    Line: () => <div data-testid="line-chart">Line Chart</div>,
    Bar: () => <div data-testid="bar-chart">Bar Chart</div>,
}));

describe("DashboardPage", () => {
    beforeEach(() => {
        // Mock the useOrders hook with default data
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                (useOrders as any).mockReturnValue({
            data: {
                data: [
                    {
                        _id: "1",
                        state: "Created",
                        items: [{ descriptor: { name: "Test Order" } }],
                        createdAt: new Date().toISOString(),
                        quote: { price: { value: 1000 } },
                        billing: { email: "test@example.com" },
                    },
                ],
            },
        });
    });

    it("renders the dashboard page with main components", () => {
        render(
            <BrowserRouter>
                <DashboardPage />
            </BrowserRouter>
        );

        // Check if main stats cards are rendered
        expect(screen.getByText("Products Available")).toBeInTheDocument();
        expect(screen.getByText("Products Produced")).toBeInTheDocument();
        expect(screen.getByText("Orders Completed")).toBeInTheDocument();
    });

    it("displays correct stats values", () => {
        render(
            <BrowserRouter>
                <DashboardPage />
            </BrowserRouter>
        );

        expect(screen.getByText("956")).toBeInTheDocument(); // Products Available
        expect(screen.getByText("12")).toBeInTheDocument(); // Products Produced
    });

    it("renders charts correctly", () => {
        render(
            <BrowserRouter>
                <DashboardPage />
            </BrowserRouter>
        );

        const lineCharts = screen.getAllByTestId("line-chart");
        const barCharts = screen.getAllByTestId("bar-chart");

        expect(lineCharts.length).toBeGreaterThan(0);
        expect(barCharts.length).toBeGreaterThan(0);
    });

    it("renders orders in progress section", () => {
        render(
            <BrowserRouter>
                <DashboardPage />
            </BrowserRouter>
        );

        expect(screen.getAllByText("Test Order")[0]).toBeInTheDocument();
        expect(screen.getAllByText(/test@example.com/)[0]).toBeInTheDocument();
    });

    it("renders requests in progress section", () => {
        render(
            <BrowserRouter>
                <DashboardPage />
            </BrowserRouter>
        );

        expect(screen.getByText("Requests In Progress")).toBeInTheDocument();
        expect(screen.getByText("Rev Up Innovation")).toBeInTheDocument();
        expect(screen.getByText("Ignite Mobility")).toBeInTheDocument();
    });

    it("renders all tab options in orders section", () => {
        render(
            <BrowserRouter>
                <DashboardPage />
            </BrowserRouter>
        );

        expect(screen.getByText("Assessment")).toBeInTheDocument();
        expect(screen.getByText("Validation")).toBeInTheDocument();
        expect(screen.getByText("Remediation")).toBeInTheDocument();
        expect(screen.getByText("Pen Testing")).toBeInTheDocument();
    });

    it("renders revenue and financial cards", () => {
        render(
            <BrowserRouter>
                <DashboardPage />
            </BrowserRouter>
        );

        expect(screen.getByText("Revenue (this month)")).toBeInTheDocument();
        expect(screen.getByText("Cost Saved (this month)")).toBeInTheDocument();
        expect(screen.getByText("New Subscriptions (this month)")).toBeInTheDocument();
    });
});
