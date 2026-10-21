import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CompanyProvider } from "@/context/CompanyContext";
import { Index } from "@/pages/Index";
import { AppLayout } from "@/components/layout/AppLayout";
import { CompanyIntelligence } from "@/pages/CompanyIntelligence";
import { SkillIntelligence } from "@/pages/SkillIntelligence";
import { NotFound } from "@/pages/NotFound";
import { SEED_COMPANIES } from "@/data/seedCompanies";

function renderWithRouter(initialEntry = "/") {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CompanyProvider>
          <MemoryRouter initialEntries={[initialEntry]}>
            <Routes>
              <Route path="/" element={<Index />} />

              <Route path="/company" element={<AppLayout />}>
                <Route index element={<Navigate to="intelligence" replace />} />
                <Route path="intelligence" element={<CompanyIntelligence />} />
                <Route path="skills" element={<SkillIntelligence />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </MemoryRouter>
        </CompanyProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

describe("Routing & Flow Verification Suite", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("visiting '/' shows company cards", async () => {
    renderWithRouter("/");
    await waitFor(() => {
      expect(screen.getByText("Accenture plc")).toBeInTheDocument();
      expect(screen.getAllByText("Dream").length).toBeGreaterThanOrEqual(1);
    });
  });

  it("clicking Accenture card persists to localStorage and navigates to /company/intelligence", async () => {
    renderWithRouter("/");
    const cardTitle = await screen.findByText("Accenture plc");
    fireEvent.click(cardTitle);

    await waitFor(() => {
      const stored = localStorage.getItem("selected-company");
      expect(stored).not.toBeNull();
      const parsed = JSON.parse(stored!);
      expect(parsed.companyId).toBe(1);
      expect(parsed.companyName).toBe("Accenture plc");
    });
  });

  it("restores company data from localStorage on /company/intelligence after reload", async () => {
    // Simulate previous selection in localStorage
    localStorage.setItem(
      "selected-company",
      JSON.stringify({
        companyId: 1,
        companyName: "Accenture plc",
        logoUrl: "https://www.accenture.com/_acnmedia/Accenture/Dev/RedesigNAcc_Logo_Black.svg",
      })
    );

    renderWithRouter("/company/intelligence");

    await waitFor(() => {
      // 22 sections header or company details
      expect(screen.getAllByText(/Accenture/).length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText(/Company Intelligence/).length).toBeGreaterThanOrEqual(1);
    });
  });

  it("restores company data from localStorage on /company/skills after reload", async () => {
    localStorage.setItem(
      "selected-company",
      JSON.stringify({
        companyId: 1,
        companyName: "Accenture plc",
        logoUrl: "https://www.accenture.com/_acnmedia/Accenture/Dev/RedesigNAcc_Logo_Black.svg",
      })
    );

    renderWithRouter("/company/skills");

    await waitFor(() => {
      expect(
        screen.getAllByText(/Skill Intelligence/).length
      ).toBeGreaterThanOrEqual(1);
    });
  });

  it("visiting /company redirects automatically to /company/intelligence", async () => {
    localStorage.setItem(
      "selected-company",
      JSON.stringify({
        companyId: 1,
        companyName: "Accenture plc",
        logoUrl: "",
      })
    );

    renderWithRouter("/company");

    await waitFor(() => {
      expect(screen.getAllByText(/Company Intelligence/).length).toBeGreaterThanOrEqual(1);
    });
  });

  it("redirects to '/' if selected-company is missing when visiting /company/intelligence", async () => {
    // localStorage is empty
    renderWithRouter("/company/intelligence");

    await waitFor(() => {
      // Should redirect to Index, NOT render NotFound
      expect(
        screen.getByText("JSSATE · INTELLIGENCE PLATFORM")
      ).toBeInTheDocument();
      expect(screen.queryByText("404 ERROR")).not.toBeInTheDocument();
    });
  });

  it("renders 404 NotFound only for invalid URLs", () => {
    renderWithRouter("/some-random-unknown-url-404");
    expect(screen.getByText("404 ERROR")).toBeInTheDocument();
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
  });

  it("guarantees no CTC, Stipend, or Selection Ratio is rendered in the UI", async () => {
    localStorage.setItem(
      "selected-company",
      JSON.stringify({
        companyId: 1,
        companyName: "Accenture plc",
        logoUrl: "",
      })
    );

    renderWithRouter("/company/intelligence");

    await waitFor(() => {
      expect(screen.getAllByText(/Accenture/).length).toBeGreaterThanOrEqual(1);
    });

    const bodyText = document.body.textContent || "";
    expect(bodyText).not.toMatch(/\bCTC\b/i);
    expect(bodyText).not.toMatch(/\bStipend\b/i);
    expect(bodyText).not.toMatch(/\bSelection Ratio\b/i);
  });
});
