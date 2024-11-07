import AddLinks from "@/components/common/add-links";
import Uploader from "@/components/common/uploader";
import MLModelIcon from "@/components/icons/ml-model-icon";
import ProjectIcon from "@/components/icons/project-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Muted } from "@/components/ui/typography";
import { useModal } from "@/store/modal-store";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { ORDER_STATUS } from "@/lib/constant";
import AssessmentOrderComplete from "../assessment-order/components/order-complete-modal";
import SubmitDeliverableSuccessful from "../assessment-order/components/submit-deliverables-successful-modal";
import { useAssessmentOrder } from "@/store/assessment-order-store";
import type { Daum } from "@/services/orders-service";

// interface IOrderDetail {
//   id: number;
//   title: string;
//   requestId: string;
//   buyer: { title: string };
//   type: string;
// }

interface IDeliverables {
  oasrFiles: File[];
  besEnvFiles: File[];
  attachments: File[];
  links: string[];
}

interface Props {
  orderDetail: Daum;
  onSubmit: () => void;
}

const OrderDetailAcceptedUploadDeliverableDrawer = ({ orderDetail, onSubmit }: Props) => {
  const { updateCurrentStatus } = useAssessmentOrder();
  const { onOpen, onClose } = useModal();
  const [oasrFiles, setOASRFiles] = useState<File[]>([]);
  const [besEnvFiles, setBeSEnvFiles] = useState<File[]>([]);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [deliverables, setDeliverables] = useState<IDeliverables>({
    oasrFiles,
    besEnvFiles,
    attachments,
    links,
  });

  const handleSubmit = () => {
    setDeliverables((prev) => ({
      ...prev,
      oasrFiles: [...prev.oasrFiles, ...oasrFiles],
      besEnvFiles: [...prev.besEnvFiles, ...besEnvFiles],
      attachments: [...prev.attachments, ...attachments],
      links: [...prev.links, ...links],
    }));
    onSubmit();
    onClose();
  };

  useEffect(() => {
    if (
      deliverables.oasrFiles.length > 0 &&
      deliverables.besEnvFiles.length > 0
    ) {
      onOpen("confirmationDialog", {
        confirmationDialog: {
          title: "Submission Successful",
          content: <SubmitDeliverableSuccessful />,
          closeLabel: "Close",
          onClose: () => {
            onClose();
            updateCurrentStatus(ORDER_STATUS.UPLOAD_DELIVERABLE);
            setTimeout(() => {
              onOpen("confirmationDialog", {
                confirmationDialog: {
                  title: "Assessment Order Completed",
                  content: <AssessmentOrderComplete />,
                  confirmLabel: "Goto My Billing & Account",
                  onConfirm: () => { },
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
  }, [deliverables, onOpen, onClose, updateCurrentStatus]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <Badge
          variant={"secondary"}
          className=" h-16 w-16 flex items-center justify-center rounded-full"
        >
          {orderDetail.items?.[0]?.category_id === "OSS Project" ? (
            <ProjectIcon className="h-8 w-8" />
          ) : (
            <MLModelIcon className="h-8 w-8" />
          )}
        </Badge>
        <div className="ms-3">
          <div className="font-semibold text-xl">{orderDetail.items?.[0]?.descriptor?.name}</div>
          <div className="flex">
            <div>Request #{orderDetail._id}</div>
            <div className="ms-6">
              <ul>
                <li style={{ listStyle: "disc" }}>
                  <div className="-ms-1">{orderDetail.billing?.email}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-5" />
      <div className="mb-7 px-3">
        <div className="mb-3">Upload OSAR</div>
        <Uploader
          ID="OSARFile"
          onFilesSelected={setOASRFiles}
          options={{ type: "PDF, DOC or PPT", allowed: ".pdf,.doc,.ppt" }}
        />
      </div>
      <div className="mb-7 px-3">
        <div className="mb-3">Upload BeS Environment</div>
        <Uploader
          ID="BesEnvFile"
          onFilesSelected={setBeSEnvFiles}
          options={{ type: "PDF, DOC or PPT", allowed: ".pdf,.doc,.ppt" }}
        />
      </div>
      <Separator className="my-5" />
      <div className="mb-7 px-3">
        <div className="mb-3">
          Attachment(s) - <span className="opacity-50">Optional</span>
        </div>
        <Uploader
          ID="attachment"
          onFilesSelected={setAttachments}
          options={{
            type: "JPG, PNG, MP4 or MP3",
            allowed: ".jpg,.png,.mp4,.mp3",
            multiple: true,
          }}
        />
      </div>
      <div className="mb-7">
        <div className="px-3 pt-3 gap-3 flex flex-col">
          <Label className="flex gap-1 items-center">
            Link(s) - <Muted className="text-md">Optional</Muted>
          </Label>
          <AddLinks links={links} setLinks={setLinks} />
        </div>
      </div>
      <div className="border-t pt-4 border-b-gray-300">
        <Button onClick={onClose} variant={"ghost"}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default OrderDetailAcceptedUploadDeliverableDrawer;
