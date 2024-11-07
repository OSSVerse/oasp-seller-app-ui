import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";

const TabItem = ({
  title,
  badge,
  value,
}: {
  title: string;
  badge: number;
  value: string;
}) => {
  return (
    <TabsTrigger
      value={value}
      className="flex items-center gap-0 md:gap-2 outline-none data-[state=active]:bg-transparent data-[state=active]:border-primary data-[state=active]:border-b-2 rounded-none !shadow-none overflow-auto max-w-screen p-1 md:p-4"
    >
      <span>{title}</span>
      <Badge variant="secondary">{badge}</Badge>
    </TabsTrigger>
  );
};

const OrderTabs = ({
  tabItems,
  activeTabValue = "Created",
}: {
  tabItems: { title: string; number: number; value: string }[];
  activeTabValue?: string;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("state") ?? activeTabValue;
  const onChange = (value: string) => {
    if (value === "") {
      searchParams.delete("state");
    } else {
      searchParams.set("state", value);
    }
    setSearchParams(searchParams);
  };
  return (
    <Tabs onValueChange={onChange} value={activeTab} className="w-full">
      <TabsList className="gap-0 md:gap-4">
        {tabItems.map((tabItem) => (
          <TabItem
            title={tabItem.title}
            badge={tabItem.number}
            value={tabItem.value}
            key={tabItem.title}
          />
        ))}
      </TabsList>
    </Tabs>
  );
};

export default OrderTabs;
