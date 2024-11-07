import { Button } from "@/components/ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

import { ChevronLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { RefinedProduct } from "@/services/marketplace-service";
import { MarketplaceCard } from "@/components/common/marketplace-card";

const MarketplaceList = ({
  showFilter,
  products,
}: { showFilter: boolean; products: RefinedProduct[] }) => {
  const oaspFilter = ["All OSAP", "USE", "Green Hill", "Tocomo"];
  return (
    <div className="flex flex-col gap-9">
      <div className="w-full flex gap-4">
        {showFilter && (
          <div className="w-[283px] flex flex-col gap-4 ">
            <div className="flex justify-between items-center gap-2 border p-2 rounded">
              <span>Filter</span>
              <Button>Reset</Button>
            </div>
            <div className="flex flex-col gap-2  border p-2 rounded ">
              <Accordion
                value="item-1"
                type="single"
                collapsible
                className="w-full  active:h-[14.88rem] border-none"
              >
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger>OASP</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search Service Offered"
                        className="pl-8 w-full text-xs"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      {oaspFilter.map((filter) => (
                        <div
                          className="flex items-center p-1 gap-2"
                          key={filter}
                        >
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
                value="item-1"
                type="single"
                collapsible
                className="w-full  active:h-[14.88rem] border-none"
              >
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger>OASP</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search Service Offered"
                        className="pl-8 w-full text-xs"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      {oaspFilter.map((filter) => (
                        <div
                          className="flex items-center p-1 gap-2"
                          key={filter}
                        >
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
                value="item-1"
                type="single"
                collapsible
                className="w-full  active:h-[14.88rem] border-none"
              >
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger>OASP</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search Service Offered"
                        className="pl-8 w-full text-xs"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      {oaspFilter.map((filter) => (
                        <div
                          className="flex items-center p-1 gap-2"
                          key={filter}
                        >
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
          </div>
        )}

        <div className="flex flex-wrap gap-7 justify-center mx-auto w-full">
          {products.map((product) => (
            <MarketplaceCard product={product} key={product._id} />
          ))}
        </div>
      </div>
      <div className="sm:flex space-y-4 justify-between items-center w-full">
        <div className="flex items-center  gap-2 w-96">
          <span className="text-xs ">Showing 1-20 of 100</span>{" "}
          <Separator orientation="vertical" className="h-4 w-[3px]" />
          <span className="text-xs ">10 per page</span>
        </div>
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#">
                  <ChevronLeft className="h-4 w-4" />
                </PaginationPrevious>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceList;
