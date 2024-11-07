import { Card } from "@/components/ui/card";
import { H3 } from "@/components/ui/typography";

interface Props {
  tavoss: string[];
}

const MyProjectTAVOSS = ({ tavoss }: Props) => {
  return (
    <Card className="px-5 py-6 mb-4">
      <H3 className="mb-3">TAVOSS</H3>
      <div className="grid grid-cols-2 gap-6">
        {tavoss.map((item) => (
          <div
            key={item}
            className="mix-blend-luminosity bg-stone-100 p-4 flex justify-center"
          >
            <img src={"/" + item + ".svg"} />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MyProjectTAVOSS;
