import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Users,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Building,
} from "lucide-react";
import { CompanyLogo } from "@/components/CompanyLogo";
import { Badge } from "@/components/ui/badge";
import { SeedCompany } from "@/data/seedCompanies";
import { useCompany } from "@/context/CompanyContext";
import { isNullish } from "@/lib/companyData";
import { cn } from "@/lib/utils";

export interface CompanyCardProps {
  company: {
    company_id: number;
    short_json: Record<string, any>;
  };
}

export const CompanyCard = memo<CompanyCardProps>(({ company }) => {
  const navigate = useNavigate();
  const { selectCompany } = useCompany();

  const short = company.short_json;
  const companyType = short.company_type || "Dream";

  const isNegativeGrowth =
    typeof short.yoy_growth_rate === "string" &&
    short.yoy_growth_rate.trim().startsWith("-");

  const getCompanyTypeBadgeVariant = (type: string) => {
    switch (type.toLowerCase()) {
      case "super dream":
        return "superDream";
      case "dream":
        return "dream";
      case "standard":
        return "standard";
      case "regular":
        return "regular";
      default:
        return "secondary";
    }
  };

  const renderTextOrFallback = (val: any) => {
    if (isNullish(val)) {
      return <span className="italic text-slate-400">not publicly available</span>;
    }
    return String(val);
  };

  const handleCardClick = () => {
    // 1. Save selected-company to localStorage & 2. Update CompanyContext
    selectCompany(company);
    // 3. Navigate to /company/intelligence
    navigate("/company/intelligence");
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-blue-400 hover:shadow-md cursor-pointer select-none"
    >
      <div>
        {/* Top Header: Logo + Badge */}
        <div className="flex items-start justify-between gap-3">
          <CompanyLogo
            name={short.name}
            websiteUrl={short.website_url}
            dbLogoUrl={short.logo_url}
            size="md"
          />
          <Badge variant={getCompanyTypeBadgeVariant(companyType)}>
            {companyType}
          </Badge>
        </div>

        {/* Company Title & Category */}
        <div className="mt-3.5">
          <h3 className="font-heading text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {short.name}
          </h3>
          <p className="text-xs font-medium text-slate-500 line-clamp-1 mt-0.5">
            {short.category || "Enterprise"}
          </p>
        </div>

        {/* Key Metrics / Highlights */}
        <div className="mt-4 space-y-2 border-t border-slate-100 pt-3 text-xs text-slate-600">
          {/* Headquarters */}
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span className="truncate">
              {renderTextOrFallback(short.headquarters_address)}
            </span>
          </div>

          {/* Headcount */}
          <div className="flex items-center gap-2">
            <Users className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span className="truncate">
              {renderTextOrFallback(short.employee_size)}
            </span>
          </div>

          {/* YoY Growth */}
          <div className="flex items-center gap-2">
            {isNegativeGrowth ? (
              <TrendingDown className="h-3.5 w-3.5 shrink-0 text-red-500" />
            ) : (
              <TrendingUp className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
            )}
            <span
              className={cn(
                "font-medium",
                isNegativeGrowth ? "text-red-600" : "text-emerald-700"
              )}
            >
              YoY Growth: {renderTextOrFallback(short.yoy_growth_rate)}
            </span>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3">
        <span className="text-[11px] font-semibold text-slate-500 group-hover:text-blue-600 transition-colors">
          View Corporate Intelligence
        </span>
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-50 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </div>
  );
});

CompanyCard.displayName = "CompanyCard";
