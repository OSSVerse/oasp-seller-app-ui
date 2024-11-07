import { Card } from "@/components/ui/card";
import { H3 } from "@/components/ui/typography";
import Attachments from "../../components/attachment-list";
import ListTable from "@/components/common/list-table";

interface IAttachments {
  id: string;
  type: string;
  title: string;
  source: string;
}

interface ILinks {
  id: number;
  link: string;
}

interface Props {
  attachments: IAttachments[];
  links: ILinks[];
}

const MyProjectAdditionalDetail = ({ attachments, links }: Props) => {
  return (
    <Card className="px-5 pt-5 mb-7">
      <H3 className="mb-6">Attachment</H3>
      <Attachments attachments={attachments} />
      <ListTable dataSource={links} excludedCols={["id"]} />
    </Card>
  );
};

export default MyProjectAdditionalDetail;
