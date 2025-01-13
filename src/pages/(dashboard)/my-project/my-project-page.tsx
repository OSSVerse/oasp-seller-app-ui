import AppBreadCrumb from "@/components/common/app-breadcrumb";
import GridLayoutIcon from "@/components/icons/grid-layout-icon";
import ListLayoutIcon from "@/components/icons/list-layout-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { H1 } from "@/components/ui/typography";
import { Search } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Separator } from "@radix-ui/react-separator";

import SwitchToMenu from "../components/switch-to-menu";
import { PATH } from "@/lib/path-constant";
import OrderList from "../components/order-list";
import OrderTabs from "../components/order-tabs";
import Icon from "@/components/common/icon";
import SortMenu from "../components/sort-menu";
import ProjectCard from "./components/project-card";
import ProjectListItem from "./components/project-list-item";
import OrderListHeader from "../components/order-list-header";
import type { Product } from "@/services/my-product-service";
import { useMarketPlaceProducts } from "@/services/marketplace-service";

const breadcrumb = [
  {
    title: "Dashboard",
    url: PATH.DASHBOARD,
  },
  {
    title: "My Solution",
    url: PATH.MYPROJECTS,
  },
];

const tableHeaders = ["Project Name", "Services", "Pricing"];

const getItemLength = (data: Product[], state: string) => {
  return data.filter((item) =>
    state === "published" ? item.published : !item.published,
  ).length;
};

const initialFilters = {
  "Service Order": [
    { name: "All Service Offered", value: "all" },
  ],
  "Price Range": [],
};

const defaultInitialFilters = JSON.parse(JSON.stringify(initialFilters));

const MyProjectPage = () => {
  const [filterContent, setFilterContent] = useState(defaultInitialFilters);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [activeFilters, setActiveFilters]: any = useState(JSON.parse(JSON.stringify(initialFilters)));

  const {
    data: marketplaceData,
    isLoading: isMarketplaceLoading,
    isError: isMarketplaceError,
  } = useMarketPlaceProducts("", "");
  const [searchTerm, setSearchTerm] = useState("");

  // Function to filter marketplace data based on search term
  const filterData = marketplaceData?.filter((item) => {
    const projectName = item.productName.toLowerCase();
    return projectName.includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const updatedFilterdata: any = { ...initialFilters }; // Start with the initial filter state

    const minPrice = 0;
    let maxPrice = Number.NEGATIVE_INFINITY;
    if (marketplaceData) {
      // Loop through each data entry (in case there are multiple data entries)
      marketplaceData.map((entry) => {
        entry?.services?.map((item) => {
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
          const priceValue = item.price;
          maxPrice = Math.max(maxPrice, priceValue);
        });
      });
      // Update the "Price Range" filter with the calculated min and max price
      updatedFilterdata["Price Range"] = [
        { min: minPrice, max: maxPrice, minPrice, maxPrice },
      ];
    }

    setFilterContent(updatedFilterdata);
  }, [marketplaceData]);

  // Get checked services excluding "All Service Offered"
  const checkedServices = activeFilters["Service Order"]
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    .filter((filter: { checked: any; value: string; }) => filter.checked && filter.value !== "all")
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    .map((filter: { name: any; }) => filter.name);

  // Determine the filtered data
  let filteredData = checkedServices.length > 0
    ? filterData?.filter((order) => {
      // Check if any item's productSubcategory1 matches a checked service
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      return order.services.some((item: { productSubcategory1: any; }) => checkedServices.includes(item.productSubcategory1));
    })
    : filterData;

  if (activeFilters["Price Range"].length !== 0) {
    // Get the price range from active filters
    const { minPrice, maxPrice } = activeFilters["Price Range"][0];

    // Filter the data based on the price range
    filteredData = filteredData?.filter(item => item.totalPrice >= minPrice && item.totalPrice <= maxPrice);
  }

  const [searchParams, setSearchParams] = useSearchParams();
  const [isGrid, setIsGrid] = useState(false);
  const showGrid = !!isGrid;
  const publishedLength = getItemLength(marketplaceData || [], "published");
  const unpublishedLength = getItemLength(marketplaceData || [], "unpublished");

  const TabItems = [
    { title: "Published", value: "published", number: publishedLength },
    { title: "Unpublished", value: "unpublished", number: unpublishedLength },
  ];
  const activeTabValue = TabItems[0].value;

  const showFilter = searchParams.get("filter") || "";

  const activeTab = searchParams.get("state") ?? activeTabValue;

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

  if (isMarketplaceLoading) return <div>Loading...</div>;
  if (!marketplaceData) {
    return <div>No data available</div>;
  }
  if (isMarketplaceError) {
    return <div>Error loading products</div>;
  }

  return (
    <div className="page-root flex flex-col gap-7">
      <div className="absolute top-0 left-0 w-full h-[370px] -z-10 bg-neutral-100" />
      <AppBreadCrumb data={breadcrumb} />
      <div className="flex gap-4 flex-wrap md:flex-nowrap ">
        <div className="flex items-center gap-2">
          <H1>My Solution</H1>
          <Separator
            orientation="vertical"
            className="shrink-0 bg-border h-4 w-[3px] ml-4"
          />
          <SwitchToMenu length={marketplaceData?.length} />
        </div>
        <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 ">
          <form className="ml-auto flex-1 flex  gap-3 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search Project Name.."
                className="pl-8 w-full md:w-[200px] lg:w-[400px]"
                value={searchTerm} // Bind to searchTerm state
                onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
              />
            </div>
            <Link to={PATH.CREATE_MYPROJECTS}>
              <Button>
                <Icon icon="add" className="mr-2 stroke-white" />
                New Project
              </Button>
            </Link>
          </form>
        </div>
      </div>
      <div className="flex flex-col-reverse  md:flex-row  justify-between gap-4 items-center  flex-wrap lg:flex-nowrap">
        <div className="flex items-center">
          <OrderTabs tabItems={TabItems} activeTabValue={activeTabValue} />
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
      <div className="xl:w-[1406px] mx-auto">
        <OrderList showFilter={!!showFilter} showGrid={showGrid} filterContent={filterContent} setActiveFilters={setActiveFilters}>
          {!showGrid && <OrderListHeader tableHeaders={tableHeaders} />}
          {filteredData?.filter((item) => item?.published === (activeTab === "published")).map((item) =>
            showGrid ? (
              <ProjectCard order={item} key={item._id} />
            ) : (
              <ProjectListItem
                order={item}
                key={item._id}
                tableHeaders={tableHeaders}
              />
            ),
          )}
        </OrderList>
      </div>
    </div >
  );
};

export default MyProjectPage;
