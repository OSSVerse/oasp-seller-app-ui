import MLModelIcon from "@/components/icons/ml-model-icon";
import ProjectIcon from "@/components/icons/project-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { H3, H4, Muted, Paragraph } from "@/components/ui/typography";

interface Props {
  type: string;
  title: string;
  transactionID: string;
}
const OrderDetailsHeader = ({ type, title, transactionID }: Props) => {
  const status = (
    <div className="text-end">
      <Paragraph className="font-semibold">Select OASP</Paragraph>
      <Muted>(Pending Acceptance)</Muted>
    </div>
  );

  return (
    <div className="flex gap-11 flex-wrap mb-4 w-full md:flex-nowrap justify-between">
      <div className="basis-3/5 flex gap-4 items-center">
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
          <H4>Transaction ID {transactionID}</H4>
        </div>
      </div>
      <div className="basis-2/5 flex gap-4 items-center justify-end">
        {status}
        <Separator orientation="vertical" />
        <Button variant={"destructive"} className="font-bold text-black">
          Cancel Order
        </Button>
      </div>
    </div>
  );
};

export default OrderDetailsHeader;
