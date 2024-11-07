import CheckItem from "@/components/common/check-item";
import type { Daum } from "@/services/orders-service";

interface OrderCheckListProps {
  selectedServices: Daum["items"];
  items: Daum["items"];
  setSelectedItems: React.Dispatch<React.SetStateAction<Daum["items"]>>;
  disabledLength?: boolean;
}

const OrderCheckList = ({
  selectedServices,
  items,
  setSelectedItems,
  disabledLength,
}: OrderCheckListProps) => {
  return (
    <div className="overflow-auto h-[250px] w-full flex gap-2 flex-wrap content-start">
      {items?.map((item) => (
        <CheckItem
          isChecked={selectedServices?.some(
            (selectService) => selectService.productSubcategory1 === item.productSubcategory1,
          )}
          checkItem={item}
          key={item.productSubcategory1}
          setSelectedItems={setSelectedItems}
          disabledLength={disabledLength}
        />
      ))}
    </div>
  );
};

export default OrderCheckList;
