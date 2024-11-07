import { describe, it, expect, vi } from "vitest";
import { cn, calDiffDay, getDateInTimeZone } from "../utils";

describe("utils", () => {
    describe("cn", () => {
        it("should merge class names correctly", () => {
            expect(cn("foo", "bar")).toBe("foo bar");
            expect(cn("foo", "bar", "baz")).toBe("foo bar baz");
            expect(cn("foo", { bar: true, baz: false })).toBe("foo bar");
            expect(cn("foo", ["bar", "baz"])).toBe("foo bar baz");
        });
    });

    describe("calDiffDay", () => {
        it("should calculate the difference in days correctly", () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date("Sept 3, 2024"));

            expect(calDiffDay("Sept 6, 2024")).toBe(3);
            expect(calDiffDay("Sept 3, 2024")).toBe(0);
            expect(calDiffDay("Sept 1, 2024")).toBe(-2);

            vi.useRealTimers();
        });
    });

    describe("getDateInTimeZone", () => {
        it("should format the date correctly in the given time zone", () => {
            const date = new Date("2024-01-01T12:00:00Z");

            expect(getDateInTimeZone(date, "America/New_York")).toBe(
                "2024-01-01 07:00",
            );
            expect(getDateInTimeZone(date, "Europe/London")).toBe("2024-01-01 12:00");
            expect(getDateInTimeZone(date, "Asia/Tokyo")).toBe("2024-01-01 21:00");
        });

        it("should use custom format when provided", () => {
            const date = new Date("2024-01-01T12:00:00Z");

            expect(
                getDateInTimeZone(date, "America/New_York", "MM/dd/yyyy HH:mm:ss"),
            ).toBe("01/01/2024 07:00:00");
        });
    });
});
