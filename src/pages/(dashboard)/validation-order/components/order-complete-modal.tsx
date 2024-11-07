import Icon from "@/components/common/icon";
import { Badge } from "@/components/ui/badge";
import { Paragraph, Muted } from "@/components/ui/typography";
import { TIME_ZONE } from "@/lib/constant";
import { getDateInTimeZone, getTimeZoneName } from "@/lib/utils";

const OrderComplete = () => {
  const estDate = getDateInTimeZone(new Date(), TIME_ZONE.EST);
  const timeZoneName = getTimeZoneName(TIME_ZONE.EST, new Date());
  return (
    <div className="flex gap-4 flex-col">
      <Paragraph>
        Your recent validation has been reviewed and approved by the client. The
        payment is available in your account. Thank you for the hard work and
        solid approach.
      </Paragraph>
      <div className="flex gap-4 items-center">
        <Badge className="w-12 h-12" variant={"secondary"}>
          <Icon data-testid="icon-clock" icon="clock" size="large" />
        </Badge>
        <div className="flex flex-col justify-between">
          <Muted>Timestamp</Muted>
          <Paragraph>
            {estDate} {timeZoneName}
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;
