import ProjectIcon from "@/components/icons/project-icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Search } from "lucide-react";
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import MLModelIcon from "@/components/icons/ml-model-icon";
import { Span } from "@/components/ui/span";
import { type Daum, useOrders } from "@/services/orders-service";
import { cn } from "@/lib/utils";

// const orders = [
//   {
//     id: 1,
//     title: "Secure Version of OSS Library ABC",
//     lastUpdated: "today",
//     transactionID: "#TX12345",
//     assignedOASP: "DevOp Solution",
//     deliveryDate: "",
//     status: "Pending Acceptance",
//     type: "PROJECT",
//   },
//   {
//     id: 2,
//     title: "Secure Version of OSS Library ABC",
//     lastUpdated: "today",
//     transactionID: "#TX12345",
//     assignedOASP: "DevOp Solution",
//     deliveryDate: "",
//     status: "Pending Acceptance",
//     type: "PROJECT",
//   },
//   {
//     id: 3,
//     title: "Assessment Report for OSS Artifact",
//     lastUpdated: "today",
//     transactionID: "#TX12345",
//     assignedOASP: "Tocomo",
//     deliveryDate: "Sept 23, 2024",
//     status: "Work in Progress",
//     type: "PROJECT",
//   },
//   {
//     id: 4,
//     title: "Assessment Report for OSS Artifact",
//     lastUpdated: "today",
//     transactionID: "#TX12345",
//     assignedOASP: "Tocomo",
//     deliveryDate: "Sept 23, 2024",
//     status: "Work in Progress",
//     type: "PROJECT",
//   },
//   {
//     id: 5,
//     title: "Assessment Report for OSS Artifact",
//     lastUpdated: "today",
//     transactionID: "#TX12345",
//     assignedOASP: "InnoTech",
//     deliveryDate: "Sept 23, 2024",
//     status: "Work in Progress",
//     type: "PROJECT",
//   },
//   {
//     id: 6,
//     title: "Assessment Report for OSS Artifact",
//     lastUpdated: "today",
//     transactionID: "#TX12345",
//     assignedOASP: "InnoTech",
//     deliveryDate: "Sept 23, 2024",
//     status: "Work in Progress",
//     type: "PROJECT",
//   },
//   {
//     id: 7,
//     title: "Assessment Report for OSS Artifact",
//     lastUpdated: "today",
//     transactionID: "#TX12345",
//     assignedOASP: "OpenFort",
//     deliveryDate: "Sept 1, 2024",
//     status: "Delivered (Completed)",
//     type: "PROJECT",
//   },
//   {
//     id: 8,
//     title: "Assessment Report for OSS Artifact",
//     lastUpdated: "today",
//     transactionID: "#TX12345",
//     assignedOASP: "GreenHill",
//     deliveryDate: "Sept 1, 2024",
//     status: "Delivered (Completed)",
//     type: "PROJECT",
//   },
// ];

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
}: {
  showFilter: boolean;
  showGrid: boolean;
}) => {
  const typeFilter = ["All Type", "Project", "ML Model"];
  const serviceOrderFilter = [
    "All Service Offer",
    "Assessment",
    "Attestation",
    "Certification",
    "Redemetion",
  ];
  const oaspFilter = [
    "All OASPs",
    "DevOp Solution",
    "OpenFort",
    "GreenHill",
    "Tocomo",
  ];
  const { data } = useOrders();
  const categoryFilter = ["All Categories", "Cat A", "Cat B", "Cat C", "Cat D"];
  return (
    <div className="flex flex-col gap-9">
      <div className="w-full flex gap-4">
        {showFilter && (
          <div className="w-[283px] xl:w-[380px] flex flex-col gap-3">
            <div className="flex justify-between items-center gap-2 border p-2 rounded bg-white">
              <span>Filter</span>
              <Button>Reset</Button>
            </div>
            <div className="flex flex-col gap-2  border p-2 rounded bg-white">
              <Accordion
                value="item-1"
                type="single"
                collapsible
                className="w-full  active:h-[14.88rem] border-none"
              >
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger>Type</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      {typeFilter.map((filter) => (
                        <div
                          className="flex items-center p-1 gap-2"
                          key={filter}
                        >
                          <Checkbox />
                          <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {filter}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="flex flex-col gap-2  border p-2 rounded bg-white">
              <Accordion
                value="item-1"
                type="single"
                collapsible
                className="w-full  active:h-[14.88rem] border-none"
              >
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger>Service Order</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search service Offer..."
                        className="pl-8 w-full text-xs"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      {serviceOrderFilter.map((filter) => (
                        <div
                          className="flex items-center p-1 gap-2"
                          key={filter}
                        >
                          <Checkbox />
                          <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {filter}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="flex flex-col gap-2  border p-2 rounded bg-white">
              <Accordion
                value="item-1"
                type="single"
                collapsible
                className="w-full  active:h-[14.88rem] border-none"
              >
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger>Assigned OASP</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search OASP..."
                        className="pl-8 w-full text-xs"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      {oaspFilter.map((filter) => (
                        <div
                          className="flex items-center p-1 gap-2"
                          key={filter}
                        >
                          <Checkbox />
                          <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {filter}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="flex flex-col gap-2  border p-2 rounded bg-white">
              <Accordion
                value="item-1"
                type="single"
                collapsible
                className="w-full  active:h-[14.88rem] border-none"
              >
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger>Categories</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search categories..."
                        className="pl-8 w-full text-xs"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      {categoryFilter.map((filter) => (
                        <div
                          className="flex items-center p-1 gap-2"
                          key={filter}
                        >
                          <Checkbox />
                          <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {filter}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        )}
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
          {data?.data.map((order) =>
            showGrid ? (
              <OrderCard order={order} key={order._id} />
            ) : (
              <OrderListItem order={order} key={order._id} />
            ),
          )}
        </div>
      </div>
      <div className="flex justify-between 'items-center w-full">
        <div className="flex items-center  gap-2 w-96">
          <span className="text-xs ">Showing 1-20 of 100</span>{" "}
          <Separator orientation="vertical" className="h-4 w-[3px]" />
          <span className="text-xs ">10 per page</span>
        </div>
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#">
                  <ChevronLeft className="h-4 w-4" />
                </PaginationPrevious>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default MyOrdersList;
