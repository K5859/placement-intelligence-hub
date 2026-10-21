import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import App from "@/App";
import { SEED_COMPANIES } from "@/data/seedCompanies";
import {
  normalizeCompanySummary,
  normalizeCompanyProfile,
  normalizeDashboardSkills,
  proficiencyToBloom,
  scoreToCriticality,
} from "@/lib/companyData";
import { buildIntelligenceSections } from "@/data/intelligenceData";
import { getTopicsForSkill } from "@/data/skillTopics";

describe("JSSATE Placement Intelligence Hub - Smoke Test Suite", () => {
  it("loads seed companies and verifies Accenture presence", () => {
    expect(SEED_COMPANIES.length).toBeGreaterThan(0);
    const company = SEED_COMPANIES[0];
    expect(company.short_json.name).toBe("Accenture plc");
    expect(company.short_json.short_name).toBe("Accenture");
    expect(company.short_json.company_type).toBe("Dream");
  });

  it("normalizes company data accurately for Phase 1 seed and Phase 2 Supabase handoff", () => {
    const company = SEED_COMPANIES[0];
    const summary = normalizeCompanySummary(company.short_json);
    expect(summary.name).toBe("Accenture plc");
    expect(summary.short_name).toBe("Accenture");

    const profile = normalizeCompanyProfile(company.full_json, company.short_json);
    expect(profile.name).toBe("Accenture plc");
    expect(profile.ceo_name).toBe("Julie Sweet");
    // Strictly verify no CTC / stipend fields
    expect((profile as any).ctc).toBeUndefined();
    expect((profile as any).stipend).toBeUndefined();
    expect((profile as any).selection_ratio).toBeUndefined();

    const skills = normalizeDashboardSkills(company.skill_levels);
    expect(skills.length).toBe(12);
    expect(skills[0].skill_set_name).toBe("Data Structures & Algorithms");
    expect(skills[0].bloom.code).toBe("EV"); // level 8 -> EV
  });

  it("builds all 22 intelligence sections in exact order", () => {
    const company = SEED_COMPANIES[0];
    const profile = normalizeCompanyProfile(company.full_json, company.short_json);
    const sections = buildIntelligenceSections(profile);

    expect(sections.length).toBe(22);
    expect(sections[0].title).toBe("Company Identity");
    expect(sections[1].title).toBe("Overview & Vision");
    expect(sections[2].title).toBe("Leadership");
    expect(sections[3].title).toBe("Funding & Financials");
    expect(sections[4].title).toBe("Global Presence");
    expect(sections[5].title).toBe("Products & Services");
    expect(sections[6].title).toBe("Technology Stack");
    expect(sections[7].title).toBe("Partnerships & Ecosystem");
    expect(sections[8].title).toBe("Competitive Landscape");
    expect(sections[9].title).toBe("Market Opportunity");
    expect(sections[10].title).toBe("Core Value Proposition & ESG");
    expect(sections[11].title).toBe("Culture & Work Life");
    expect(sections[12].title).toBe("Recent News & Milestones");
    expect(sections[13].title).toBe("Sales & Customer Metrics");
    expect(sections[14].title).toBe("Risk & Compliance");
    expect(sections[15].title).toBe("Work Location & Commute");
    expect(sections[16].title).toBe("Safety & Wellbeing");
    expect(sections[17].title).toBe("Career Growth & Learning");
    expect(sections[18].title).toBe("Brand & Reputation");
    expect(sections[19].title).toBe("Compensation & Benefits");
    expect(sections[20].title).toBe("Digital Presence & Ratings");
    expect(sections[21].title).toBe("Contact Information");
  });

  it("verifies 10-level roadmap exists for all 12 skills", () => {
    const company = SEED_COMPANIES[0];
    company.skill_levels.forEach((skill) => {
      const topics = getTopicsForSkill(skill.skill_set_id, skill.skill_set_name);
      expect(topics.length).toBe(10);
      expect(topics[0].level_number).toBe(1);
      expect(topics[9].level_number).toBe(10);
    });
  });

  it("renders portal Index page with heading and company card", async () => {
    render(<App />);
    expect(
      screen.getByText(
        "JSS Academy of Technical Education , Noida Companies Research & Placement Analytics Portal"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("JSSATE · INTELLIGENCE PLATFORM")
    ).toBeInTheDocument();
    const companyCard = await screen.findByText("Accenture plc");
    expect(companyCard).toBeInTheDocument();
  });
});
