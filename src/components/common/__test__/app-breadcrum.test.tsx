import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AppBreadCrumb from "../app-breadcrumb";
import { MemoryRouter } from "react-router-dom";

describe("AppBreadcrum Component", () => {
  it("renders breadcrumb items correctly", () => {
    const breadcrumbItems = [
      { title: "Home", url: "/" },
      { title: "Category", url: "/category" },
      { title: "Product", url: "/product" },
    ];

    render(
      <MemoryRouter>
        <AppBreadCrumb data={breadcrumbItems} />
      </MemoryRouter>,
    );

    for (const item of breadcrumbItems) {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    }
  });

  it("renders the correct number of breadcrumb items", () => {
    const breadcrumbItems = [
      { title: "Home", url: "/" },
      { title: "Category", url: "/category" },
      { title: "Product", url: "/product" },
    ];

    render(
      <MemoryRouter>
        <AppBreadCrumb data={breadcrumbItems} />
      </MemoryRouter>,
    );

    const breadcrumbElements = screen.getAllByRole("listitem");
    expect(breadcrumbElements).toHaveLength(breadcrumbItems.length);
  });
});
