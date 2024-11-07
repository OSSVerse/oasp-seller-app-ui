import { Card } from "@/components/ui/card";
import { H3, Muted, Paragraph } from "@/components/ui/typography";

interface IOrderDetail {
  project_title: string;
  assesment_project_description: string;
  outcome: string;
  expected_time_of_delivery: { time_line: string; priority_level: string };
  deliverables: string;
}

interface Props {
  order_detail: IOrderDetail;
}
const OrderDetails = ({ order_detail }: Props) => (
  <Card className="px-5 py-6 mb-4">
    <>
      <H3 className="mb-3">Project Title</H3>
      <Paragraph className="mb-7">{order_detail.project_title}</Paragraph>
    </>
    <>
      <H3 className="mb-3">Assessment Project Description</H3>
      <Paragraph className="mb-7">
        {order_detail.assesment_project_description}
      </Paragraph>
    </>
    <>
      <H3 className="mb-3">Outcome</H3>
      <Paragraph className="mb-7">{order_detail.outcome}</Paragraph>
    </>
    <>
      <H3 className="mb-3">Expected Time of Delivery</H3>
      <div className="mb-7 flex">
        <div className="pe-16">
          <Muted className="text-base">Time line</Muted>
          <Paragraph>
            {order_detail.expected_time_of_delivery.time_line}
          </Paragraph>
        </div>
        <div>
          <Muted className="text-base">Priority Level</Muted>
          <Paragraph>
            {order_detail.expected_time_of_delivery.priority_level}
          </Paragraph>
        </div>
      </div>
    </>
    <>
      <H3 className="mb-3">Deliverables</H3>
      <Muted className="text-base mb-1">{order_detail.deliverables}</Muted>
      <Paragraph className="mb-7">
        the download link only visible if the deliverable is complete
      </Paragraph>
    </>
  </Card>
);

export default OrderDetails;
