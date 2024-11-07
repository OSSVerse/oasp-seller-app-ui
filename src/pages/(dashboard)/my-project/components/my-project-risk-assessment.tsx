import { Card } from "@/components/ui/card";
import { H3 } from "@/components/ui/typography";
import { ShieldIcon } from "lucide-react";

interface IHumanOversight {
  intended_use: { item: string; description: string };
  oversight_recommendation: { item: string; description: string };
}

interface Props {
  humanOversight: IHumanOversight;
  privacyRisk: string[];
}
const MyProjectRiskAssessment = ({ humanOversight, privacyRisk }: Props) => {
  return (
    <>
      <Card className="px-5 py-6 mb-4">
        <H3 className="mb-5">Human Oversight</H3>
        <div className="w-full bg-secondary rounded-lg px-6 py-4">
          <div className="grid grid-cols-2 gap-6 items-center">
            <div>Intended Use</div>
            <div>Oversight Recommendation</div>
          </div>
        </div>
        <div className="w-full px-6 py-4">
          <div className="grid grid-cols-2 gap-6 items-center">
            <div>
              <div className="text-xl">{humanOversight.intended_use.item}</div>
              <div>{humanOversight.intended_use.description}</div>
            </div>
            <div>
              <div className="text-xl">
                {humanOversight.oversight_recommendation.item}
              </div>
              <div>{humanOversight.oversight_recommendation.description}</div>
            </div>
          </div>
        </div>
      </Card>
      <Card className="px-5 py-6 mb-7">
        <H3 className="mb-5">Privacy Risk</H3>
        {privacyRisk.map((risk) => (
          <div
            key={risk}
            className="w-full bg-secondary rounded-lg px-6 py-4 mb-3 flex gap-4"
          >
            <div>
              <ShieldIcon />
            </div>
            <div>{risk}</div>
          </div>
        ))}
      </Card>
    </>
  );
};

export default MyProjectRiskAssessment;
