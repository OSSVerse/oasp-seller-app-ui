import Icon from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Muted, Paragraph } from "@/components/ui/typography";
import { useModal } from "@/store/modal-store";
import OrderDetailAcceptedUploadDeliverableDrawer from "./order-detail-accepted-upload-deliverable-drawer";
import type { Daum } from "@/services/orders-service";

// interface IOrderDetail {
//   id: number;
//   title: string;
//   requestId: string;
//   buyer: { title: string };
//   type: string;
// }

interface OrderDetailHeaderAcceptedProps {
  currentStatus: string;
  orderDetail: Daum;
  onSubmit: () => void;
}
const OrderDetailHeaderAccepted = ({
  currentStatus,
  orderDetail,
  onSubmit,
}: OrderDetailHeaderAcceptedProps) => {
  const { onOpen } = useModal();
  return (
    <>
      <Muted className="italic">2024-09-19 12:00 EST</Muted>
      <Paragraph className="relative before:bg-black before:content=[''] before:absolute before:top-1/2 before:-left-3 before:rounded-full before:w-1 before:h-1">
        {currentStatus}
      </Paragraph>
      <Separator orientation="vertical" className="h-5" />

      <Button
        onClick={() => {
          onOpen("drawer", {
            drawer: {
              title: "Upload Deliverable",
              showFooter: false,
              content: (
                <OrderDetailAcceptedUploadDeliverableDrawer
                  orderDetail={orderDetail}
                  onSubmit={onSubmit}
                />
              ),
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

export default OrderDetailHeaderAccepted;
