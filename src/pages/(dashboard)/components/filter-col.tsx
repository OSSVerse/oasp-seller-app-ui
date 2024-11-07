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

const typeFilter = ["All Type", "Project", "ML Model"];
const serviceOrderFilter = [
  "All Service Offer",
  "Assessment",
  "Attestation",
  "Certification",
  "Redemetion",
];

const OrderFilter = () => {
  return (
    <div className="w-full flex flex-col gap-4 ">
      <div className="flex justify-between items-center gap-2 border p-2 rounded">
        <span>Filter</span>
        <Button>Reset</Button>
      </div>
      <div className="flex flex-col gap-2  border p-2 rounded ">
        <Accordion
          defaultValue="filter-type"
          type="single"
          collapsible
          className="w-full border-none"
        >
          <AccordionItem value="filter-type" className="border-none">
            <AccordionTrigger>Type</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                {typeFilter.map((filter) => (
                  <div className="flex items-center p-1 gap-2" key={filter}>
                    <Checkbox />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {filter}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="flex flex-col gap-2  border p-2 rounded ">
        <Accordion
          defaultValue="filter-service-order"
          type="single"
          collapsible
          className="w-full border-none"
        >
          <AccordionItem value="filter-service-order" className="border-none">
            <AccordionTrigger>Service Order</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search service Offer..."
                  className="pl-8 w-full text-xs"
                />
              </div>
              <div className="flex flex-col gap-2">
                {serviceOrderFilter.map((filter) => (
                  <div className="flex items-center p-1 gap-2" key={filter}>
                    <Checkbox />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {filter}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="flex flex-col gap-2  border p-2 rounded ">
        <Accordion
          defaultValue="filter-pricing-range"
          type="single"
          collapsible
          className="w-full border-none"
        >
          <AccordionItem value="filter-pricing-range" className="border-none">
            <AccordionTrigger>Pricing Range</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                {/* input */}
                <div className="flex justify-between gap-2 items-center">
                  <Input defaultValue="300" />
                  <Separator className="w-2" />
                  <Input defaultValue="600" />
                </div>
                {/* range */}
                <PricingRange />
                <div className="flex justify-between">
                  <span>₹300</span>
                  <span>₹3300</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default OrderFilter;
