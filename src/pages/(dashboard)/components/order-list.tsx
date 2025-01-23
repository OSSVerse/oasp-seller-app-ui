import OrderFilter from "./filter-col";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import PagePagination from "@/components/common/page-pagination";

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
  setActiveFilters,
  getFeaturedPageItems,
  onFeaturedPageChange,
  featuredCurrentPage,
  products
}: {
  showFilter: boolean;
  children: React.ReactNode;
  showGrid: boolean;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  filterContent: any;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  setActiveFilters: any;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  getFeaturedPageItems: any;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onFeaturedPageChange: any;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  featuredCurrentPage: any
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  products: any
}) => {
  
  const featuredPageCount = Math.ceil(products ? products?.length / 6 : 0);
  const startIndex = (featuredCurrentPage - 1) * 6; // The starting index for the current page
  const endIndex = startIndex + getFeaturedPageItems.length; // The actual end index for the current page


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
      <div className="sm:flex space-y-4 justify-between items-center w-full">
        <div className="flex items-center gap-2 w-96">
          <span className="text-xs text-gray-700 dark:text-gray-300">
            Showing {startIndex + 1} - {endIndex} of {products.length}
          </span>
          <Separator
            orientation="vertical"
            className="h-4 w-[3px] bg-gray-400 dark:bg-gray-600"
          />
          <span className="text-xs text-gray-700 dark:text-gray-300">6 per page</span>
        </div>
        <div>
          <PagePagination
            currentPage={featuredCurrentPage}
            totalPages={featuredPageCount}
            onPageChange={onFeaturedPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderList;
