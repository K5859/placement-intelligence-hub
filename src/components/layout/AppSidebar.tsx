import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Building2,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Briefcase,
  X,
} from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { useCompany } from "@/context/CompanyContext";
import { CompanyLogo } from "@/components/CompanyLogo";
import { cn } from "@/lib/utils";

export const AppSidebar: React.FC = () => {
  const { open, openMobile, setOpenMobile, isMobile } = useSidebar();
  const { selectedCompany, companySummary } = useCompany();

  const navItems = [
    {
      title: "Company Intelligence",
      href: "/company/intelligence",
      icon: Building2,
      description: "22 deep corporate intelligence dimensions",
    },
    {
      title: "Skill Intelligence",
      href: "/company/skills",
      icon: Sparkles,
      description: "Bloom's taxonomy & 10-level skill ladders",
    },
  ];

  const sidebarContent = (
    <aside
      className={cn(
        "flex flex-col justify-between border-r border-[#E5E7EB] bg-[#F8FAFC] text-[#334155] transition-all duration-300 select-none",
        isMobile
          ? "h-full w-72"
          : open
          ? "sticky top-0 h-screen w-64 shrink-0 overflow-y-auto"
          : "sticky top-0 h-screen w-20 shrink-0 overflow-y-auto"
      )}
    >
      {/* Top Header / Wordmark (NO college logo asset!) */}
      <div>
        <div className="flex h-16 items-center justify-between border-b border-[#E5E7EB] px-4">
          <Link
            to="/"
            className="flex items-center gap-2.5 overflow-hidden group"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white font-heading font-bold text-base shadow-sm group-hover:bg-blue-700 transition-colors">
              J
            </div>
            {(open || isMobile) && (
              <div className="flex flex-col truncate">
                <span className="font-heading font-bold text-sm tracking-tight text-slate-900 leading-tight">
                  JSSATE Noida
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">
                  Intelligence Hub
                </span>
              </div>
            )}
          </Link>
          {isMobile && (
            <button
              onClick={() => setOpenMobile(false)}
              className="rounded-lg p-1 text-slate-500 hover:bg-slate-200"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Selected Company Banner / Badge */}
        {selectedCompany && (
          <div className="border-b border-[#E5E7EB] p-3">
            <div
              className={cn(
                "flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white p-2.5 shadow-xs transition-all",
                !open && !isMobile && "justify-center p-1.5"
              )}
            >
              <CompanyLogo
                name={companySummary?.name || selectedCompany.short_json.name}
                websiteUrl={companySummary?.website_url || selectedCompany.short_json.website_url}
                dbLogoUrl={companySummary?.logo_url || selectedCompany.short_json.logo_url}
                size={!open && !isMobile ? "sm" : "sm"}
              />
              {(open || isMobile) && (
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate font-heading text-xs font-bold text-slate-900">
                      {companySummary?.short_name || selectedCompany.short_json.short_name}
                    </p>
                    <span className="inline-flex items-center rounded-sm bg-blue-50 px-1 py-0.2 text-[9px] font-semibold text-blue-700 border border-blue-200">
                      {companySummary?.company_type || selectedCompany.short_json.company_type}
                    </span>
                  </div>
                  <p className="truncate text-[11px] text-slate-500">
                    {companySummary?.category || selectedCompany.short_json.category}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <div className="px-3 py-4">
          {(open || isMobile) && (
            <div className="px-2 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              Analytics Views
            </div>
          )}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => isMobile && setOpenMobile(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all group relative",
                      isActive
                        ? "bg-[#EFF6FF] text-[#2563EB] font-semibold shadow-2xs"
                        : "text-[#334155] hover:bg-slate-100 hover:text-slate-900",
                      !open && !isMobile && "justify-center px-2 py-3"
                    )
                  }
                  title={!open && !isMobile ? item.title : undefined}
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={cn(
                          "h-5 w-5 shrink-0 transition-colors",
                          isActive
                            ? "text-[#2563EB]"
                            : "text-slate-500 group-hover:text-slate-700"
                        )}
                      />
                      {(open || isMobile) && (
                        <div className="flex flex-1 items-center justify-between">
                          <span className="truncate">{item.title}</span>
                          {isActive && (
                            <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
                          )}
                        </div>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer: "All Companies" (NO user profile, NO logout) */}
      <div className="border-t border-[#E5E7EB] p-3">
        <Link
          to="/"
          onClick={() => isMobile && setOpenMobile(false)}
          className={cn(
            "flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-2xs",
            !open && !isMobile && "justify-center px-2"
          )}
          title="Back to All Companies"
        >
          <ArrowLeft className="h-4 w-4 shrink-0 text-slate-500" />
          {(open || isMobile) && (
            <span className="font-heading font-semibold text-slate-700">
              All Companies
            </span>
          )}
        </Link>
      </div>
    </aside>
  );

  if (isMobile) {
    if (!openMobile) return null;
    return (
      <div className="fixed inset-0 z-50 flex">
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
          onClick={() => setOpenMobile(false)}
        />
        <div className="relative z-50 flex flex-col">{sidebarContent}</div>
      </div>
    );
  }

  return sidebarContent;
};
