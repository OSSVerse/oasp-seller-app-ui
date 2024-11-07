import { vi, describe, it, expect, beforeEach } from "vitest";
import { act } from "react-dom/test-utils";
import useAuthStore, { type LoginPayload } from "../auth-store";
import { login, logout } from "@/services/authentication-services";

// Mock login and logout functions
vi.mock("@/services/authentication-services", () => ({
  login: vi.fn(),
  logout: vi.fn(),
}));

describe("useAuthStore", () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      formType: undefined,
    });
    vi.clearAllMocks();
  });

  it("should log in successfully", async () => {
    const mockUser = { id: 1, name: "Test User" };
    const payload: LoginPayload = {
      email: "test@example.com",
      password: "password",
    };

    (login as jest.Mock).mockResolvedValueOnce({ user: mockUser });

    await act(async () => {
      await useAuthStore.getState().login(payload, true);
    });

    const state = useAuthStore.getState();
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
    expect(login).toHaveBeenCalledWith(payload, true);
  });

  it("should log out successfully", async () => {
    useAuthStore.setState({
      user: { id: 1, name: "Test User" },
      isAuthenticated: true,
    });

    await act(async () => {
      await useAuthStore.getState().logout();
    });

    const state = useAuthStore.getState();
    expect(state.user).toBe(null);
    expect(state.isAuthenticated).toBe(false);
    expect(logout).toHaveBeenCalled();
  });
});
