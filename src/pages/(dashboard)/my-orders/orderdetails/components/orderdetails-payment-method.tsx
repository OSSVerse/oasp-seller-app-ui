import { Card } from "@/components/ui/card";
import { Muted, Paragraph } from "@/components/ui/typography";
interface Props {
  number: string;
  date: string;
  totalAmount: string;
}
const OrderDetailsPaymentMethod = ({ number, date, totalAmount }: Props) => (
  <Card className="px-5 py-6 ">
    <Muted className="mb-1">Payment Method</Muted>

    {number && (
      <div className="mb-4">
        <Paragraph>Credit Card</Paragraph>
        <Paragraph>{number}</Paragraph>
        <Paragraph> {date}</Paragraph>
      </div>
    )}
    {totalAmount && (
      <div>
        <Muted className="mb-1">Total Payment Amount</Muted>
        <Paragraph>₹{totalAmount}</Paragraph>
      </div>
    )}
  </Card>
);

export default OrderDetailsPaymentMethod;
