import CheckItem from "@/components/common/check-item";
import type { Daum } from "@/services/orders-service";
interface PlaceOrderCheckListProps {
  items: Daum["items"];
  setSelectedItems: React.Dispatch<React.SetStateAction<Daum["items"]>>;
  disabledLength?: boolean;
}

const PlaceOrderCheckList = ({
  items,
  setSelectedItems,
  disabledLength = false,
}: PlaceOrderCheckListProps) => {
  return (
    <div data-testid="placeorder-check-list" className="overflow-auto h-[250px] w-full flex gap-2 flex-wrap content-start mb-10">
      {items.map((item) => (
        <span data-testid={`check-item-${item.productSubcategory1}`} key={item.productSubcategory1}>
          <CheckItem
            isChecked={false}
            checkItem={item}
            setSelectedItems={setSelectedItems}
            disabledLength={disabledLength}
          />
        </span>
      ))}
    </div>
  );
};

export default PlaceOrderCheckList;
