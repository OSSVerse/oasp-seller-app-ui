import AmericanExpressIcon from "@/components/icons/american-express-icon";
import CVVIcon from "@/components/icons/cvv-icon";
import DiscoverIcon from "@/components/icons/discover-icon";
import MasterIcon from "@/components/icons/master-icon";
import VisaIcon from "@/components/icons/visa-icon";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Select, { SelectItem } from "@/components/ui/select";
import { H3, Paragraph } from "@/components/ui/typography";
import * as Label from "@radix-ui/react-label";

const paymentMethods = [
  { value: "1", text: "Credit Card" },
  { value: "2", text: "Bank debits" },
  { value: "3", text: "Bank redirects" },
  { value: "4", text: "Bank transfers" },
  { value: "5", text: "Buy now, pay later" },
  { value: "6", text: "Vouchers" },
  { value: "7", text: "Real-time payments" },
  { value: "8", text: "Wallets" },
];

const Payment = () => {
  return (
    <Card className="p-10 mb-4">
      <div className="pb-5 gap-7 flex justify-between items-center">
        <div className="basis-1/2">
          <H3 className="font-bold  mb-4">Payment Information</H3>
          <Paragraph>
            Payment will be processed upon order confirmation. We accept
            creditcards,PayPal, and other secure payment methods
          </Paragraph>
        </div>
        <div className="basis-1/2">
          <Label.Root htmlFor="paymentMethod">Payment Method</Label.Root>
          <Select defaultValue="1">
            {paymentMethods.map((paymentMethod) => (
              <SelectItem value={paymentMethod.value} key={paymentMethod.value}>
                {paymentMethod.text}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="p-7 gap-7 bg-neutral-100 rounded-md flex justify-between">
        <div className="basis-1/2">
          <Label.Root htmlFor="CardHolderName">Card Holder Name</Label.Root>
          <Input
            id="CardHolderName"
            name="card_holder_name"
            placeholder="Full name on card"
            className="w-full"
          />
        </div>
        <div className="basis-1/2 w-full">
          <Label.Root htmlFor="CardInformation">Card Information</Label.Root>
          <div className="relative">
            <Input
              id="CardInformation"
              name="card_number"
              placeholder="1234 1234 1234 1234"
              className="w-full pr-36 rounded-b-none border-b-0"
            />

            <div className="flex gap-1 absolute top-2 right-2">
              <VisaIcon className="w-8" />
              <MasterIcon className="w-8" />
              <AmericanExpressIcon className="w-8" />
              <DiscoverIcon className="w-8" />
            </div>
          </div>
          <div className="flex">
            <Input
              name="card_year"
              placeholder="MM/YY"
              className="w-full rounded-t-none rounded-br-none border-r-0"
            />
            <div className="relative">
              <Input
                name="card_cvv"
                placeholder="CVV"
                className="w-full rounded-t-none rounded-bl-none border-l-0 pr-9"
              />
              <CVVIcon className="w-8 absolute top-2 right-2" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Payment;
