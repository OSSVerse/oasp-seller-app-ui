import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PlaceOrderPage from "../placeorder/placeorder-page";
import { useMarketPlaceProducts } from "@/services/marketplace-service";
import { MemoryRouter } from "react-router-dom";

// Mock the router hooks
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ id: "OpenPilot" }), // mock useParams
  };
});

// Mock the marketplace service
vi.mock("@/services/marketplace-service", () => ({
  useMarketPlaceProducts: vi.fn(),
}));

describe("PlaceOrderPage", () => {
  const mockProduct = {
    productName: "OpenPilot",
    totalPrice: 1200,
    // Add other necessary product fields
  };

  beforeEach(() => {
    // Setup the mock implementation for useMarketPlaceProducts
    (useMarketPlaceProducts as any).mockReturnValue({
      data: [mockProduct],
    });
  });

  it("renders the page with correct breadcrumb", () => {
    render(
      <MemoryRouter>
        <PlaceOrderPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("OSS ARTIFACT DETAILS")).toBeInTheDocument();
  });

  // it("displays all anchor sections", () => {
  //     render(<PlaceOrderPage />);
  //     screen.debug();
  //     expect(screen.getByText("Dashboard")).toBeInTheDocument();
  //     expect(screen.getByText("Assessment Service Pricing")).toBeInTheDocument();
  //     expect(screen.getByText("Payment")).toBeInTheDocument();
  // });

  // it("shows product header information", () => {
  //     render(<PlaceOrderPage />);

  //     expect(screen.getByText("OpenPilot")).toBeInTheDocument();
  //     expect(screen.getByText(/An open-source driving agent/)).toBeInTheDocument();
  // });

  // it("displays payment method with correct total price", () => {
  //     render(<PlaceOrderPage />);

  //     expect(screen.getByText("1200")).toBeInTheDocument();
  // });

  // it("shows all main sections", () => {
  //     render(<PlaceOrderPage />);

  //     expect(screen.getByText("DESCRIPTON DETAILS")).toBeInTheDocument();
  //     expect(screen.getByText("ASSESSMENT SERVICE PRICING")).toBeInTheDocument();
  //     expect(screen.getByText("PAYMENT")).toBeInTheDocument();
  // });

  // it("displays product description details", () => {
  //     render(<PlaceOrderPage />);

  //     expect(screen.getByText("Security Upgrades")).toBeInTheDocument();
  //     expect(screen.getByText(/Two-Factor Authentication/)).toBeInTheDocument();
  // });

  // it("shows pricing information", () => {
  //     render(<PlaceOrderPage />);

  //     expect(screen.getByText("OpenFort")).toBeInTheDocument();
  //     expect(screen.getByText("OASP License")).toBeInTheDocument();
  // });
});
