import { formatDistanceToNow } from "date-fns";

interface TimeAgoProps {
  timestamp: string;
}

const TimeAgo = ({ timestamp }: TimeAgoProps) => {
  const date = new Date(timestamp);

  const timePeriod = formatDistanceToNow(date);
  return (
    <time dateTime={timestamp} title={timestamp}>
      {timePeriod} ago
    </time>
  );
};

export { TimeAgo };
