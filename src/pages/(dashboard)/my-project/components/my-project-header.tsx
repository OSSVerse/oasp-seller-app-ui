import MLModelIcon from "@/components/icons/ml-model-icon";
import ProjectIcon from "@/components/icons/project-icon";
import { Badge } from "@/components/ui/badge";
import { H3, H4 } from "@/components/ui/typography";

interface Props {
  type: string;
  title: string;
  repository: string;
  last_update: string;
  children?: React.ReactNode;
}

const MyProjectHeader = ({
  type,
  title,
  repository,
  last_update,
  children,
}: Props) => {
  return (
    <div className="flex gap-11 flex-wrap mb-4 w-full md:flex-nowrap justify-between">
      <div className="flex-grow flex gap-4 items-center">
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
          <H3 className="text-3xl">{title}</H3>
          <div className="flex gap-1 items-center">
            <H4>
              <div className="flex">
                {repository}{" "}
                <ul className="ms-8" style={{ listStyle: "disc" }}>
                  <li>Last update {last_update}</li>
                </ul>
              </div>
            </H4>
          </div>
        </div>
      </div>
      {children && (
        <div className="basis-2/5 flex gap-4 items-center justify-end">
          {children}
        </div>
      )}
    </div>
  );
};

export default MyProjectHeader;
