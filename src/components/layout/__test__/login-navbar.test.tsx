import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginNavbar from "../login-navbar";
import { describe, it, expect, vi, beforeEach } from "vitest";
import useAuthStore from "@/store/auth-store";

// Mocking the zustand auth store
vi.mock("@/store/auth-store");

describe("LoginNavbar", () => {
  const closeMock = vi.fn();
  const loginMock = vi.fn();

  beforeEach(() => {
    // Mocking the zustand auth store
    (useAuthStore as vi.Mock).mockReturnValue({
      login: loginMock,
    });
  });

  it("should render the input fields and buttons", () => {
    render(<LoginNavbar close={closeMock} />);

    expect(
      screen.getByPlaceholderText("Username or Email"),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Remember me")).toBeInTheDocument();
    expect(screen.getByText("Forgot Password")).toBeInTheDocument();
  });

  it("should show error message for empty username", async () => {
    render(<LoginNavbar close={closeMock} />);

    const button = screen.getByText("Login");
    fireEvent.click(button);

    expect(
      await screen.findByText("Username or Email is required"),
    ).toBeInTheDocument();
  });

  it("should show error message for empty password", async () => {
    render(<LoginNavbar close={closeMock} />);

    const usernameInput = screen.getByPlaceholderText("Username or Email");
    fireEvent.change(usernameInput, {
      target: { value: "john.doe@example.com" },
    });

    const button = screen.getByText("Login");
    fireEvent.click(button);

    expect(await screen.findByText("Password is required")).toBeInTheDocument();
  });

  it("should call onSubmit with login data and rememberMe state", async () => {
    render(<LoginNavbar close={closeMock} />);

    const emailInput = screen.getByPlaceholderText("Username or Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const button = screen.getByText("Login");

    fireEvent.change(emailInput, {
      target: { value: "test@example.com" },
    });
    fireEvent.change(passwordInput, {
      target: { value: "password123" },
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith(
        { email: "test@example.com", password: "password123" },
        false,
      );
      expect(closeMock).toHaveBeenCalled();
    });
  });

  it("should show ForgetPassword component when Forgot Password button is clicked", () => {
    render(<LoginNavbar close={closeMock} />);

    const button = screen.getByText("Forgot Password");
    fireEvent.click(button);

    expect(
      screen.getByPlaceholderText("Enter email address"),
    ).toBeInTheDocument();

    const backButton = screen.getByText("Back to Login");
    fireEvent.click(backButton);

    expect(screen.queryByPlaceholderText("Enter email address")).toBeNull();
  });

  it("should toggle Remember me checkbox state", () => {
    render(<LoginNavbar close={closeMock} />);

    const checkbox = screen.getByLabelText("Remember me");
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
