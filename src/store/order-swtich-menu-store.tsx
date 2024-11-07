import { PATH } from "@/lib/path-constant";
import { create } from "zustand";

export interface OrderSwitchMenuData {
  title: string;
  url: string;
}
export interface OrderSwitchMenuStore {
  data: OrderSwitchMenuData[];
}

export const useOrderSwitchMenu = create<OrderSwitchMenuStore>(() => ({
  data: [
    {
      title: "Assessments Orders",
      url: PATH.ASSESSMENTORDER,
    },
    {
      title: "Validation Orders",
      url: PATH.VALIDATIONORDER,
    },
    {
      title: "My Projects Orders",
      url: PATH.MYPROJECTS,
    },
    {
      title: "My ML Models",
      url: "",
    },
    {
      title: "Open Challenges",
      url: "",
    },
  ],
}));
