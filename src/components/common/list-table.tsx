/**
 * Props for the ListTableHeader component.
 *
 * @interface ListTableHeaderProps
 * @property {string[]} headers - An array of header labels to be displayed in the table.
 *
 * @example
 * <ListTableHeader headers={['Name', 'Age', 'Country']} />
 */

import { ScrollArea } from "../ui/scroll-area";

interface ListTableHeaderProps {
  headers: string[];
}

export const ComputeHeader = (header: string) => {
  const computedHeader = header
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
  return computedHeader;
};

export const ListTableHeader = ({ headers }: ListTableHeaderProps) => {
  return (
    <div className="w-full bg-secondary rounded-lg py-2 px-4">
      <div
        className="grid gap-6 items-center"
        style={{
          gridTemplateColumns: `repeat(${headers.length}, 1fr)`,
        }}
      >
        {headers.map((header) => (
          <div key={header}>{ComputeHeader(header)}</div>
        ))}
      </div>
    </div>
  );
};

/**
 * Props for the ListTable component.
 *
 * @template T - The type of items in the dataSource array. T must have an 'id' property of type string or number.
 *
 * @interface ListTableProps
 * @property {T[]} dataSource - The array of data items to be displayed in the table. Each item must include an 'id' property.
 * @property {string[]} [excludedCols] - Optional array of column names to be excluded from the table.
 * This can be used to hide specific columns, such as an 'id' column.
 *
 * @example
 * const partyDependencies = [
 *   { id: 1, name: 'Party A', location: 'City X' },
 *   { id: 2, name: 'Party B', location: 'City Y' },
 * ];
 *
 * <ListTable dataSource={partyDependencies} excludedCols={['id']} />
 */
interface ListTableProps<T extends { id: string | number }> {
  dataSource: T[];
  excludedCols?: string[];
}
const ListTable = <T extends { id: string | number }>({
  dataSource,
  excludedCols = [],
}: ListTableProps<T>) => {
  const headers = Object.keys(dataSource[0] ?? []).filter(
    (key) => !excludedCols.some((excludedCol) => excludedCol === key),
  );
  return dataSource.length === 0 ? (
    <>No Data</>
  ) : (
    <>
      <ListTableHeader headers={headers} />
      <ScrollArea>
        {(dataSource || []).map((row) => (
          <ListTableRow key={row.id} row={row} excludedCols={excludedCols} />
        ))}
      </ScrollArea>
    </>
  );
};

/**
 * Props for the ListTableRow component.
 *
 * @template T - The type of the row data.
 *
 * @interface ListTableRowProps
 * @property {T} row - The data for the row to be displayed in the table. This represents a single item from the dataSource.
 * @property {string[]} [excludedCols] - Optional array of column names that should be excluded from the row rendering.
 * This can be used to hide specific columns when displaying the row.
 *
 * @example
 * const rowData = { id: 1, name: 'Party A', location: 'City X' };
 *
 * <ListTableRow row={rowData} excludedCols={['id']} />
 */
interface ListTableRowProps<T> {
  row: T;
  excludedCols?: string[];
}
export const ListTableRow = <T extends { id: string | number }>({
  row,
  excludedCols = [],
}: ListTableRowProps<T>) => {
  const rowEntries = Object.entries(row).filter(
    ([k, _]) => !excludedCols.some((excludedCol) => excludedCol === k),
  );
  return (
    <div
      className="grid gap-4 items-center text-sm space-y-2 py-2 px-4"
      style={{
        gridTemplateColumns: `repeat(${rowEntries.length}, 1fr)`,
      }}
    >
      {rowEntries.map(([k, v]) => (
        <div key={k}>
          {!excludedCols.some((excludedCol) => excludedCol === k) && v}
        </div>
      ))}
    </div>
  );
};

export default ListTable;
