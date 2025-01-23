import {
  type UseMutationOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { api } from "./apis";
import { httpService } from "./http-service";

export type CreateProductRequestData = {
  commonDetails: CommonDetails;
};
export type CommonDetails = {
  productCode: string;
  productName: string;
  MRP: number;
  purchasePrice: number;
  productCategory: "OSS Project" | "ML Model";
  productSubcategory1: string;
  longDescription: string;
  description: string;
  type: string;
  // remediation: Remediation[];
  // venerability: Venerability[];
};
export type Venerability = {
  id: string;
  serverity: string;
  dependency: string;
  status: "outdated" | "created" | "updated";
};
export type Remediation = {
  dependency: string;
  version: string;
  license: string;
  status: "outdated" | "created" | "updated";
};

export type createProductResponse = {
  data: Product;
};

export type getProductsResponse = {
  count: number;
  data: Product[];
};
export type Product = {
  _id: string;
  type: string;
  productCode: string;
  productName: string;
  MRP: number;
  purchasePrice?: number;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  timing: any[];
  productCategory: string;
  productSubcategory1: string;
  longDescription: string;
  description: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  images: any[];
  published: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

/**
 * Creates a new product by sending a POST request to the /products endpoint.
 * The request requires authorization, which is handled by the request interceptor.
 *
 * @param {CreateProductRequestData} data - The product details needed for the request.
 *
 * @returns {Promise<createProductResponse>} A promise that resolves to the response containing the product data.
 *
 * @example
 *
 * const productData: CreateProductRequestData = {
 *    commonDetails: {
 *      productCode: '12345',
 *      productName: 'Sample Product',
 *      MRP: 100,
 *      productCategory: 'Electronics',
 *      productSubcategory1: 'Laptops',
 *      longDescription: 'A detailed description of the product.',
 *      description: 'A short description',
 *      type: 'Physical',
 *      remediation: [{ dependency: 'none', version: '1.0', license: 'MIT', status: 'active' }],
 *      venerability: [{ id: '1', serverity: 'low', dependency: 'none', status: 'fixed' }]
 *    }
 * };
 *
 * // Sends a POST request with the 'token_access' header automatically added
 * const response = await createProduct({ data: productData });
 * console.log(response);
 */
export const createProduct = async (data: CreateProductRequestData) => {
  return await httpService.post<createProductResponse>(
    `${api.oasp.products}`,
    data,
  );
};

// use this customer mutation hook at component
export const useCreateProduct = (
  options?: UseMutationOptions<
    createProductResponse,
    Error,
    CreateProductRequestData
  >,
) => {
  return useMutation({
    mutationFn: createProduct,
    ...options,
  });
};

export const getProducts = async () => {
  return await httpService.get<getProductsResponse>(`${api.oasp.products}`);
};

export const useGetProducts = () => {
  return useQuery({
    queryFn: getProducts,
    queryKey: ["products"],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
