import AppBreadCrumb from "@/components/common/app-breadcrumb";
import GridLayoutIcon from "@/components/icons/grid-layout-icon";
import ListLayoutIcon from "@/components/icons/list-layout-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { H1 } from "@/components/ui/typography";
import { ChevronDownIcon, Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import MarketplaceList from "../components/marketplace-list";
import { useMarketPlaceProducts } from "@/services/marketplace-service";
import { useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PRODUCT_CATEGORY } from "@/lib/constant";

const breadcrumb = [
  {
    title: "Dashboard",
    url: "/dashboard",
  },
  {
    title: "Marketplace",
    url: "/dashboard/marketplace",
  },
];

const TabItem = ({
  title,
  badge,
  value,
}: { title: string; badge: number; value: string }) => {
  return (
    <TabsTrigger
      value={value}
      className="flex bg-transparent items-center gap-0 md:gap-2 outline-none data-[state=active]:font-semibold data-[state=active]:border-primary data-[state=active]:border-b-2 rounded-none !shadow-none overflow-auto max-w-screen p-1 md:p-4 data-[state=active]:bg-transparent"
    >
      <span>{title}</span>
      <Badge variant={"secondary"}>{badge}</Badge>
    </TabsTrigger>
  );
};

const MarketPlacePage = ({ isHomePage = false }: { isHomePage?: boolean }) => {
  // const { data, isLoading } = useMarketPlaceProducts("", "OSS Project");
  // const { modalData, isLoading: isModalLoading } = useMarketPlaceProducts("", "OSS Model");

  const [searchParams, setSearchParams] = useSearchParams();
  const showFilter = searchParams.get("filter") || "";
  const activeTab = searchParams.get("q") || "";
  const selectedCategory = {
    projects: "OSS Project",
    "ml-models": "OSS Model",
  };
  const { data, isLoading } = useMarketPlaceProducts(
    "",
    selectedCategory[activeTab as keyof typeof selectedCategory] ?? "",
  );

  const onChange = (value: string) => {
    if (value === "") {
      searchParams.delete("q");
    } else {
      searchParams.set("q", value);
    }
    setSearchParams(searchParams);
  };
  const onFilterChange = (value: string) => {
    if (value) {
      searchParams.delete("filter");
    } else {
      searchParams.set("filter", "true");
    }
    setSearchParams(searchParams);
  };

  const [isGrid, setIsGrid] = useState(false);

  const filteredData = useMemo(() => {
    if (data) {
      return data.filter((item) => activeTab ? item.productCategory === PRODUCT_CATEGORY[activeTab as keyof typeof PRODUCT_CATEGORY] : true);
    }
    return [];
  }, [data, activeTab]);



  return (
    <div className="page-root flex flex-col gap-11 relative ">
      <div className="absolute top-0 left-0 w-full h-[300px] -z-10 bg-[#CCCC] " />
      {!isHomePage && <AppBreadCrumb data={breadcrumb} />}
      <div className="flex gap-4 flex-wrap md:flex-nowrap  ">
        {isHomePage ? <H1>Explore Marketplace</H1> : <H1>Marketplace</H1>}
        <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 ">
          <form className="ml-auto flex-1 flex  gap-3 w-full md:w-auto">
            <div className="relative border-2 border-black/40 rounded-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search Project/ML Model name.."
                className="pl-8 w-full md:w-[200px] lg:w-[380px]"
              />
            </div>
            {/* <Button className="rounded-full">On-Demand Request</Button> */}
          </form>
        </div>
      </div>
      <div className="flex flex-col-reverse  md:flex-row  justify-between gap-4 items-center  flex-wrap md:flex-nowrap">
        <Tabs onValueChange={onChange} value={activeTab} className="w-full">
          <TabsList className="bg-transparent gap-0 md:gap-4">
            <TabItem title="All Project" badge={123} value="" />
            <TabItem title="Project" badge={123} value="projects" />
            <TabItem title="ML Model" badge={123} value="ml-models" />
          </TabsList>
        </Tabs>
        <div className="flex w-full md:justify-end items-center gap-4">
          <div>
            <Button
              variant={"outline"}
              size="icon"
              className=" border-none bg-transparent hover:bg-transparent "
              onClick={() => setIsGrid(false)}
            >
              <ListLayoutIcon
                className={`h-5 w-5  duration-200 hover:text-black ${isGrid ? "text-gray-500" : "text-black"}`}
              />
            </Button>
            <Button
              variant={"outline"}
              size="icon"
              className="border-none bg-transparent hover:bg-transparent"
              onClick={() => setIsGrid(true)}
            >
              <GridLayoutIcon
                className={`h-5 w-5  duration-200 hover:text-black ${isGrid ? "text-black" : "text-gray-500"}`}
              />
            </Button>
          </div>
          {/* <div className="w-2 h-full bg-black" >hi</div> */}
          <div className="w-[2px] h-8 bg-gray-400 my-2 rounded-md" />
          <Button onClick={() => onFilterChange(showFilter)}>Filter</Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button>
                Newest
                <ChevronDownIcon className="h-5 w-5 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <span>Newest</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : filteredData && filteredData.length > 0 ? (
          <MarketplaceList showFilter={!!showFilter} products={filteredData} />
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
};

export default MarketPlacePage;
