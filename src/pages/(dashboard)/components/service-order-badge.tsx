import { Badge } from "@/components/ui/badge";
import type { Item } from "@/services/orders-service";

interface ServiceOrderBadgeProps {
  serviceOrder: Item;
}
const ServiceOrderBadge = ({ serviceOrder }: ServiceOrderBadgeProps) => {
  return (
    <Badge variant={"secondary"} className="flex items-center gap-2">
      {/* <Icon icon={serviceOrder?.icon} className="opacity-50" /> */}
      {serviceOrder.productSubcategory1}
    </Badge>
  );
};

export default ServiceOrderBadge;
