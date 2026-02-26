import React from "react";
import { twMerge } from "tailwind-merge";
import type { NumpadProps } from "./Numpad.interface";
import { FingerprintIcon, BackspaceIcon } from "~/assets/icons";

export const Numpad: React.FC<NumpadProps> = ({
  theme = "light",
  onKeyPress,
  onBackspace,
  onBiometricAuth,
}) => {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const getThemeClasses = () => {
    if (theme === "dark") {
      return {
        container: "bg-gray-900 text-white",
        key: "bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white",
        specialKey: "text-white hover:bg-gray-700 active:bg-gray-600",
      };
    }
    // light theme
    return {
      container: "bg-white text-gray-900",
      key: "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-900 shadow-sm",
      specialKey: "text-gray-900 hover:bg-gray-100 active:bg-gray-200",
    };
  };

  const themeClasses = getThemeClasses();

  return (
    <div
      className={twMerge(
        "flex flex-col items-center gap-6 rounded-xl max-w-xs mx-auto p-6",
        themeClasses.container,
      )}>
      <div className="grid grid-cols-3 gap-x-8 gap-y-6">
        {keys.map((key) => (
          <KeyButton
            key={key}
            onClick={() => onKeyPress?.(key)}
            baseClassName={themeClasses.key}>
            {key}
          </KeyButton>
        ))}

        <KeyButton
          onClick={onBiometricAuth}
          baseClassName={themeClasses.specialKey}
          className={!onBiometricAuth ? "opacity-0 pointer-events-none" : ""}>
          <FingerprintIcon className="w-8 h-8" />
        </KeyButton>

        <KeyButton
          onClick={() => onKeyPress?.("0")}
          baseClassName={themeClasses.key}>
          0
        </KeyButton>

        <KeyButton
          onClick={onBackspace}
          baseClassName={themeClasses.specialKey}>
          <BackspaceIcon className="w-8 h-8" />
        </KeyButton>
      </div>
    </div>
  );
};

const KeyButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  baseClassName: string;
}> = ({ children, onClick, className, baseClassName }) => (
  <button
    type="button"
    onClick={onClick}
    className={twMerge(
      "flex h-16 w-16 items-center justify-center rounded-full text-2xl font-medium transition-all duration-100 active:scale-95 focus:outline-none select-none",
      baseClassName,
      className,
    )}>
    {children}
  </button>
);
