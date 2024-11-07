import { render, screen } from "@testing-library/react";
import { TimeAgo } from "../time-ago";

describe("TimeAgo Component", () => {
  it("should render the correct time ago format for a given timestamp", () => {
    const timestamp = new Date(Date.now() - 5 * 60 * 1000).toISOString();

    render(<TimeAgo timestamp={timestamp} />);

    expect(screen.getByText(/minutes? ago/i)).toBeInTheDocument();
  });

  it("should render the correct dateTime attribute", () => {
    const timestamp = "2023-10-28T12:00:00Z";

    render(<TimeAgo timestamp={timestamp} />);

    const timeElement = screen.getByTitle(timestamp);
    expect(timeElement).toHaveAttribute("dateTime", timestamp);
  });
});
