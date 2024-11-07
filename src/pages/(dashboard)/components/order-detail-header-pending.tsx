import { Separator } from "@/components/ui/separator";
import { Paragraph, H3 } from "@/components/ui/typography";
import { Textarea } from "@/components/ui/textarea";
import * as Label from "@radix-ui/react-label";
import {
  Popover,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

interface OrderDetailHeaderPendingProps {
  currentStatus: string;
  handleAcceptedOrder: () => void;
  handleRejectedOrder: () => void;
  isPending: boolean;
}

const OrderDetailHeaderPending = ({
  currentStatus,
  handleAcceptedOrder,
  handleRejectedOrder,
  isPending,
}: OrderDetailHeaderPendingProps) => {
  return (
    <>
      <Paragraph className="relative before:bg-black before:content=[''] before:absolute before:top-1/2 before:-left-3 before:rounded-full before:w-1 before:h-1">
        {currentStatus}
      </Paragraph>
      <Separator orientation="vertical" className="h-5" />

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="destructive">Reject</Button>
        </PopoverTrigger>

        <PopoverContent align="end" className="p-4 pr-8">
          <H3 className="mb-4">Reject Assessment Order</H3>
          <Label.Root htmlFor="rejectAssessmentOrderReason">
            Reject Reason
          </Label.Root>
          <Textarea
            placeholder="Type Reason"
            className="mt-2"
            name="reject-assessment-order-rason"
            id="rejectAssessmentOrderReason"
          />
          <PopoverArrow />
          <footer className="mt-4 flex gap-4">
            <Button variant="destructive" onClick={handleRejectedOrder}>
              Reject
            </Button>
            <PopoverClose>
              <Button>Cancel</Button>
            </PopoverClose>
          </footer>
        </PopoverContent>
      </Popover>
      <Button variant="success" onClick={handleAcceptedOrder} disabled={isPending}>
        {isPending && <Loader className="animate-spin" />} Accept
      </Button>
    </>
  );
};

export default OrderDetailHeaderPending;
