import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useOrders, useGetOrder, useUpdateOrder } from "../orders-service";
import { httpService } from "../http-service";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { waitFor } from "@testing-library/react";

vi.mock("../http-service"); // Mock httpService

describe("Order Hooks", () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("useOrders", () => {
    it("should return orders data", async () => {
      const mockOrders = {
        count: 1,
        data: [
          {
            _id: "1",
            billing: {},
            items: [],
            quote: {},
            fulfillments: [],
            payment: {},
            state: "",
            orderId: "",
            createdOn: "",
            organization: {},
            createdAt: "",
            updatedAt: "",
            __v: 0,
          },
        ],
      };

      (httpService.get as vi.Mock).mockResolvedValueOnce(mockOrders);

      const { result } = renderHook(() => useOrders(), {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      });

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(result.current.data).toEqual(mockOrders);
    });
  });

  describe("useGetOrder", () => {
    it("should return a specific order data", async () => {
      const mockOrder = {
        _id: "1",
        billing: {},
        items: [],
        quote: {},
        fulfillments: [],
        payment: {},
        state: "",
        orderId: "",
        createdOn: "",
        organization: {},
        createdAt: "",
        updatedAt: "",
        __v: 0,
      };

      (httpService.get as vi.Mock).mockResolvedValueOnce(mockOrder);

      const { result } = renderHook(() => useGetOrder("1"), {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      });

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(result.current.data).toEqual(mockOrder);
    });
  });

  describe("useUpdateOrder", () => {
    it("should mutate order status", async () => {
      const mockUpdatedOrder = {
        _id: "1",
        billing: {},
        items: [],
        quote: {},
        fulfillments: [],
        payment: {},
        state: "",
        orderId: "",
        createdOn: "",
        organization: {},
        createdAt: "",
        updatedAt: "",
        __v: 0,
      };

      (httpService.post as vi.Mock).mockResolvedValueOnce(mockUpdatedOrder);

      const { result } = renderHook(() => useUpdateOrder("1"), {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      });

      await act(async () => {
        await result.current.mutate({ status: "shipped" });
      });

      expect(httpService.post).toHaveBeenCalledWith("/orders/1/status", {
        status: "shipped",
      });
    });

    it("should handle errors correctly", async () => {
      const mockError = new Error("Failed to update order");
      (httpService.post as vi.Mock).mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useUpdateOrder("1"), {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      });

      await act(async () => {
        await result.current.mutate({ status: "shipped" });
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
        expect(result.current.error).toEqual(mockError);
      });
    });
  });
});
