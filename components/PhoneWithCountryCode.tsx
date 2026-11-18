"use client";

import React from "react";

export const COUNTRY_CODES = [
  { code: "+92", label: "🇵🇰 +92 (PK)", placeholder: "300 1234567" },
  { code: "+971", label: "🇦🇪 +971 (UAE)", placeholder: "50 1234567" },
  { code: "+966", label: "🇸🇦 +966 (KSA)", placeholder: "50 1234567" },
  { code: "+44", label: "🇬🇧 +44 (UK)", placeholder: "7700 900077" },
  { code: "+1", label: "🇺🇸 +1 (US/CA)", placeholder: "555 1234567" },
  { code: "+974", label: "🇶🇦 +974 (QA)", placeholder: "3312 3456" },
  { code: "+968", label: "🇴🇲 +968 (OM)", placeholder: "9123 4567" },
  { code: "+973", label: "🇧🇭 +973 (BH)", placeholder: "3600 1234" },
  { code: "+965", label: "🇰🇼 +965 (KW)", placeholder: "5001 2345" },
];

interface PhoneWithCountryCodeProps {
  countryCode: string;
  onCountryCodeChange: (code: string) => void;
  phoneNumber: string;
  onPhoneNumberChange: (val: string) => void;
  required?: boolean;
  name?: string;
}

export default function PhoneWithCountryCode({
  countryCode,
  onCountryCodeChange,
  phoneNumber,
  onPhoneNumberChange,
  required = true,
  name = "phone",
}: PhoneWithCountryCodeProps) {
  const activeCountry =
    COUNTRY_CODES.find((c) => c.code === countryCode) || COUNTRY_CODES[0];

  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Sirf digits allow karein aur Pakistan (+92) ke shuru ka extra '0' khud hata dein
    let digits = e.target.value.replace(/\D/g, "");
    if (countryCode === "+92" && digits.startsWith("0")) {
      digits = digits.slice(1);
    }
    onPhoneNumberChange(digits.slice(0, 12));
  };

  return (
    <div className="flex items-stretch gap-2 w-full">
      <select
        aria-label="Country Code"
        value={countryCode}
        onChange={(e) => onCountryCodeChange(e.target.value)}
        className="bg-black border border-neutral-800 focus:border-red-600 rounded-xl px-2.5 py-2.5 text-xs font-mono font-bold text-amber-400 focus:outline-none shrink-0 cursor-pointer"
      >
        {COUNTRY_CODES.map((item) => (
          <option key={item.code} value={item.code} className="bg-neutral-950 text-white">
            {item.label}
          </option>
        ))}
      </select>

      <input
        type="tel"
        name={name}
        required={required}
        value={phoneNumber}
        onChange={handleNumberInput}
        placeholder={activeCountry.placeholder}
        className="w-full bg-black border border-neutral-800 focus:border-red-600 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none font-mono"
      />
    </div>
  );
}
