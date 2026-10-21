import React from "react";
import {
  Building2,
  Compass,
  Users2,
  DollarSign,
  Globe2,
  Boxes,
  Cpu,
  Handshake,
  Swords,
  TrendingUp,
  Award,
  Smile,
  Newspaper,
  BarChart3,
  ShieldAlert,
  MapPin,
  HeartPulse,
  GraduationCap,
  Sparkles,
  Gift,
  Share2,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { CompanyProfile } from "@/lib/companyData";

export interface IntelligenceField {
  key: string;
  label: string;
  value?: any;
  type?: "text" | "url" | "video" | "rating" | "list" | "paragraph" | "auto";
}

export interface IntelligenceSection {
  id: string;
  number: number;
  title: string;
  icon: LucideIcon;
  fields: IntelligenceField[];
}

export function buildIntelligenceSections(profile?: Partial<CompanyProfile>): IntelligenceSection[] {
  const p = profile || {};

  return [
    // 1. Company Identity
    {
      id: "company-identity",
      number: 1,
      title: "Company Identity",
      icon: Building2,
      fields: [
        { key: "name", label: "Official Name", value: p.name, type: "text" },
        { key: "short_name", label: "Brand / Short Name", value: p.short_name, type: "text" },
        { key: "category", label: "Industry Category", value: p.category, type: "text" },
        { key: "company_type", label: "Hiring Tier", value: p.company_type, type: "text" },
        { key: "incorporation_year", label: "Incorporation Year", value: p.incorporation_year, type: "text" },
        { key: "nature_of_company", label: "Ownership Type", value: p.nature_of_company, type: "text" },
        { key: "website_url", label: "Primary Domain", value: p.website_url, type: "url" },
      ],
    },

    // 2. Overview & Vision
    {
      id: "overview-vision",
      number: 2,
      title: "Overview & Vision",
      icon: Compass,
      fields: [
        { key: "overview_text", label: "Executive Summary", value: p.overview_text, type: "paragraph" },
        { key: "vision_statement", label: "Vision Statement", value: p.vision_statement, type: "paragraph" },
        { key: "mission_statement", label: "Mission Statement", value: p.mission_statement, type: "paragraph" },
        { key: "core_values", label: "Core Values", value: p.core_values, type: "list" },
        { key: "history_timeline", label: "Milestones & Heritage", value: p.history_timeline, type: "list" },
      ],
    },

    // 3. Leadership
    {
      id: "leadership",
      number: 3,
      title: "Leadership",
      icon: Users2,
      fields: [
        { key: "ceo_name", label: "Chief Executive Officer", value: p.ceo_name, type: "text" },
        { key: "ceo_linkedin_url", label: "CEO LinkedIn", value: p.ceo_linkedin_url, type: "url" },
        { key: "key_leaders", label: "Executive Leadership Team", value: p.key_leaders, type: "list" },
        { key: "board_members", label: "Board of Directors", value: p.board_members, type: "list" },
        { key: "decision_maker_access", label: "Decision Maker Access", value: p.decision_maker_access, type: "text" },
        { key: "warm_intro_pathways", label: "Warm Introduction Pathways", value: p.warm_intro_pathways, type: "list" },
      ],
    },

    // 4. Funding & Financials
    {
      id: "funding-financials",
      number: 4,
      title: "Funding & Financials",
      icon: DollarSign,
      fields: [
        { key: "annual_revenue", label: "Annual Revenue", value: p.annual_revenue, type: "text" },
        { key: "annual_profit", label: "Annual Net Income", value: p.annual_profit, type: "text" },
        { key: "revenue_mix", label: "Revenue Breakdown", value: p.revenue_mix, type: "list" },
        { key: "valuation", label: "Market Valuation", value: p.valuation, type: "text" },
        { key: "yoy_growth_rate", label: "YoY Growth Rate", value: p.yoy_growth_rate, type: "text" },
        { key: "profitability_status", label: "Profitability Status", value: p.profitability_status, type: "text" },
        { key: "key_investors", label: "Key Institutional Investors", value: p.key_investors, type: "list" },
        { key: "recent_funding_rounds", label: "Funding History & Equity", value: p.recent_funding_rounds, type: "paragraph" },
        { key: "total_capital_raised", label: "Capital Structure", value: p.total_capital_raised, type: "text" },
        { key: "burn_rate", label: "Monthly Burn Rate", value: p.burn_rate, type: "text" },
        { key: "runway_months", label: "Runway", value: p.runway_months, type: "text" },
        { key: "burn_multiplier", label: "Burn Multiplier", value: p.burn_multiplier, type: "text" },
      ],
    },

    // 5. Global Presence
    {
      id: "global-presence",
      number: 5,
      title: "Global Presence",
      icon: Globe2,
      fields: [
        { key: "headquarters_address", label: "Global Headquarters", value: p.headquarters_address, type: "text" },
        { key: "operating_countries", label: "Operating Countries", value: p.operating_countries, type: "list" },
        { key: "office_count", label: "Total Office Count", value: p.office_count, type: "text" },
        { key: "office_locations", label: "Major Office Hubs", value: p.office_locations, type: "list" },
        { key: "employee_size", label: "Global Headcount", value: p.employee_size, type: "text" },
      ],
    },

    // 6. Products & Services
    {
      id: "products-services",
      number: 6,
      title: "Products & Services",
      icon: Boxes,
      fields: [
        { key: "offerings_description", label: "Core Service Offerings", value: p.offerings_description, type: "list" },
        { key: "top_customers", label: "Target Client Segments", value: p.top_customers, type: "list" },
        { key: "focus_sectors", label: "Industry Focus Sectors", value: p.focus_sectors, type: "list" },
        { key: "pain_points_addressed", label: "Business Pain Points Addressed", value: p.pain_points_addressed, type: "list" },
        { key: "product_pipeline", label: "Solution & Product Pipeline", value: p.product_pipeline, type: "list" },
      ],
    },

    // 7. Technology Stack
    {
      id: "technology-stack",
      number: 7,
      title: "Technology Stack",
      icon: Cpu,
      fields: [
        { key: "tech_stack", label: "Primary Technology Stack", value: p.tech_stack, type: "list" },
        { key: "technology_partners", label: "Strategic Technology Alliances", value: p.technology_partners, type: "list" },
        { key: "intellectual_property", label: "Proprietary IP & Assets", value: p.intellectual_property, type: "list" },
        { key: "r_and_d_investment", label: "Annual R&D Investment", value: p.r_and_d_investment, type: "text" },
        { key: "ai_ml_adoption_level", label: "AI / ML Adoption Maturity", value: p.ai_ml_adoption_level, type: "paragraph" },
        { key: "tech_adoption_rating", label: "Tech Leadership Rating", value: p.tech_adoption_rating, type: "text" },
        { key: "cybersecurity_posture", label: "Security & Compliance Standards", value: p.cybersecurity_posture, type: "list" },
      ],
    },

    // 8. Partnerships & Ecosystem
    {
      id: "partnerships-ecosystem",
      number: 8,
      title: "Partnerships & Ecosystem",
      icon: Handshake,
      fields: [
        { key: "partnership_ecosystem", label: "Global Partner Ecosystem", value: p.partnership_ecosystem, type: "list" },
        { key: "industry_associations", label: "Industry Bodies & Consortia", value: p.industry_associations, type: "list" },
      ],
    },

    // 9. Competitive Landscape
    {
      id: "competitive-landscape",
      number: 9,
      title: "Competitive Landscape",
      icon: Swords,
      fields: [
        { key: "key_competitors", label: "Primary Market Competitors", value: p.key_competitors, type: "list" },
        { key: "market_share_percentage", label: "Estimated Market Share", value: p.market_share_percentage, type: "text" },
        { key: "competitive_advantages", label: "Core Competitive Advantages", value: p.competitive_advantages, type: "list" },
        { key: "unique_differentiators", label: "Distinct Moats & Differentiators", value: p.unique_differentiators, type: "list" },
        { key: "weaknesses_gaps", label: "Identified Gaps & Vulnerabilities", value: p.weaknesses_gaps, type: "list" },
        { key: "key_challenges_needs", label: "Strategic Pressures & Challenges", value: p.key_challenges_needs, type: "list" },
        { key: "benchmark_vs_peers", label: "Peer Group Benchmarking", value: p.benchmark_vs_peers, type: "paragraph" },
      ],
    },

    // 10. Market Opportunity
    {
      id: "market-opportunity",
      number: 10,
      title: "Market Opportunity",
      icon: TrendingUp,
      fields: [
        { key: "tam", label: "Total Addressable Market (TAM)", value: p.tam, type: "text" },
        { key: "sam", label: "Serviceable Available Market (SAM)", value: p.sam, type: "text" },
        { key: "som", label: "Serviceable Obtainable Market (SOM)", value: p.som, type: "text" },
        { key: "future_projections", label: "Medium-Term Revenue Outlook", value: p.future_projections, type: "text" },
        { key: "strategic_priorities", label: "High-Priority Growth Vectors", value: p.strategic_priorities, type: "list" },
        { key: "innovation_roadmap", label: "Technology Innovation Roadmap", value: p.innovation_roadmap, type: "list" },
      ],
    },

    // 11. Core Value Proposition & ESG
    {
      id: "core-value-esg",
      number: 11,
      title: "Core Value Proposition & ESG",
      icon: Award,
      fields: [
        { key: "core_value_proposition", label: "Enterprise Value Proposition", value: p.core_value_proposition, type: "list" },
        { key: "esg_ratings", label: "ESG Commitments & Governance", value: p.esg_ratings, type: "list" },
        { key: "carbon_footprint", label: "Decarbonization & Climate Action", value: p.carbon_footprint, type: "paragraph" },
        { key: "ethical_sourcing", label: "Supply Chain & Vendor Ethics", value: p.ethical_sourcing, type: "list" },
        { key: "sustainability_csr", label: "Corporate Social Responsibility", value: p.sustainability_csr, type: "list" },
      ],
    },

    // 12. Culture & Work Life
    {
      id: "culture-work-life",
      number: 12,
      title: "Culture & Work Life",
      icon: Smile,
      fields: [
        { key: "work_culture_summary", label: "Workplace Dynamics", value: p.work_culture_summary, type: "list" },
        { key: "psychological_safety", label: "Psychological Safety", value: p.psychological_safety, type: "text" },
        { key: "manager_quality", label: "Engineering & People Leadership", value: p.manager_quality, type: "text" },
        { key: "feedback_culture", label: "Performance & Review Cadence", value: p.feedback_culture, type: "list" },
        { key: "diversity_metrics", label: "Workforce Diversity Metrics", value: p.diversity_metrics, type: "list" },
        { key: "diversity_inclusion_score", label: "DEI Programs & Equity", value: p.diversity_inclusion_score, type: "list" },
        { key: "ethical_standards", label: "Integrity & Compliance Tone", value: p.ethical_standards, type: "list" },
        { key: "burnout_risk", label: "Workload & Burnout Risk", value: p.burnout_risk, type: "text" },
        { key: "mission_clarity", label: "Organizational Alignment", value: p.mission_clarity, type: "text" },
        { key: "crisis_behavior", label: "Crisis Management & Transparency", value: p.crisis_behavior, type: "paragraph" },
      ],
    },

    // 13. Recent News & Milestones
    {
      id: "recent-news",
      number: 13,
      title: "Recent News & Milestones",
      icon: Newspaper,
      fields: [
        { key: "recent_news", label: "Recent Key Announcements", value: p.recent_news, type: "list" },
        { key: "case_studies", label: "Notable Client Transformations", value: p.case_studies, type: "list" },
        { key: "exit_strategy_history", label: "M&A History & Capital Strategy", value: p.exit_strategy_history, type: "paragraph" },
      ],
    },

    // 14. Sales & Customer Metrics
    {
      id: "sales-customer-metrics",
      number: 14,
      title: "Sales & Customer Metrics",
      icon: BarChart3,
      fields: [
        { key: "sales_motion", label: "Go-to-Market Sales Motion", value: p.sales_motion, type: "text" },
        { key: "go_to_market_strategy", label: "Strategic Distribution Channels", value: p.go_to_market_strategy, type: "list" },
        { key: "customer_concentration_risk", label: "Customer Concentration Risk", value: p.customer_concentration_risk, type: "text" },
        { key: "customer_acquisition_cost", label: "Enterprise CAC", value: p.customer_acquisition_cost, type: "text" },
        { key: "customer_lifetime_value", label: "Enterprise LTV", value: p.customer_lifetime_value, type: "text" },
        { key: "cac_ltv_ratio", label: "LTV / CAC Ratio", value: p.cac_ltv_ratio, type: "text" },
        { key: "churn_rate", label: "Annual Client Churn Rate", value: p.churn_rate, type: "text" },
        { key: "net_promoter_score", label: "Net Promoter Score (NPS)", value: p.net_promoter_score, type: "rating" },
      ],
    },

    // 15. Risk & Compliance
    {
      id: "risk-compliance",
      number: 15,
      title: "Risk & Compliance",
      icon: ShieldAlert,
      fields: [
        { key: "regulatory_status", label: "Global Certifications & Frameworks", value: p.regulatory_status, type: "list" },
        { key: "legal_issues", label: "Material Legal & Dispute Exposure", value: p.legal_issues, type: "paragraph" },
        { key: "supply_chain_dependencies", label: "Upstream Dependencies", value: p.supply_chain_dependencies, type: "list" },
        { key: "geopolitical_risks", label: "Geopolitical & Regulatory Headwinds", value: p.geopolitical_risks, type: "list" },
        { key: "macro_risks", label: "Macroeconomic Sensitivity", value: p.macro_risks, type: "list" },
      ],
    },

    // 16. Work Location & Commute
    {
      id: "work-location-commute",
      number: 16,
      title: "Work Location & Commute",
      icon: MapPin,
      fields: [
        { key: "remote_policy_details", label: "Workplace Policy & Flexibility", value: p.remote_policy_details, type: "text" },
        { key: "flexibility_level", label: "Supported Work Arrangements", value: p.flexibility_level, type: "list" },
        { key: "typical_hours", label: "Typical Working Hours", value: p.typical_hours, type: "text" },
        { key: "overtime_expectations", label: "Project Crunch / Overtime", value: p.overtime_expectations, type: "text" },
        { key: "weekend_work", label: "Weekend Engagement", value: p.weekend_work, type: "text" },
        { key: "location_centrality", label: "Campus & Transit Centrality", value: p.location_centrality, type: "text" },
        { key: "office_zone_type", label: "Commercial Zone Type", value: p.office_zone_type, type: "text" },
        { key: "public_transport_access", label: "Public Transit Connectivity", value: p.public_transport_access, type: "list" },
        { key: "cab_policy", label: "Shuttle & Cab Facilities", value: p.cab_policy, type: "list" },
        { key: "airport_commute_time", label: "Transit Time to Nearest Airport", value: p.airport_commute_time, type: "text" },
      ],
    },

    // 17. Safety & Wellbeing
    {
      id: "safety-wellbeing",
      number: 17,
      title: "Safety & Wellbeing",
      icon: HeartPulse,
      fields: [
        { key: "area_safety", label: "Facility Surrounding Security", value: p.area_safety, type: "list" },
        { key: "safety_policies", label: "Night Shift & Commute Protection", value: p.safety_policies, type: "list" },
        { key: "infrastructure_safety", label: "Building & Physical Infrastructure Safety", value: p.infrastructure_safety, type: "list" },
        { key: "emergency_preparedness", label: "Emergency & Medical Readiness", value: p.emergency_preparedness, type: "list" },
        { key: "health_support", label: "Physical & Mental Wellbeing Facilities", value: p.health_support, type: "list" },
      ],
    },

    // 18. Career Growth & Learning
    {
      id: "career-growth",
      number: 18,
      title: "Career Growth & Learning",
      icon: GraduationCap,
      fields: [
        { key: "training_spend", label: "Annual L&D Spend Per Employee", value: p.training_spend, type: "text" },
        { key: "onboarding_quality", label: "Fresh Graduate Onboarding Experience", value: p.onboarding_quality, type: "text" },
        { key: "learning_culture", label: "Certification & Continuous Learning", value: p.learning_culture, type: "list" },
        { key: "exposure_quality", label: "Global Exposure Quality", value: p.exposure_quality, type: "text" },
        { key: "mentorship_availability", label: "Mentorship Networks", value: p.mentorship_availability, type: "list" },
        { key: "internal_mobility", label: "Internal Role Mobility", value: p.internal_mobility, type: "text" },
        { key: "promotion_clarity", label: "Promotion Framework", value: p.promotion_clarity, type: "text" },
        { key: "tools_access", label: "Enterprise Software & Cloud Access", value: p.tools_access, type: "list" },
        { key: "role_clarity", label: "Job Description & Deliverable Clarity", value: p.role_clarity, type: "text" },
        { key: "early_ownership", label: "Autonomy & Early Ownership", value: p.early_ownership, type: "text" },
        { key: "work_impact", label: "Client Impact & Revenue Linkage", value: p.work_impact, type: "text" },
        { key: "execution_thinking_balance", label: "Thinking vs Execution Balance", value: p.execution_thinking_balance, type: "text" },
        { key: "automation_level", label: "Internal Automation Maturity", value: p.automation_level, type: "text" },
        { key: "cross_functional_exposure", label: "Cross-Functional Rotations", value: p.cross_functional_exposure, type: "list" },
        { key: "company_maturity", label: "Process Maturity Index", value: p.company_maturity, type: "text" },
        { key: "brand_value", label: "Resume & Global Brand Prestige", value: p.brand_value, type: "text" },
        { key: "client_quality", label: "Client Portfolio Caliber", value: p.client_quality, type: "list" },
        { key: "exit_opportunities", label: "Subsequent Career Trajectory", value: p.exit_opportunities, type: "list" },
        { key: "skill_relevance", label: "Modern Market Skill Relevance", value: p.skill_relevance, type: "text" },
        { key: "external_recognition", label: "External Credibility", value: p.external_recognition, type: "text" },
        { key: "network_strength", label: "Alumni Network Reach", value: p.network_strength, type: "list" },
        { key: "global_exposure", label: "International Project Exposure", value: p.global_exposure, type: "list" },
      ],
    },

    // 19. Brand & Reputation
    {
      id: "brand-reputation",
      number: 19,
      title: "Brand & Reputation",
      icon: Sparkles,
      fields: [
        { key: "marketing_video_url", label: "Corporate Overview Channel", value: p.marketing_video_url, type: "video" },
        { key: "customer_testimonials", label: "Flagship Customer Testimonials", value: p.customer_testimonials, type: "list" },
        { key: "website_quality", label: "Digital Presence Quality", value: p.website_quality, type: "paragraph" },
        { key: "website_rating", label: "Domain Benchmark Rating", value: p.website_rating, type: "text" },
        { key: "website_traffic_rank", label: "Global Traffic Rank", value: p.website_traffic_rank, type: "text" },
        { key: "social_media_followers", label: "Global Follower Community", value: p.social_media_followers, type: "text" },
        { key: "glassdoor_rating", label: "Glassdoor Employee Score", value: p.glassdoor_rating, type: "rating" },
        { key: "indeed_rating", label: "Indeed Workplace Rating", value: p.indeed_rating, type: "rating" },
        { key: "google_rating", label: "Google Review Rating", value: p.google_rating, type: "rating" },
        { key: "awards_recognitions", label: "Industry Accolades & Rankings", value: p.awards_recognitions, type: "list" },
        { key: "brand_sentiment_score", label: "Enterprise Brand Sentiment", value: p.brand_sentiment_score, type: "paragraph" },
        { key: "event_participation", label: "Key Global Tech Summits", value: p.event_participation, type: "list" },
      ],
    },

    // 20. Compensation & Benefits (Strictly NO CTC, Stipend, or Selection Ratio)
    {
      id: "compensation-benefits",
      number: 20,
      title: "Compensation & Benefits",
      icon: Gift,
      fields: [
        { key: "leave_policy", label: "Leave Entitlement & Time Off", value: p.leave_policy, type: "list" },
        { key: "fixed_vs_variable_pay", label: "Compensation Structure Ratio", value: p.fixed_vs_variable_pay, type: "text" },
        { key: "bonus_predictability", label: "Annual Performance Bonus Predictability", value: p.bonus_predictability, type: "text" },
        { key: "esops_incentives", label: "Equity, Stock Grants & Retention Perks", value: p.esops_incentives, type: "list" },
        { key: "family_health_insurance", label: "Dependent Medical & Health Coverage", value: p.family_health_insurance, type: "list" },
        { key: "relocation_support", label: "Relocation Assistance & Housing", value: p.relocation_support, type: "list" },
        { key: "lifestyle_benefits", label: "Wellness, Meals & Lifestyle Subsidies", value: p.lifestyle_benefits, type: "list" },
        { key: "hiring_velocity", label: "Active Talent Hiring Volume", value: p.hiring_velocity, type: "list" },
        { key: "employee_turnover", label: "Annual Employee Attrition", value: p.employee_turnover, type: "text" },
        { key: "avg_retention_tenure", label: "Average Employee Tenure", value: p.avg_retention_tenure, type: "text" },
        { key: "layoff_history", label: "Restructuring & Workforce Stability", value: p.layoff_history, type: "text" },
      ],
    },

    // 21. Digital Presence & Ratings
    {
      id: "digital-presence",
      number: 21,
      title: "Digital Presence & Ratings",
      icon: Share2,
      fields: [
        { key: "website_url", label: "Official Portal", value: p.website_url, type: "url" },
        { key: "linkedin_url", label: "LinkedIn Company Profile", value: p.linkedin_url, type: "url" },
        { key: "twitter_handle", label: "X (Twitter) Handle", value: p.twitter_handle, type: "text" },
        { key: "facebook_url", label: "Facebook Page", value: p.facebook_url, type: "url" },
        { key: "instagram_url", label: "Instagram Handle", value: p.instagram_url, type: "url" },
      ],
    },

    // 22. Contact Information
    {
      id: "contact-information",
      number: 22,
      title: "Contact Information",
      icon: Mail,
      fields: [
        { key: "contact_person_name", label: "Corporate Representative", value: p.contact_person_name, type: "text" },
        { key: "contact_person_title", label: "Representative Role", value: p.contact_person_title, type: "text" },
        { key: "primary_contact_email", label: "Primary Inquiries Email", value: p.primary_contact_email, type: "text" },
        { key: "contact_person_email", label: "Talent / Office Email", value: p.contact_person_email, type: "text" },
        { key: "primary_phone_number", label: "Corporate Contact Line", value: p.primary_phone_number, type: "text" },
        { key: "contact_person_phone", label: "Direct Extension Line", value: p.contact_person_phone, type: "text" },
      ],
    },
  ];
}
