import { Link, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { calDiffDay } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import MLModelIcon from "@/components/icons/ml-model-icon";
import DeliveryDue from "./deliver-due";
import { Button } from "@/components/ui/button";
// import type { Order } from "./order-list";
import ServiceOrderBadge from "./service-order-badge";
import type { Daum } from "@/services/orders-service";

const OrderListItem = ({
  order,
  tableHeaders,
}: {
  order: Daum;
  tableHeaders: string[];
}) => {
  const location = useLocation();
  const dayDiff = calDiffDay(order.createdAt);
  const badgeVariant = dayDiff <= 1 ? "destructive" : "secondary";
  return (
    <Link to={`${location.pathname}/${order._id}`} className="w-full">
      <Card className="border rounded-lg overflow-auto">
        <CardContent className="text-sm space-y-2 p-4">
          <div
            className="grid gap-6 items-center"
            style={{
              gridTemplateColumns: `auto repeat(${tableHeaders.length}, 160px)`,
            }}
          >
            <div className="flex gap-10 items-center">
              <Badge
                variant={badgeVariant}
                className=" h-16 w-16 flex items-center justify-center rounded-full"
              >
                {/* {order.type === "PROJECT" ? (
                  <ProjectIcon className="h-8 w-8" />
                ) : ( */}
                <MLModelIcon className="h-8 w-8" />
                {/* )} */}
              </Badge>

              <div>
                <h3 className="text-lg font-semibold ">
                  {order?.items[0]?.descriptor?.name}
                </h3>
                Request #{order?.billing?.tax_number} . {order?.billing?.phone}
              </div>
            </div>
            <div data-testid="service-order-badges" className="flex flex-wrap gap-3">
              {order?.items.map((serviceOrder) => (
                <ServiceOrderBadge
                  key={serviceOrder.productSubcategory1}
                  serviceOrder={serviceOrder}
                />
              ))}
            </div>
            <div data-testid="price">₹{order?.quote?.price?.value}</div>
            <div>
              <DeliveryDue dayDiff={dayDiff} />
            </div>
            <div>
              <Button>View Details</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default OrderListItem;
