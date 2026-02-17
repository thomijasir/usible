import React from "react";
import { useTranslation } from "react-i18next";
import { Select } from "~/components/Select";

interface LanguageOption {
  value: string;
  label: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { value: "en", label: "English", flag: "🇺🇸" },
  { value: "zh", label: "中文", flag: "🇨🇳" },
  { value: "ja", label: "日本語", flag: "🇯🇵" },
  { value: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { value: "th", label: "ไทย", flag: "🇹🇭" },
];

export interface LanguageSelectorProps {
  className?: string;
  onChange?: (language: string) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className,
  onChange,
}) => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const language = event.target.value;
    i18n.changeLanguage(language);
    if (onChange) {
      onChange(language);
    }
  };

  const options = languages.map((lang) => ({
    value: lang.value,
    label: `${lang.flag} ${lang.label}`,
  }));

  return (
    <Select
      value={i18n.language}
      onChange={handleLanguageChange}
      options={options}
      className={className}
      fullWidth
    />
  );
};
