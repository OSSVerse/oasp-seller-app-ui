import OrderPagination from "./order-pagination";
import OrderFilter from "./filter-col";
import { cn } from "@/lib/utils";
// import { PATH } from "@/lib/path-constant";
// import ProjectCard from "./project-card";
// import ProjectListItem from "./project-list-item";
// import { useOrders } from "@/services/orders-service";

export interface Order {
  id: number;
  title: string;
  requestId: string;
  buyer: Buyer;
  deliveryDate: string;
  pricing: number;
  status: string;
  type: string;
  lastUpdated: string;
  serviceOrders: ServiceOrder[];
  description?: string;
  tavoss?: number;
}

export interface Buyer {
  title: string;
  firstName: string;
  lastName: string;
  workMail: string;
  phone: string;
  payment: Payment;
}
export interface Payment {
  method: string;
  status: string;
  amount: number;
}

export interface ServiceOrder {
  id: string;
  name: string;
  icon: string;
  qty: number;
  to?: number;
}

const OrderList = ({
  showFilter,
  children,
  showGrid,
  filterContent,
  setActiveFilters
}: {
  showFilter: boolean;
  children: React.ReactNode;
  showGrid: boolean
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  filterContent: any
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  setActiveFilters: any
}) => {
  // const isProjectPage = location.pathname === PATH.MYPROJECTS;
  // const { data } = useOrders();

  return (
    <div className="flex flex-col gap-9">
      <div className="w-full flex gap-[30px] items-start">
        {/* filter */}
        {showFilter && <OrderFilter filterContent={filterContent} setActiveFilters={setActiveFilters}/>}
        {/* view mode */}
        <div className="space-y-4 w-full">
          <div
            className={cn(`
                  ${!showGrid
                ? "flex flex-col gap-4 w-full"
                : `grid gap-[30px] justify-center mx-auto w-full
                  ${showFilter
                  ? "grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                }
                  `}
              `)}
          >
            {children}
          </div>
        </div>
      </div>
      {/* pagination */}
      <OrderPagination />
    </div>
  );
};

export default OrderList;
