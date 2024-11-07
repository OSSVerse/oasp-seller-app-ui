import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../home-page";
import { useMarketPlaceProducts } from "@/services/marketplace-service";

// Mock the useMarketPlaceProducts hook
vi.mock("@/services/marketplace-service", () => ({
  useMarketPlaceProducts: vi.fn(),
}));

vi.mock("@/store/auth-store", () => ({
  default: () => ({
    isAuthenticated: false, // Avoid to rediect
  }),
}));

// Mock the MarketPlacePage component
vi.mock("../../(dashboard)/marketplace/marketplace-page", () => ({
  default: () => (
    <div data-testid="marketplace-page">Mocked MarketPlace Page</div>
  ),
}));

describe("HomePage", () => {
  const mockProducts = [
    { _id: "1", name: "Product 1" },
    { _id: "2", name: "Product 2" },
  ];

  beforeEach(() => {
    (useMarketPlaceProducts as jest.Mock).mockReturnValue({
      data: mockProducts,
      isLoading: false,
    });
  });

  // it("renders the homepage with correct title", () => {
  //     render(
  //         <MemoryRouter>
  //             <HomePage />
  //         </MemoryRouter>,
  //     );

  //     expect(screen.getByText("Your Marketplace for Secure")).toBeInTheDocument();
  //     expect(
  //         screen.getByText("Open Source Software Solutions"),
  //     ).toBeInTheDocument();
  // });

  // it("displays featured marketplace offerings", () => {
  //     render(
  //         <MemoryRouter>
  //             <HomePage />
  //         </MemoryRouter>,
  //     );

  //     expect(
  //         screen.getByText("Featured Marketplace Offerings"),
  //     ).toBeInTheDocument();
  //     expect(screen.getByText("All Offering")).toBeInTheDocument();
  //     expect(screen.getAllByText("ML Model")).toBeInTheDocument();
  //     expect(screen.getByText("Project")).toBeInTheDocument();
  // });

  // it("displays featured open-source assurance service providers", () => {
  //     render(
  //         <MemoryRouter>
  //             <HomePage />
  //         </MemoryRouter>,
  //     );

  //     expect(
  //         screen.getByText("Featured Open-source Assurance Service Providers"),
  //     ).toBeInTheDocument();
  //     expect(screen.getByText("Popular Service Offered:")).toBeInTheDocument();
  //     expect(screen.getByText("Assessment")).toBeInTheDocument();
  //     expect(screen.getByText("Certification")).toBeInTheDocument();
  //     expect(screen.getByText("Feature Enhancement")).toBeInTheDocument();
  // });

  // it("renders marketplace cards when products are loaded", () => {
  //     render(
  //         <MemoryRouter>
  //             <HomePage />
  //         </MemoryRouter>,
  //     );

  //     mockProducts.forEach((product) => {
  //         expect(screen.getByText(product.name)).toBeInTheDocument();
  //     });
  // });

  it("displays loading state when products are being fetched", () => {
    (useMarketPlaceProducts as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(screen.getByText("loading...")).toBeInTheDocument(); // 注意匹配 "loading..."
  });

  // it('changes tab when user clicks on a tab', async () => {
  //     render(
  //         <MemoryRouter>
  //             <HomePage />
  //         </MemoryRouter>
  //     );

  //     const user = userEvent.setup();
  //     const mlModelTab = screen.getByText('ML Model');

  //     await user.click(mlModelTab);

  //     expect(mlModelTab).toHaveAttribute('data-state', 'active');
  // });

  // it("renders the MarketPlacePage component", () => {
  //     render(
  //         <MemoryRouter>
  //             <HomePage />
  //         </MemoryRouter>,
  //     );

  //     expect(screen.getByTestId("marketplace-page")).toBeInTheDocument();
  // });
});
