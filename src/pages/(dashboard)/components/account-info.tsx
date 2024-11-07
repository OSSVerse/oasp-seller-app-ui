import { Card } from "@/components/ui/card";
import { H3, Muted, Paragraph } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/common/icon";
import type { Daum } from "@/services/orders-service";

interface AccountInfoProps {
  order: Daum;
}
const AccountInfo = ({ order }: AccountInfoProps) => {
  return (
    <Card className="px-5 py-6 mb-4">
      <H3 className="font-bold  mb-4">Business Details</H3>
      <div className="flex justify-between flex-wrap gap-4">
        <AccountInfoItem icon="user">
          <AccountInfoItemLabelValue>
            <AccountInfoItemLabel>First Name</AccountInfoItemLabel>
            <AccountInfoItemValue>{"N/A"}</AccountInfoItemValue>
          </AccountInfoItemLabelValue>

          <AccountInfoItemLabelValue>
            <AccountInfoItemLabel>Last Name</AccountInfoItemLabel>
            <AccountInfoItemValue>{"N/A"}</AccountInfoItemValue>
          </AccountInfoItemLabelValue>
        </AccountInfoItem>

        <AccountInfoItem icon="smart-phone">
          <AccountInfoItemLabelValue>
            <AccountInfoItemLabel>Work Mail</AccountInfoItemLabel>
            <AccountInfoItemValue>{order?.billing?.email}</AccountInfoItemValue>
          </AccountInfoItemLabelValue>

          <AccountInfoItemLabelValue>
            <AccountInfoItemLabel>Phone</AccountInfoItemLabel>
            <AccountInfoItemValue>{order?.billing?.phone}</AccountInfoItemValue>
          </AccountInfoItemLabelValue>
        </AccountInfoItem>

        <AccountInfoItem icon="credit-card">
          <AccountInfoItemLabelValue>
            <AccountInfoItemLabel>Payment Method</AccountInfoItemLabel>
            <AccountInfoItemValue>Paypal</AccountInfoItemValue>
          </AccountInfoItemLabelValue>

          <AccountInfoItemLabelValue>
            <AccountInfoItemLabel>Status</AccountInfoItemLabel>
            <AccountInfoItemValue>Verified</AccountInfoItemValue>
          </AccountInfoItemLabelValue>

          <AccountInfoItemLabelValue>
            <AccountInfoItemLabel>Amount</AccountInfoItemLabel>
            <AccountInfoItemValue>₹{order?.quote?.price?.value ? Number(order?.quote?.price?.value) : 0}</AccountInfoItemValue>
          </AccountInfoItemLabelValue>
        </AccountInfoItem>
      </div>
    </Card>
  );
};

interface AccountInfoItemProps {
  icon: string;
  children: React.ReactNode;
}
export const AccountInfoItem = ({ icon, children }: AccountInfoItemProps) => {
  return (
    <div className="flex gap-4 items-center">
      <Badge
        variant={"secondary"}
        className="h-12 w-12 bg-[#D9D9D9] flex items-center justify-center rounded-full"
      >
        <Icon icon={icon} className="opacity-50" size="medium" />
      </Badge>
      <div className="flex gap-4">{children}</div>
    </div>
  );
};

export const AccountInfoItemLabelValue = ({
  children,
}: { children: React.ReactNode }) => {
  return <div className="flex gap-1 flex-col">{children}</div>;
};

export const AccountInfoItemLabel = ({ children }: { children: React.ReactNode }) => (
  <Muted>{children}</Muted>
);
export const AccountInfoItemValue = ({ children }: { children: React.ReactNode }) => (
  <Paragraph>{children}</Paragraph>
);

export default AccountInfo;
