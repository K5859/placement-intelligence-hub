import "@testing-library/jest-dom";
import { configure } from "@testing-library/react";
import { vi } from "vitest";

// Increase default test timeout for async queries
configure({ asyncUtilTimeout: 4000 });

// JSDOM polyfills for layout and scrolling
if (typeof window !== "undefined") {
  window.scrollTo = window.scrollTo || (() => {});
  window.HTMLElement.prototype.scrollIntoView =
    window.HTMLElement.prototype.scrollIntoView || (() => {});
}

// Mock Supabase client during tests to prevent flaky network latency
vi.mock("@/lib/supabaseClient", () => ({
  isSupabaseConfigured: false,
  supabase: {
    from: () => ({
      select: () => ({
        order: () => Promise.resolve({ data: [], error: null }),
        eq: () => ({
          maybeSingle: () => Promise.resolve({ data: null, error: null }),
        }),
        in: () => ({
          order: () => Promise.resolve({ data: [], error: null }),
        }),
      }),
    }),
  },
}));
