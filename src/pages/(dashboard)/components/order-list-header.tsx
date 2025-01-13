import { cn } from "@/lib/utils";

export const OrderListHeader = ({
  tableHeaders,
}: {
  tableHeaders: string[];
}) => {
  return (
    <div className="bg-[#CCCCCC] w-full overflow-auto rounded-lg p-4">
      <div
        className="grid gap-6 items-center"
        style={{
          gridTemplateColumns: `auto repeat(${tableHeaders.length}, 158px)`,
        }}
      >
        {tableHeaders.map((tableHeader, index) => (
          <div key={tableHeader} className={cn(index === 0 && "")}>
            {tableHeader}
          </div>
        ))}
      </div>
    </div>
  );
};
export default OrderListHeader;
