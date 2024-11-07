import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react-hooks";
import {
  createProduct,
  getProducts,
  useGetProducts,
} from "../my-product-service";
import { httpService } from "../http-service";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("../http-service");
vi.mocked(httpService.post).mockImplementation((url, data) => {
  return Promise.resolve(mockCreateProductResponse);
});

// Mocking the response data
const mockCreateProductResponse = {
  data: {
    _id: "123",
    type: "Physical",
    productCode: "12345",
    productName: "Sample Product",
    MRP: 100,
    productCategory: "Electronics",
    productSubcategory1: "Laptops",
    longDescription: "A detailed description of the product.",
    description: "A short description",
    images: [],
    published: true,
    createdBy: "user1",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-02",
    __v: 1,
  },
};

describe("productService", () => {
  describe("createProduct", () => {
    it("should call httpService.post with correct URL and data", async () => {
      const mockData = {
        commonDetails: {
          productCode: "12345",
          productName: "Sample Product",
          MRP: 100,
          productCategory: "Electronics",
          productSubcategory1: "Laptops",
          longDescription: "A detailed description of the product.",
          description: "A short description",
          type: "Physical",
        },
      };

      // Mock the post method to resolve with a specific value
      vi.mocked(httpService.post).mockResolvedValueOnce(
        mockCreateProductResponse,
      );

      const response = await createProduct(mockData);

      expect(httpService.post).toHaveBeenCalledWith("products", mockData);
      expect(response).toEqual(mockCreateProductResponse);
    });
  });

  describe("getProducts", () => {
    it("should call httpService.get with the correct URL", async () => {
      const mockGetProductsResponse = {
        count: 1,
        data: [mockCreateProductResponse.data],
      };

      vi.mocked(httpService.get).mockResolvedValueOnce(mockGetProductsResponse);

      const response = await getProducts();

      expect(httpService.get).toHaveBeenCalledWith("products");
      expect(response).toEqual(mockGetProductsResponse);
    });
  });

  describe("React Query Hooks", () => {
    const queryClient = new QueryClient();

    // it('useCreateProduct should call mutation function and update cache', async () => {
    //   const mockMutationOptions = { onSuccess: vi.fn() };

    //   vi.mocked(httpService.post).mockResolvedValueOnce(mockCreateProductResponse);

    //   const { result } = renderHook(() => useCreateProduct(mockMutationOptions), {
    //     wrapper: ({ children }) => (
    //       <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    //     ),
    //   });

    //   const response = await result.current.mutateAsync({
    //     commonDetails: {
    //       productCode: '12345',
    //       productName: 'Sample Product',
    //       MRP: 100,
    //       productCategory: 'Electronics',
    //       productSubcategory1: 'Laptops',
    //       longDescription: 'A detailed description',
    //       description: 'A short description',
    //       type: 'Physical',
    //     },
    //   });

    //   expect(httpService.post).toHaveBeenCalledWith(
    //     'products',
    //     {
    //       commonDetails: {
    //         productCode: '12345',
    //         productName: 'Sample Product',
    //         MRP: 100,
    //         productCategory: 'Electronics',
    //         productSubcategory1: 'Laptops',
    //         longDescription: 'A detailed description',
    //         description: 'A short description',
    //         type: 'Physical',
    //       },
    //     }
    //   );

    //   expect(mockMutationOptions.onSuccess).toHaveBeenCalledWith(mockCreateProductResponse);

    //   expect(response).toEqual(mockCreateProductResponse);
    // });

    it("useGetProducts should fetch product list successfully", async () => {
      const mockGetProductsResponse = {
        count: 1,
        data: [mockCreateProductResponse.data],
      };

      vi.mocked(httpService.get).mockResolvedValueOnce(mockGetProductsResponse);

      const { result, waitFor } = renderHook(() => useGetProducts(), {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      });

      await waitFor(() => result.current.isSuccess);

      expect(result.current.data).toEqual(mockGetProductsResponse);
      expect(httpService.get).toHaveBeenCalledWith("products");
    });
  });
});
