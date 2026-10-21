import React, { useState, useEffect, useRef, useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ExternalLink,
  Globe,
  Linkedin,
  Star,
  PlayCircle,
  RotateCcw,
  AlertCircle,
} from "lucide-react";
import { useCompany } from "@/context/CompanyContext";
import { useCompanyProfile } from "@/lib/companyApi";
import { CompanyLogo } from "@/components/CompanyLogo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  buildIntelligenceSections,
  IntelligenceSection,
  IntelligenceField,
} from "@/data/intelligenceData";
import { isNullish, splitItems } from "@/lib/companyData";
import { cn } from "@/lib/utils";

// Field value renderer
export function renderFieldValue(field: IntelligenceField) {
  const { value, type } = field;

  if (isNullish(value)) {
    return (
      <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-400">
        Not Available
      </span>
    );
  }

  const str = String(value).trim();

  // Explicit URL or inferred website/linkedin
  if (type === "url" || str.startsWith("http://") || str.startsWith("https://")) {
    if (type === "video" || str.includes("youtube.com") || str.includes("vimeo.com")) {
      return (
        <a
          href={str}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50/70 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 transition-colors"
        >
          <PlayCircle className="h-4 w-4 shrink-0 text-red-600" />
          <span>Watch Corporate Channel / Video</span>
          <ExternalLink className="h-3 w-3 shrink-0 opacity-70" />
        </a>
      );
    }

    return (
      <a
        href={str}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 font-medium text-blue-600 hover:text-blue-800 hover:underline break-all text-xs sm:text-sm"
      >
        <span>{str}</span>
        <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-80" />
      </a>
    );
  }

  if (type === "video") {
    return (
      <a
        href={str}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 transition-colors"
      >
        <PlayCircle className="h-4 w-4 shrink-0 text-red-600" />
        <span>{str}</span>
      </a>
    );
  }

  if (type === "rating") {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800">
        <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
        <span>{str}</span>
      </div>
    );
  }

  if (type === "paragraph") {
    return (
      <p className="text-xs sm:text-sm leading-relaxed text-slate-700 whitespace-pre-line">
        {str}
      </p>
    );
  }

  // List or multi-item detection on ; or multiple items
  if (type === "list" || str.includes(";")) {
    const items = splitItems(str);
    if (items.length > 1) {
      return (
        <div className="flex flex-wrap gap-1.5">
          {items.map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 shadow-2xs hover:bg-slate-100 transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      );
    }
  }

  return (
    <span className="text-xs sm:text-sm font-medium text-slate-800">
      {str}
    </span>
  );
}

// Memoized field row component
const FieldRow = memo<{ field: IntelligenceField }>(({ field }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start border-b border-slate-100 py-3 last:border-b-0 gap-1.5 sm:gap-4">
      <div className="sm:w-1/3 shrink-0 text-xs font-medium text-slate-500">
        {field.label}
      </div>
      <div className="sm:w-2/3 flex-1">
        {renderFieldValue(field)}
      </div>
    </div>
  );
});
FieldRow.displayName = "FieldRow";

// Memoized Section Card
const SectionCard = memo<{
  section: IntelligenceSection;
  sectionRef: (el: HTMLDivElement | null) => void;
}>(({ section, sectionRef }) => {
  const Icon = section.icon;

  // Compute filled fields count
  const filledCount = section.fields.filter((f) => !isNullish(f.value)).length;
  const totalCount = section.fields.length;

  return (
    <div
      id={section.id}
      ref={sectionRef}
      className="scroll-mt-36 rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
            <Icon className="h-4.5 w-4.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-600">
                0{section.number}.
              </span>
              <h2 className="font-heading text-base sm:text-lg font-bold text-slate-900">
                {section.title}
              </h2>
            </div>
          </div>
        </div>

        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
          {filledCount}/{totalCount} metrics
        </span>
      </div>

      {/* Field Rows */}
      <div className="divide-y divide-slate-100">
        {section.fields.map((field) => (
          <FieldRow key={field.key} field={field} />
        ))}
      </div>
    </div>
  );
});
SectionCard.displayName = "SectionCard";

