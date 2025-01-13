import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import PricingRange from "./pricing-range";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const OrderFilter = ({ filterContent, setActiveFilters }: { filterContent: any, setActiveFilters: any }) => {
  const [filters, setFilters] = useState(filterContent);

  useEffect(() => {
    // Ensure "All Service Offered" is checked and disabled by default
    setFilters(() => {
      const updatedFilters = { ...filterContent };
      if (updatedFilters["Service Order"]) {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        updatedFilters["Service Order"] = updatedFilters["Service Order"].map((filter: any) => {
          if (filter.value === "all") {
            return { ...filter, checked: true, disabled: true };
          }
          return { ...filter, checked: false };
        });
      }
      return updatedFilters;
    });
  }, [filterContent]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setActiveFilters(() => filters);
  }, [filters]);

  const handleReset = () => {
    setFilters(() => {
      const resetFilters = { ...filterContent };
      if (resetFilters["Service Order"]) {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        resetFilters["Service Order"] = resetFilters["Service Order"].map((filter: any) => {
          if (filter.value === "all") {
            return { ...filter, checked: true, disabled: true };
          }
          return { ...filter, checked: false };
        });
      }
      return resetFilters;
    });
  };

  const handleCheckboxChange = (filterName: string, value: string) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    setFilters((prevFilters: any) => {
      const updatedFilters = { ...prevFilters };

      if (filterName === "Service Order") {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        updatedFilters[filterName] = updatedFilters[filterName].map((filter: any) => {
          if (filter.value === value) {
            return { ...filter, checked: !filter.checked };
          }
          if (filter.value === "all") {
            return { ...filter, checked: false };
          }
          return filter;
        });

        // If no other options are selected, recheck "All Service Offered"
        const anyChecked = updatedFilters[filterName].some(
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          (filter: any) => filter.value !== "all" && filter.checked
        );
        if (!anyChecked) {
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          updatedFilters[filterName] = updatedFilters[filterName].map((filter: any) => {
            if (filter.value === "all") {
              return { ...filter, checked: true, disabled: true };
            }
            return { ...filter, checked: false };
          });
        }
      }
      return updatedFilters;
    });
  };

  const handlePriceChange = (filterName: string, key: string, value: number) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      [filterName]: prevFilters[filterName].map((filter: any) =>
        "min" in filter && "max" in filter ? { ...filter, [key]: value } : filter
      ),
    }));
  };

  return (
    <section className="w-[283px] xl:w-[380px] flex flex-col gap-3">
      <header className="flex justify-between items-center gap-2 border p-2 rounded bg-white">
        <h2>Filter</h2>
        <Button onClick={handleReset}>Reset</Button>
      </header>
      {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
      {Object.entries(filters).map(([filterName, filterItems]: any) => (
        <fieldset key={filterName} className="flex flex-col gap-2 border p-2 rounded bg-white">
          <Accordion defaultValue={`filter-${filterName}`} type="single" collapsible>
            <AccordionItem value={`filter-${filterName}`} className="border-none">
              <AccordionTrigger>{filterName}</AccordionTrigger>
              <AccordionContent>
                {filterName === "Service Order" && (
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search service offers..."
                      className="pl-8 w-full text-xs"
                    />
                    <div className="flex flex-col gap-2 mt-2">
                      {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
                      {filterItems.map((filter: any) => (
                        <div key={filter.value} className="flex items-center p-1 gap-2">
                          <Checkbox
                            id={`filter-${filter.value}`}
                            checked={filter.checked || false}
                            disabled={filter.disabled || false}
                            onCheckedChange={() =>
                              !filter.disabled && handleCheckboxChange(filterName, filter.value)
                            }
                          />
                          <label htmlFor={`filter-${filter.value}`} className="text-sm font-medium">
                            {filter.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {filterName === "Price Range" && (
                  <div className="flex flex-col gap-4">
                    {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
                    {filterItems.map((filter: any, index: number) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      <div key={index}>
                        <div className="flex justify-between gap-2 items-center">
                          <Input
                            value={filter.minPrice}
                            onChange={(e) =>
                              handlePriceChange(filterName, "minPrice", Number(e.target.value))
                            }
                          />
                          <Separator className="w-2" />
                          <Input
                            value={filter.maxPrice}
                            onChange={(e) =>
                              handlePriceChange(filterName, "maxPrice", Number(e.target.value))
                            }
                          />
                        </div>
                        <PricingRange
                          min={filter.min}
                          max={filter.max}
                          value={[filter.minPrice, filter.maxPrice]}
                          onChange={(min, max) => {
                            handlePriceChange(filterName, "minPrice", min);
                            handlePriceChange(filterName, "maxPrice", max);
                          }}
                        />
                        <div className="flex justify-between">
                          <span>₹{filter.min}</span>
                          <span>₹{filter.max}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </fieldset>
      ))}
    </section>
  );
};

export default OrderFilter;
