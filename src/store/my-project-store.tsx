import type { CreateProductRequestData } from "@/services/my-product-service";
import { create } from "zustand";

interface Filters {
  search?: string;
  sort?: string;
  order?: number;
  page?: number;
  limit?: number;
}

interface State {
  currentStatus: string;
  createProjectDetails: CreateProductRequestData;
  filters: Filters;
}

interface Action {
  updateCurrentStatus: (newStatus: string) => void;
  setCreateProjectDetails: (formData: {
    [key: string]: FormDataEntryValue;
  }) => void;
  resetCreateProjectDetails: () => void;
  setFilters: (newFilter: Filters) => void;
}

// TODO: might need update some hard code
const initProjectDetails: CreateProductRequestData = {
  commonDetails: {
    productCode: "",
    productName: "",
    MRP: 0,
    purchasePrice: 0,
    productCategory: "OSS Project",
    productSubcategory1: "",
    longDescription: "",
    description: "",
    type: "item",
    // "remediation": [],
    // "venerability": [],
  },
};

export const useMyProject = create<State & Action>((set) => ({
  currentStatus: "",
  filters: {
    search: "",
    sort: "Newest",
    order: -1,
    page: 1,
    limit: 10,
  },
  // TODO: thirdPartyRemendiation and remediation should be removed in production mode
  createProjectDetails: initProjectDetails,
  setCreateProjectDetails: (formData: { [key: string]: FormDataEntryValue }) =>
    set((state) => ({
      createProjectDetails: {
        ...state.createProjectDetails,
        commonDetails: {
          ...state.createProjectDetails.commonDetails,
          ...formData,
          MRP: Number(formData.MRP),
          // purchasePrice: Number(formData.purchasePrice),
        },
      },
    })),
  resetCreateProjectDetails: () =>
    set({
      createProjectDetails: { ...initProjectDetails },
    }),
  updateCurrentStatus: (newStatus: string) =>
    set({
      currentStatus: newStatus,
    }),
  setFilters: (newFilters: Filters) =>
    set((state) => {
      const { sort, order } = state.filters;
      const newSort = newFilters.sort;
      if (newSort === sort) {
        const newOrder = order === 1 ? 0 : order === -1 ? 1 : -1;
        return {
          filters: {
            ...state.filters,
            order: newOrder,
          },
        };
      }
      return {
        filters: {
          ...state.filters,
          ...newFilters,
          order: -1,
        },
      };
    }),
}));
