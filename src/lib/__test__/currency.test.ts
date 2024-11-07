import { describe, it, expect } from "vitest";
import { getCurrencySymbol, currencies } from "../currency";

describe("getCurrencySymbol", () => {
  it("should return the correct symbol given a valid currency code", () => {
    const symbol = getCurrencySymbol("ADP");
    expect(symbol).toBe(currencies.ADP.symbol);
  });

  it("should return the input currency code when provided with an invalid currency code", () => {
    const symbol = getCurrencySymbol("INVALID_CODE");
    expect(symbol).toBe("INVALID_CODE");
  });
});

describe("currencies structure", () => {
  it("should have the correct structure for each currency", () => {
    for (const code in currencies) {
      const currency = currencies[code];
      expect(currency).toHaveProperty("displayName");
      expect(currency).toHaveProperty("displayName-count-one");
      expect(currency).toHaveProperty("displayName-count-other");
      expect(currency).toHaveProperty("symbol");
      if (currency["symbol-alt-narrow"]) {
        expect(currency).toHaveProperty("symbol-alt-narrow");
      }
      if (currency["symbol-alt-variant"]) {
        expect(currency).toHaveProperty("symbol-alt-variant");
      }
    }
  });
});
