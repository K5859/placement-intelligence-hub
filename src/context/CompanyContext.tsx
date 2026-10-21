import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { CompanySummary, normalizeCompanySummary } from "@/lib/companyData";
import { SEED_COMPANIES } from "@/data/seedCompanies";

export interface StoredCompanyMeta {
  companyId: number;
  companyName: string;
  logoUrl: string;
}

const LOCAL_STORAGE_KEY = "selected-company";

interface CompanyContextType {
  selectedCompanyId: number | null;
  selectedCompanyName: string;
  selectedCompanyLogoUrl: string;
  // Legacy / convenience object for components
  selectedCompany: {
    company_id: number;
    short_json: Record<string, any>;
  } | null;
  companySummary: CompanySummary | null;
  selectCompany: (company: {
    company_id?: number;
    companyId?: number;
    short_json?: Record<string, any>;
    name?: string;
    logo_url?: string;
  }) => void;
  clearSelectedCompany: () => void;
  isInitialized: boolean;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);
  const [selectedCompanyName, setSelectedCompanyName] = useState<string>("");
  const [selectedCompanyLogoUrl, setSelectedCompanyLogoUrl] = useState<string>("");
  const [cachedShortJson, setCachedShortJson] = useState<Record<string, any> | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Restore from localStorage on startup
  useEffect(() => {
    try {
      const storedJson = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedJson) {
        const stored: StoredCompanyMeta = JSON.parse(storedJson);
        if (stored.companyId) {
          setSelectedCompanyId(stored.companyId);
          setSelectedCompanyName(stored.companyName || "");
          setSelectedCompanyLogoUrl(stored.logoUrl || "");

          // Check if matches seed fallback cache
          const seedMatch = SEED_COMPANIES.find((c) => c.company_id === stored.companyId);
          if (seedMatch) {
            setCachedShortJson(seedMatch.short_json);
          }
        }
      }
    } catch (e) {
      console.error("[CompanyContext] Failed to parse selected-company from localStorage", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const selectCompany = useCallback(
    (company: {
      company_id?: number;
      companyId?: number;
      short_json?: Record<string, any>;
      name?: string;
      logo_url?: string;
    }) => {
      const id = company.company_id || company.companyId || 1;
      const short = company.short_json || {};
      const name = short.name || company.name || "Enterprise";
      const logoUrl = short.logo_url || company.logo_url || "";

      setSelectedCompanyId(id);
      setSelectedCompanyName(name);
      setSelectedCompanyLogoUrl(logoUrl);
      setCachedShortJson(short);

      try {
        const meta: StoredCompanyMeta = {
          companyId: id,
          companyName: name,
          logoUrl: logoUrl,
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(meta));
      } catch (e) {
        console.error("[CompanyContext] Failed to save selected-company to localStorage", e);
      }
    },
    []
  );

  const clearSelectedCompany = useCallback(() => {
    setSelectedCompanyId(null);
    setSelectedCompanyName("");
    setSelectedCompanyLogoUrl("");
    setCachedShortJson(null);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.error("[CompanyContext] Failed to clear selected-company", e);
    }
  }, []);

  const selectedCompany = selectedCompanyId
    ? {
        company_id: selectedCompanyId,
        short_json: cachedShortJson || {
          name: selectedCompanyName,
          short_name: selectedCompanyName,
          logo_url: selectedCompanyLogoUrl,
        },
      }
    : null;

  const companySummary = selectedCompany
    ? normalizeCompanySummary(selectedCompany.short_json)
    : null;

  return (
    <CompanyContext.Provider
      value={{
        selectedCompanyId,
        selectedCompanyName,
        selectedCompanyLogoUrl,
        selectedCompany,
        companySummary,
        selectCompany,
        clearSelectedCompany,
        isInitialized,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export function useCompany(): CompanyContextType {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
}
