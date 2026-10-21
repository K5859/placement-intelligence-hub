import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { CompanyProvider } from "@/context/CompanyContext";
import { Index } from "@/pages/Index";
import { AppLayout } from "@/components/layout/AppLayout";
import { CompanyIntelligence } from "@/pages/CompanyIntelligence";
import { SkillIntelligence } from "@/pages/SkillIntelligence";
import { NotFound } from "@/pages/NotFound";

// QueryClient configuration as specified:
// staleTime 5min (300000ms), gcTime 10min (600000ms), retry 1, refetchOnWindowFocus false
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

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <CompanyProvider>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Suspense
              fallback={
                <div className="flex min-h-screen items-center justify-center bg-white">
                  <div className="h-8 w-8 animate-spin rounded-full border-3 border-blue-600 border-t-transparent" />
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Index />} />

                <Route path="/company" element={<AppLayout />}>
                  <Route index element={<Navigate to="intelligence" replace />} />
                  <Route path="intelligence" element={<CompanyIntelligence />} />
                  <Route path="skills" element={<SkillIntelligence />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CompanyProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
