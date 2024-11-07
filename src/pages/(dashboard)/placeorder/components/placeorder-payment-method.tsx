import { Card } from "@/components/ui/card";
import { Muted, Paragraph } from "@/components/ui/typography";

interface PyamentMethodProps {
  number: string;
  date: string;
  total_payment_amount: number;
}
const PyamentMethod = ({
  number,
  date,
  total_payment_amount,
}: PyamentMethodProps) => (
  <Card className="px-5 py-6 ">
    <Muted className="mb-1">Payment Method</Muted>

    {number && (
      <div className="mb-4">
        <Paragraph>Credit Card</Paragraph>
        <Paragraph>{number}</Paragraph>
        <Paragraph> {date}</Paragraph>
      </div>
    )}
    {total_payment_amount && (
      <>
        <Muted className="mb-1">Total Payment Amount</Muted>
        <Paragraph>₹{total_payment_amount}</Paragraph>
      </>
    )}
  </Card>
);

export default PyamentMethod;
