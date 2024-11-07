import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import DefaultLayout from "../default-layout";

// Mock useAuthStore to return an authenticated user
vi.mock("@/store/auth-store", () => ({
  default: () => ({ isAuthenticated: true }),
}));

// Mock child components
vi.mock("../nav-bar", () => ({
  default: () => <div data-testid="mock-navbar">Mock NavBar</div>,
}));

vi.mock("../footer", () => ({
  default: () => <div data-testid="mock-footer">Mock Footer</div>,
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    Outlet: () => <div data-testid="mock-outlet">Mock Outlet</div>,
  };
});

describe("DefaultLayout", () => {
  it("renders NavBar, Outlet, and Footer components", () => {
    render(
      <BrowserRouter>
        <DefaultLayout />
      </BrowserRouter>,
    );

    expect(screen.getByTestId("mock-navbar")).toBeInTheDocument();
    expect(screen.getByTestId("mock-outlet")).toBeInTheDocument();
    expect(screen.getByTestId("mock-footer")).toBeInTheDocument();
  });

  it("renders components in the correct order", () => {
    render(
      <BrowserRouter>
        <DefaultLayout />
      </BrowserRouter>,
    );

    const navbar = screen.getByTestId("mock-navbar");
    const outlet = screen.getByTestId("mock-outlet");
    const footer = screen.getByTestId("mock-footer");

    expect(navbar).toBeInTheDocument();
    expect(outlet).toBeInTheDocument();
    expect(footer).toBeInTheDocument();

    const layout = screen.getByTestId("default-layout");
    expect(layout.firstChild).toBe(navbar);
    expect(layout.children[1]).toBe(outlet);
    expect(layout.lastChild).toBe(footer);
  });
});
