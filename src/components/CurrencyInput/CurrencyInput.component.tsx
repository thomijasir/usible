import { createSignal, createEffect, on } from "solid-js";
import { Input } from "../Input";
import type { CurrencyInputProps } from "./CurrencyInput.interface";

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

export function CurrencyInput(props: CurrencyInputProps) {
  const [displayValue, setDisplayValue] = createSignal(
    formatCurrency(
      props.locale ?? "en-US",
      props.value,
      props.decimalDigits ?? 2,
    ),
  );
  const [isFocused, setIsFocused] = createSignal(false);
  let inputRef: HTMLInputElement | undefined;

  const decimalDigits = () => props.decimalDigits ?? 2;
  const maxDigits = () => props.maxDigits ?? 13;
  const locale = () => props.locale ?? "en-US";
  const currency = () => props.currency ?? "SGD";

  createEffect(
    on(
      () => props.value,
      (value) => {
        if (!isFocused()) {
          setDisplayValue(formatCurrency(locale(), value, decimalDigits()));
        }
      },
      { defer: true },
    ),
  );

  const handleInput = (raw: string) => {
    if (!inputRef) {
      return;
    }

    const prevValue = inputRef.value;
    const prevCursor = inputRef.selectionStart ?? 0;
    const rawBeforeCursor = prevValue.slice(0, prevCursor).replace(/,/g, "");

    const formatted = formatInput(
      raw,
      decimalDigits(),
      displayValue(),
      maxDigits(),
    );

    setDisplayValue(formatted);

    const rawNumberString = formatted.replace(/,/g, "");
    const numericValue = parseFloat(rawNumberString);

    if (!isNaN(numericValue)) {
      props.onChange(numericValue);
    } else {
      props.onChange(0);
    }

    requestAnimationFrame(() => {
      if (!inputRef) {
        return;
      }

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

      inputRef.setSelectionRange(cursor, cursor);
    });
  };

  const handleBlur = () => {
    setIsFocused(false);

    if (decimalDigits() <= 0) {
      return;
    }

    const raw = displayValue();
    const formatted = formatCurrency(locale(), raw, decimalDigits());

    setDisplayValue(formatted);

    const rawNumberString = raw.replace(/,/g, "");
    const numericValue = parseFloat(rawNumberString);
    if (!isNaN(numericValue)) {
      props.onChange(numericValue);
    } else {
      props.onChange(0);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <div class="relative">
      <Input
        ref={(el) => {
          inputRef = el;
        }}
        value={displayValue()}
        onInput={handleInput}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={props.placeholder ?? "Enter amount"}
        disabled={props.disabled}
        error={props.error}
        helperText={props.helperText}
        label={props.label}
        size={props.size}
        fullWidth={true}
        startAdornment={
          <span class="text-foreground-muted text-sm font-medium">
            {getCurrencySymbol(currency())}
          </span>
        }
        class={props.class}
        containerClass={props.containerClass}
      />
    </div>
  );
}
