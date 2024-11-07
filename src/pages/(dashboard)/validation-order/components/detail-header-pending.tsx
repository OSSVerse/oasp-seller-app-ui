import { Separator } from "@/components/ui/separator";
import { Paragraph } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { useModal } from "@/store/modal-store";
import Icon from "@/components/common/icon";
import type { Order } from "../../components/order-list";
import SubmitResponseDrawer from "./submit-response-drawer";

interface DetailHeaderPendingProps {
  currentStatus: string;
  order: Order;
}

const DetailHeaderPending = ({
  currentStatus,
  order,
}: DetailHeaderPendingProps) => {
  const { onOpen } = useModal();
  return (
    <>
      <Paragraph className="relative before:bg-black before:content=[''] before:absolute before:top-1/2 before:-left-3 before:rounded-full before:w-1 before:h-1">
        {currentStatus}
      </Paragraph>
      <Separator role="separator" orientation="vertical" className="h-5" />

      <Button
        onClick={() => {
          onOpen("drawer", {
            drawer: {
              title: "Submit Response",
              content: <SubmitResponseDrawer order={order} />,
              showFooter: false,
            },
          });
        }}
      >
        Upload Deliverable
        <Icon icon="upload" size="small" className="ml-2" />
      </Button>
    </>
  );
};

export default DetailHeaderPending;
