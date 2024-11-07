import { calDiffDay } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import DeliveryDue from "./deliver-due";
import type { Daum } from "@/services/orders-service";
import dayjs from "dayjs";
import ServiceOrderBadge from "./service-order-badge";

const OrderDetailCard = ({ order }: { order: Daum }) => {
  const dayDiff = calDiffDay(order.createdAt);
  return (
    <Card className="max-w-full 2xl:w-[400px] sm:w-[280px] md:w-[370px] border rounded-lg overflow-hidden">
      <CardContent className="py-6 text-sm flex gap-6 flex-col">
        <div className="flex gap-3 flex-col">
          <div className="text-muted-foreground">Service Order</div>
          <div className="flex gap-3 flex-wrap">
            {order?.items?.map((serviceOrder) => (
              <ServiceOrderBadge
                key={serviceOrder.productSubcategory1}
                serviceOrder={serviceOrder}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-3 flex-col">
          <div className="text-muted-foreground">Pricing</div>
          ₹{order?.quote?.price?.value}
        </div>
        <div className="flex gap-3 flex-col">
          <div className="text-muted-foreground">Delivery Time</div>
          <div className="flex items-center gap-2">
            <DeliveryDue dayDiff={dayDiff} /> ({dayjs(order?.createdAt).format("MMM D, YYYY")})
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderDetailCard;
