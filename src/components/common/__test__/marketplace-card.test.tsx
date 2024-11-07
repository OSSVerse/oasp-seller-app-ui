import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { MarketplaceCard } from "../marketplace-card";
import type { RefinedProduct } from "@/services/marketplace-service";

describe("MarketplaceCard Component", () => {
  const mockProduct: RefinedProduct = {
    productName: "Sample Product",
    description: "This is a description for the sample product.",
    type: "PROJECT", // or "MODEL"
    createdBy: "CreatorName123",
    services: [
      { id: "1", productSubcategory1: "Service A" },
      { id: "2", productSubcategory1: "Service B" },
      { id: "3", productSubcategory1: "Service C" },
      { id: "4", productSubcategory1: "Service D" }, // To test "+1" badge
    ],
    totalPrice: 5000,
  };

  it("renders product name, description, and creator name correctly", () => {
    render(
      <MemoryRouter>
        <MarketplaceCard product={mockProduct} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Sample Product")).toBeInTheDocument();
    expect(
      screen.getByText(
        "This is a description for the sample product.".slice(0, 100),
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("by CreatorNam")).toBeInTheDocument();
  });

  it("renders the correct icon based on product type", () => {
    render(
      <MemoryRouter>
        <MarketplaceCard product={mockProduct} />
      </MemoryRouter>,
    );

    const icon = mockProduct.type === "PROJECT" ? "ProjectIcon" : "MLModelIcon";
    expect(screen.getByRole("img", { className: icon })).toBeInTheDocument();
  });

  it("renders the first three services and shows additional count if more than three", () => {
    render(
      <MemoryRouter>
        <MarketplaceCard product={mockProduct} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Service A")).toBeInTheDocument();
    expect(screen.getByText("Service B")).toBeInTheDocument();
    expect(screen.getByText("Service C")).toBeInTheDocument();

    expect(screen.getByText("+1")).toBeInTheDocument();
  });

  it("displays the correct price and product type", () => {
    render(
      <MemoryRouter>
        <MarketplaceCard product={mockProduct} />
      </MemoryRouter>,
    );

    expect(screen.getByText("₹5,000")).toBeInTheDocument();
    expect(screen.getByText("PROJECT")).toBeInTheDocument();
  });

  it("generates correct link to product page", () => {
    render(
      <MemoryRouter>
        <MarketplaceCard product={mockProduct} />
      </MemoryRouter>,
    );

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute(
      "href",
      `/dashboard/placeorder/${mockProduct.productName}`,
    );
  });
});
