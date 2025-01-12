import AppBreadCrumb from "@/components/common/app-breadcrumb";
import GridLayoutIcon from "@/components/icons/grid-layout-icon";
import ListLayoutIcon from "@/components/icons/list-layout-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { H1 } from "@/components/ui/typography";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Separator } from "@radix-ui/react-separator";

import SwitchToMenu from "../components/switch-to-menu";
import { PATH } from "@/lib/path-constant";
import OrderList from "../components/order-list";
import OrderTabs from "../components/order-tabs";
import SortMenu from "../components/sort-menu";
import { useOrders } from "@/services/orders-service";
import OrderListHeader from "../components/order-list-header";
import OrderCard from "../components/order-card";
import OrderListItem from "../components/order-list-item";
import { ORDER_STATUS } from "@/lib/constant";

const breadcrumb = [
  {
    title: "Dashboard",
    url: PATH.DASHBOARD,
  },
  {
    title: "Assessments Orders",
    url: PATH.ASSESSMENTORDER,
  },
];

const tableHeaders = [
  "Project Name",
  "Service Order",
  "Pricing",
  "Delivery Time",
];

const AssessmentOrderPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isGrid, setIsGrid] = useState(false);
  const showGrid = !!isGrid;

  const { data } = useOrders();
  const showFilter = searchParams.get("filter") || "";

  const onFilterChange = (value: string) => {
    if (value) {
      searchParams.delete("filter");
    } else {
      searchParams.set("filter", "true");
    }
    setSearchParams(searchParams);
  };
  const onDisplayChange = (value: boolean) => {
    setIsGrid(value);
  };

  const activeTab = searchParams.get("state") ?? ORDER_STATUS.PENDING;

  const [tabData, setTabData] = useState<{ title: string, value: string, number: number }[]>([
    { title: "Pending", value: ORDER_STATUS.PENDING, number: 0 },
    { title: "Accepted", value: ORDER_STATUS.ACCEPTED, number: 0 },
    { title: "Rejected", value: ORDER_STATUS.REJECTED, number: 0 },
    { title: "Completed", value: ORDER_STATUS.COMPLETED_ORDER, number: 0 },
  ]);
  useEffect(() => {
    if (data) {
      const pendingLength = data.data.filter((order) => order.state === ORDER_STATUS.PENDING).length;
      const rejectedLength = data.data.filter((order) => order.state === ORDER_STATUS.REJECTED).length;
      const acceptedLength = data.data.filter((order) => order.state === ORDER_STATUS.ACCEPTED).length;
      const completedLength = data.data.filter((order) => order.state === ORDER_STATUS.COMPLETED_ORDER).length;
      setTabData([
        { title: "Pending", value: ORDER_STATUS.PENDING, number: pendingLength },
        { title: "Accepted", value: ORDER_STATUS.ACCEPTED, number: acceptedLength },
        { title: "Rejected", value: ORDER_STATUS.REJECTED, number: rejectedLength },
        { title: "Completed", value: ORDER_STATUS.COMPLETED_ORDER, number: completedLength },
      ])
    }
  }, [data])

  const filterData = useMemo(() => {
    if (data) {
      return data.data.filter((order) => order?.state === activeTab);
    }
    return [];
  }, [data, activeTab]);

  return (
    <div
      data-testid="my-orders-page"
      className="page-root flex flex-col gap-7 xl:pt-8"
    >
      <div className="absolute top-0 left-0 w-full h-[370px] -z-10 bg-neutral-100" />
      <AppBreadCrumb data={breadcrumb} />
      <div className="flex gap-4 flex-wrap md:flex-nowrap ">
        <div className="flex items-center gap-2">
          <H1>Assessment Orders</H1>
          <Separator
            orientation="vertical"
            className="shrink-0 bg-border h-4 w-[3px] ml-4"
          />
          <SwitchToMenu length={filterData?.length} />
        </div>
        <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 ">
          <form className="ml-auto flex-1 flex  gap-3 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by Order/Business Name or #.."
                className="pl-8 w-full md:w-[200px] lg:w-[400px]"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="  flex flex-col-reverse md:flex-row  justify-between gap-4 items-center  flex-wrap md:flex-nowrap">
        <div className="flex items-center ">

          <OrderTabs tabItems={[tabData[0], tabData[1], tabData[2]]} />
          <Separator
            orientation="vertical"
            className="shrink-0 bg-border h-4 w-[3px]"
          />
          <OrderTabs tabItems={[tabData[3]]} />

        </div>
        <div className="flex items-center gap-4">
          <Button
            variant={"outline"}
            size="icon"
            className="rounded-full"
            onClick={() => onDisplayChange(false)}
          >
            <ListLayoutIcon className={`h-5 w-5 ${!isGrid && "opacity-30"}`} />
          </Button>
          <Button
            variant={"outline"}
            size="icon"
            className="rounded-full"
            onClick={() => onDisplayChange(true)}
          >
            <GridLayoutIcon className={`h-5 w-5 ${isGrid && "opacity-30"}`} />
          </Button>
          <Button onClick={() => onFilterChange(showFilter)}>Filter</Button>
          <SortMenu />
        </div>
      </div>
      <div>
        <OrderList showFilter={!!showFilter} showGrid={showGrid}>
          {!showGrid && <OrderListHeader tableHeaders={tableHeaders} />}
          {filterData?.map((order) =>
            showGrid ? (
              <OrderCard order={order} key={order._id} />
            ) : (
              <OrderListItem
                order={order}
                key={order._id}
                tableHeaders={tableHeaders}
              />
            ),
          )}
        </OrderList>
      </div>
    </div>
  );
};

export default AssessmentOrderPage;
