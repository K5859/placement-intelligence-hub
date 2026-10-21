import { useQuery } from "@tanstack/react-query";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import {
  CompanySummary,
  CompanyProfile,
  DashboardSkill,
  normalizeCompanySummary,
  normalizeCompanyProfile,
  normalizeDashboardSkills,
} from "@/lib/companyData";
import { SEED_COMPANIES, SeedCompany } from "@/data/seedCompanies";
import { SKILL_TOPICS_MAP, SkillTopic, getTopicsForSkill } from "@/data/skillTopics";

export interface CompanyCardItem {
  company_id: number;
  short_json: Record<string, any>;
  summary: CompanySummary;
}

export interface CompanyDetailResult {
  company_id: number;
  short_json: Record<string, any>;
  full_json: Record<string, any>;
  profile: CompanyProfile;
  summary: CompanySummary;
}

export interface CompanySkillsResult {
  skills: DashboardSkill[];
  topicsMap: Record<number, SkillTopic[]>;
}

// -------------------------------------------------------------
// 1. useCompanies: Reads only from public.company_json
// -------------------------------------------------------------
export function useCompanies() {
  return useQuery<CompanyCardItem[]>({
    queryKey: ["companies"],
    queryFn: async () => {
      if (!isSupabaseConfigured) {
        // Documented fallback when .env is not yet populated
        return SEED_COMPANIES.map((item) => ({
          company_id: item.company_id,
          short_json: item.short_json,
          summary: normalizeCompanySummary(item.short_json),
        }));
      }

      // ONLY query public.company_json: company_id, short_json
      const { data, error } = await supabase
        .from("company_json")
        .select("company_id, short_json")
        .order("company_id", { ascending: true });

      if (error) {
        console.warn("[companyApi] Error fetching from company_json, falling back to seed data:", error.message);
        return SEED_COMPANIES.map((item) => ({
          company_id: item.company_id,
          short_json: item.short_json,
          summary: normalizeCompanySummary(item.short_json),
        }));
      }

      if (!data || data.length === 0) {
        return SEED_COMPANIES.map((item) => ({
          company_id: item.company_id,
          short_json: item.short_json,
          summary: normalizeCompanySummary(item.short_json),
        }));
      }

      return data.map((row: any) => ({
        company_id: row.company_id,
        short_json: row.short_json || {},
        summary: normalizeCompanySummary(row.short_json || {}),
      }));
    },
  });
}

// -------------------------------------------------------------
// 2. useCompanyProfile: Reads only from public.company_json WHERE company_id = id
// -------------------------------------------------------------
export function useCompanyProfile(companyId: number | null | undefined) {
  return useQuery<CompanyDetailResult | null>({
    queryKey: ["company_profile", companyId],
    enabled: Boolean(companyId),
    queryFn: async () => {
      if (!companyId) return null;

      if (!isSupabaseConfigured) {
        const seed =
          SEED_COMPANIES.find((c) => c.company_id === companyId) ||
          SEED_COMPANIES[0];
        return {
          company_id: seed.company_id,
          short_json: seed.short_json,
          full_json: seed.full_json,
          profile: normalizeCompanyProfile(seed.full_json, seed.short_json),
          summary: normalizeCompanySummary(seed.short_json),
        };
      }

      // ONLY query public.company_json: company_id, short_json, full_json
      const { data, error } = await supabase
        .from("company_json")
        .select("company_id, short_json, full_json")
        .eq("company_id", companyId)
        .maybeSingle();

      if (error) {
        console.warn(`[companyApi] Error fetching company ${companyId}, using fallback:`, error.message);
        const seed =
          SEED_COMPANIES.find((c) => c.company_id === companyId) ||
          SEED_COMPANIES[0];
        return {
          company_id: seed.company_id,
          short_json: seed.short_json,
          full_json: seed.full_json,
          profile: normalizeCompanyProfile(seed.full_json, seed.short_json),
          summary: normalizeCompanySummary(seed.short_json),
        };
      }

      if (!data) {
        throw new Error(`Company with ID ${companyId} not found.`);
      }

      return {
        company_id: data.company_id,
        short_json: data.short_json || {},
        full_json: data.full_json || {},
        profile: normalizeCompanyProfile(data.full_json || {}, data.short_json || {}),
        summary: normalizeCompanySummary(data.short_json || {}),
      };
    },
  });
}

