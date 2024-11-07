import * as Label from "@radix-ui/react-label";
import { Checkbox } from "../ui/checkbox";
import { Icon } from "./icon";
import { useEffect, useState } from "react";
import type { Daum } from "@/services/orders-service";

interface CheckItemProps {
  isChecked: boolean;
  checkItem: Daum["items"][number];
  setSelectedItems: React.Dispatch<React.SetStateAction<Daum["items"]>>;
  disabledLength?: boolean;
}

const CheckItem = ({
  isChecked,
  checkItem,
  setSelectedItems,
  disabledLength = false,
}: CheckItemProps) => {
  const [checked, setChecked] = useState(false);
  const { descriptor, price, quantity, productSubcategory1 } = checkItem;
  const checkboxName = descriptor.name.toLowerCase().split(" ").join("");

  useEffect(() => {
    if (checked) {
      setSelectedItems((prevItems: Daum["items"]) => [
        ...prevItems,
        checkItem,
      ]);
    } else {
      setSelectedItems((prevItems: Daum["items"]) =>
        prevItems?.filter(
          (item) => item.productSubcategory1 !== checkItem.productSubcategory1,
        ),
      );
    }
  }, [checked, checkItem, setSelectedItems]);

  return (
    <Label.Root
      className="text-[15px] font-medium leading-[35px] items-center flex w-full flex-wrap gap-[15px] bg-stone-100 px-4 py-1 rounded-md basis-[49%] justify-between"
      htmlFor={productSubcategory1}
    >
      <span className="flex  items-center  gap-3 min-w-72">
        <Icon icon={'icon'} className="opacity-50" />
        <span>{productSubcategory1}</span>
      </span>
      <span className="flex  items-center justify-between flex-grow">
        <span>
          ₹{quantity.count} {Number(price.value) && <> - ₹{price.value}</>} / month
        </span>
        <Checkbox
          id={productSubcategory1}
          name={checkboxName}
          checked={checked || isChecked}
          onCheckedChange={() => setChecked(!checked)}
          disabled={disabledLength && !checked && !isChecked}
        />
      </span>
    </Label.Root>
  );
};

export default CheckItem;
