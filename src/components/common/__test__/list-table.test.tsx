import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ListTable, {
  ComputeHeader,
  ListTableHeader,
  ListTableRow,
} from "../list-table";
import { ScrollArea } from "../../ui/scroll-area";

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

it("renders ScrollArea without crashing", () => {
  render(<ScrollArea>Some content</ScrollArea>);
  expect(screen.getByText("Some content")).toBeInTheDocument();
});

const mockData = [
  { id: 1, name: "Alice", location_add: "City X" },
  { id: 2, name: "Bob", location_add: "City Y" },
  { id: 3, name: "Charlie", location_add: "City Z" },
];

describe("ComputeHeader function", () => {
  it("correctly formats headers with underscores", () => {
    expect(ComputeHeader("sample_header")).toBe("Sample Header");
  });
});

describe("ListTableHeader component", () => {
  it("renders headers correctly with computed formatting", () => {
    render(<ListTableHeader headers={["name", "location_add"]} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Location Add")).toBeInTheDocument();
  });
});

describe("ListTable component", () => {
  it("renders 'No Data' when dataSource is empty", () => {
    render(<ListTable dataSource={[]} />);
    expect(screen.getByText("No Data")).toBeInTheDocument();
  });

  it("renders table headers and rows correctly", () => {
    render(<ListTable dataSource={mockData} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Location Add")).toBeInTheDocument();

    mockData.forEach((data) => {
      expect(screen.getByText(data.name)).toBeInTheDocument();
      expect(screen.getByText(data.location_add)).toBeInTheDocument();
    });
  });

  it("excludes specified columns from rendering", () => {
    render(<ListTable dataSource={mockData} excludedCols={["location_add"]} />);

    expect(screen.queryByText("Location Add")).not.toBeInTheDocument();

    mockData.forEach((data) => {
      expect(screen.getByText(data.name)).toBeInTheDocument();
      expect(screen.queryByText(data.location_add)).not.toBeInTheDocument();
    });
  });
});

describe("ListTableRow component", () => {
  it("renders a row with the correct number of columns", () => {
    const row = { id: 1, name: "Alice", location_add: "City X" };
    render(<ListTableRow row={row} />);

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("City X")).toBeInTheDocument();
  });

  it("excludes specified columns from row rendering", () => {
    const row = { id: 1, name: "Alice", location_add: "City X" };
    render(<ListTableRow row={row} excludedCols={["location_add"]} />);

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.queryByText("City X")).not.toBeInTheDocument();
  });
});
