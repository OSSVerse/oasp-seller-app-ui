import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import CartIcon from "@/components/icons/cart-icon";
import OrderProgressIcon from "@/components/icons/order-progress-icon";
import { Badge } from "@/components/ui/badge";
import ExternalLinkIcon from "@/components/icons/external-link-icon";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { TabItem } from "../(main)/home-page";
import { Link, useSearchParams } from "react-router-dom";
import { useOrders } from "@/services/orders-service";
import { useMemo } from "react";
import { ORDER_STATUS } from "@/lib/constant";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ProjectIcon from "@/components/icons/project-icon";
import useAuthStore from "@/store/auth-store";

dayjs.extend(relativeTime);

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

const StatsCard = ({
  title,
  value,
  icon,
  footer,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  footer: React.ReactNode;
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle className="font-bold text-xl ">{value}</CardTitle>
            <Typography muted className="text-lg">
              {title}
            </Typography>
          </div>
          <div>{icon}</div>
        </div>
      </CardHeader>

      <CardFooter className="mt-3">{footer}</CardFooter>
    </Card>
  );
};

const OrdersCard = () => {
  const getOrderCard = (
    title: string,
    value: number,
    color: string,
    extraclass: string,
  ) => {
    return (
      <div className="flex-1 flex flex-col gap-2">
        <div className={`flex flex-col w-full ${color}  h-5 ${extraclass}`} />
        <Typography className="text-lg sm:text-2xl font-bold">
          {value}
        </Typography>
        <Typography className="text-xs whitespace-nowrap" muted>
          {title}
        </Typography>
      </div>
    );
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Orders Completed</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          {getOrderCard("Projects", 19, "bg-[#CCC]", "rounded-l-full")}
          {getOrderCard("ML Models", 86, "bg-[#808080]", "mx-[2px]")}
          {getOrderCard(
            "On Demand Requests",
            28,
            "bg-[#4D4D4D]",
            "ml-1 rounded-r-full",
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const OrdersInProgressCard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("f") || "assessment-orders";

  const onChange = (value: string) => {
    if (value === "") {
      searchParams.delete("f");
    } else {
      searchParams.set("f", value);
    }
    setSearchParams(searchParams);
  };

  const { data: orderDetails } = useOrders();
  const pendingOrders = useMemo(() => {
    if (orderDetails) {
      return orderDetails?.data?.filter((order) => order.state === ORDER_STATUS.PENDING);
    }
    return [];
  }, [orderDetails]);

  return (
    <Card className="mb-4 flex flex-col">
      <CardHeader>
        <Tabs onValueChange={onChange} value={activeTab} className="w-full lg:flex items-center">
          <span className="text-sm text-gray-700 inline-block mb-2 pt-3">Pending:</span>
          <TabsList className="bg-transparent gap-0 md:gap-4 text-muted-foreground">
            <TabItem title="Assessment" value="assessment-orders" badge={pendingOrders?.length} />
            <TabItem title="Validation" value="validation-orders" badge={pendingOrders?.length} />
            <TabItem title="Remediation" value="remediation-orders" badge={pendingOrders?.length} />
            <TabItem title="Pen Testing" value="pen-testing-orders" badge={pendingOrders?.length} />
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-2">
        <ul className="flex-1 relative overflow-auto">
          {pendingOrders?.map((order) => (
            <li
              key={order._id}
              className="flex justify-between items-center border-b last:border-b-0 py-2"
            >
              <div className="flex items-center gap-2">
                <Badge className="rounded-full h-10 w-10" variant="secondary">
                  <OrderProgressIcon />
                </Badge>
                <div>
                  <Typography className="font-bold">{order?.items[0]?.descriptor?.name}</Typography>
                  <Typography muted>
                    Assigned {dayjs(order?.createdAt).fromNow()} day
                    • ₹{order?.quote?.price?.value}{" "}
                    • {order?.billing?.email}
                  </Typography>
                </div>
              </div>
              <Link to={`/dashboard/${activeTab}/${order._id}`}>
                <Button variant="icon" aria-label="Edit order">
                  <ExternalLinkIcon />
                </Button>
              </Link>
            </li>
          ))}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
        </ul>
        <Link to={`/dashboard/${activeTab}`}>
          <Button className="mt-4 w-fit">View All</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

const PendingOrdersCard = ({ title, state, link }: { title: string, state: string, link: string }) => {
  const { data: orderDetails } = useOrders();
  const pendingOrders = useMemo(() => {
    if (orderDetails) {
      return orderDetails?.data?.filter((order) => order.state === state);
    }
    return [];
  }, [orderDetails, state]);

  return (
    <Card className="mb-4 h-[450px] flex flex-col">
      <CardHeader className="flex gap-2 flex-row items-center">
        <CardTitle>{title}</CardTitle>
        <Badge variant={"secondary"} className="text-xs">
          {pendingOrders?.length}
        </Badge>
      </CardHeader>

      <CardContent className="flex flex-1 overflow-hidden flex-col gap-2">
        <ul className="flex-1 overflow-auto">
          {pendingOrders?.map((order) => (
            <li
              key={order._id}
              className="flex justify-between items-center border-b last:border-b-0 py-2"
            >
              <div className="flex items-center gap-2">
                <Badge className="rounded-full h-10 w-10" variant="secondary">
                  <OrderProgressIcon />
                </Badge>
                <div>
                  <Typography className="font-bold">{order?.items[0]?.descriptor?.name}</Typography>
                  <Typography muted>
                    Assigned {dayjs(order?.createdAt).fromNow()} day
                    • ₹{order?.quote?.price?.value}{" "}
                    • {order?.billing?.email}
                  </Typography>
                </div>
              </div>
              <Link to={`${link}/${order._id}`}>
                <Button variant="icon" aria-label="Edit order">
                  <ExternalLinkIcon />
                </Button>
              </Link>
            </li>
          ))}
        </ul>
        <Link className="w-fit" to={link}>
          <Button className="mt-4 w-full">View All</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

const RequestsInProgress = () => {
  const requests = [
    { name: "Rev Up Innovation", daysAgo: 7, price: 2100, client: "OpenFort" },
    { name: "Ignite Mobility", daysAgo: 10, price: 3150, client: "USE" },
    {
      name: "Gear Up for Change",
      daysAgo: 7,
      price: 2100,
      client: "GreenHill",
    },
    { name: "Drive the Future", daysAgo: 7, price: 2100, client: "Tocomo" },
  ];

  return (
    <Card className="mb-4 overflow-hidden">
      <CardHeader className="flex gap-2 flex-row items-center">
        <CardTitle>Requests In Progress</CardTitle>
        <Badge variant={"secondary"} className="text-[10px]">
          {requests.length}
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-col flex-1">
        <ul className=" relative flex-1 ">
          {requests.map((request) => (
            <li
              key={request.name}
              className="flex justify-between items-center border-b last:border-b-0 py-2"
            >
              <div>
                <Typography className="font-bold">{request.name}</Typography>
                <Typography muted>
                  {request.daysAgo} days • ₹{request.price} • {request.client}
                </Typography>
              </div>
              <Button variant="icon" aria-label="Edit request">
                <ExternalLinkIcon />
              </Button>
            </li>
          ))}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
        </ul>
        <Button className="mt-4 w-fit" disabled={true}>View All</Button>
      </CardContent>
    </Card>
  );
};

const lineGraphSettings = {
  maintainAspectRatio: false,
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  elements: {
    point: {
      radius: 0,
    },
    line: {
      tension: 0.4,
    },
  },
};

type CardType = {
  title: string;
  value: string;
  subtitle: React.ReactNode;
  footerTitle: string;
  footerValue: string;
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
};

const CardComponent = ({
  title,
  value,
  subtitle,
  footerTitle,
  footerValue,
  data,
}: CardType) => {
  return (
    <Card className="p-0 border flex flex-col  py-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <Typography className="text-2xl font-bold">{value}</Typography>
        <Typography className="text-sm" muted>
          {" "}
          {subtitle}{" "}
        </Typography>
      </CardHeader>
      <CardContent className="p-1 flex-1">
        <div className="h-[120px] px-6">
          <Line data={data} options={lineGraphSettings} />
        </div>
      </CardContent>
      <div className="flex justify-between items-center px-4">
        <Typography className=" font-semibold" muted>
          {footerTitle}
        </Typography>
        <Typography className=" font-bold ">{footerValue}</Typography>
      </div>
    </Card>
  );
};

const DashboardPage = () => {
  const auth = useAuthStore();
  return (
    <div>
      <div className="h-[280px] bg-gray-100 -mt-3" />
      <div className=" -mt-60">
        <div className="dashboard-page page-root">
          <div className="mb-6 flex items-center gap-2">
            <div className="bg-gray-200 p-3 rounded-full">
              <ProjectIcon className="h-8 w-8" />
            </div>
            <div className="flex flex-col gap-1">

              <h1 className="text-2xl font-bold capitalize">{auth.user?.name}</h1>
              <span className="text-sm text-gray-500">N/A</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
            <div>
              <PendingOrdersCard
                link="/dashboard/assessment-orders"
                title="Pending Assessment Order"
                state={ORDER_STATUS.PENDING}
              />
            </div>
            <div>
              <PendingOrdersCard
                link="/dashboard/validation-orders"
                title="Pending Validation Order"
                state={ORDER_STATUS.PENDING}
              />
            </div>
            <div>
              <PendingOrdersCard
                link="/dashboard/validation-orders"
                title="Completed Validation Order"
                state={ORDER_STATUS.COMPLETED_ORDER}
              />
            </div>
          </div>

          <div className="grid grid-cols-10 gap-4">
            <div className="col-span-10 sm:col-span-5 xl:col-span-3">
              <StatsCard
                title="Products Available"
                value={956}
                icon={<CartIcon />}
                footer={<Button disabled={true}>Explore marketplace</Button>}
              />
            </div>
            <div className="col-span-10 sm:col-span-5 xl:col-span-3">
              <StatsCard
                title="Products Produced"
                value={12}
                icon={<CartIcon />}
                footer={<Button disabled={true}>Get Certified as OASP</Button>}
              />
            </div>
            <div className="col-span-10 xl:col-span-4">
              <OrdersCard />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            <CardComponent
              title="Revenue (this month)"
              value="₹120,250"
              subtitle={
                <>
                  <span className="text-green-500">+2.5%</span> from last month
                </>
              }
              footerTitle="Total Revenue"
              footerValue="₹1,322,330"
              data={spendData}
            />
            <CardComponent
              title="Cost Saved (this month)"
              value="₹120,250"
              subtitle={
                <>
                  <span className="text-red-500">-1.5%</span> from last month
                </>
              }
              footerTitle="Total Cost Saved"
              footerValue="₹22,330"
              data={costSavedData}
            />
            <CardComponent
              title="New Subscriptions (this month)"
              value="₹120,250"
              subtitle={
                <>
                  <span className="text-green-500">+2.5%</span> from last month
                </>
              }
              footerTitle="Total Subscribers"
              footerValue="330"
              data={subscriptionsData}
            />

            <Card>
              <CardHeader>
                <CardTitle>Top 5 Spend</CardTitle>
              </CardHeader>
              <CardContent className="p-1" style={{ height: "260px" }}>
                <Bar
                  data={topSpendData}
                  options={{
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                  }}
                />
              </CardContent>
            </Card>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <OrdersInProgressCard />
            <RequestsInProgress />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Card className=" col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle>Top 5 Spend</CardTitle>
              </CardHeader>
              <CardContent>
                <Bar data={topSpendData} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const spendData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Spend",
      data: [120250, 130000, 125000, 140000],
      borderColor: "#666",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
    },
  ],
};

const costSavedData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Cost Saved",
      data: [7430, 8000, 7600, 8200],
      borderColor: "#666",
      backgroundColor: "rgba(153, 102, 255, 0.2)",
    },
  ],
};

const subscriptionsData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "New Subscriptions",
      data: [97, 100, 105, 110],
      borderColor: "#666",
      backgroundColor: "rgba(255, 159, 64, 0.2)",
    },
  ],
};

const topSpendData = {
  labels: ["Marketing", "Operations", "R&D", "Sales", "IT"],
  datasets: [
    {
      label: "Top Spend",
      data: [120, 100, 80, 60, 40],
      backgroundColor: [
        "rgba(102, 102, 102, 0.1)",
        "rgba(102, 102, 102, 0.1)",
        "rgba(102, 102, 102, 0.1)",
        "rgba(102, 102, 102, 0.1)",
        "rgba(102, 102, 102, 0.1)",
      ],
      borderWidth: 0,
      barThickness: 10, // Assuming default thickness is higher, adjust as needed
    },
  ],
};

export default DashboardPage;