export const CompanyIntelligence: React.FC = () => {
  const { selectedCompanyId, selectedCompany, isInitialized } = useCompany();
  const navigate = useNavigate();

  // Route Guard: If missing selected company after init, navigate to "/"
  useEffect(() => {
    if (isInitialized && !selectedCompanyId && !selectedCompany) {
      navigate("/", { replace: true });
    }
  }, [isInitialized, selectedCompanyId, selectedCompany, navigate]);

  // Phase 2: Fetch company full detail from public.company_json via React Query hook
  const effectiveId = selectedCompanyId || selectedCompany?.company_id || 1;
  const { data: detailData, isLoading, isError, refetch } = useCompanyProfile(effectiveId);

  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const isScrollingRef = useRef(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tabButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const profile = detailData?.profile;
  const short = detailData?.short_json || selectedCompany?.short_json || {};

  const sections = useMemo(() => {
    return buildIntelligenceSections(profile || {});
  }, [profile]);

  // Scroll spy implementation
  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const offsetTop = 220;
      let currentIdx = 0;

      for (let i = 0; i < sections.length; i++) {
        const el = sectionRefs.current[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offsetTop) {
            currentIdx = i;
          }
        }
      }

      setActiveTabIdx(currentIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  // Auto-center active tab button horizontally
  useEffect(() => {
    const activeBtn = tabButtonRefs.current[activeTabIdx];
    if (activeBtn && typeof activeBtn.scrollIntoView === "function") {
      activeBtn.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeTabIdx]);

  const scrollToSection = (idx: number) => {
    setActiveTabIdx(idx);
    isScrollingRef.current = true;

    const el = sectionRefs.current[idx];
    if (el) {
      const topOffset = 180;
      const elementPosition = el.getBoundingClientRect().top;
      const currentScroll = window.scrollY ?? window.pageYOffset ?? 0;
      const offsetPosition = Math.max(0, elementPosition + currentScroll - topOffset);

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 600);
  };

  if (!isInitialized) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-16 w-full rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Top Info Bar Skeleton */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        </div>

        {/* Section Skeletons */}
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <Skeleton className="h-6 w-48" />
              <div className="space-y-3 pt-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50/40 py-16 px-4 text-center">
        <AlertCircle className="h-10 w-10 text-red-600 mb-3" />
        <h2 className="font-heading text-lg font-bold text-slate-900">
          Unable to Load Company Intelligence
        </h2>
        <p className="mt-1 max-w-md text-xs sm:text-sm text-slate-600">
          Failed to fetch full intelligence record from Supabase table <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-red-200">company_json</code>.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          className="mt-5 gap-1.5 shadow-xs"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Retry Request
        </Button>
      </div>
    );
  }

  const websiteUrl = profile?.website_url || short.website_url;
  const linkedinUrl = profile?.linkedin_url;

  return (
    <div className="space-y-6">
      {/* Sticky Top Information Bar:
          Left: Company logo, Company name, Industry badge
          Right: Website button, LinkedIn button
          No hero section. No gradient background.
      */}
      <div className="sticky top-14 z-20 -mx-4 -mt-4 border-b border-[#E5E7EB] bg-white/95 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:-mt-6 sm:px-6 lg:-mx-8 lg:-mt-8 lg:px-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Left Details */}
          <div className="flex items-center gap-3.5">
            <CompanyLogo
              name={short.name || "Company"}
              websiteUrl={short.website_url}
              dbLogoUrl={short.logo_url}
              size="md"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-slate-900">
                  {short.name || "Company"}
                </h1>
                <Badge variant="dream">
                  {short.company_type || "Dream"}
                </Badge>
                <Badge variant="outline" className="hidden sm:inline-flex">
                  {short.category || "Enterprise"}
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {short.headquarters_address || "Global Organization"} · {short.employee_size || "Enterprise"}
              </p>
            </div>
          </div>

          {/* Right Buttons */}
          <div className="flex items-center gap-2">
            {websiteUrl && (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="gap-1.5 text-xs font-semibold"
              >
                <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-3.5 w-3.5 text-slate-500" />
                  <span>Website</span>
                  <ExternalLink className="h-3 w-3 text-slate-400" />
                </a>
              </Button>
            )}

            {linkedinUrl && (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="gap-1.5 text-xs font-semibold"
              >
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-3.5 w-3.5 text-[#0A66C2]" />
                  <span>LinkedIn</span>
                  <ExternalLink className="h-3 w-3 text-slate-400" />
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Sticky Tab Bar (22 Tabs) */}
        <div className="mt-3 -mb-1 flex items-center overflow-x-auto border-t border-slate-100 pt-2 no-scrollbar">
          <div className="flex gap-1.5 pb-1">
            {sections.map((sec, idx) => {
              const isActive = activeTabIdx === idx;
              return (
                <button
                  key={sec.id}
                  ref={(el) => (tabButtonRefs.current[idx] = el)}
                  onClick={() => scrollToSection(idx)}
                  className={cn(
                    "whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all select-none shrink-0",
                    isActive
                      ? "bg-blue-600 text-white font-semibold shadow-xs"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <span className="opacity-75 mr-1 font-mono">{idx + 1}.</span>
                  {sec.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sections Container */}
      <div className="space-y-6 pt-2">
        {sections.map((section, idx) => (
          <SectionCard
            key={section.id}
            section={section}
            sectionRef={(el) => (sectionRefs.current[idx] = el)}
          />
        ))}
      </div>
    </div>
  );
};
