import { useMutation, useQuery } from "@tanstack/react-query";
import { httpService } from "./http-service";

export interface Order {
  count: number;
  data: Daum[];
}

export interface Daum {
  _id: string;
  billing: Billing;
  items: Item[];
  quote: Quote;
  fulfillments: any[];
  payment: Payment;
  state: string;
  orderId: string;
  createdOn: string;
  organization: Organization;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Billing {
  tax_number: string;
  phone: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Item {
  descriptor: Descriptor;
  description: string;
  price: Price;
  category_id: string;
  quantity: Quantity;
  details: any;
  longDescription: string;
  productSubcategory1: string;
}

export interface Descriptor {
  name: string;
}

export interface Price {
  currency: string;
  value: string;
}

export interface Quantity {
  count: number;
  measure: Measure;
}

export interface Measure {
  unit: string;
  value: number;
}

export interface Quote {
  ttl: string;
  price: Price2;
  breakup: Breakup[];
}

export interface Price2 {
  value: string;
  currency: string;
}

export interface Breakup {
  item?: Item2;
  price: Price4;
  title: string;
  "@ondc/org/item_id": string;
  "@ondc/org/title_type": string;
  "@ondc/org/item_quantity"?: OndcOrgItemQuantity;
}

export interface Item2 {
  price: Price3;
}

export interface Price3 {
  value: string;
  currency: string;
}

export interface Price4 {
  value: string;
  currency: string;
}

export interface OndcOrgItemQuantity {
  count: number;
}

export interface Payment {
  "@ondc/org/settlement_details": SettlementDetail[];
  "@ondc/org/buyer_app_finder_fee_type": string;
  "@ondc/org/buyer_app_finder_fee_amount": string;
}

export interface SettlementDetail {
  bank_name: string;
  branch_name: string;
  settlement_type: string;
  beneficiary_name: string;
  settlement_phase: string;
  settlement_ifsc_code: string;
  settlement_counterparty: string;
  settlement_bank_account_no: string;
}

export interface Organization {
  _id: string;
  name: string;
  storeDetails: StoreDetails;
}

export interface StoreDetails {
  fulfillments: any[];
  custom_area: any[];
}

const getOrders = async (): Promise<Order> => {
  const res = await httpService.get<Order>("/orders");
  return res;
};

export const useOrders = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
  return { data, isLoading };
};

const getOrder = async (id: string): Promise<Daum> => {
  const res = await httpService.get<Daum>(`/orders/${id}`);
  return res;
};

export const useGetOrder = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrder(id),
  });
  return { data, isLoading };
};

const updateOrder = async (id: string, data: any): Promise<Daum> => {
  const res = await httpService.post<Daum>(`/orders/${id}/status`, data);
  return res;
};

export const useUpdateOrder = (id: string) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data: any) => updateOrder(id, data),
  });
  return { mutate, isPending, isError, error };
};
