import { Paragraph } from "@/components/ui/typography";
import * as Label from "@radix-ui/react-label";
import type { ServiceOrder } from "../../components/order-list";

interface PlaceOrderConfirmProps {
  name: string;
  services: ServiceOrder[];
  osaps: ServiceOrder[];
  total_payment_amount: number;
}

interface RowProps {
  children: string | React.ReactNode;
  label: string;
}

const Row = ({ children, label }: RowProps) => {
  return (
    <div className="flex">
      <Label.Root className="w-40">{label}</Label.Root>
      <div
        className="relative font-bold before:content-[':'] before:absolute
      before:top-0
      before:left-[-10px]"
      >
        {children}
      </div>
    </div>
  );
};

const PlaceOrderConfirm = ({
  name,
  services,
  osaps,
  total_payment_amount,
}: PlaceOrderConfirmProps) => {
  return (
    <>
      <Paragraph className="leading-5">
        Below are a summary of the artifact, selected services basedon selected
        OASPs, and pricing.
      </Paragraph>

      <Row label="Artifact Name">
        <Paragraph>{name}</Paragraph>
      </Row>

      <Row label="Selected Services">
        {services.map((service) => (
          <Paragraph key={service.id}>{service.name}</Paragraph>
        ))}
      </Row>

      <Row label="Selected OSAPs">
        {osaps.map((osap) => (
          <Paragraph key={osap.id}>{osap.name}</Paragraph>
        ))}
      </Row>

      <Row label="Total Pricing">
        <Paragraph>₹{total_payment_amount}</Paragraph>
      </Row>
    </>
  );
};

export default PlaceOrderConfirm;
