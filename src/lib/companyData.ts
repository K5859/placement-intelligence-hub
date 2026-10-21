export interface CompanySummary {
  name: string;
  short_name: string;
  logo_url: string;
  category: string;
  company_type: "Super Dream" | "Dream" | "Standard" | "Regular" | string;
  incorporation_year: number;
  employee_size: string;
  headquarters_address: string;
  operating_countries: string;
  office_locations: string;
  yoy_growth_rate: string;
  website_url: string;
  raw: Record<string, any>;
}

export interface CompanyProfile {
  // Section 1: Company Identity
  name: string;
  short_name: string;
  category: string;
  company_type: string;
  incorporation_year: number | string;
  nature_of_company: string;
  logo_url: string;

  // Section 2: Overview & Vision
  overview_text: string;
  vision_statement: string;
  mission_statement: string;
  core_values: string;
  history_timeline: string;

  // Section 3: Leadership
  ceo_name: string;
  ceo_linkedin_url: string;
  key_leaders: string;
  board_members: string;
  contact_person_name: string;
  contact_person_title: string;
  contact_person_email: string;
  contact_person_phone: string;
  decision_maker_access: string;
  warm_intro_pathways: string;

  // Section 4: Funding & Financials
  annual_revenue: string;
  annual_profit: string;
  revenue_mix: string;
  valuation: string;
  yoy_growth_rate: string;
  profitability_status: string;
  key_investors: string;
  recent_funding_rounds: string;
  total_capital_raised: string;
  burn_rate: string;
  runway_months: string;
  burn_multiplier: string;

  // Section 5: Global Presence
  headquarters_address: string;
  operating_countries: string;
  office_count: string;
  office_locations: string;
  employee_size: string;

  // Section 6: Products & Services
  offerings_description: string;
  top_customers: string;
  focus_sectors: string;
  pain_points_addressed: string;
  product_pipeline: string;

  // Section 7: Technology Stack
  tech_stack: string;
  technology_partners: string;
  intellectual_property: string;
  r_and_d_investment: string;
  ai_ml_adoption_level: string;
  tech_adoption_rating: string;
  cybersecurity_posture: string;

  // Section 8: Partnerships & Ecosystem
  partnership_ecosystem: string;
  industry_associations: string;

  // Section 9: Competitive Landscape
  key_competitors: string;
  market_share_percentage: string;
  competitive_advantages: string;
  unique_differentiators: string;
  weaknesses_gaps: string;
  key_challenges_needs: string;
  benchmark_vs_peers: string;

  // Section 10: Market Opportunity
  tam: string;
  sam: string;
  som: string;
  future_projections: string;
  strategic_priorities: string;
  innovation_roadmap: string;

  // Section 11: Core Value Proposition & ESG
  core_value_proposition: string;
  esg_ratings: string;
  carbon_footprint: string;
  ethical_sourcing: string;
  sustainability_csr: string;

  // Section 12: Culture & Work Life
  work_culture_summary: string;
  psychological_safety: string;
  manager_quality: string;
  feedback_culture: string;
  diversity_metrics: string;
  diversity_inclusion_score: string;
  ethical_standards: string;
  burnout_risk: string;
  mission_clarity: string;
  crisis_behavior: string;

  // Section 13: Recent News & Milestones
  recent_news: string;
  case_studies: string;
  exit_strategy_history: string;

  // Section 14: Sales & Customer Metrics
  sales_motion: string;
  customer_concentration_risk: string;
  customer_acquisition_cost: string;
  customer_lifetime_value: string;
  cac_ltv_ratio: string;
  churn_rate: string;
  net_promoter_score: string;
  go_to_market_strategy: string;

  // Section 15: Risk & Compliance
  regulatory_status: string;
  legal_issues: string;
  supply_chain_dependencies: string;
  geopolitical_risks: string;
  macro_risks: string;

