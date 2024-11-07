import { Paragraph } from "@/components/ui/typography";
import AssessmentDoughnutChart from "./doughnut-chart";

const datasets = {
  warning: [
    {
      data: [3, 1],
      backgroundColor: ["grey", "red"],
      hoverBackgroundColor: ["grey", "red"],
    },
  ],
  health: [
    {
      data: [1, 3],
      backgroundColor: ["grey", "green"],
      hoverBackgroundColor: ["grey", "green"],
    },
  ],
};

const DeliveryDue = ({ dayDiff }: { dayDiff: number }) => {
  const data = { datasets: dayDiff <= 1 ? datasets.warning : datasets.health };
  return (
    <div className="flex gap-4 items-center">
      <div className="w-9 h-9">
        <AssessmentDoughnutChart data={data} />
      </div>
      <Paragraph className={dayDiff <= 1 ? "text-red-500" : ""}>
        Due in {dayDiff} Days
      </Paragraph>
    </div>
  );
};

export default DeliveryDue;
