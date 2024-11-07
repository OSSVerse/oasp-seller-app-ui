import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { httpService } from "../http-service";
import { getMarketPlaceProducts, useGetProduct, useMarketPlaceProducts } from "../marketplace-service";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock dependencies
vi.mock("../http-service");

describe("Marketplace Service", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe("getMarketPlaceProducts", () => {
        it("should call the marketplace search API and return the result", async () => {
            const mockResponse = {
                count: 2,
                data: [
                    {
                        _id: "1",
                        productName: "Product 1",
                        MRP: 100,
                        productSubcategory1: "Subcategory 1",
                        // ... other fields
                    },
                    {
                        _id: "2",
                        productName: "Product 2",
                        MRP: 200,
                        productSubcategory1: "Subcategory 2",
                        // ... other fields
                    },
                ],
            };
            vi.mocked(httpService.get).mockResolvedValue(mockResponse);

            const result = await getMarketPlaceProducts();

            expect(httpService.get).toHaveBeenCalledWith("products");
            expect(result).toEqual(mockResponse);
        });
    });

    describe("useMarketPlaceProducts", () => {
        const queryClient = new QueryClient();
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        );
    
        it("should return refined product data", async () => {
            const mockResponse = {
                count: 2,
                data: [
                    {
                        _id: "1",
                        productName: "Product 1",
                        MRP: 100,
                        productSubcategory1: "Subcategory 1",
                        // ... other fields
                    },
                    {
                        _id: "2",
                        productName: "Product 1",
                        MRP: 200,
                        productSubcategory1: "Subcategory 2",
                        // ... other fields
                    },
                ],
            };
            vi.mocked(httpService.get).mockResolvedValue(mockResponse);
    
            const { result } = renderHook(() => useMarketPlaceProducts("search", "category"), { wrapper });
    
            await waitFor(() => expect(result.current.isSuccess).toBe(true));
    
            expect(result.current.data).toEqual([{
                productName: "Product 1",
                MRP: 100,
                _id: "1",
                productSubcategory1: "Subcategory 1",
                totalPrice: 300,
                services: [
                    { id: "1", productSubcategory1: "Subcategory 1", price: 100 },
                    { id: "2", productSubcategory1: "Subcategory 2", price: 200 },
                ],
                // ... other fields
            }]);
        });
    });
    

    describe("useGetProduct", () => {
        const queryClient = new QueryClient();
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        );

        it("should return product data", async () => {
            const mockResponse = {
                _id: "1",
                productName: "Product 1",
                MRP: 100,
                productSubcategory1: "Subcategory 1",
                // ... other fields
            };
            vi.mocked(httpService.get).mockResolvedValue(mockResponse);

            const { result } = renderHook(() => useGetProduct("1"), { wrapper });

            await waitFor(() => expect(result.current.isSuccess).toBe(true));

            expect(result.current.data).toEqual(mockResponse);
        });
    });
});
