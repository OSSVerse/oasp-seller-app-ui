import { Separator } from "@/components/ui/separator";
import OrderDetailHeader from "../../components/order-detail-header";
import type { Order } from "../../components/order-list";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import Uploader from "@/components/common/uploader";
import { Muted } from "@/components/ui/typography";
import AddLinks from "@/components/common/add-links";
import { useModal } from "@/store/modal-store";
import SubmitResponseSuccessfull from "./submit-response-successfull-modal";
import OrderComplete from "./order-complete-modal";
import { ORDER_STATUS } from "@/lib/constant";
import { useValidationOrder } from "@/store/validation-order-store";

interface IResonse {
  notes: string;
  links: string[];
  files: File[];
}
interface SubmitResponseDrawerProps {
  order: Order;
}
const SubmitResponseDrawer = ({ order }: SubmitResponseDrawerProps) => {
  const { updateCurrentStatus } = useValidationOrder();
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const { onOpen, onClose } = useModal();

  const [links, setLinks] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [responseData, setResponseData] = useState<IResonse>({
    notes: "",
    links,
    files,
  });

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const notes = formData.get("notes") as string;
    setResponseData((prev) => ({
      ...prev,
      notes: notes?.trim(),
      links: [...prev.links, ...links],
      files: [...prev.files, ...files],
    }));
  };

  useEffect(() => {
    if (responseData.notes.trim() !== "") {
      onOpen("confirmationDialog", {
        confirmationDialog: {
          title: "Response Successful",
          content: <SubmitResponseSuccessfull />,
          closeLabel: "Close",
          onClose: () => {
            onClose();
            updateCurrentStatus(ORDER_STATUS.RESPONSE_SUBMITTED);
            setTimeout(() => {
              onOpen("confirmationDialog", {
                confirmationDialog: {
                  title: "Validation Order Completed",
                  content: <OrderComplete />,
                  confirmLabel: "Goto My Billing & Account",
                  onConfirm: () => {},
                  closeLabel: "Close", // change the current status to order complete
                  onClose: () => {
                    updateCurrentStatus(ORDER_STATUS.COMPLETED_ORDER);
                    onClose();
                  },
                },
              });
            }, 3000);
          },
        },
      });
    }
  }, [responseData, onOpen, onClose, updateCurrentStatus]);
  return (
    <div className="flex flex-col gap-3">
      <OrderDetailHeader
        type={order.type}
        title={order.title}
        requestId={order.requestId}
        buyer={order.buyer}
      />
      <Separator className="w-full" />
      <div className="flex gap-4 justify-between p-3">
        <Button
          className="w-full"
          variant={isValid ? "outline" : "default"}
          onClick={() => setIsValid(true)}
        >
          Valid Assessment
        </Button>
        <Button className="w-full" disabled={!!isValid}>
          Invalid Assessment
        </Button>
      </div>
      {isValid && (
        <form role="form" onSubmit={handleOnSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 px-3 pb-3">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              required
              name="notes"
              id="notes"
              placeholder="Type Here.."
              className="h-44"
            />
          </div>
          <Separator />
          <div className="px-3 pt-3">
            <div className="mb-3 flex gap-3 items-center">
              Attachment(s) - <Muted>Optional</Muted>
            </div>
            <Uploader
              ID="attachments"
              onFilesSelected={setFiles}
              options={{
                type: "JPG, PNG, MP4 or MP3",
                allowed: ".jpg,.png,.mp4,.mp3",
                multiple: true,
              }}
            />
          </div>
          <div className="px-3 pt-3 gap-3 flex flex-col">
            <Label className="flex gap-3 items-center">
              Link(s) - <Muted>Optional</Muted>
            </Label>
            <AddLinks links={links} setLinks={setLinks} />
          </div>

          <div className="border-t pt-4 border-b-gray-300">
            <Button onClick={() => setIsValid(false)} variant={"ghost"}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SubmitResponseDrawer;
