import { render, screen, } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { vi } from "vitest";
import NonProtectedRoute from "../non-authenticated-route"; // Ensure this path is correct
import useAuthStore from "@/store/auth-store"; // Ensure this path is correct

// Mock the useAuthStore hook
vi.mock("@/store/auth-store", () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe("NonProtectedRoute", () => {
  const MockComponent = () => <div>Protected Content</div>;

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the Outlet when not authenticated", () => {
    // Mock implementation for not authenticated
    useAuthStore.mockImplementation((selector) => selector({ isAuthenticated: false }));

    render(
      <MemoryRouter initialEntries={["/some-non-protected-route"]}>
        <Routes>
          <Route path="/" element={<NonProtectedRoute />}>
            <Route path="some-non-protected-route" element={<div>Non-Protected Route</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Non-Protected Route")).toBeInTheDocument();
  });

  // it("redirects to location.state.from if authenticated and location.state exists", async () => {
  //   // Mock implementation for authenticated user
  //   useAuthStore.mockImplementation((selector) => selector({ isAuthenticated: true }));

  //   // Set up initialEntries with location.state
  //   render(
  //     <MemoryRouter initialEntries={[{ pathname: "/some-non-protected-route", state: { from: "/custom-route" } }]}>
  //       <Routes>
  //         <Route path="/" element={<NonProtectedRoute />}>
  //           <Route path="custom-route" element={<MockComponent />} />
  //           <Route path="some-non-protected-route" element={<div>Non-Protected Route</div>} />
  //         </Route>
  //       </Routes>
  //     </MemoryRouter>
  //   );

  //   // Expect the mock component to render
  //   expect(screen.queryByText("Non-Protected Route")).not.toBeInTheDocument();
  //   expect(screen.getByText("Protected Content")).toBeInTheDocument(); // Ensure MockComponent is rendered
  // });

  // it("redirects to /dashboard if authenticated and no location.state exists", () => {
  //   // Mock implementation for authenticated user
  //   useAuthStore.mockImplementation((selector) => selector({ isAuthenticated: true }));

  //   // Set up initialEntries without location.state
  //   render(
  //     <MemoryRouter initialEntries={[{ pathname: "/some-non-protected-route" }]}>
  //       <Routes>
  //         <Route path="/" element={<NonProtectedRoute />}>
  //           <Route path="dashboard" element={<MockComponent />} />
  //           <Route path="some-non-protected-route" element={<div>Non-Protected Route</div>} />
  //         </Route>
  //       </Routes>
  //     </MemoryRouter>
  //   );

  //   // Expect the mock component to render
  //   expect(screen.queryByText("Non-Protected Route")).not.toBeInTheDocument();
  //   expect(screen.getByText("Protected Content")).toBeInTheDocument(); // Ensure MockComponent is rendered
  // });
});
