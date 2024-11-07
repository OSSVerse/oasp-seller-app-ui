import { useQuery } from "@tanstack/react-query";
import { httpService } from "./http-service";
import { api } from "./apis";

export type MarketplaceProduct = {
  context: MarketplaceProductContext;
  message: MarketplaceProductMessage;
};

export type MarketplaceProductContext = {
  ttl: string;
  action: string;
  timestamp: Date;
  message_id: string;
  transaction_id: string;
  domain: string;
  version: string;
  bap_id: string;
  bap_uri: string;
  location: Location;
};

export type Location = {
  country: City;
  city: City;
};

export type City = {
  name: string;
  code: string;
};

export type MarketplaceProductMessage = {
  catalogs: CatalogElement[];
};

export type CatalogElement = {
  context: CatalogContext;
  message: CatalogMessage;
};

export type CatalogContext = {
  domain: string;
  action: string;
  version: string;
  bpp_id: string;
  bpp_uri: string;
  country: string;
  city: string;
  location: Location;
  bap_id: string;
  bap_uri: string;
  transaction_id: string;
  message_id: string;
  ttl: string;
  timestamp: Date;
};

export type CatalogMessage = {
  catalog: PurpleCatalog;
};

export type PurpleCatalog = {
  "bpp/fulfillments": BppFulfillment[];
  "bpp/descriptor": BppDescriptorClass;
  "bpp/providers": BppProvider[];
};

export type BppDescriptorClass = {
  name: string;
  short_desc: string;
  long_desc: string;
  images: null[];
};

export type BppFulfillment = {
  id: string;
  type: string;
};

export type BppProvider = {
  id: string;
  descriptor: BppDescriptorClass;
  items: Item[];
  fulfillments: Fulfillment[];
  tags: string[];
  "@ondc/org/fssai_license_no": string;
};

export type Fulfillment = {
  contact: Contact;
};

export type Contact = {
  phone: string;
  email: string;
};

export type Item = {
  id: string;
  descriptor: ItemDescriptor;
  price: Price;
  code: string;
  category_id: string;
  sub_category_id: string;
  description: string;
  longDescription: string;
};

export type ItemDescriptor = {
  name: string;
  images: string[];
};

export type Price = {
  currency: string;
  value: string;
  maximum_value: string;
};

// const getData = (searchString: string, categoryName: string) => ({
//   context: {
//     domain: "Software Assurance",
//     action: "search",
//     version: "1.1.0",
//     transaction_id: "ead489b8-81de-49a4-baf6-8d8de7eabf32",
//     bpp_id: "openfort-oasp.ossverse.com",
//     bpp_uri: "http://openfort-oasp.ossverse.com",
//     bap_id: "bap.ossverse.com",
//     bap_uri: "http://bap.ossverse.com",
//     message_id: "1d07c819-695c-44ab-bd47-c21678a6ba4e",
//     timestamp: "2023-10-09T04:46:28.012Z",
//   },
//   message: {
//     criteria: {
//       searchString: searchString,
//       categoryName: categoryName,
//     },
//   },
// });

export const getMarketPlaceProducts = async () =>
  await httpService.get<RootProductResponse>(
    api.marketplace.search,
    // { params: getData(searchString, categoryName) },
  );

export type Product = {
  id: string;
  name: string;
  description: string;
  countryCode: string;
  cityCode: string;
  country: string;
  city: string;
  totalPrice: number;
  type: string;
  creator: string;
  services: {
    id: string;
    name: string;
    serviceName: string;
    price: number;
    currency: string;
    images: string[];
  }[];
};


export interface RootProductResponse {
  count: number
  data: Daum[]
}

export interface Daum {
  _id: string
  type: string
  productCode: string
  productName: string
  MRP: number
  purchasePrice: number
  timing: any[]
  productCategory: string
  productSubcategory1: string
  longDescription: string
  description: string
  images: any[]
  published: boolean
  createdBy: string
  organization: string
  createdAt: string
  updatedAt: string
  totalPrice: number;
  __v: number
}

export type RefinedProduct = Daum & {
  services: {
    id: string;
    productSubcategory1: string;
    price: number;
  }[];
};


const getProducts = (product: RootProductResponse): RefinedProduct[] => {
  const refinedData = product.data.reduce((acc, item) => {
    const existingProduct = acc.find(pro => pro.productName === item.productName);
    if (existingProduct) {
      existingProduct.services.push({
        id: item._id,
        productSubcategory1: item.productSubcategory1,
        price: item.MRP,
      });

    } else {
      acc.push({
        ...item,
        services: [{
          id: item._id,
          productSubcategory1: item.productSubcategory1,
          price: item.MRP,
        }]
      });
    }
    return acc;
  }, [] as RefinedProduct[]);

  for (const item of refinedData) {
    item.totalPrice = item.services.reduce((acc, service) => acc + service.price, 0);
  }

  return refinedData;
};

export const useMarketPlaceProducts = (
  searchString: string,
  categoryName: string,
) => {
  return useQuery({
    queryKey: [api.marketplace.search, searchString, categoryName],
    queryFn: () => getMarketPlaceProducts(),
    select: (data) => {
      const finalData = getProducts(data);
      return finalData;
    },
  });
};

// export { getMarketplace };

const getProduct = async (productId: string): Promise<RefinedProduct> => {
  const res = await httpService.get<RefinedProduct>(`/products/${productId}`);
  return res;
};

export const useGetProduct = (productId: string) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
  });
};