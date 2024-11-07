import Icon from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Muted, Paragraph } from "@/components/ui/typography";
import { useModal } from "@/store/modal-store";

// interface IOrderDetail {
//     id: number;
//     title: string;
//     requestId: string;
//     buyer: { title: string };
//     type: string;
// }

interface OrderDetailHeaderViewDeliverableProps {
    currentStatus: string;
    onSubmit: () => void;
}
const OrderDetailHeaderViewDeliverable = ({
    currentStatus,
    onSubmit,
}: OrderDetailHeaderViewDeliverableProps) => {
    const { onOpen, onClose } = useModal();
    return (
        <>
            <Muted className="italic">2024-09-19 12:00 EST</Muted>
            <Paragraph className="relative before:bg-black before:content=[''] before:absolute before:top-1/2 before:-left-3 before:rounded-full before:w-1 before:h-1">
                {currentStatus}
            </Paragraph>
            <Separator orientation="vertical" className="h-5" />

            <Button
                onClick={() => {
                    onOpen("confirmationDialog", {
                        confirmationDialog: {
                            title: "View/Edit Deliverable",
                            content: <div>
                                <div>Are you sure you want to complete the order?</div>

                            </div>,
                            onConfirm: () => {
                                onSubmit();
                                onClose();
                            },
                        },
                    });
                }}
            >
                View/Edit Deliverable
                <Icon icon="upload" size="small" className="ml-2" />
            </Button>
        </>
    );
};

export default OrderDetailHeaderViewDeliverable;
