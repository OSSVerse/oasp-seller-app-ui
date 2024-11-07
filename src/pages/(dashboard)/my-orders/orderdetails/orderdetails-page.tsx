import AppBreadCrumb from "@/components/common/app-breadcrumb";
import { useState } from "react";
import AnchorLists, {
  isLessThanCurrentAnchor,
} from "../../components/anchor-list";
import OrderDetailsPaymentMethod from "./components/orderdetails-payment-method";
import OrderDetailsHeader from "./components/orderdetails-header";
import { cn } from "@/lib/utils";
import { Muted } from "@/components/ui/typography";
import OrderDetails from "./components/orderdetails";

const breadcrumb = [
  {
    title: "Dashboard",
    url: "/dashboard",
  },
  {
    title: "MY ORDERS",
    url: "/dashboard/orders",
  },
  {
    title: "Orders Details & Tracking",
    url: "/dashboard/orders/detail",
  },
];

const anchorList = [
  "Order Details",
  "Select OASP Bids",
  "Payment & Billing Information",
  "Communication",
];

const order = {
  title: "AutoSync Project",
  transaction_ID: "#12345",
  type: "PROJECT",
  total_payment_amount: "1,100",
  credit_card: {
    number: "12134 1234 1234 1234",
    date: "08/24 XXX",
  },
  order_details: {
    project_title: "Batteries Charger Auto for Automotive",
    assesment_project_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    outcome: "Identify and report vulnerabilities",
    expected_time_of_delivery: {
      time_line: "2024/9/12 07:00 AM",
      priority_level: "High",
    },
    deliverables: "Download Assessment Report",
  },
};

const OrderDetailsPage = () => {
  const [currentAnchor, setCurrentAnchor] = useState(0);
  return (
    <div className="page-root flex flex-col gap-7">
      <AppBreadCrumb data={breadcrumb} />

      <OrderDetailsHeader
        type={order.type}
        title={order.title}
        transactionID={order.transaction_ID}
      />

      <main
        className="flex gap-11 flex-wrap mb-4 w-full md:flex-nowrap
      before:content=['']
      before:absolute
      before:top-0
      before:left-0
      before:w-full
        before:h-[400px]
        before:bg-neutral-100
        before:z-[-1]
      }
      "
      >
        <aside className="basis-72 flex-shrink-0">
          <AnchorLists
            currentAnchor={currentAnchor}
            setCurrentAnchor={setCurrentAnchor}
            anchroLists={anchorList}
          />
          <OrderDetailsPaymentMethod
            number={order.credit_card.number}
            date={order.credit_card.date}
            totalAmount={order.total_payment_amount}
          />
        </aside>
        <div className="flex-grow">
          {/* order detail section */}
          <section
            className={cn(
              isLessThanCurrentAnchor(0, currentAnchor) && "hidden",
            )}
          >
            <Muted className="mb-4">{anchorList[0].toLocaleUpperCase()}</Muted>
            <OrderDetails order_detail={order?.order_details} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default OrderDetailsPage;
