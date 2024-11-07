import MLModelIcon from "@/components/icons/ml-model-icon";
import ProjectIcon from "@/components/icons/project-icon";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Paragraph, H3, Muted } from "@/components/ui/typography";
import { TIME_ZONE } from "@/lib/constant";
import { getDateInTimeZone, getTimeZoneName } from "@/lib/utils";

const CreateStepSubmitModal = ({
  productName,
  type,
}: { productName: string; type: string }) => {
  const estDate = getDateInTimeZone(new Date(), TIME_ZONE.EST);
  const timeZoneName = getTimeZoneName(TIME_ZONE.EST, new Date());
  return (
    <div className="flex gap-4 flex-col pt-5">
      <Separator className="bg-stone-400" />
      <Paragraph>New project has been added.</Paragraph>
      <div className="flex gap-4 items-center">
        <Badge className="w-12 h-12" variant={"secondary"}>
          {type === "item" ? (
            <ProjectIcon className="h-8 w-8" />
          ) : (
            <MLModelIcon className="h-8 w-8" />
          )}
        </Badge>
        <div className="flex flex-col justify-between">
          <H3>{productName}</H3>
          <Muted>
            Added {estDate} {timeZoneName}
          </Muted>
        </div>
      </div>
    </div>
  );
};

export default CreateStepSubmitModal;
