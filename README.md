# JSS Academy of Technical Education , Noida Companies Research & Placement Analytics Portal
*(JSSATE Placement Intelligence Hub)*

A modern, mobile-first enterprise React + Vite + TypeScript + Tailwind CSS v3 + shadcn/ui Single Page Application (SPA) designed to empower students and placement coordinators with comprehensive corporate intelligence and technical skill readiness ladders for campus placements.

---

## 🏛️ Institution Metadata
- **Institution Name:** `JSS Academy of Technical Education , Noida`
- **Short Tag:** `JSSATE`
- **Application Portal Title:** `JSS Academy of Technical Education , Noida Companies Research & Placement Analytics Portal`
- **Header Pill:** `JSSATE · INTELLIGENCE PLATFORM`

---

## 🚀 Phase 1 Architecture (UI-Only Implementation)

### 1. Hardcoded Seed Data (No Database)
- **Phase 1 Scope:** UI-only implementation running entirely on frontend client state.
- **Data Source:** Hardcoded reference seed file located at [`src/data/seedCompanies.ts`](src/data/seedCompanies.ts) with complete enterprise corporate records (reference record: Accenture plc).
- **Zero Database Dependency:** No backend database, Lovable Cloud, or Supabase instance is enabled. No tables, SQL migrations, RLS policies, or Edge Functions exist.
- **No Supabase Client:** `@supabase/supabase-js` is not installed, and no Supabase client file is present.

### 2. Fully Public Access (No Login)
- **No Authentication:** Completely public portal. There is no `/login` route, no `AuthContext`, no `ProtectedRoute`, and no authentication UI or logout button.
- **Direct Link Reachability:** Any visitor can access any route directly without credentials or authentication barriers.

### 3. Future-Proofed Phase 2 Supabase Handoff
- All data transformation and presentation logic is isolated in pure TypeScript normalizers in [`src/lib/companyData.ts`](src/lib/companyData.ts):
  - `normalizeCompanySummary(short_json)`: Transforms `short_json` JSONB column.
  - `normalizeCompanyProfile(full_json, short_json)`: Transforms `full_json` JSONB column into 163 corporate intelligence fields across 22 sections.
  - `normalizeDashboardSkills(skillLevels[])`: Transforms skill matrices and maps proficiency levels to Bloom's taxonomy cognitive levels and criticality tiers.

---

## ⚡ Phase 2 — Supabase Connection (Read-Only, JSON-Driven)

Paste `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` into `.env`, then `npm install && npm run dev`.

### Data Architecture & Critical Query Rules:
- **Zero Joins on 90+ Tables:** Corporate intelligence is queried exclusively from `public.company_json`:
  - **Company Cards / Listing:** `SELECT company_id, short_json FROM company_json`
  - **Single Company Detail:** `SELECT company_id, short_json, full_json FROM company_json WHERE company_id = :id`
- **Skills Matrices (4 Authorized Tables):**
  - `public.company_skill_levels` (`company_id`, `skill_set_id`, `required_level`, `required_proficiency_level_id`)
  - `public.skill_set_master` (`skill_set_id`, `skill_set_name`, `short_name`)
  - `public.proficiency_levels` (`proficiency_level_id`, `proficiency_name`, `proficiency_code`)
  - `public.skill_set_topics` (`skill_set_id`, `level_number`, `topics`)
- **Safe Fallback:** If `.env` is unpopulated, the portal gracefully serves the reference seed dataset without crashing.

---

## 🛡️ Strict Compliance & Safeguards

