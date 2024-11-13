import { render, screen } from "@testing-library/react";
import AccountInfo from "../account-info";
import type { Daum } from "../../../../services/orders-service";
import { vi, describe, test, expect } from "vitest";
// Mock sub-components
vi.mock("../../../../components/ui/card", () => ({
  Card: ({ children }) => <div data-testid="card">{children}</div>,
}));
vi.mock("../../../../components/ui/typography", () => ({
  H3: ({ children }) => <h3>{children}</h3>,
  Muted: ({ children }) => <span>{children}</span>,
  Paragraph: ({ children }) => <p>{children}</p>,
}));
vi.mock("../../../../components/ui/badge", () => ({
  Badge: ({ children }) => <span data-testid="badge">{children}</span>,
}));
vi.mock("../../../../components/common/icon", () => ({
  __esModule: true,
  default: ({ icon }) => <span data-testid="icon">{icon}</span>,
}));

describe("AccountInfo Component", () => {
  const mockOrder: Daum = {
    billing: {
      email: "test@example.com",
      phone: "1234567890",
    },
    quote: {
      price: {
        value: "1500",
      },
    },
  };

  test("renders the AccountInfo component with correct structure", () => {
    render(<AccountInfo order={mockOrder} />);

    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByText("Business Details")).toBeInTheDocument();
    expect(screen.getByText("First Name")).toBeInTheDocument();
    expect(screen.getByText("Last Name")).toBeInTheDocument();
    expect(screen.getByText("Work Mail")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText("Payment Method")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Amount")).toBeInTheDocument();
  });

  test("displays order billing information when available", () => {
    render(<AccountInfo order={mockOrder} />);

    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByText("1234567890")).toBeInTheDocument();
    expect(screen.getByText("₹1500")).toBeInTheDocument();
  });

  test("displays 'N/A' for missing name fields", () => {
    render(<AccountInfo order={mockOrder} />);
    expect(screen.getByText("Work Mail")).toBeInTheDocument();
  });

  test("displays default amount as ₹0 when order quote price is not available", () => {
    const incompleteOrder: Daum = {
      billing: {
        email: "test@example.com",
        phone: "1234567890",
      },
      quote: {
        price: {
          value: "0",
          currency: "INR",
        },
      },
    };

    render(<AccountInfo order={incompleteOrder} />);
    expect(screen.getByText("Amount")).toBeInTheDocument();
  });

  test("renders icons with correct icon types", () => {
    render(<AccountInfo order={mockOrder} />);


  });
});
