import { Card } from "@/components/ui/card";
import { H2 } from "@/components/ui/typography";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import OrderCheckList from "./order-check-list";
import type { Daum } from "@/services/orders-service";

// const servicesLists: Daum["items"] = [
//   {
//     id: "servicesItems-1",
//     name: "Assessment",
//     qty: 400,
//     icon: "search-alt",
//   },
//   {
//     id: "servicesItems-2",
//     name: "Attestation",
//     qty: 400,
//     icon: "rr-file",
//   },
//   {
//     id: "servicesItems-3",
//     name: "Certification",
//     icon: "diploma",
//     qty: 400,
//   },
//   {
//     id: "servicesItems-4",
//     name: "Remediation",
//     qty: 400,
//     icon: "refresh",
//   },
//   {
//     id: "servicesItems-5",
//     name: "Feature Enhancement",
//     qty: 300,
//     icon: "file-add",
//   },
//   {
//     id: "servicesItems-6",
//     name: "TAVOSS Version",
//     qty: 400,
//     icon: "file",
//   },
//   {
//     id: "servicesItems-7",
//     name: "Security Hardening",
//     qty: 400,
//     icon: "file",
//   },
//   {
//     id: "servicesItems-8",
//     name: "Vuinerability Management",
//     qty: 400,
//     icon: "file",
//   },
//   {
//     id: "servicesItems-9",
//     name: "Code Review & Analysis",
//     qty: 400,
//     icon: "file",
//   },
//   {
//     id: "servicesItems-10",
//     name: "Penetration Testing",
//     qty: 400,
//     icon: "file",
//   },
//   {
//     id: "servicesItems-11",
//     name: "Test",
//     qty: 400,
//     icon: "file",
//   },
//   {
//     id: "servicesItems-12",
//     name: "Dummy",
//     qty: 400,
//     icon: "file",
//   },
// ];

interface OrderDetailServiceOrderProps {
  serviceOrders: Daum;
}

const OrderDetailServiceOrder = ({
  serviceOrders,
}: OrderDetailServiceOrderProps) => {
  const [selectedServices, setSelectedServices] =
    useState<Daum["items"]>(serviceOrders?.items ?? []);

  useEffect(() => {
    setSelectedServices(serviceOrders.items);
  }, [serviceOrders]);

  return (
    <Card className="px-5 py-6 mb-4">
      <div className="flex gap-11 flex-wrap mb-4 w-full md:flex-nowrap items-end justify-between">
        <div className="basis-3/5 flex gap-4 items-center">
          <div>
            <H2>Service List</H2>
          </div>
        </div>
        <div className="basis-2/5 flex gap-4 justify-end">
          <form className="ml-auto flex  gap-3 md:w-auto">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search Service.."
                className="pl-8 w-full md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
        </div>
      </div>
      {/* service list */}
      <OrderCheckList
        selectedServices={selectedServices}
        items={serviceOrders.items || []}
        setSelectedItems={setSelectedServices}
        disabledLength={selectedServices?.length >= 1}
      />
    </Card>
  );
};

export default OrderDetailServiceOrder;
