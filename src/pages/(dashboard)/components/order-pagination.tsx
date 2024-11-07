import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const OrderPagination = () => (
  <div className="flex justify-between 'items-center w-full">
    <div className="flex items-center  gap-2 w-96">
      <span className="text-xs ">Showing 1-20 of 28</span>{" "}
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
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  </div>
);

export default OrderPagination;
