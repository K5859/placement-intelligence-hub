import React from "react";
import { Outlet, useLocation, Link, Navigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useCompany } from "@/context/CompanyContext";

export const AppLayout: React.FC = () => {
  const { selectedCompany, companySummary, isInitialized } = useCompany();
  const location = useLocation();

  // Route Guard: Wait until localStorage has been checked on startup
  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-3 border-blue-600 border-t-transparent" />
          <p className="font-heading text-xs font-medium text-slate-500">
            Loading company intelligence...
          </p>
        </div>
      </div>
    );
  }

  // If no company is selected, redirect to "/" (Never render NotFound for missing company)
  if (!selectedCompany) {
    return <Navigate to="/" replace />;
  }

  const isSkillsPage = location.pathname.includes("/skills");
  const currentPageTitle = isSkillsPage ? "Skill Intelligence" : "Company Intelligence";
  const companyDisplayName = companySummary?.short_name || selectedCompany.short_json.name;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full min-w-0 bg-white font-body">
        <AppSidebar />
        <div className="flex flex-1 flex-col min-w-0 bg-white">
          {/* Top Header */}
          <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[#E5E7EB] bg-white/95 px-4 backdrop-blur-md sm:px-6">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Companies</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <span className="font-medium text-slate-700">
                      {companyDisplayName}
                    </span>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{currentPageTitle}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden items-center rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-semibold text-slate-600 sm:inline-flex">
                JSSATE · Placement Hub
              </span>
            </div>
          </header>

          {/* Main Workspace with Outlet */}
          <main className="flex-1 bg-white p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