  // Section 16: Work Location & Commute
  remote_policy_details: string;
  typical_hours: string;
  overtime_expectations: string;
  weekend_work: string;
  flexibility_level: string;
  location_centrality: string;
  public_transport_access: string;
  cab_policy: string;
  airport_commute_time: string;
  office_zone_type: string;

  // Section 17: Safety & Wellbeing
  area_safety: string;
  safety_policies: string;
  infrastructure_safety: string;
  emergency_preparedness: string;
  health_support: string;

  // Section 18: Career Growth & Learning
  training_spend: string;
  onboarding_quality: string;
  learning_culture: string;
  exposure_quality: string;
  mentorship_availability: string;
  internal_mobility: string;
  promotion_clarity: string;
  tools_access: string;
  role_clarity: string;
  early_ownership: string;
  work_impact: string;
  execution_thinking_balance: string;
  automation_level: string;
  cross_functional_exposure: string;
  company_maturity: string;
  brand_value: string;
  client_quality: string;
  exit_opportunities: string;
  skill_relevance: string;
  external_recognition: string;
  network_strength: string;
  global_exposure: string;

  // Section 19: Brand & Reputation
  marketing_video_url: string;
  customer_testimonials: string;
  website_quality: string;
  website_rating: string;
  website_traffic_rank: string;
  social_media_followers: string;
  glassdoor_rating: string;
  indeed_rating: string;
  google_rating: string;
  awards_recognitions: string;
  brand_sentiment_score: string;
  event_participation: string;

  // Section 20: Compensation & Benefits (Note: strictly NO CTC/Stipend/Selection Ratio)
  leave_policy: string;
  fixed_vs_variable_pay: string;
  bonus_predictability: string;
  esops_incentives: string;
  family_health_insurance: string;
  relocation_support: string;
  lifestyle_benefits: string;
  hiring_velocity: string;
  employee_turnover: string;
  avg_retention_tenure: string;
  layoff_history: string;

  // Section 21: Digital Presence & Ratings
  website_url: string;
  linkedin_url: string;
  twitter_handle: string;
  facebook_url: string;
  instagram_url: string;

  // Section 22: Contact Information
  primary_contact_email: string;
  primary_phone_number: string;

  // Catch-all for extra dynamic fields
  [key: string]: any;
}

export interface DashboardSkill {
  skill_set_id: number;
  skill_set_name: string;
  required_level: number;
  required_proficiency: string;
  difficulty: "EXPERT" | "ADVANCED" | "PRO" | "BEGINNER";
  bloom: {
    code: "CU" | "AP" | "AS" | "EV" | "CR";
    label: string;
    color: string;
    bg: string;
    description: string;
  };
  criticality: {
    label: "Critical" | "Important" | "Baseline";
    color: string;
    badgeClass: string;
  };
}

// Helpers
export function asString(val: any): string {
  if (val === undefined || val === null) return "";
  return String(val).trim();
}

export function asRecord(val: any): Record<string, any> {
  if (typeof val === "object" && val !== null) {
    return val;
  }
  return {};
}

export function splitItems(val: string | string[] | undefined | null): string[] {
  if (!val) return [];
  if (Array.isArray(val)) return val.map(asString).filter(Boolean);
  
  // Split on newlines, semicolons, bullets (• or - ), or periods followed by space
  return String(val)
    .split(/[\n;•\u2022]|(?<=[^0-9])\.\s+/)
    .map((item) => item.trim().replace(/^[-*]\s*/, ""))
    .filter((item) => item.length > 0 && !isNullish(item));
}

