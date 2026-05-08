import { describe, it, expect } from "vitest";

const getCurrencySymbol = (currency: string) => {
  const code = currency.toUpperCase();
  const symbolMap: Record<string, string> = {
    SGD: "S$",
    VND: "₫",
    THB: "฿",
    JPY: "¥",
    IDR: "Rp",
    USD: "$",
    CNY: "¥",
    KRW: "₩",
    HKD: "HK$",
    MYR: "RM",
    PHP: "₱",
  };
  return symbolMap[code] || code;
};

const formatInput = (
  raw: string,
  decimalDigits: number,
  currentValue: string,
  maxDigits: number,
): string => {
  let cleaned = raw.replace(/,/g, "");

  if (cleaned === "") {
    return "";
  }
  if (cleaned === "." && decimalDigits > 0) {
    return "0.";
  }

  if (/^0+[1-9]/.test(cleaned)) {
    cleaned = cleaned.replace(/^0+/, "");
  } else if (/^0{2,}$/.test(cleaned)) {
    cleaned = "0";
  }

  if (!/^\d*\.?\d*$/.test(cleaned)) {
    return currentValue;
  }

  const [intPart = "", decimalPart = ""] = cleaned.split(".");
  const limitedInt = intPart.slice(0, maxDigits);
  const limitedDecimal = decimalPart.slice(0, decimalDigits);

  const formattedInt = limitedInt
    ? parseInt(limitedInt, 10).toLocaleString("en-US")
    : "0";

  if (cleaned.includes(".") && decimalDigits > 0) {
    return `${formattedInt}.${limitedDecimal}`;
  }
  return formattedInt;
};

const formatCurrency = (
  locale: string,
  value: string | number,
  decimalDigits: number,
): string => {
  const num =
    typeof value === "string" ? parseFloat(value.replace(/,/g, "")) : value;

  if (isNaN(num)) {
    return "";
  }

  return num.toLocaleString(locale, {
    minimumFractionDigits: decimalDigits,
    maximumFractionDigits: decimalDigits,
  });
};

describe("getCurrencySymbol", () => {
  it("returns S$ for SGD", () => {
    expect(getCurrencySymbol("SGD")).toBe("S$");
  });

  it("returns $ for USD", () => {
    expect(getCurrencySymbol("USD")).toBe("$");
  });

  it("returns currency code for unknown currency", () => {
    expect(getCurrencySymbol("XYZ")).toBe("XYZ");
  });

  it("handles lowercase currency code", () => {
    expect(getCurrencySymbol("usd")).toBe("$");
  });

  it("returns correct symbols for various currencies", () => {
    expect(getCurrencySymbol("VND")).toBe("₫");
    expect(getCurrencySymbol("THB")).toBe("฿");
    expect(getCurrencySymbol("JPY")).toBe("¥");
    expect(getCurrencySymbol("IDR")).toBe("Rp");
    expect(getCurrencySymbol("CNY")).toBe("¥");
    expect(getCurrencySymbol("KRW")).toBe("₩");
    expect(getCurrencySymbol("HKD")).toBe("HK$");
    expect(getCurrencySymbol("MYR")).toBe("RM");
    expect(getCurrencySymbol("PHP")).toBe("₱");
  });
});

describe("formatInput", () => {
  it("returns empty string for empty input", () => {
    expect(formatInput("", 2, "0", 13)).toBe("");
  });

  it("returns 0. for decimal point when decimals > 0", () => {
    expect(formatInput(".", 2, "0", 13)).toBe("0.");
  });

  it("removes leading zeros from numbers", () => {
    expect(formatInput("00123", 2, "0", 13)).toBe("123");
  });

  it("converts multiple zeros to single zero", () => {
    expect(formatInput("000", 2, "0", 13)).toBe("0");
  });

  it("returns current value for invalid input", () => {
    expect(formatInput("abc", 2, "100", 13)).toBe("100");
  });

  it("limits integer part to max digits", () => {
    expect(formatInput("12345678901", 2, "0", 10)).toBe("1,234,567,890");
  });

  it("limits decimal part to decimal digits", () => {
    expect(formatInput("123.456789", 2, "0", 13)).toBe("123.45");
  });

  it("formats integer with commas", () => {
    expect(formatInput("1234567", 2, "0", 13)).toBe("1,234,567");
  });

  it("formats with decimals", () => {
    expect(formatInput("1234.56", 2, "0", 13)).toBe("1,234.56");
  });

  it("returns 0 for zero value", () => {
    expect(formatInput("0", 2, "0", 13)).toBe("0");
  });
});

describe("formatCurrency", () => {
  it("formats number with default locale", () => {
    expect(formatCurrency("en-US", 1234, 2)).toBe("1,234.00");
  });

  it("formats string number", () => {
    expect(formatCurrency("en-US", "1234", 2)).toBe("1,234.00");
  });

  it("returns empty string for NaN", () => {
    expect(formatCurrency("en-US", NaN, 2)).toBe("");
  });

  it("formats with different decimal digits", () => {
    expect(formatCurrency("en-US", 1234, 0)).toBe("1,234");
  });

  it("formats zero", () => {
    expect(formatCurrency("en-US", 0, 2)).toBe("0.00");
  });
});
