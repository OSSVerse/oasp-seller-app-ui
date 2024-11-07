import { getIsAuthenticated } from "@/lib/storage-helper";
import { changePassword, login, logout, type User } from "@/services/authentication-services";
import { create } from "zustand";

enum AuthFormType {
  LOGIN = "login",
  REGISTER = "register",
  FORGOT_PASSWORD = "forgot-password",
  RESET_PASSWORD = "reset-password",
}

interface AuthState {
  formType?: AuthFormType;
  user: User | null;
  isAuthenticated: boolean;
  login: (data: LoginPayload, rememberMe: boolean) => void;
  logout: () => void;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ChangePasswordPayload {
  email: string;
  password: string;
  newPassword: string;
}

const useAuthStore = create<AuthState>((set) => ({
  formType: undefined,
  user: getIsAuthenticated(),
  isAuthenticated: !!getIsAuthenticated(),
  login: async (data: LoginPayload, rememberMe: boolean) => {
    const res = await login(data, rememberMe);
    if (res) {
      set({ user: res.user, isAuthenticated: true });
    }
  },
  changePassword: async (data: ChangePasswordPayload) => {
    const res = await changePassword(data);
    if (res) {
      set({ user: res.user, isAuthenticated: true });
    }
  },
  logout: async () => {
    await logout();
    set({ user: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
