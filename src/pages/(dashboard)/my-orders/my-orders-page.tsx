import AppBreadCrumb from "@/components/common/app-breadcrumb";
import GridLayoutIcon from "@/components/icons/grid-layout-icon";
import ListLayoutIcon from "@/components/icons/list-layout-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { H1 } from "@/components/ui/typography";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import MyOrdersList from "../components/my-orders-list";
import { useState } from "react";

const breadcrumb = [
  {
    title: "Dashboard",
    url: "/dashboard",
  },
  {
    title: "My Orders",
    url: "/dashboard/orders",
  },
];

const TabItem = ({
  title,
  badge,
  variant,
  value,
}: {
  title: string;
  badge: number;
  variant:
  | "default"
  | "success"
  | "progress"
  | "pending"
  | "secondary"
  | "destructive"
  | "outline"
  | null
  | undefined;
  value: string;
}) => {
  return (
    <TabsTrigger
      value={value}
      className="flex items-center gap-0 md:gap-2 outline-none data-[state=active]:border-primary data-[state=active]:border-b-2 rounded-none !shadow-none overflow-auto max-w-screen p-1 md:p-4"
    >
      <span>{title}</span>
      <Badge variant={variant}>{badge}</Badge>
    </TabsTrigger>
  );
};

const MyOrdersPage = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const showFilter = searchParams.get("filter") || "";
  const activeTab = searchParams.get("q") || "";
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
  const onDisplayChange = (value: boolean) => {
    setIsGrid(value);
  };
  return (
    <div className="page-root flex flex-col gap-7">
      <AppBreadCrumb data={breadcrumb} />
      <div className="flex gap-4 flex-wrap md:flex-nowrap ">
        <H1>My Orders</H1>
        <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 ">
          <form className="ml-auto flex-1 flex  gap-3 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by Order Project name or #..."
                className="pl-8 w-full md:w-[200px] lg:w-[300px]"
              />
            </div>
            {/* <Button className="rounded-full">
                    On-Demand Request
                </Button> */}
          </form>
        </div>
      </div>
      <div className="flex flex-col-reverse  md:flex-row  justify-between gap-4 items-center  flex-wrap md:flex-nowrap">
        <Tabs onValueChange={onChange} value={activeTab} className="w-full">
          <TabsList className="bg-transparent gap-0 md:gap-4">
            <TabItem title="All" badge={26} variant="secondary" value="" />
            <TabItem
              title="Pending Acceptance"
              variant="pending"
              badge={8}
              value="pending"
            />
            <TabItem
              title="Work in Progress"
              variant="progress"
              badge={6}
              value="progress"
            />
            <TabItem
              title="Delivered"
              variant="success"
              badge={12}
              value="delivered"
            />
          </TabsList>
        </Tabs>
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
          <Button>Due Date</Button>
        </div>
      </div>
      <div>
        <MyOrdersList showFilter={!!showFilter} showGrid={!!isGrid} />
      </div>
    </div>
  );
};

export default MyOrdersPage;
