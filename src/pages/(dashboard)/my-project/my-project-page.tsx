import AppBreadCrumb from "@/components/common/app-breadcrumb";
import GridLayoutIcon from "@/components/icons/grid-layout-icon";
import ListLayoutIcon from "@/components/icons/list-layout-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { H1 } from "@/components/ui/typography";
import { Search } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
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
    title: "My Projects",
    url: PATH.MYPROJECTS,
  },
];

const tableHeaders = ["Project Name", "Services", "Pricing"];

const getItemLength = (data: Product[], state: string) => {
  return data.filter((item) =>
    state === "published" ? item.published : !item.published,
  ).length;
};

const MyProjectPage = () => {
  const {
    data: marketplaceData,
    isLoading: isMarketplaceLoading,
    isError: isMarketplaceError,
  } = useMarketPlaceProducts("", "");

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
      <AppBreadCrumb data={breadcrumb} />
      <div className="flex gap-4 flex-wrap md:flex-nowrap ">
        <div className="flex items-center gap-2">
          <H1>My Projects</H1>
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
      <div className="flex flex-col-reverse md:flex-row  justify-between gap-4 items-center  flex-wrap md:flex-nowrap">
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
      <div>
        <OrderList showFilter={!!showFilter}>
          {!showGrid && <OrderListHeader tableHeaders={tableHeaders} />}
          {marketplaceData?.filter((item) => item?.published === (activeTab === "published")).map((item) =>
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
    </div>
  );
};

export default MyProjectPage;
