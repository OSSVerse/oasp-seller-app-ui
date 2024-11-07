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
}: {
  showFilter: boolean;
  children: React.ReactNode;
}) => {
  // const isProjectPage = location.pathname === PATH.MYPROJECTS;
  // const { data } = useOrders();

  return (
    <div className="flex flex-col gap-9">
      <div
        className={cn(
          "w-full",
          showFilter && "grid grid-cols-[283px,auto] gap-9",
        )}
      >
        {/* filter */}
        {showFilter && <OrderFilter />}
        {/* view mode */}
        <div className="flex flex-wrap flex-1 gap-7 justify-center mx-auto w-full">
          {/* {!showGrid && <OrderListHeader tableHeaders={tableHeaders} />}
          {data?.data.map((order) =>
            showGrid ? (
              isProjectPage ? (
                <ProjectCard order={order} key={order._id} />
              ) : (
                <OrderCard order={order} key={order._id} />
              )
            ) : isProjectPage ? (
              <ProjectListItem
                order={order}
                key={order._id}
                tableHeaders={tableHeaders}
              />
            ) : (
              <OrderListItem
                order={order}
                key={order._id}
                tableHeaders={tableHeaders}
              />
            ),
          )} */}
          {children}
        </div>
      </div>
      {/* pagination */}
      <OrderPagination />
    </div>
  );
};

export default OrderList;
