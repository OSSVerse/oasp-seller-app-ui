import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { H2 } from "@/components/ui/typography";
import { Search } from "lucide-react";
import type { ServiceOrder } from "../../components/order-list";
import { useEffect, useState } from "react";



interface Props {
  serviceOrders: ServiceOrder[];
}

const MyProjectServiceOffered = ({ serviceOrders }: Props) => {
  const [_, setSelectedServices] =
    useState<ServiceOrder[]>(serviceOrders);

  useEffect(() => {
    setSelectedServices(serviceOrders);
  }, [serviceOrders]);
  return (
    <Card className="px-5 py-6 mb-7">
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
      {/* <OrderCheckList
        selectedServices={selectedServices}
        items={servicesLists}
        setSelectedItems={setSelectedServices}
        disabledLength={selectedServices.length >= 1}
      /> */}
    </Card>
  );
};

export default MyProjectServiceOffered;
