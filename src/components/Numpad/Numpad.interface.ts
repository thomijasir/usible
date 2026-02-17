/**
 * Numpad component props for PIN/keypad entry
 *
 * @example
 * ```tsx
 * <Numpad
 *   theme="light"
 *   onKeyPress={(key) => handleKeyPress(key)}
 *   onBackspace={() => handleBackspace()}
 *   onBiometricAuth={() => handleBiometric()}
 * />
 * ```
 */
export interface NumpadProps {
  /** Color theme */
  theme?: "light" | "dark";
  /** Called when a number key is pressed */
  onKeyPress?: (key: string) => void;
  /** Called when backspace is pressed */
  onBackspace?: () => void;
  /** Called when biometric auth button is pressed (shows button if provided) */
  onBiometricAuth?: () => void;
  /** Additional CSS classes */
  class?: string;
}
