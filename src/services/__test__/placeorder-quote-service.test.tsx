import { renderHook, act } from "@testing-library/react-hooks";
import { describe, it, expect, vi } from "vitest";
import { usePlaceOrderQuote } from "../placeorder-quote-service";
import { httpService } from "../http-service";
import { api } from "../apis";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("../http-service");

describe("usePlaceOrderQuote", () => {
  const mockProvider = { id: "provider-1" };
  const mockItems = [{ id: "item-1" }];
  const mockFulfillment: unknown = {};

  const queryClient = new QueryClient();

  it("should call getPlaceOrderQuote with correct parameters", async () => {
    const mockResponse = [{ context: {}, message: {} }];
    (httpService.post as vi.Mock).mockResolvedValueOnce(mockResponse);

    const { result, waitForNextUpdate } = renderHook(
      () => usePlaceOrderQuote(),
      {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      },
    );

    act(() => {
      result.current.mutate({
        provider: mockProvider,
        items: mockItems,
        fulfillment: mockFulfillment,
      });
    });

    await waitForNextUpdate();

    expect(httpService.post).toHaveBeenCalledWith(
      api.placeorder.select,
      expect.objectContaining({
        selectRequestDto: expect.any(Array),
      }),
    );
    expect(result.current.data).toEqual(mockResponse);
  });

  it("should handle errors correctly", async () => {
    const mockError = new Error("Failed to fetch quote");
    (httpService.post as vi.Mock).mockRejectedValueOnce(mockError);

    const { result, waitForNextUpdate } = renderHook(
      () => usePlaceOrderQuote(),
      {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      },
    );

    act(() => {
      result.current.mutate({
        provider: mockProvider,
        items: mockItems,
        fulfillment: mockFulfillment,
      });
    });

    await waitForNextUpdate();

    expect(result.current.error).toEqual(mockError);
  });
});
