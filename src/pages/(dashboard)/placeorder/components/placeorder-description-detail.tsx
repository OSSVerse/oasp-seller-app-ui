import { Card } from "@/components/ui/card";
import { H3, Paragraph } from "@/components/ui/typography";
import { Fragment } from "react";

interface IDescriptionDetail {
  feature_enhancements: IList[];
  open_pilot: string;
  input: IList[];
  output: string;
}

interface IList {
  title?: string;
  lists?: string[];
  id: string;
}

interface DescriptionDetailProps {
  description_detail: IDescriptionDetail;
}

const DescriptionDetail = ({ description_detail }: DescriptionDetailProps) => {
  return (
    <>
      <Card className="px-5 py-6 mb-4">
        {description_detail?.open_pilot && (
          <>
            <H3 className="font-bold mb-4">OpenPilot</H3>
            <Paragraph className="leading-5 mb-4">
              {description_detail?.open_pilot}
            </Paragraph>
          </>
        )}
        {description_detail?.input && description_detail?.input.length > 0 && (
          <>
            <H3 className="font-bold  mb-4">Input</H3>
            {description_detail?.input?.map((input) => (
              <Fragment key={input.id}>
                <Paragraph className="leading-5 mb-4">{input?.title}</Paragraph>
                <ul className="leading-5 mb-4 list-disc pl-4">
                  {(input?.lists || []).map((list) => (
                    <li className="leading-2 mb-2" key={list}>
                      {list}
                    </li>
                  ))}
                </ul>
              </Fragment>
            ))}
          </>
        )}
        {description_detail?.output && (
          <>
            <H3 className="font-bold  mb-4">Output</H3>
            <Paragraph className="leading-5 mb-4">
              {description_detail?.output}
            </Paragraph>
          </>
        )}
      </Card>
      {description_detail?.feature_enhancements && description_detail?.feature_enhancements.length > 0 && (
        <Card className="px-5 py-6 mb-4">
          <H3 className="font-bold mb-4">Feature Enhancement</H3>
          {description_detail?.feature_enhancements.map(
            (feature_enhancement) => (
              <Fragment key={feature_enhancement.id}>
                <Paragraph className="leading-5 mb-4">
                  {feature_enhancement.title}
                </Paragraph>
                <ul className="leading-5 mb-4 list-disc pl-4">
                  {(feature_enhancement.lists || []).map((list) => (
                    <li className="leading-2 mb-2" key={list}>
                      {list}
                    </li>
                  ))}
                </ul>
              </Fragment>
            ),
          )}
        </Card>
      )}
    </>
  );
};

export default DescriptionDetail;
