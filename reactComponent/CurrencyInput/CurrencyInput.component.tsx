import React, { ChangeEvent, FocusEventHandler, useRef, useState } from "react";
import { Input } from "../Input";
import { CurrencyInputProps } from "./CurrencyInput.interface";

const isDefined = <T,>(val: T | undefined | null): val is T => {
  return val !== undefined && val !== null;
};

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
  decimalDigits = 2,
  value: string | undefined,
  internalValue: string,
  maxDigits = 2,
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
    return value ?? internalValue;
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
  decimalDigits = 2,
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

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onChange,
  currency = "SGD",
  locale = "en-US",
  decimalDigits = 2,
  maxDigits = 13,
  onBlur,
  onFocus,
  placeholder = "Enter amount",
  ...props
}) => {
  const elementInput = useRef<HTMLInputElement>(null);
  const [displayValue, setDisplayValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);

  const [prevValue, setPrevValue] = useState(value);
  if (value !== prevValue) {
    setPrevValue(value);
    if (!isFocused) {
      setDisplayValue(formatCurrency(locale, value, decimalDigits));
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const raw = e.target.value;
    const input = elementInput.current;
    if (!input) {
      return;
    }
    const prevValue = input.value;
    const prevCursor = input.selectionStart ?? 0;

    // Remove commas to get raw number
    const rawBeforeCursor = prevValue.slice(0, prevCursor).replace(/,/g, "");

    const formatted = formatInput(
      raw,
      decimalDigits,
      undefined,
      displayValue,
      maxDigits,
    );

    setDisplayValue(formatted);

    const rawNumberString = formatted.replace(/,/g, "");
    const numericValue = parseFloat(rawNumberString);

    if (!isNaN(numericValue)) {
      onChange(numericValue);
    } else {
      onChange(0);
    }

    requestAnimationFrame(() => {
      if (!isDefined(input)) {
        return;
      }

      // Recalculate cursor position
      let cursor = 0;
      let rawIndex = 0;
      for (
        let i = 0;
        i < formatted.length && rawIndex < rawBeforeCursor.length;
        i++
      ) {
        if (formatted[i] !== ",") {
          rawIndex++;
        }
        cursor++;
      }

      input.setSelectionRange(cursor, cursor);
    });
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    setIsFocused(false);

    if (decimalDigits <= 0) {
      onBlur?.(e);
      return;
    }
    const raw = e.target.value;
    const formatted = formatCurrency(raw, decimalDigits);

    setDisplayValue(formatted);

    const rawNumberString = raw.replace(/,/g, "");
    const numericValue = parseFloat(rawNumberString);
    if (!isNaN(numericValue)) {
      onChange(numericValue);
    } else {
      onChange(0);
    }

    if (onBlur !== undefined) {
      onBlur(e);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  return (
    <Input
      {...props}
      ref={elementInput}
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      inputMode="decimal"
      pattern="[0-9]*"
      placeholder={placeholder}
      fullWidth
      startAdornment={
        <span className="text-gray-500 text-sm font-medium">
          {getCurrencySymbol(currency)}
        </span>
      }
    />
  );
};
