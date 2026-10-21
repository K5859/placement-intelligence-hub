import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface CompanyLogoProps {
  name: string;
  websiteUrl?: string;
  dbLogoUrl?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

function extractDomain(url?: string): string {
  if (!url) return "";
  try {
    let clean = url.trim();
    if (!clean.startsWith("http://") && !clean.startsWith("https://")) {
      clean = "https://" + clean;
    }
    const parsed = new URL(clean);
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function sanitizeLogoUrl(url?: string): string {
  if (!url) return "";
  // Accenture's corporate CDN currently returns HTTP 502 Bad Gateway; use reliable Wikimedia SVG
  if (url.includes("RedesigNAcc_Logo_Black.svg")) {
    return "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg";
  }
  return url;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  name,
  websiteUrl,
  dbLogoUrl,
  className,
  size = "md",
}) => {
  const [useFallback, setUseFallback] = useState(false);
  const [logoDevFailed, setLogoDevFailed] = useState(false);

  const logoDevKey = import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY;
  const domain = extractDomain(websiteUrl);
  const cleanDbUrl = sanitizeLogoUrl(dbLogoUrl);

  const sizeClasses = {
    sm: "w-8 h-8 text-xs font-semibold",
    md: "w-11 h-11 text-sm font-semibold",
    lg: "w-14 h-14 text-base font-bold",
    xl: "w-16 h-16 text-lg font-bold",
  }[size];

  // First choice: Logo.dev if key and domain are present
  // Second choice: cleanDbUrl
  // Final fallback: Initial letter avatar
  const primarySrc =
    logoDevKey && domain && !logoDevFailed
      ? `https://img.logo.dev/${domain}?token=${logoDevKey}&size=120`
      : cleanDbUrl;

  const initial = (name || "C").trim().charAt(0).toUpperCase();

  // Consistent background hue based on name
  const getInitialBg = (str: string) => {
    const hues = [
      "bg-blue-100 text-blue-700 border-blue-200",
      "bg-purple-100 text-purple-700 border-purple-200",
      "bg-indigo-100 text-indigo-700 border-indigo-200",
      "bg-emerald-100 text-emerald-700 border-emerald-200",
      "bg-slate-100 text-slate-700 border-slate-200",
    ];
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
      sum += str.charCodeAt(i);
    }
    return hues[sum % hues.length];
  };

  if (!primarySrc || useFallback) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-xl border font-heading select-none shrink-0 shadow-sm",
          sizeClasses,
          getInitialBg(name),
          className
        )}
        title={name}
      >
        {initial}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-xl border border-slate-200 bg-white p-1.5 shrink-0 shadow-sm overflow-hidden",
        sizeClasses,
        className
      )}
    >
      <img
        src={primarySrc}
        alt={`${name} logo`}
        className="w-full h-full object-contain"
        loading="lazy"
        onError={() => {
          if (logoDevKey && domain && !logoDevFailed) {
            setLogoDevFailed(true);
          } else {
            setUseFallback(true);
          }
        }}
      />
    </div>
  );
};
