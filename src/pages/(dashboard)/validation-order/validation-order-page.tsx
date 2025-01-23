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
import OrderListHeader from "../components/order-list-header";
import OrderCard from "../components/order-card";
import OrderListItem from "../components/order-list-item";
import { type Daum, useOrders } from "@/services/orders-service";
import { ORDER_STATUS } from "@/lib/constant";

const breadcrumb = [
  {
    title: "Dashboard",
    url: PATH.DASHBOARD,
  },
  {
    title: "Validation Orders",
    url: PATH.VALIDATIONORDER,
  },
];

const tableHeaders = [
  "Project Name",
  "Service Order",
  "Pricing",
  "Delivery Time",
];

const initialFilters = {
  "Service Order": [
    { name: "All Service Offered", value: "all" },
  ],
  "Price Range": [],
};

const defaultInitialFilters = JSON.parse(JSON.stringify(initialFilters));

const ValidationOrderPage = () => {
  const [filterContent, setFilterContent] = useState(defaultInitialFilters);
  const [activeFilters, setActiveFilters] = useState(JSON.parse(JSON.stringify(initialFilters)));
  const [searchParams, setSearchParams] = useSearchParams();
  const [isGrid, setIsGrid] = useState(false);
  const showGrid = !!isGrid;
  const [searchTerm, setSearchTerm] = useState("");
  const featuredCurrentPage = Number(searchParams.get("mpage")) || 1;

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

  const { data } = useOrders();
  // Fix me duplicate code 
  useEffect(() => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const updatedFilterdata: any = { ...initialFilters }; // Start with the initial filter state

    const minPrice = 0;
    let maxPrice = Number.NEGATIVE_INFINITY;
    if (data) {
      // Loop through each data entry (in case there are multiple data entries)
      data.data?.map((entry) => {
        entry?.items?.map((item) => {
          // Update the "Service Order" filter by using `productSubcategory1`
          const serviceValue = item.productSubcategory1.toLowerCase().replace(/\s+/g, "-");

          if (
            !updatedFilterdata["Service Order"].some(
              (service: { value: string; }) => service.value === serviceValue
            )
          ) {
            updatedFilterdata["Service Order"].push({
              name: item.productSubcategory1,
              value: serviceValue,
            });
          }

          // Update the price range
          const priceValue = Number.parseInt(item.price.value);
          maxPrice = Math.max(maxPrice, priceValue);
        });
      });
      // Update the "Price Range" filter with the calculated min and max price
      updatedFilterdata["Price Range"] = [
        { min: minPrice, max: maxPrice, minPrice, maxPrice },
      ];
    }

    setFilterContent(updatedFilterdata);
  }, [data]);
  const activeTab = searchParams.get("state") ?? ORDER_STATUS.PENDING;
  const [tabData, setTabData] = useState<{ title: string, value: string, number: number }[]>([
    { title: "Pending", value: ORDER_STATUS.PENDING, number: 0 },
    { title: "Rejected", value: ORDER_STATUS.REJECTED, number: 0 },
    { title: "Accepted", value: ORDER_STATUS.ACCEPTED, number: 0 },
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
        { title: "Rejected", value: ORDER_STATUS.REJECTED, number: rejectedLength },
        { title: "Accepted", value: ORDER_STATUS.ACCEPTED, number: acceptedLength },
        { title: "Completed", value: ORDER_STATUS.COMPLETED_ORDER, number: completedLength },
      ])
    }
  }, [data])

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const filterData: any = useMemo(() => {
    if (data) {
      return data.data
        .filter((order) => order?.state === activeTab)
        .filter((order) =>
          order?.items[0]?.descriptor?.name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
    }
    return [];
  }, [data, activeTab, searchTerm]);

  // Get checked services excluding "All Service Offered"
  const checkedServices = activeFilters["Service Order"]
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    .filter((filter: { checked: any; value: string; }) => filter.checked && filter.value !== "all")
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    .map((filter: { name: any; }) => filter.name);

  // Determine the filtered data
  let filteredData = checkedServices.length > 0
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    ? filterData.filter((order: { items: any[]; }) => {
      // Check if any item's productSubcategory1 matches a checked service
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      return order.items.some((item: { productSubcategory1: any; }) => checkedServices.includes(item.productSubcategory1));
    })
    : filterData;

  if (activeFilters["Price Range"].length !== 0) {
    // Get the price range from active filters
    const { minPrice, maxPrice } = activeFilters["Price Range"][0];

    // Filter the data based on the price range
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    filteredData = filteredData.map((group: { items: any[]; }) => {
      const filteredItems = group.items.filter(
        (item: { price: { value: number; }; }) => item.price.value >= minPrice && item.price.value <= maxPrice
      );
      return filteredItems.length > 0
        ? { ...group, items: filteredItems }
        : null;
    }).filter((group: null) => group !== null);
  }

  const onFeaturedPageChange = (page: number) => {
    searchParams.set("mpage", page.toString());
    setSearchParams(searchParams);
  };

  const getFeaturedPageItems = filteredData.slice(
    (featuredCurrentPage - 1) * 6,
    featuredCurrentPage * 6
  );

  return (
    <div className="page-root flex flex-col gap-7">
      <div className="absolute top-0 left-0 w-full h-[370px] -z-10 bg-neutral-100" />
      <AppBreadCrumb data={breadcrumb} />
      <div className="flex gap-4 flex-wrap md:flex-nowrap ">
        <div className="flex items-center gap-2">
          <H1 data-testid="page-title">Validation Orders</H1>
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
                value={searchTerm} // Bind to searchTerm state
                onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
              />
            </div>
          </form>
        </div>
      </div>
      <div className="flex flex-col-reverse lg:flex-row  gap-4 w-full lg:items-center justify-start items-start lg:justify-between ">
        <div className="flex items-center">
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
            data-testid="list-view-button"
            className="rounded-full"
            onClick={() => onDisplayChange(false)}
          >
            <ListLayoutIcon className={`h-5 w-5 ${!isGrid && "opacity-30"}`} />
          </Button>
          <Button
            variant={"outline"}
            size="icon"
            data-testid="grid-view-button"
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
        <OrderList showFilter={!!showFilter} showGrid={showGrid} filterContent={filterContent} getFeaturedPageItems={getFeaturedPageItems} setActiveFilters={setActiveFilters} onFeaturedPageChange={onFeaturedPageChange} featuredCurrentPage={featuredCurrentPage} products={filteredData}>
          {!showGrid && <OrderListHeader tableHeaders={tableHeaders} />}
          {getFeaturedPageItems?.map((order: Daum) =>
            showGrid ? (
              <div data-testid="grid-view" key={order._id}>
                <OrderCard order={order} key={order._id} />
              </div>
            ) : (
              <div className="w-full" data-testid="list-view" key={order._id}>
                <OrderListItem
                  order={order}
                  key={order._id}
                  tableHeaders={tableHeaders}
                />
              </div>
            ),
          )}
        </OrderList>
      </div>
    </div>
  );
};

export default ValidationOrderPage;
