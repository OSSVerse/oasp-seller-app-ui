import { Button } from "@/components/ui/button";
import PlaceOrderConfirm from "./placeorder-comfirm";
import { Paragraph } from "@/components/ui/typography";
import { useModal } from "@/store/modal-store";

import stripeLock from "../../../../assets/stripe-lock.png";
import poweredByStripeLogo from "../../../../assets/powered-by-stripe-logo.png";

interface FooterProps {
  title: string;
}

// TODO： this will be fetch page checkbox data
const selectedServices = [
  {
    id: "servicesItems-1",
    name: "Assessment",
    qty: 400,
    icon: "search-alt",
  },
  {
    id: "servicesItems-2",
    name: "Attestation",
    qty: 400,
    icon: "rr-file",
  },
];

const selectedOasps = [
  {
    id: "oaspItems-5",
    name: "OpenFort",
    qty: 300,
    icon: "file-add",
  },
  {
    id: "oaspItems-6",
    name: "BrainTech",
    qty: 400,
    icon: "file",
  },
];
const total_payment_amount = 1800;

const Footer = ({ title }: FooterProps) => {
  // Place Order-Confirmation
  const { onOpen } = useModal();
  return (
    <footer className="flex justify-between items-center pl-5 pr-20 pt-5">
      {/* confirm dialog */}
      <Button
        variant="success"
        onClick={() => {
          onOpen("confirmationDialog", {
            confirmationDialog: {
              title: "Confirmation Page",
              content: (
                <PlaceOrderConfirm
                  name={title}
                  services={selectedServices}
                  osaps={selectedOasps}
                  total_payment_amount={total_payment_amount}
                />
              ),
              onConfirm: () => {},
            },
          });
        }}
      >
        Place Order
      </Button>
      <div className="flex gap-1 items-end">
        <img src={stripeLock} className="h-[28px]" alt="stripe lock" />
        <Paragraph>
          Guaranteed <span className="font-bold">safe & secure</span> checkout
        </Paragraph>
        <img
          src={poweredByStripeLogo}
          className="h-[28px]"
          alt="powered by stripe"
        />
      </div>
    </footer>
  );
};

export default Footer;
