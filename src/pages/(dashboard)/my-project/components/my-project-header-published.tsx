import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Paragraph } from "@/components/ui/typography";
import { PencilIcon } from "lucide-react";

interface Props {
  currentStatus: string;
}

const MyProjectHeaderPublished = ({ currentStatus }: Props) => {
  return (
    <>
      <Paragraph className="relative before:bg-black before:content=[''] before:absolute before:top-1/2 before:-left-3 before:rounded-full before:w-1 before:h-1">
        {currentStatus}
      </Paragraph>
      <Separator orientation="vertical" className="h-5 w-1" />

      <Button>
        Update Project
        <PencilIcon className="h-4 w-4 ms-2" />
      </Button>
    </>
  );
};

export default MyProjectHeaderPublished;
