/**
 * Props for the Numpad component.
 */
export interface NumpadProps {
  /**
   * Theme of the numpad.
   * - "light": Light-themed numpad.
   * - "dark": Dark-themed numpad.
   * @default "light"
   */
  theme?: "light" | "dark";

  /**
   * Callback function triggered when a number key (0-9) is pressed.
   * @param key The string representation of the pressed key.
   */
  onKeyPress?: (key: string) => void;

  /**
   * Callback function triggered when the backspace key is pressed.
   */
  onBackspace?: () => void;

  /**
   * Callback function triggered when the biometric/fingerprint key is pressed.
   */
  onBiometricAuth?: () => void;
}
