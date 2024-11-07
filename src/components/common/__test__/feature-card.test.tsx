import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { FeatureCard } from "../feature-card";
import type { RefinedProduct } from "@/services/marketplace-service";

describe("FeatureCard Component", () => {
  const mockProduct: RefinedProduct = {
    productName: "Test Product",
    description: "This is a test product description",
    type: "PROJECT",
    createdBy: "JohnDoe123",
    services: [
      { id: "1", productSubcategory1: "Service 1" },
      { id: "2", productSubcategory1: "Service 2" },
      { id: "3", productSubcategory1: "Service 3" },
      { id: "4", productSubcategory1: "Service 4" },
    ],
  };

  it("renders product name and description correctly", () => {
    render(
      <MemoryRouter>
        <FeatureCard product={mockProduct} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test product description"),
    ).toBeInTheDocument();
  });

  it("renders the correct icon based on product type", () => {
    render(
      <MemoryRouter>
        <FeatureCard product={mockProduct} />
      </MemoryRouter>,
    );

    const icon = mockProduct.type === "PROJECT" ? "ProjectIcon" : "MLModelIcon";
    expect(screen.getByRole("img", { className: icon })).toBeInTheDocument();
  });

  it("renders the first three services and shows additional count if more than three", () => {
    render(
      <MemoryRouter>
        <FeatureCard product={mockProduct} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Service 1")).toBeInTheDocument();
    expect(screen.getByText("Service 2")).toBeInTheDocument();
    expect(screen.getByText("Service 3")).toBeInTheDocument();

    expect(screen.getByText("+1")).toBeInTheDocument();
  });

  it("generates correct link for viewing offers", () => {
    render(
      <MemoryRouter>
        <FeatureCard product={mockProduct} />
      </MemoryRouter>,
    );

    const linkElement = screen.getByRole("link", {
      name: /view offers/i,
    });
    expect(linkElement).toHaveAttribute(
      "href",
      `/dashboard/placeorder/${mockProduct.productName}`,
    );
  });
});
