import { calDiffDay } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProjectIcon from "@/components/icons/project-icon";
import DeliveryDue from "./deliver-due";
import { Button } from "@/components/ui/button";
// import type { Order } from "./order-list";
import ServiceOrderBadge from "./service-order-badge";
import type { Daum } from "@/services/orders-service";
import dayjs from "dayjs";

const OrderCard = ({ order }: { order: Daum }) => {
  const location = useLocation();

  const dayDiff = calDiffDay(order.createdAt);
  const badgeVariant = dayDiff <= 1 ? "destructive" : "secondary";
  return (
    <Link to={`${location.pathname}/${order._id}`}>
      <Card className="max-w-full h-full 2xl:w-[400px] sm:w-[280px] md:w-[370px] border rounded-lg overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="space-y-2">
            <Badge
              variant={badgeVariant}
              className=" h-16 w-16 flex items-center justify-center rounded-full"
            >
              {/* {order.type === "PROJECT" ? ( */}
              <ProjectIcon className="h-8 w-8" />
              {/* ) : (
                <MLModelIcon className="h-8 w-8" />
              )} */}
            </Badge>
            <div className="text-lg font-semibold ">
              {order?.organization?.name}
            </div>
            Request #{order?.billing?.tax_number} . {order?.billing?.phone}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="space-y-1">
            <div className="text-muted-foreground">Service Order</div>
            <div className="flex flex-wrap gap-3">
              {order.items.map((serviceOrder) => (
                <ServiceOrderBadge
                  key={serviceOrder.productSubcategory1}
                  serviceOrder={serviceOrder}
                />
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground">Pricing</div>₹
            {order?.quote?.price?.value}
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground">Delivery Time</div>
            <div className="flex items-center gap-2">
              <DeliveryDue dayDiff={dayDiff} /> ({dayjs(order.createdAt).fromNow()})
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center px-6 ">
          <div>
            <Button>View</Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default OrderCard;
