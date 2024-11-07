import MLModelIcon from "@/components/icons/ml-model-icon";
import ProjectIcon from "@/components/icons/project-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { H1, H4, Paragraph } from "@/components/ui/typography";

interface PlaceorderHeaderProps {
  type: string;
  title: string;
  description: string;
}
const PlaceorderHeader = ({
  type,
  title,
  description,
}: PlaceorderHeaderProps) => {
  const requestInfo = (
    <div>
      <H4 className="font-bold">
        Didn't find OSS arifact available in the listing?
      </H4>
      <Paragraph>
        place an on-demand request for one or more solution from the below list
      </Paragraph>
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
          <H1>{title}</H1>
          <H4 className="leading-5">{description}</H4>
        </div>
      </div>
      <div className="basis-2/5 flex gap-4 items-center justify-end">
        {requestInfo}
        <Button>Request</Button>
      </div>
    </div>
  );
};

export default PlaceorderHeader;
