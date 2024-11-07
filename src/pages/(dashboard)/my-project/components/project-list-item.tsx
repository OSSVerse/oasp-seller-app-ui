import { Link, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TimeAgo } from "@/components/common/time-ago";
import { Muted } from "@/components/ui/typography";
import ProjectIcon from "@/components/icons/project-icon";
import type { RefinedProduct } from "@/services/marketplace-service";
import { Button } from "@/components/ui/button";

const ProjectListItem = ({
  order,
  tableHeaders,
}: {
  order: RefinedProduct;
  tableHeaders: string[];
}) => {
  const location = useLocation();
  return (
    <Link to={`${location.pathname}/${order._id}`} className="w-full border rounded-lg shadow-sm border-muted overflow-auto">
      <Card className="border-none shadow-none">
        <CardContent className="text-sm border-none space-y-2 p-4">
          <div
            className="grid gap-6 items-center"
            style={{
              gridTemplateColumns: `auto repeat(${tableHeaders.length}, 200px)`,
            }}
          >
            <div className="flex gap-10 items-center">
              <Badge
                variant={"secondary"}
                className=" h-16 w-16 flex items-center justify-center rounded-full"
              >
                <ProjectIcon className="h-8 w-8" />
              </Badge>

              <div>
                <h3 className="text-lg font-semibold ">{order.productName}</h3>
                <div>
                  Last update <TimeAgo timestamp={order.updatedAt} />
                </div>
                <Muted className="line-clamp-3">{order.description}</Muted>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {order?.services.map((service) => (
                // <ServiceOrderBadge
                //   key={serviceOrder.name}
                //   serviceOrder={serviceOrder}
                // />
                <Badge
                  variant={"secondary"}
                  key={service.productSubcategory1}
                  className="flex items-center gap-2"
                >
                  {service.productSubcategory1}
                </Badge>
              ))}
            </div>
            <div>₹{order?.totalPrice?.toLocaleString("en-IN")}</div>
            <div>
              <Button>View Details</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProjectListItem;
