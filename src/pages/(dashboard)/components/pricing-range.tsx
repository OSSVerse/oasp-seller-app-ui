import { useState } from "react";
import * as Slider from "@radix-ui/react-slider";

const min = 0;
const max = 5300;
const from = 300;
const to = 2000;

const PricingRange = () => {
  const [values, setValues] = useState<number[]>([from, to]);

  const handleValueChange = (newValues: number[]) => {
    setValues(newValues);
  };

  return (
    <div>
      <Slider.Root
        value={values}
        onValueChange={handleValueChange}
        min={min}
        max={max}
        step={1}
        className="relative flex w-full touch-none select-none items-center"
      >
        <Slider.Track className="relative h-[7px] grow rounded-full bg-gray-300">
          <Slider.Range className="absolute h-full rounded-full bg-black" />
        </Slider.Track>
        <Slider.Thumb
          className="block size-5 rounded-[10px] bg-black shadow-[0_2px_10px] border-white border-4 shadow-blackA4 hover:bg-white focus:shadow-[0_0_0_5px] focus:shadow-blackA5 focus:outline-none"
          aria-label="Volume"
        />
        <Slider.Thumb
          className="block size-5 rounded-[10px] bg-black shadow-[0_2px_10px] border-white border-4 shadow-blackA4 hover:bg-white focus:shadow-[0_0_0_5px] focus:shadow-blackA5 focus:outline-none"
          aria-label="Volume"
        />
      </Slider.Root>
    </div>
  );
};

export default PricingRange;
