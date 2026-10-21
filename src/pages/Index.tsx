import React, { useState, useMemo, useEffect, useRef } from "react";
import { Search, X, RotateCcw, Building2, AlertCircle } from "lucide-react";
import { useCompanies, CompanyCardItem } from "@/lib/companyApi";
import { CompanyCard } from "@/components/CompanyCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const COLLEGE_NAME = "JSS Academy of Technical Education , Noida";
const COLLEGE_SHORT = "JSSATE";

type FilterTier = "All" | "Super Dream" | "Dream" | "Standard" | "Regular";

export const Index: React.FC = () => {
  const { data: companies = [], isLoading, isError, refetch } = useCompanies();

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState<FilterTier>("All");
  const [isSearching, setIsSearching] = useState(false);

  const isFirstMount = useRef(true);

  // 200ms debounce on search input change
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setIsSearching(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Compute live tier counts from database rows
  const counts = useMemo(() => {
    const res: Record<FilterTier, number> = {
      All: companies.length,
      "Super Dream": 0,
      Dream: 0,
      Standard: 0,
      Regular: 0,
    };

    companies.forEach((comp) => {
      const tier = comp.short_json.company_type as FilterTier;
      if (res[tier] !== undefined) {
        res[tier]++;
      }
    });

    return res;
  }, [companies]);

  // Filter companies by search query and selected tier
  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const short = company.short_json;
      const matchesTier =
        selectedTier === "All" ||
        short.company_type?.toLowerCase() === selectedTier.toLowerCase();

      if (!matchesTier) return false;

      if (!debouncedQuery.trim()) return true;

      const q = debouncedQuery.toLowerCase().trim();
      const nameMatch = short.name?.toLowerCase().includes(q);
      const shortNameMatch = short.short_name?.toLowerCase().includes(q);
      const categoryMatch = short.category?.toLowerCase().includes(q);
      const hqMatch = short.headquarters_address?.toLowerCase().includes(q);
      const locationsMatch = short.office_locations?.toLowerCase().includes(q);

      return nameMatch || shortNameMatch || categoryMatch || hqMatch || locationsMatch;
    });
  }, [companies, debouncedQuery, selectedTier]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setDebouncedQuery("");
    setSelectedTier("All");
  };

  const filterTabs: { label: FilterTier; hex: string; activeClasses: string }[] = [
    {
      label: "All",
      hex: "#2563eb",
      activeClasses: "bg-slate-900 text-white border-slate-900",
    },
    {
      label: "Super Dream",
      hex: "#7c3aed",
      activeClasses: "bg-[#7c3aed] text-white border-[#7c3aed]",
    },
    {
      label: "Dream",
      hex: "#2563eb",
      activeClasses: "bg-[#2563eb] text-white border-[#2563eb]",
    },
    {
      label: "Standard",
      hex: "#16a34a",
      activeClasses: "bg-[#16a34a] text-white border-[#16a34a]",
    },
    {
      label: "Regular",
      hex: "#d97706",
      activeClasses: "bg-[#d97706] text-white border-[#d97706]",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-body">
      {/* Hero Section: Enterprise Clean White, Bottom Border, No Gradient, No College Logo */}
      <section className="border-b border-[#E5E7EB] bg-white py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            {/* Short Tag Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/70 px-3.5 py-1 text-xs font-semibold text-blue-700 shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <span>{COLLEGE_SHORT} · INTELLIGENCE PLATFORM</span>
            </div>

            {/* H1 Heading */}
            <h1 className="mt-4 max-w-4xl font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {COLLEGE_NAME} Companies Research & Placement Analytics Portal
            </h1>

            {/* Small Descriptive Subtitle */}
            <p className="mt-3 max-w-2xl text-sm font-normal text-slate-600 sm:text-base">
              Your strategic edge for campus placements
            </p>

            {/* Search Bar Directly Below */}
            <div className="mt-7 w-full max-w-xl">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by company name, technology, category, or location..."
                  className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-10 text-sm placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 shadow-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Pills with Live Counts */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex flex-wrap items-center gap-2">
            {filterTabs.map((tab) => {
              const isSelected = selectedTier === tab.label;
              const count = counts[tab.label] || 0;

              return (
                <button
                  key={tab.label}
                  onClick={() => setSelectedTier(tab.label)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all shadow-2xs",
                    isSelected
                      ? tab.activeClasses
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                  )}
                >
                  <span>{tab.label}</span>
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.2 text-[10px] font-bold",
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-600"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-xs font-medium text-slate-500">
            Showing <span className="font-semibold text-slate-900">{filteredCompanies.length}</span>{" "}
            {filteredCompanies.length === 1 ? "organization" : "organizations"}
          </div>
        </div>

        {/* Company Cards Grid / Loading / Error State */}
        <div className="mt-6">
          {isLoading || isSearching ? (
            /* 8-Card Skeleton */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-11 w-11 rounded-xl" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <div className="space-y-2 pt-2">
                    <Skeleton className="h-3.5 w-full" />
                    <Skeleton className="h-3.5 w-4/5" />
                    <Skeleton className="h-3.5 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50/40 py-12 px-4 text-center">
              <AlertCircle className="h-8 w-8 text-red-600 mb-2" />
              <h3 className="font-heading text-base font-bold text-slate-900">
                Failed to load organizations from database
              </h3>
              <p className="mt-1 max-w-sm text-xs text-slate-600">
                Please verify your Supabase credentials in .env and database connection.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                className="mt-4 gap-1.5"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Retry Connection
              </Button>
            </div>
          ) : filteredCompanies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredCompanies.map((company) => (
                <CompanyCard key={company.company_id} company={company} />
              ))}
            </div>
          ) : (
            /* Empty State with Reset CTA */
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 py-16 px-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-3">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-base font-semibold text-slate-900">
                No matching companies found
              </h3>
              <p className="mt-1 max-w-sm text-xs text-slate-500">
                We couldn't find any enterprise matching "{searchQuery}" under the "{selectedTier}" tier filter.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetFilters}
                className="mt-4 inline-flex items-center gap-1.5"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
