import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatInTimeZone } from "date-fns-tz";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 *
 * @param targetDate string - date string which is need to be parse, example 'Sept 6, 2024'
 * @returns number - current date to targetDate number, example current date is 'Sept 5, 2024', targetDate is 'Sept 6, 2024', will return 1
 */
export function calDiffDay(targetDate: string): number {
  // TODO: mock the current date to calculate the deliveryData remaning date
  const currentDate = "Sept 3, 2024";

  const currentDateParse = new Date(currentDate);
  const deliveryDateParse = new Date(targetDate);
  const timeDiff = deliveryDateParse.getTime() - currentDateParse.getTime();
  const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return dayDiff;
}

/**
 *
 * @param timeZone string - example: 'America/New_York'
 * @param date number | Date | undefined - example: new Date()
 * @returns string - timeZoneName example: EST
 */
export const getTimeZoneName = (timeZone: string, date?: number | Date) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "short",
  });
  return formatter
    .formatToParts(date)
    .find((part) => part.type === "timeZoneName")?.value;
};

/**
 *
 * @param date number | Date | string - example: new Date()
 * @param timezone string - example: 'America/New_York'
 * @param format string - example: 'yyyy-MM-dd HH:mm'
 * @returns string - date time format style example: 2024-10-16 04:06
 */
export const getDateInTimeZone = (
  date: Date | string | number,
  timezone: string,
  format = "yyyy-MM-dd HH:mm",
) => formatInTimeZone(date, timezone, format);
