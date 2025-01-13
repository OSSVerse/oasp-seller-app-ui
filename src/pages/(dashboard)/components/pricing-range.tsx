import * as Slider from "@radix-ui/react-slider";

interface PricingRangeProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (min: number, max: number) => void;
}

const PricingRange: React.FC<PricingRangeProps> = ({ min, max, value, onChange }) => {
  const handleValueChange = (newValues: number[]) => {
    onChange(newValues[0], newValues[1]);
  };

  return (
    <div className="flex flex-col gap-4">
      <Slider.Root
        value={value}
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
          className="block size-5 rounded-[10px] bg-black shadow-lg border-white border-4 focus:outline-none"
          aria-label="Min"
        />
        <Slider.Thumb
          className="block size-5 rounded-[10px] bg-black shadow-lg border-white border-4 focus:outline-none"
          aria-label="Max"
        />
      </Slider.Root>
    </div>
  );
};

export default PricingRange;
