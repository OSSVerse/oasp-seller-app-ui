import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { forgetPassword, login, logout } from "../authentication-services";
import { httpService } from "../http-service";
import { toast } from '../../hooks/use-toast'
import storage, {
    setIsAuthenticated,
    removeIsAuthenticated,
} from "../../lib/storage-helper";
import { AUTH_STORAGE_TOKEN, AUTH_STORAGE_KEY } from "../../lib/constant";
import { AxiosError } from "axios";

// Mock dependencies
vi.mock("../http-service");
vi.mock('@/hooks/use-toast')
vi.mock("@/lib/storage-helper");

describe("Authentication Services", () => {
    beforeEach(() => {
        vi.resetAllMocks();
        const sessionStorageMock = {
            getItem: vi.fn(),
            setItem: vi.fn(),
            removeItem: vi.fn(),
            clear: vi.fn(),
        };
        Object.defineProperty(window, 'sessionStorage', {
            value: sessionStorageMock,
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe("forgetPassword", () => {
        it('should call the forget password API and return the result', async () => {
            const mockResponse = { data: 'Password reset email sent' }
            vi.mocked(httpService.post).mockResolvedValue(mockResponse)
            const result = await forgetPassword('test@example.com')
            expect(httpService.post).toHaveBeenCalledWith('auth/forgotPassword', 'test@example.com')
            expect(result).toEqual(mockResponse)
        })
        it('should show an error toast if the API call fails', async () => {
            const mockError = new AxiosError('API error')
            vi.mocked(httpService.post).mockRejectedValue(mockError)
            await forgetPassword('test@example.com')
            if (mockError instanceof AxiosError) {
                expect(toast).toHaveBeenCalledWith({
                    title: 'Error',
                    description: undefined,
                    variant: 'destructive',
                })
            }
        })
    });

    describe("login", () => {
        const mockLoginPayload = {
            email: "test@example.com",
            password: "password123",
        };
        const mockLoginResponse = {
            data: {
                access_token: "mock_token",
                user: { id: "1", name: "Test User" },
            },
        };

        it("should call the login API and store the token and user data when rememberMe is true", async () => {
            vi.mocked(httpService.post).mockResolvedValue(mockLoginResponse);

            const result = await login(mockLoginPayload, true);
            expect(httpService.post).toHaveBeenCalledWith(
                "auth/login",
                mockLoginPayload,
            );
            expect(setIsAuthenticated).toHaveBeenCalledWith(
                mockLoginResponse.data.user,
            );
            expect(storage.setItem).toHaveBeenCalledWith(
                AUTH_STORAGE_TOKEN,
                "mock_token",
            );
            expect(result).toEqual(mockLoginResponse.data);
        });

        it("should call the login API and store the token and user data in sessionStorage when rememberMe is false", async () => {
            vi.mocked(httpService.post).mockResolvedValue(mockLoginResponse);

            const result = await login(mockLoginPayload, false);

            expect(httpService.post).toHaveBeenCalledWith(
                "auth/login",
                mockLoginPayload,
            );
            expect(sessionStorage.setItem).toHaveBeenCalledWith(
                AUTH_STORAGE_TOKEN,
                "mock_token",
            );
            expect(sessionStorage.setItem).toHaveBeenCalledWith(
                AUTH_STORAGE_KEY,
                JSON.stringify(mockLoginResponse.data.user),
            );
            expect(result).toEqual(mockLoginResponse.data);
        });

        it('should show an error toast if the API call fails', async () => {
            const mockError = new AxiosError('API error')
            vi.mocked(httpService.post).mockRejectedValue(mockError)

            await login(mockLoginPayload, true)

            if (mockError instanceof AxiosError) {
                expect(toast).toHaveBeenCalledWith({
                    title: 'Error',
                    description: undefined,
                    variant: 'destructive',
                })
            }
        })
    });

    describe("logout", () => {
        it("should call the logout API and clear storage", async () => {
            const mockResponse = { data: "Logged out successfully" };
            vi.mocked(httpService.post).mockResolvedValue(mockResponse);

            await logout();

            expect(httpService.post).toHaveBeenCalledWith("auth/logout", {});
            expect(storage.removeItem).toHaveBeenCalledWith(AUTH_STORAGE_TOKEN);
            expect(removeIsAuthenticated).toHaveBeenCalled();
        });

        it('should show an error toast if the API call fails', async () => {
            const mockError = new AxiosError('API error')
            vi.mocked(httpService.post).mockRejectedValue(mockError)

            await logout()

            if (mockError instanceof AxiosError) {
                expect(toast).toHaveBeenCalledWith({
                    title: 'Error',
                    description: undefined,
                    variant: 'destructive',
                })
            }
        })
    });
});