// -------------------------------------------------------------
// 3. useCompanySkills: Reads ONLY the 4 permitted skill tables:
//    - company_skill_levels
//    - skill_set_master
//    - proficiency_levels
//    - skill_set_topics
// -------------------------------------------------------------
export function useCompanySkills(companyId: number | null | undefined) {
  return useQuery<CompanySkillsResult>({
    queryKey: ["company_skills", companyId],
    enabled: Boolean(companyId),
    queryFn: async () => {
      const fallbackResult: CompanySkillsResult = {
        skills: normalizeDashboardSkills(SEED_COMPANIES[0].skill_levels),
        topicsMap: SKILL_TOPICS_MAP,
      };

      if (!companyId) return fallbackResult;

      if (!isSupabaseConfigured) {
        const seed =
          SEED_COMPANIES.find((c) => c.company_id === companyId) ||
          SEED_COMPANIES[0];
        return {
          skills: normalizeDashboardSkills(seed.skill_levels),
          topicsMap: SKILL_TOPICS_MAP,
        };
      }

      try {
        // Query 1: company_skill_levels
        const { data: skillLevelsData, error: levelsError } = await supabase
          .from("company_skill_levels")
          .select("company_id, skill_set_id, required_level, required_proficiency_level_id")
          .eq("company_id", companyId);

        if (levelsError || !skillLevelsData || skillLevelsData.length === 0) {
          console.warn("[companyApi] No skill levels found in DB or error occurred, using fallback:", levelsError?.message);
          return fallbackResult;
        }

        // Query 2: skill_set_master
        const { data: masterData } = await supabase
          .from("skill_set_master")
          .select("skill_set_id, skill_set_name, short_name");

        const masterMap = new Map<number, string>();
        if (masterData) {
          masterData.forEach((m: any) => {
            masterMap.set(m.skill_set_id, m.skill_set_name || m.short_name);
          });
        }

        // Query 3: proficiency_levels
        const { data: profData } = await supabase
          .from("proficiency_levels")
          .select("proficiency_level_id, proficiency_name, proficiency_code");

        const profMap = new Map<number, string>();
        if (profData) {
          profData.forEach((p: any) => {
            profMap.set(p.proficiency_level_id, p.proficiency_name || p.proficiency_code);
          });
        }

        // Assemble raw skill levels compatible with normalizeDashboardSkills
        const rawSkillLevels = skillLevelsData.map((row: any) => ({
          skill_set_id: row.skill_set_id,
          skill_set_name: masterMap.get(row.skill_set_id) || `Skill ${row.skill_set_id}`,
          required_level: row.required_level,
          required_proficiency:
            profMap.get(row.required_proficiency_level_id) || "Proficient",
        }));

        const normalizedSkills = normalizeDashboardSkills(rawSkillLevels);

        // Query 4: skill_set_topics for 10-level roadmaps
        const skillIds = skillLevelsData.map((s: any) => s.skill_set_id);
        const { data: topicsData } = await supabase
          .from("skill_set_topics")
          .select("skill_set_id, level_number, topics")
          .in("skill_set_id", skillIds)
          .order("level_number", { ascending: true });

        const dynamicTopicsMap: Record<number, SkillTopic[]> = {};

        if (topicsData && topicsData.length > 0) {
          topicsData.forEach((t: any) => {
            const sid = t.skill_set_id;
            if (!dynamicTopicsMap[sid]) {
              dynamicTopicsMap[sid] = [];
            }
            dynamicTopicsMap[sid].push({
              level_number: t.level_number,
              topic: t.topics || `Level ${t.level_number} Milestone`,
            });
          });
        }

        // Ensure every skill has a 10-level roadmap
        normalizedSkills.forEach((skill) => {
          if (!dynamicTopicsMap[skill.skill_set_id] || dynamicTopicsMap[skill.skill_set_id].length === 0) {
            dynamicTopicsMap[skill.skill_set_id] = getTopicsForSkill(
              skill.skill_set_id,
              skill.skill_set_name
            );
          }
        });

        return {
          skills: normalizedSkills,
          topicsMap: dynamicTopicsMap,
        };
      } catch (e: any) {
        console.warn("[companyApi] Error querying skill tables, returning fallback:", e?.message);
        return fallbackResult;
      }
    },
  });
}