- **NO College Logo Asset:** As strictly constrained, there is NO college image asset in `public/` and NO `<img>` tag referencing a college logo anywhere in the codebase. Branding uses clean typography with the official `{COLLEGE_NAME}` wordmark and `{COLLEGE_SHORT} · INTELLIGENCE PLATFORM` badge. Recruiting company logos use [Logo.dev](https://logo.dev) (via optional `VITE_LOGO_DEV_PUBLISHABLE_KEY`), falling back to DB URLs and initials.
- **NO Sensitive Compensation Fields:** In strict accordance with platform privacy guidelines, CTC, Stipend, and Selection Ratio metrics are NEVER rendered anywhere on the portal.
- **Enterprise Design Language:** Built using Google Workspace aesthetic:
  - Sidebar Background: `#F8FAFC`
  - Sidebar Border: `#E5E7EB`
  - Sidebar Text: `#334155`
  - Active Navigation: `#2563EB` text on `#EFF6FF` background
  - Cards: Crisp white with subtle borders and minimal shadows
  - Typography: Outfit for all headings (`font-heading`) and Inter for body copy (`font-body`) via Google Fonts.

---

## 🧭 Routes & Navigation

| Route | Element | Behavior / Description |
| :--- | :--- | :--- |
| `/` | `<Index />` | Directory of recruiting organizations with debounced search, live tier filter pills (Super Dream, Dream, Standard, Regular), and interactive company cards. |
| `/company` | `<AppLayout />` | Automatically redirects to `/company/intelligence`. |
| `/company/intelligence` | `<CompanyIntelligence />` | Sticky top information bar and 22 deep corporate intelligence dimensions with scroll-spy tab navigation. |
| `/company/skills` | `<SkillIntelligence />` | Competencies matrix with Bloom's 5-level taxonomy legend, 3 criticality tiers, and expandable 10-level preparation ladders. |
| `*` | `<NotFound />` | Rendered ONLY for genuinely invalid URLs. |

### Route Guard & Session Persistence
- Selecting an organization saves `{ companyId, companyName, logoUrl }` to `localStorage` under the key `"selected-company"`.
- On browser refresh or deep-linking to `/company/intelligence` or `/company/skills`, `CompanyContext` restores the active organization from `localStorage` + `SEED_COMPANIES`.
- If no company has been selected yet, navigating to `/company/*` gracefully redirects to `/` (never rendering 404).

---

## 📊 22 Corporate Intelligence Dimensions

1. **Company Identity**
2. **Overview & Vision**
3. **Leadership**
4. **Funding & Financials**
5. **Global Presence**
6. **Products & Services**
7. **Technology Stack**
8. **Partnerships & Ecosystem**
9. **Competitive Landscape**
10. **Market Opportunity**
11. **Core Value Proposition & ESG**
12. **Culture & Work Life**
13. **Recent News & Milestones**
14. **Sales & Customer Metrics**
15. **Risk & Compliance**
16. **Work Location & Commute**
17. **Safety & Wellbeing**
18. **Career Growth & Learning**
19. **Brand & Reputation**
20. **Compensation & Benefits** *(Strictly sanitized - No CTC / Stipend / Selection Ratio)*
21. **Digital Presence & Ratings**
22. **Contact Information**

---

## 🧠 Bloom's Taxonomy & Criticality Engine

### Bloom's Cognitive Mapping
- **L1–2 (CU):** Conceptual Understanding (`#3b82f6`) — Core definitions and runtime fundamentals.
- **L3–4 (AP):** Practical Execution & Apply (`#22c55e`) — Application of standard libraries, syntax, and APIs.
- **L5–6 (AS):** Analyze & Synthesize (`#eab308`) — Trade-off analysis, modular design, and deconstruction.
- **L7–8 (EV):** Evaluate & Benchmark (`#ef4444`) — System troubleshooting, architecture critique, and evaluation.
- **L9–10 (CR):** Create & Architect (`#a855f7`) — Novel system synthesis and high-scale paradigm design.

### Criticality Tiers
- **Critical (Score ≥ 7):** Primary gating filters during technical rounds.
- **Important (Score 5–6):** Required operational proficiency for enterprise project execution.
- **Baseline (Score < 5):** Fundamental technical orientation and tooling literacy.

---

## 🛠️ Development & Testing

```bash
# Install dependencies
npm install

# Start Vite local development server
npm run dev

# Run Vitest test suite (smoke + routing verification)
npm run test

# Compile TypeScript and generate production bundle
npm run build
```