export function titleCaseFromCode(code: string): string {
  if (!code) return "";
  return code
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function scoreToDifficulty(score: number): "EXPERT" | "ADVANCED" | "PRO" | "BEGINNER" {
  if (score >= 8) return "EXPERT";
  if (score >= 6) return "ADVANCED";
  if (score >= 4) return "PRO";
  return "BEGINNER";
}

export function proficiencyToBloom(score: number): {
  code: "CU" | "AP" | "AS" | "EV" | "CR";
  label: string;
  color: string;
  bg: string;
  description: string;
} {
  // 1-2 -> CU, 3-4 -> AP, 5-6 -> AS, 7-8 -> EV, 9-10 -> CR
  if (score >= 9) {
    return {
      code: "CR",
      label: "Create",
      color: "#a855f7",
      bg: "bg-purple-50 text-purple-700 border-purple-200",
      description: "Synthesize ideas, architect novel systems, and lead design paradigms",
    };
  }
  if (score >= 7) {
    return {
      code: "EV",
      label: "Evaluate",
      color: "#ef4444",
      bg: "bg-red-50 text-red-700 border-red-200",
      description: "Critique, benchmark, debug complex failures, and justify architectural decisions",
    };
  }
  if (score >= 5) {
    return {
      code: "AS",
      label: "Analyze / Synthesize",
      color: "#eab308",
      bg: "bg-amber-50 text-amber-700 border-amber-200",
      description: "Deconstruct problems, analyze trade-offs, and design modular components",
    };
  }
  if (score >= 3) {
    return {
      code: "AP",
      label: "Apply",
      color: "#22c55e",
      bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      description: "Apply standard libraries, frameworks, patterns, and established recipes",
    };
  }
  return {
    code: "CU",
    label: "Conceptual Understanding",
    color: "#3b82f6",
    bg: "bg-blue-50 text-blue-700 border-blue-200",
    description: "Understand foundational concepts, syntax, definitions, and operating principles",
  };
}

export function scoreToCriticality(score: number): {
  label: "Critical" | "Important" | "Baseline";
  color: string;
  badgeClass: string;
} {
  if (score >= 7) {
    return {
      label: "Critical",
      color: "#dc2626",
      badgeClass: "bg-red-50 text-red-700 border-red-200",
    };
  }
  if (score >= 5) {
    return {
      label: "Important",
      color: "#d97706",
      badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
    };
  }
  return {
    label: "Baseline",
    color: "#2563eb",
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
  };
}

export function isNullish(val: any): boolean {
  if (val === undefined || val === null) return true;
  const str = String(val).trim().toLowerCase();
  return (
    str === "" ||
    str === "na" ||
    str === "n/a" ||
    str === "none" ||
    str === "-" ||
    str === "null" ||
    str === "undefined" ||
    str === "not applicable"
  );
}

// Category color mappings
export const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string; hex: string }> = {
  "Super Dream": {
    bg: "bg-[#7c3aed]/10",
    text: "text-[#7c3aed]",
    border: "border-[#7c3aed]/20",
    hex: "#7c3aed",
  },
  Dream: {
    bg: "bg-[#2563eb]/10",
    text: "text-[#2563eb]",
    border: "border-[#2563eb]/20",
    hex: "#2563eb",
  },
  Standard: {
    bg: "bg-[#16a34a]/10",
    text: "text-[#16a34a]",
    border: "border-[#16a34a]/20",
    hex: "#16a34a",
  },
  Regular: {
    bg: "bg-[#d97706]/10",
    text: "text-[#d97706]",
    border: "border-[#d97706]/20",
    hex: "#d97706",
  },
};

// Normalizers
export function normalizeCompanySummary(short_json: any): CompanySummary {
  const data = asRecord(short_json);
  return {
    name: asString(data.name || "Unknown Company"),
    short_name: asString(data.short_name || data.name || "Company"),
    logo_url: asString(data.logo_url),
    category: asString(data.category || "Technology"),
    company_type: asString(data.company_type || "Dream"),
    incorporation_year: Number(data.incorporation_year) || 0,
    employee_size: asString(data.employee_size || "Not Disclosed"),
    headquarters_address: asString(data.headquarters_address || "Not Disclosed"),
    operating_countries: asString(data.operating_countries || ""),
    office_locations: asString(data.office_locations || ""),
    yoy_growth_rate: asString(data.yoy_growth_rate || "N/A"),
    website_url: asString(data.website_url || ""),
    raw: data,
  };
}

