import MLModelIcon from "@/components/icons/ml-model-icon";
import ProjectIcon from "@/components/icons/project-icon";
import { Badge } from "@/components/ui/badge";
import { H3, H4 } from "@/components/ui/typography";
import type { Buyer } from "./order-list";

interface OrderDetailHeaderProps {
  type: string;
  title: string;
  requestId: string;
  buyer?: Buyer;
  children?: React.ReactNode;
}
const OrderDetailHeader = ({
  type,
  title,
  requestId,
  children,
  buyer,
}: OrderDetailHeaderProps) => {
  return (
    <div className="flex gap-11 flex-wrap mb-4 w-full md:flex-nowrap justify-between">
      <div className="flex-grow flex gap-4 items-center">
        <Badge
          variant={"secondary"}
          className=" h-16 w-16 flex items-center justify-center rounded-full"
        >
          {type === "PROJECT" ? (
            <ProjectIcon className="h-8 w-8" />
          ) : (
            <MLModelIcon className="h-8 w-8" />
          )}
        </Badge>
        <div>
          <H3 className="text-3xl">{title}</H3>
          <div className="flex gap-1 items-center">
            <H4>Request ${requestId}</H4>
            {buyer && <>. {buyer?.title}</>}
          </div>
        </div>
      </div>
      {children && (
        <div className="basis-2/5 flex gap-4 items-center justify-end">
          {children}
        </div>
      )}
    </div>
  );
};

export default OrderDetailHeader;
