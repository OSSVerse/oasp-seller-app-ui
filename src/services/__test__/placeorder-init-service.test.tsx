import { renderHook, act } from "@testing-library/react-hooks";
import { describe, it, expect, vi } from "vitest";
import { usePlaceOrderInit } from "../placeorder-init-service";
import { httpService } from "../http-service";
import { api } from "../apis";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("../http-service");

describe("usePlaceOrderInit", () => {
  const mockProvider = { id: "provider-1" };
  const mockItems = [{ id: "item-1" }];
  const mockBilling = {
    name: "John Doe",
    address: "123 Main St",
    state: { name: "State" },
    city: { name: "City" },
    email: "john.doe@example.com",
    phone: "1234567890",
  };

  const queryClient = new QueryClient();

  it("should call getPlaceOrderInit with correct parameters", async () => {
    const mockResponse = [{ context: {}, message: {} }];
    (httpService.post as vi.Mock).mockResolvedValueOnce(mockResponse);

    const { result, waitForNextUpdate } = renderHook(
      () =>
        usePlaceOrderInit({
          provider: mockProvider,
          items: mockItems,
          billing: mockBilling,
        }),
      {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      },
    );

    act(() => {
      result.current.mutate();
    });

    await waitForNextUpdate();

    expect(httpService.post).toHaveBeenCalledWith(
      api.placeorder.init,
      expect.objectContaining({
        initRequestDto: expect.any(Array),
      }),
    );
    expect(result.current.data).toEqual(mockResponse);
  });

  it("should handle errors correctly", async () => {
    const mockError = new Error("Failed to initialize order");
    (httpService.post as vi.Mock).mockRejectedValueOnce(mockError);

    const { result, waitForNextUpdate } = renderHook(
      () =>
        usePlaceOrderInit({
          provider: mockProvider,
          items: mockItems,
          billing: mockBilling,
        }),
      {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      },
    );

    act(() => {
      result.current.mutate();
    });

    await waitForNextUpdate();

    expect(result.current.error).toEqual(mockError);
  });
});
