import { Card } from "@/components/ui/card";
import { Muted } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

export const isLessThanCurrentAnchor = (
  anchorIndex: number,
  currentAnchor: number,
) => anchorIndex < currentAnchor;
/**
 * Left side anchorLists, click them will show/hide right related sections.
 * Example: https://marvelapp.com/prototype/6j7768d/screen/95611318
 * According to the design, if anchor index is greater than right sections index, those sections will be hidden
 *
 * data source:
 * const anchroLists = [
 *  "Descripton Details",
 *  "Assessment Service Pricing",
 *  "Payment",
 * ];
 *
 * section: 0
 * <AnchorSection anchroLists={anchroLists} currentAnchor={currentAnchor} sectionIndex={0}>section content goes here</AnchorSection>
 *
 * section: 1
 * <AnchorSection anchroLists={anchroLists} currentAnchor={currentAnchor} sectionIndex={1}>section content goes here</AnchorSection>
 *
 * <AnchorSection anchroLists={anchroLists} currentAnchor={currentAnchor} sectionIndex={2}>section content goes here</AnchorSection>
 *
 * if currentAnchor: 0 all sections will display
 * if currentAnchor: 1 then section 0 will be hidden
 * if currentAnchor: 2 then section 1 and 2 will be hidden
 */
interface AnchorListsProps {
  currentAnchor: number;
  setCurrentAnchor: (anchroIndex: number) => void;
  anchroLists: string[];
}
const AnchorLists = ({
  currentAnchor,
  setCurrentAnchor,
  anchroLists,
}: AnchorListsProps) => {
  return (
    <Card className="mb-8 p-2 bg-stone-100">
      <ul>
        {anchroLists.map((anchroList, index) => (
          <li key={anchroList}>
            <button
              type="button"
              className={cn(
                "px-4 py-3 w-full text-left rounded-md hover:bg-neutral-300",
                index === currentAnchor && "bg-neutral-300",
              )}
              onClick={() => setCurrentAnchor(index)}
            >
              {anchroList}
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
};

interface AnchorSectionProps {
  children: React.ReactNode;
  currentAnchor: number;
  sectionIndex: number;
  anchroLists: string[];
}

export const AnchorSection = ({
  children,
  anchroLists,
  currentAnchor,
  sectionIndex,
}: AnchorSectionProps) => {
  const sectionTitle = anchroLists[sectionIndex].toLocaleUpperCase();
  return (
    <section
      className={cn(
        isLessThanCurrentAnchor(sectionIndex, currentAnchor) ? "hidden" : ''
      )}
    >
      <Muted className="mb-4">{sectionTitle}</Muted>
      {children}
    </section>
  );
};

export default AnchorLists;
