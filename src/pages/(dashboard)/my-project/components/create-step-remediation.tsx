import Icon from "@/components/common/icon";
import ListTable from "@/components/common/list-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Muted } from "@/components/ui/typography";
import { ORDER_STATUS } from "@/lib/constant";
import { useModal } from "@/store/modal-store";
import { useMyProject } from "@/store/my-project-store";
import CreateStepSubmitModal from "./create-step-submit-modal";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/lib/path-constant";
import { useCreateProduct } from "@/services/my-product-service";

interface CreateStepRemediationProps {
  setCurrentStatus: React.Dispatch<React.SetStateAction<string>>;
}
const CreateStepRemediation = ({
  setCurrentStatus,
}: CreateStepRemediationProps) => {
  const { mutate, status } = useCreateProduct();
  const { onOpen, onClose } = useModal();
  const navigate = useNavigate();
  const { createProjectDetails, resetCreateProjectDetails } = useMyProject();
  const handleNew = () => {};

  const handleSubmit = () => {
    mutate(createProjectDetails, {
      onSuccess,
      onError,
    });
  };

  const onError = () => {
    onOpen("confirmationDialog", {
      confirmationDialog: {
        title: "Error",
        content: `Ops something went wrong`,
        confirmLabel: "Close",
        onClose: () => {
          onClose();
        },
      },
    });
  };
  const onSuccess = () => {
    onOpen("confirmationDialog", {
      confirmationDialog: {
        title: "New Project Added",
        content: (
          <CreateStepSubmitModal
            type={createProjectDetails.commonDetails.type}
            productName={createProjectDetails.commonDetails.productName}
          />
        ),
        confirmLabel: "Close",
        onConfirm: () => {
          onClose();
          // clear store
          resetCreateProjectDetails();
          navigate(PATH.MYPROJECTS);
        },
      },
    });
  };

  const handleBack = () => setCurrentStatus(ORDER_STATUS.PROJECT_DETAILS);
  return (
    <>
      <section className="flex items-center">
        <div className="flex-grow mb-4">
          <Muted className="mb-4">3rd-party Remediation</Muted>
          <Card className="px-5 py-10">
            <ListTable
              // dataSource={createProjectDetails.commonDetails.remediation}
              dataSource={[]}
              // excludedCols={["id"]}
            />
          </Card>
        </div>
        <div className="basis-72 flex-shrink-0 inline-flex justify-center">
          <Button onClick={handleNew}>
            <Icon icon="add" className="mr-2 stroke-white" />
            New Record
          </Button>
        </div>
      </section>
      <section className="flex items-center">
        <div className="flex-grow mb-4">
          <Muted className="mb-4">Remediation</Muted>
          <Card className="px-5 py-10">
            {/* <ListTable dataSource={createProjectDetails.commonDetails.venerability} /> */}
            <ListTable dataSource={[]} />
          </Card>
        </div>
        <div className="basis-72 flex-shrink-0 inline-flex justify-center">
          <Button onClick={handleNew}>
            <Icon icon="add" className="mr-2 stroke-white" />
            New Record
          </Button>
        </div>
      </section>
      <footer className="flex justify-end gap-4">
        <Button type="button" onClick={handleBack}>
          Back
        </Button>
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={status === "pending"}
        >
          {status === "pending" ? "Loading.." : "Submit"}
        </Button>
      </footer>
    </>
  );
};

export default CreateStepRemediation;