export function normalizeCompanyProfile(full_json: any, short_json?: any): CompanyProfile {
  const full = asRecord(full_json);
  const short = asRecord(short_json);
  const merged = { ...short, ...full };

  // Remove any prohibited fields defensively
  delete merged.ctc;
  delete merged.stipend;
  delete merged.selection_ratio;
  delete merged.compensation_ctc;
  delete merged.salary;

  return {
    // Section 1: Company Identity
    name: asString(merged.name || short.name),
    short_name: asString(merged.short_name || short.short_name || merged.name),
    category: asString(merged.category || short.category || "Enterprise"),
    company_type: asString(merged.company_type || short.company_type || "Dream"),
    incorporation_year: merged.incorporation_year || short.incorporation_year || "NA",
    nature_of_company: asString(merged.nature_of_company || "Public"),
    logo_url: asString(short.logo_url || merged.logo_url),

    // Section 2: Overview & Vision
    overview_text: asString(merged.overview_text),
    vision_statement: asString(merged.vision_statement),
    mission_statement: asString(merged.mission_statement),
    core_values: asString(merged.core_values),
    history_timeline: asString(merged.history_timeline),

    // Section 3: Leadership
    ceo_name: asString(merged.ceo_name),
    ceo_linkedin_url: asString(merged.ceo_linkedin_url),
    key_leaders: asString(merged.key_leaders),
    board_members: asString(merged.board_members),
    contact_person_name: asString(merged.contact_person_name),
    contact_person_title: asString(merged.contact_person_title),
    contact_person_email: asString(merged.contact_person_email),
    contact_person_phone: asString(merged.contact_person_phone),
    decision_maker_access: asString(merged.decision_maker_access),
    warm_intro_pathways: asString(merged.warm_intro_pathways),

    // Section 4: Funding & Financials
    annual_revenue: asString(merged.annual_revenue),
    annual_profit: asString(merged.annual_profit),
    revenue_mix: asString(merged.revenue_mix),
    valuation: asString(merged.valuation),
    yoy_growth_rate: asString(merged.yoy_growth_rate || short.yoy_growth_rate),
    profitability_status: asString(merged.profitability_status),
    key_investors: asString(merged.key_investors),
    recent_funding_rounds: asString(merged.recent_funding_rounds),
    total_capital_raised: asString(merged.total_capital_raised),
    burn_rate: asString(merged.burn_rate),
    runway_months: asString(merged.runway_months),
    burn_multiplier: asString(merged.burn_multiplier),

    // Section 5: Global Presence
    headquarters_address: asString(merged.headquarters_address || short.headquarters_address),
    operating_countries: asString(merged.operating_countries || short.operating_countries),
    office_count: asString(merged.office_count),
    office_locations: asString(merged.office_locations || short.office_locations),
    employee_size: asString(merged.employee_size || short.employee_size),

    // Section 6: Products & Services
    offerings_description: asString(merged.offerings_description),
    top_customers: asString(merged.top_customers),
    focus_sectors: asString(merged.focus_sectors),
    pain_points_addressed: asString(merged.pain_points_addressed),
    product_pipeline: asString(merged.product_pipeline),

    // Section 7: Technology Stack
    tech_stack: asString(merged.tech_stack),
    technology_partners: asString(merged.technology_partners),
    intellectual_property: asString(merged.intellectual_property),
    r_and_d_investment: asString(merged.r_and_d_investment),
    ai_ml_adoption_level: asString(merged.ai_ml_adoption_level),
    tech_adoption_rating: asString(merged.tech_adoption_rating),
    cybersecurity_posture: asString(merged.cybersecurity_posture),

    // Section 8: Partnerships & Ecosystem
    partnership_ecosystem: asString(merged.partnership_ecosystem),
    industry_associations: asString(merged.industry_associations),

    // Section 9: Competitive Landscape
    key_competitors: asString(merged.key_competitors),
    market_share_percentage: asString(merged.market_share_percentage),
    competitive_advantages: asString(merged.competitive_advantages),
    unique_differentiators: asString(merged.unique_differentiators),
    weaknesses_gaps: asString(merged.weaknesses_gaps),
    key_challenges_needs: asString(merged.key_challenges_needs),
    benchmark_vs_peers: asString(merged.benchmark_vs_peers),

    // Section 10: Market Opportunity
    tam: asString(merged.tam),
    sam: asString(merged.sam),
    som: asString(merged.som),
    future_projections: asString(merged.future_projections),
    strategic_priorities: asString(merged.strategic_priorities),
    innovation_roadmap: asString(merged.innovation_roadmap),

    // Section 11: Core Value Proposition & ESG
    core_value_proposition: asString(merged.core_value_proposition),
    esg_ratings: asString(merged.esg_ratings),
    carbon_footprint: asString(merged.carbon_footprint),
    ethical_sourcing: asString(merged.ethical_sourcing),
    sustainability_csr: asString(merged.sustainability_csr),

    // Section 12: Culture & Work Life
    work_culture_summary: asString(merged.work_culture_summary),
    psychological_safety: asString(merged.psychological_safety),
    manager_quality: asString(merged.manager_quality),
    feedback_culture: asString(merged.feedback_culture),
    diversity_metrics: asString(merged.diversity_metrics),
    diversity_inclusion_score: asString(merged.diversity_inclusion_score),
    ethical_standards: asString(merged.ethical_standards),
    burnout_risk: asString(merged.burnout_risk),
    mission_clarity: asString(merged.mission_clarity),
    crisis_behavior: asString(merged.crisis_behavior),

    // Section 13: Recent News & Milestones
    recent_news: asString(merged.recent_news),
    case_studies: asString(merged.case_studies),
    exit_strategy_history: asString(merged.exit_strategy_history),

    // Section 14: Sales & Customer Metrics
    sales_motion: asString(merged.sales_motion),
    customer_concentration_risk: asString(merged.customer_concentration_risk),
    customer_acquisition_cost: asString(merged.customer_acquisition_cost),
    customer_lifetime_value: asString(merged.customer_lifetime_value),
    cac_ltv_ratio: asString(merged.cac_ltv_ratio),
    churn_rate: asString(merged.churn_rate),
    net_promoter_score: asString(merged.net_promoter_score),
    go_to_market_strategy: asString(merged.go_to_market_strategy),

    // Section 15: Risk & Compliance
    regulatory_status: asString(merged.regulatory_status),
    legal_issues: asString(merged.legal_issues),
    supply_chain_dependencies: asString(merged.supply_chain_dependencies),
    geopolitical_risks: asString(merged.geopolitical_risks),
    macro_risks: asString(merged.macro_risks),

    // Section 16: Work Location & Commute
    remote_policy_details: asString(merged.remote_policy_details),
    typical_hours: asString(merged.typical_hours),
    overtime_expectations: asString(merged.overtime_expectations),
    weekend_work: asString(merged.weekend_work),
    flexibility_level: asString(merged.flexibility_level),
    location_centrality: asString(merged.location_centrality),
    public_transport_access: asString(merged.public_transport_access),
    cab_policy: asString(merged.cab_policy),
    airport_commute_time: asString(merged.airport_commute_time),
    office_zone_type: asString(merged.office_zone_type),

    // Section 17: Safety & Wellbeing
    area_safety: asString(merged.area_safety),
    safety_policies: asString(merged.safety_policies),
    infrastructure_safety: asString(merged.infrastructure_safety),
    emergency_preparedness: asString(merged.emergency_preparedness),
    health_support: asString(merged.health_support),

    // Section 18: Career Growth & Learning
    training_spend: asString(merged.training_spend),
    onboarding_quality: asString(merged.onboarding_quality),
    learning_culture: asString(merged.learning_culture),
    exposure_quality: asString(merged.exposure_quality),
    mentorship_availability: asString(merged.mentorship_availability),
    internal_mobility: asString(merged.internal_mobility),
    promotion_clarity: asString(merged.promotion_clarity),
    tools_access: asString(merged.tools_access),
    role_clarity: asString(merged.role_clarity),
    early_ownership: asString(merged.early_ownership),
    work_impact: asString(merged.work_impact),
    execution_thinking_balance: asString(merged.execution_thinking_balance),
    automation_level: asString(merged.automation_level),
    cross_functional_exposure: asString(merged.cross_functional_exposure),
    company_maturity: asString(merged.company_maturity),
    brand_value: asString(merged.brand_value),
    client_quality: asString(merged.client_quality),
    exit_opportunities: asString(merged.exit_opportunities),
    skill_relevance: asString(merged.skill_relevance),
    external_recognition: asString(merged.external_recognition),
    network_strength: asString(merged.network_strength),
    global_exposure: asString(merged.global_exposure),

    // Section 19: Brand & Reputation
    marketing_video_url: asString(merged.marketing_video_url),
    customer_testimonials: asString(merged.customer_testimonials),
    website_quality: asString(merged.website_quality),
    website_rating: asString(merged.website_rating),
    website_traffic_rank: asString(merged.website_traffic_rank),
    social_media_followers: asString(merged.social_media_followers),
    glassdoor_rating: asString(merged.glassdoor_rating),
    indeed_rating: asString(merged.indeed_rating),
    google_rating: asString(merged.google_rating),
    awards_recognitions: asString(merged.awards_recognitions),
    brand_sentiment_score: asString(merged.brand_sentiment_score),
    event_participation: asString(merged.event_participation),

    // Section 20: Compensation & Benefits (No CTC/Stipend/Selection Ratio)
    leave_policy: asString(merged.leave_policy),
    fixed_vs_variable_pay: asString(merged.fixed_vs_variable_pay),
    bonus_predictability: asString(merged.bonus_predictability),
    esops_incentives: asString(merged.esops_incentives),
    family_health_insurance: asString(merged.family_health_insurance),
    relocation_support: asString(merged.relocation_support),
    lifestyle_benefits: asString(merged.lifestyle_benefits),
    hiring_velocity: asString(merged.hiring_velocity),
    employee_turnover: asString(merged.employee_turnover),
    avg_retention_tenure: asString(merged.avg_retention_tenure),
    layoff_history: asString(merged.layoff_history),

    // Section 21: Digital Presence & Ratings
    website_url: asString(merged.website_url || short.website_url),
    linkedin_url: asString(merged.linkedin_url),
    twitter_handle: asString(merged.twitter_handle),
    facebook_url: asString(merged.facebook_url),
    instagram_url: asString(merged.instagram_url),

    // Section 22: Contact Information
    primary_contact_email: asString(merged.primary_contact_email),
    primary_phone_number: asString(merged.primary_phone_number),

    // Extra dynamic keys
    ...merged,
  };
}

export function normalizeDashboardSkills(skillLevels: any[]): DashboardSkill[] {
  if (!Array.isArray(skillLevels)) return [];

  return skillLevels.map((item, index) => {
    const raw = asRecord(item);
    const score = Number(raw.required_level) || 5;
    const name = asString(raw.skill_set_name || `Skill ${index + 1}`);

    return {
      skill_set_id: Number(raw.skill_set_id) || index + 1,
      skill_set_name: name,
      required_level: score,
      required_proficiency: asString(raw.required_proficiency || "Proficient"),
      difficulty: scoreToDifficulty(score),
      bloom: proficiencyToBloom(score),
      criticality: scoreToCriticality(score),
    };
  });
}
