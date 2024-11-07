import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "../nav-bar";
import useAuthStore from "@/store/auth-store";
import { useModal } from "@/store/modal-store";
// import userEvent from "@testing-library/user-event";

// Mock the stores
vi.mock("@/store/auth-store");
vi.mock("@/store/modal-store");

// Mock the LoginNavbar component
vi.mock("../login-navbar", () => ({
  default: vi.fn(() => <div data-testid="login-navbar">Login Navbar</div>),
}));

describe("NavBar", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();

    // Mock the useAuthStore
    vi.mocked(useAuthStore).mockReturnValue({
      isAuthenticated: false,
      logout: vi.fn(),
      user: null,
    });

    // Mock the useModal
    vi.mocked(useModal).mockReturnValue({
      onOpen: vi.fn(),
      onClose: vi.fn(),
    });
  });

  // it('renders correctly when not authenticated', () => {
  //     render(
  //         <BrowserRouter>
  //             <NavBar />
  //         </BrowserRouter>
  //     )

  //     expect(screen.getByText('Book A Demo')).toBeInTheDocument()
  //     expect(screen.getByText('Get Started')).toBeInTheDocument()
  // })

  it("renders correctly when authenticated", () => {
    vi.mocked(useAuthStore).mockReturnValue({
      isAuthenticated: true,
      logout: vi.fn(),
      user: { name: "John Doe", organization: { name: "Test Org" } },
    });

    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Test Org")).toBeInTheDocument();
    // expect(screen.queryByText('Book A Demo')).not.toBeInTheDocument()
    // expect(screen.queryByText('Get Started')).not.toBeInTheDocument()
  });

  // it('opens login navbar when login button is clicked', async () => {
  //     render(
  //         <BrowserRouter>
  //             <NavBar />
  //         </BrowserRouter>
  //     )

  //     const loginButton = screen.getByTestId('login-button')
  //     fireEvent.click(loginButton)
  //     expect(screen.getByTestId('login-navbar')).toBeInTheDocument()
  // })

  // it('opens logout confirmation dialog when logout is clicked', async () => {
  //     vi.mocked(useAuthStore).mockReturnValue({
  //         isAuthenticated: true,
  //         logout: vi.fn(),
  //         user: { name: 'John Doe', organization: { name: 'Test Org' } }
  //     })

  //     const onOpenMock = vi.fn()
  //     vi.mocked(useModal).mockReturnValue({
  //         onOpen: onOpenMock,
  //         onClose: vi.fn()
  //     })
  //     render(
  //         <BrowserRouter>
  //             <NavBar />
  //         </BrowserRouter>
  //     )

  //     const menuButton = screen.getByTestId('user-menu-button')
  //     userEvent.click(menuButton)
  //     await waitFor(async () => {
  //         const logoutButton = screen.getByTestId('logout-button')
  //         userEvent.click(logoutButton)
  //         screen.debug(screen.getByText('Are you sure you want to logout?'))
  //     }, {
  //         timeout: 200
  //     })
  // })

  // it('renders protected items when authenticated', () => {
  //     vi.mocked(useAuthStore).mockReturnValue({
  //         isAuthenticated: true,
  //         logout: vi.fn(),
  //         user: { name: 'John Doe', organization: { name: 'Test Org' } }
  //     })

  //     render(
  //         <BrowserRouter>
  //             <NavBar />
  //         </BrowserRouter>
  //     )

  //     expect(screen.getByText('My dashboard')).toBeInTheDocument()
  //     expect(screen.getByText('My Orders')).toBeInTheDocument()
  // })

  // it('does not render protected items when not authenticated', () => {
  //     render(
  //         <BrowserRouter>
  //             <NavBar />
  //         </BrowserRouter>
  //     )

  //     expect(screen.queryByText('My dashboard')).not.toBeInTheDocument()
  //     expect(screen.queryByText('My Orders')).not.toBeInTheDocument()
  // })

  it("renders search input on larger screens", () => {
    vi.mocked(useAuthStore).mockReturnValue({
      isAuthenticated: true,
    });
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );
    expect(
      screen.getByPlaceholderText("Search products..."),
    ).toBeInTheDocument();
  });
});
