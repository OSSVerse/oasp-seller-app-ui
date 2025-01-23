import ProjectIcon from "@/components/icons/project-icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import MLModelIcon from "@/components/icons/ml-model-icon";
import { Span } from "@/components/ui/span";
import type { Daum } from "@/services/orders-service";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import PagePagination from "@/components/common/page-pagination";

const getSpanVariant = (status: string) => {
  let variant:
    | "default"
    | "success"
    | "progress"
    | "pending"
    | "destructive"
    | null
    | undefined;
  switch (status) {
    case "Pending Acceptance":
      variant = "pending";
      break;
    case "Work in Progress":
      variant = "progress";
      break;
    case "Delivered (Completed)":
      variant = "success";
      break;
  }
  return variant;
};

// Define types for the filter content
interface FilterOption {
  value: string;
  checked: boolean;
  disabled: boolean;
  name: string;
}

interface FilterContent {
  [category: string]: FilterOption[];
}

interface DynamicAccordionProps {
  filterContent: FilterContent;
  setActiveFilters: (filters: FilterContent) => void;
}

const DynamicAccordion = ({ filterContent, setActiveFilters }: DynamicAccordionProps) => {
  const [filters, setFilters] = useState<FilterContent>(filterContent);

  // Initialize filters on content change
  useEffect(() => {
    const initializeFilters = (content: FilterContent): FilterContent => {
      const updatedFilters: FilterContent = {};
      for (const [key, options] of Object.entries(content)) {
        updatedFilters[key] = options.map((filter) => ({
          ...filter,
          checked: filter.value === "all",
          disabled: filter.value === "all",
        }));
      }
      return updatedFilters;
    };

    setFilters(initializeFilters(filterContent));
  }, [filterContent]);

  // Sync active filters with parent state
  useEffect(() => {
    setActiveFilters(filters);
  }, [filters, setActiveFilters]);

  // Handle filter reset
  const handleReset = () => {
    setFilters((prevFilters) => {
      const resetFilters: FilterContent = {};
      for (const [key, options] of Object.entries(prevFilters)) {
        resetFilters[key] = options.map((filter) => ({
          ...filter,
          checked: filter.value === "all",
          disabled: filter.value === "all",
        }));
      }
      return resetFilters;
    });
  };

  // Handle checkbox change
  const handleCheckboxChange = (category: string, value: string) => {
    setFilters((prevFilters) => {
      const updatedCategory = prevFilters[category].map((filter) => {
        if (filter.value === value) {
          return { ...filter, checked: !filter.checked };
        }
        if (filter.value === "all") {
          return { ...filter, checked: false };
        }
        return filter;
      });

      // If no filters are selected, re-enable "All"
      const anyChecked = updatedCategory.some((filter) => filter.value !== "all" && filter.checked);
      if (!anyChecked) {
        return {
          ...prevFilters,
          [category]: updatedCategory.map((filter) =>
            filter.value === "all" ? { ...filter, checked: true, disabled: true } : { ...filter, checked: false }
          ),
        };
      }

      return {
        ...prevFilters,
        [category]: updatedCategory,
      };
    });
  };

  return (
    <div className="w-[283px] xl:w-[380px] flex flex-col gap-3">
      <div className="flex justify-between items-center gap-2 border p-2 rounded bg-white">
        <span>Filter</span>
        <Button onClick={handleReset}>Reset</Button>
      </div>
      {Object.entries(filters).map(([category, options]) => (
        <div className="flex flex-col gap-2 border p-2 rounded bg-white" key={category}>
          <Accordion value={category} type="single" collapsible className="w-full border-none">
            <AccordionItem value={category} className="border-none">
              <AccordionTrigger>{category}</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder={`Search ${category.toLowerCase()}...`}
                    className="pl-8 w-full text-xs"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  {options.map((filter) => (
                    <div className="flex items-center p-1 gap-2" key={filter.value}>
                      <Checkbox
                        id={`filter-${filter.value}`}
                        checked={filter.checked}
                        disabled={filter.disabled}
                        onCheckedChange={() => handleCheckboxChange(category, filter.value)}
                      />
                      <label
                        htmlFor={`filter-${filter.value}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {filter.name}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export const OrderCard = ({ order }: { order: Daum }) => {
  return (
    <Link to={`/dashboard/orders/detail/${order._id}`}>
      <Card className="min-h-[385px] max-w-full 2xl:max-w-[500px] sm:max-w-[280px] md:max-w-[290px] border rounded-lg overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="space-y-2">
            <Badge
              variant={"secondary"}
              className=" h-16 w-16 flex items-center justify-center rounded-full"
            >
              {order.items[0].category_id === "PROJECT" ? (
                <ProjectIcon className="h-8 w-8" />
              ) : (
                <MLModelIcon className="h-8 w-8" />
              )}
            </Badge>
            <h3 className="text-lg font-semibold ">
              {order.items[0].descriptor.name}
            </h3>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>Last update {order.updatedAt}</div>
          <div className="grid grid-cols-2">
            <div className="space-y-1">
              <div className="text-muted-foreground">Transaction ID</div>
              <div>{order._id.slice(0, 6)}</div>
            </div>
            <div className="space-y-1">
              <div className="text-muted-foreground">Assigned OASP</div>
              <div>{order.organization.name}</div>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="space-y-1">
              <div className="text-muted-foreground">Delivery Date</div>
              <div>{order.updatedAt ? order.updatedAt : "-"}</div>
              {order.updatedAt && (
                <div className="text-muted-foreground">(3 days remaining)</div>
              )}
            </div>
            <div className="space-y-1">
              <div className="text-muted-foreground">Order Status</div>
              <div>
                <Span variant={getSpanVariant(order.state)}>
                  {order.state}
                </Span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center px-6 ">
          <div>
            <Button>View</Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export const OrderListHeader = () => {
  return (
    <div className="w-full bg-secondary rounded-lg p-4">
      <div className="grid grid-cols-8 gap-6 items-center">
        <div className="col-span-3">Order Project Name</div>
        <div>Transaction ID</div>
        <div>Assigned OASP</div>
        <div>Delivery Date</div>
        <div className="col-span-2">Order Status</div>
      </div>
    </div>
  );
};

export const OrderListItem = ({
  order,
}: {
  order: Daum;
}) => {
  return (
    <Link to={`/dashboard/orders/detail/${order._id}`} className="w-full">
      <Card className="xl:w-full border rounded-lg">
        <CardContent className="text-sm space-y-2 p-4">
          <div className="grid grid-cols-8 gap-6 items-center">
            <div>
              <Badge
                variant={"secondary"}
                className=" h-16 w-16 flex items-center justify-center rounded-full"
              >
                {order.items[0].category_id === "PROJECT" ? (
                  <ProjectIcon className="h-8 w-8" />
                ) : (
                  <MLModelIcon className="h-8 w-8" />
                )}
              </Badge>
            </div>
            <div className="col-span-2">
              <div>
                <h3 className="text-lg font-semibold ">{order.items[0].descriptor.name}</h3>
              </div>
              <div>Last update {order.updatedAt}</div>
            </div>
            <div>{order._id.slice(0, 6)}</div>
            <div>{order.organization.name}</div>
            <div>
              <div>{order.updatedAt ? order.updatedAt : "-"}</div>
              {order.updatedAt && (
                <div className="text-muted-foreground">(3 days remaining)</div>
              )}
            </div>
            <div>
              <Span variant={getSpanVariant(order.state)}>{order.state}</Span>
            </div>
            <div>
              <Button>View Details</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

const MyOrdersList = ({
  showFilter,
  showGrid,
  filterContent,
  setActiveFilters,
  getFeaturedPageItems,
  onFeaturedPageChange,
  featuredCurrentPage,
  products
}: {
  showFilter: boolean;
  showGrid: boolean;
  setActiveFilters: (filters: FilterContent) => void;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  filterContent: any;
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
      <div className="w-full flex gap-4">
        {showFilter && <DynamicAccordion filterContent={filterContent} setActiveFilters={setActiveFilters} />}
        <div
          className={cn(`
            ${!showGrid
              ? "flex flex-col gap-4 w-full"
              : `grid gap-[30px] justify-center mx-auto w-full
            ${showFilter
                ? "grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              }
            `
            }
          `)}
        >
          {!showGrid && <OrderListHeader />}
          {getFeaturedPageItems?.map((order: Daum) =>
            showGrid ? (
              <OrderCard order={order} key={order._id} />
            ) : (
              <OrderListItem order={order} key={order._id} />
            ),
          )}
        </div>
      </div>

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

export default MyOrdersList;
