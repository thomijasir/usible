import React, { useId } from "react";
import type { SwitchProps } from "./Switch.interface";
import { Text } from "../Text";

export const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onChange,
  disabled = false,
  label,
  className = "",
  id,
  ...props
}) => {
  const generatedId = useId();
  const switchId = id || generatedId;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {label && (
        <label
          htmlFor={switchId}
          className={`mr-3 select-none flex-1 ${
            disabled
              ? "cursor-not-allowed text-gray-400"
              : "cursor-pointer text-gray-900 dark:text-gray-100"
          }`}>
          <Text variant="body1">{label}</Text>
        </label>
      )}
      <div className="relative inline-block w-12 h-7">
        <input
          type="checkbox"
          id={switchId}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className="peer appearance-none w-full h-full rounded-full bg-gray-200 transition-colors duration-300 checked:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          {...props}
        />
        <span className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 peer-checked:translate-x-5 pointer-events-none" />
      </div>
    </div>
  );
};
