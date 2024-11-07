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
// import MLModelIcon from "@/components/icons/ml-model-icon";
import { Muted } from "@/components/ui/typography";
import Icon from "@/components/common/icon";
import { TimeAgo } from "@/components/common/time-ago";
import type { RefinedProduct } from "@/services/marketplace-service";
import { useMemo } from "react";

const ProjectCard = ({ order }: { order: RefinedProduct }) => {
  const location = useLocation();
  const totalPrice = useMemo(() => order?.services?.reduce((acc, curr) => acc + curr?.price, 0), [order?.services]);
  return (
    <Link to={`${location.pathname}/${order._id}`}>
      <Card className="max-w-full h-full 2xl:w-[400px] sm:w-[280px] md:w-[370px] border rounded-lg overflow-hidden flex flex-col justify-between">
        <CardHeader className="pb-2">
          <CardTitle className="space-y-2">
            <Badge
              variant={"secondary"}
              className=" h-16 w-16 flex items-center justify-center rounded-full"
            >
              <ProjectIcon className="h-8 w-8" />
            </Badge>
            <div className="text-lg font-semibold flex gap-1">
              {order.productName}
              <Icon icon="external-link" className="opacity-50" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            Last update <TimeAgo timestamp={order.updatedAt} />
          </div>
          <Muted className="line-clamp-3">{order.description}</Muted>
          <div className="space-y-1">
            <div className="text-muted-foreground">Service Order</div>
            <div className="flex flex-wrap gap-3">
              {order.services.map((service) => (
                // <ServiceOrderBadge
                //   key={serviceOrder.name}
                //   serviceOrder={serviceOrder}
                // // />
                <Badge
                  variant={"secondary"}
                  key={service.id}
                  className="flex items-center gap-2"
                >
                  {service.productSubcategory1}
                </Badge>
              ))}
            </div>
          </div>
          {/* <div className="flex gap-4 items-center">
            <div className="text-muted-foreground">TAVOSS</div>
            <Badge variant={"secondary"} className="rounded-full">
              {order?.organization?.name}
            </Badge>
          </div> */}
        </CardContent>
        <CardFooter className="flex justify-between items-end px-6">
          <div className="flex gap-1 items-center">
            ₹{totalPrice}
          </div>
          {order.productCategory.toLocaleUpperCase()}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProjectCard;
