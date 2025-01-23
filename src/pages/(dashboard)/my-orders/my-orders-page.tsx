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
import { useEffect, useMemo, useState } from "react";
import { useOrders } from "@/services/orders-service";

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

const initialFilters = {
  "Service Order": [
    { name: "All Service Offered", value: "all" },
  ],
  "Assigned OASP": [
    { name: "All OASP", value: "all" }
  ],
  "Categories": [
    { name: "All Categories", value: "all" }
  ]
};

const defaultInitialFilters = JSON.parse(JSON.stringify(initialFilters));

const MyOrdersPage = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const showFilter = searchParams.get("filter") || "";
  const activeTab = searchParams.get("q") || "";
  const [filterContent, setFilterContent] = useState(defaultInitialFilters);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [activeFilters, setActiveFilters]: any = useState(JSON.parse(JSON.stringify(initialFilters)));
  const [searchTerm, setSearchTerm] = useState("");
  const featuredCurrentPage = Number(searchParams.get("mpage")) || 1;
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

  const { data } = useOrders();
  useEffect(() => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const updatedFilterdata: any = { ...initialFilters }; // Start with the initial filter state

    if (data) {
      // Loop through each data entry (in case there are multiple data entries)
      data.data.map((entry) => {
        entry.items.map((item) => {
          const serviceValue = item.productSubcategory1.toLowerCase().replace(/\s+/g, "-");
          const categoriesValue = item.category_id.toLowerCase().replace(/\s+/g, "-");

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
          if (
            !updatedFilterdata.Categories.some(
              (categorie: { value: string; }) => categorie.value === categoriesValue
            )
          ) {
            updatedFilterdata.Categories.push({
              name: item.category_id,
              value: categoriesValue,
            });
          }
        })
        const oaspValue = entry.organization.name.toLowerCase().replace(/\s+/g, "-");
        if (
          !updatedFilterdata["Assigned OASP"].some(
            (oasp: { value: string; }) => oasp.value === oaspValue
          )
        ) {
          updatedFilterdata["Assigned OASP"].push({
            name: entry.organization.name,
            value: oaspValue,
          });
        }
      });
    }

    setFilterContent(updatedFilterdata);
  }, [data]);

  const filteredData = useMemo(() => {
    if (data?.data) {
      return data.data.filter((order) => {
        return Object.keys(activeFilters).every((filterKey) => {
          return activeFilters[filterKey].some((filter: { checked: boolean; value: string; }) => {
            if (filter.checked === undefined) return true;
            if (!filter.checked) return false;
            if (filter.value === "all") return true;

            switch (filterKey) {
              case "Service Order":
                return order.items.some(
                  (item) =>
                    item.productSubcategory1.toLowerCase().replace(/\s+/g, "-") === filter.value
                );
              case "Categories":
                return order.items.some(
                  (item) =>
                    item.category_id.toLowerCase().replace(/\s+/g, "-") === filter.value
                );
              case "Assigned OASP":
                return (
                  order.organization.name.toLowerCase().replace(/\s+/g, "-") === filter.value
                );
              default:
                return false;
            }
          });
        });
      }).filter((order) =>
        order?.items[0]?.descriptor?.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }
    return [];
  }, [data, activeFilters, searchTerm]);

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
        <H1>My Orders</H1>
        <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 ">
          <form className="ml-auto flex-1 flex  gap-3 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by Order Project name or #..."
                className="pl-8 w-full md:w-[200px] lg:w-[300px]"
                value={searchTerm} // Bind to searchTerm state
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="flex flex-col-reverse  md:flex-row  justify-between gap-4 items-center  flex-wrap lg:flex-nowrap">
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
        <MyOrdersList showFilter={!!showFilter} showGrid={!!isGrid} filterContent={filterContent} getFeaturedPageItems={getFeaturedPageItems} setActiveFilters={setActiveFilters} onFeaturedPageChange={onFeaturedPageChange} featuredCurrentPage={featuredCurrentPage} products={filteredData} />
      </div>
    </div>
  );
};

export default MyOrdersPage;
