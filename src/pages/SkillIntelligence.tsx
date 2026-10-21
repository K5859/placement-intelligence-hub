import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  Lock,
  CheckCircle,
  AlertTriangle,
  Flame,
  Info,
  Layers,
  Target,
  RotateCcw,
  AlertCircle,
} from "lucide-react";
import { useCompany } from "@/context/CompanyContext";
import { useCompanySkills } from "@/lib/companyApi";
import { CompanyLogo } from "@/components/CompanyLogo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardSkill } from "@/lib/companyData";
import { SkillTopic } from "@/data/skillTopics";
import { cn } from "@/lib/utils";

// Bloom 5-level taxonomy definitions
const BLOOM_LEVELS = [
  {
    code: "CU",
    name: "Understand",
    sub: "Conceptual Understanding (Levels 1-2)",
    hex: "#3b82f6",
    bg: "bg-blue-50 border-blue-200 text-blue-800",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    code: "AP",
    name: "Apply",
    sub: "Practical Execution (Levels 3-4)",
    hex: "#22c55e",
    bg: "bg-emerald-50 border-emerald-200 text-emerald-800",
    badge: "bg-emerald-100 text-emerald-700",
  },
  {
    code: "AS",
    name: "Analyze",
    sub: "Deconstruction & Tradeoffs (Levels 5-6)",
    hex: "#eab308",
    bg: "bg-amber-50 border-amber-200 text-amber-800",
    badge: "bg-amber-100 text-amber-700",
  },
  {
    code: "EV",
    name: "Evaluate",
    sub: "Architectural Critique (Levels 7-8)",
    hex: "#ef4444",
    bg: "bg-red-50 border-red-200 text-red-800",
    badge: "bg-red-100 text-red-700",
  },
  {
    code: "CR",
    name: "Create",
    sub: "Novel System Synthesis (Levels 9-10)",
    hex: "#a855f7",
    bg: "bg-purple-50 border-purple-200 text-purple-800",
    badge: "bg-purple-100 text-purple-700",
  },
];

// Criticality tiers
const CRITICALITY_LEGEND = [
  {
    label: "Critical Priority",
    scoreRange: "Score ≥ 7",
    desc: "Primary gating filter during technical assessment and system rounds.",
    hex: "#ef4444",
    badgeClass: "bg-red-50 text-red-700 border-red-200",
    icon: Flame,
  },
  {
    label: "Important Priority",
    scoreRange: "Score 5 - 6",
    desc: "Required baseline for smooth technical communication and role execution.",
    hex: "#d97706",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
    icon: AlertTriangle,
  },
  {
    label: "Baseline Priority",
    scoreRange: "Score < 5",
    desc: "Core orientation topics usually trained or tested at fundamental level.",
    hex: "#2563eb",
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
    icon: Info,
  },
];

interface SkillCardProps {
  skill: DashboardSkill;
  topics: SkillTopic[];
  defaultExpanded?: boolean;
}

const SkillCard: React.FC<SkillCardProps> = ({
  skill,
  topics,
  defaultExpanded = false,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const bloomColor = skill.bloom.color;
  const targetLevel = skill.required_level;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-slate-300">
      {/* Top Header of Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-heading text-base font-bold text-slate-900">
              {skill.skill_set_name}
            </h3>
            {/* Bloom Badge */}
            <span
              className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-bold"
              style={{
                borderColor: `${bloomColor}40`,
                backgroundColor: `${bloomColor}15`,
                color: bloomColor,
              }}
            >
              Bloom: {skill.bloom.code} ({skill.bloom.label})
            </span>
            {/* Criticality Badge */}
            <span
              className={cn(
                "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold",
                skill.criticality.badgeClass
              )}
            >
              {skill.criticality.label}
            </span>
          </div>
          <p className="text-xs text-slate-500">
            {skill.bloom.description}
          </p>
        </div>

        {/* Score Display */}
        <div className="flex items-baseline gap-1 text-right shrink-0">
          <span className="font-heading text-2xl font-bold text-slate-900">
            {targetLevel}
          </span>
          <span className="text-xs font-medium text-slate-400">/ 10</span>
          <span className="ml-2 text-xs font-semibold uppercase text-slate-500">
            ({skill.difficulty})
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 space-y-1.5">
        <div className="flex justify-between text-[11px] font-semibold text-slate-500">
          <span>Proficiency Target: {skill.required_proficiency}</span>
          <span>Level {targetLevel} of 10</span>
        </div>
        <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${(targetLevel / 10) * 100}%`,
              backgroundColor: bloomColor,
            }}
          />
        </div>
      </div>

      {/* Toggle Button for 10-Level Roadmap */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        <span className="text-xs text-slate-500 font-medium">
          {topics.length}-level syllabus progression ladder
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
        >
          {expanded ? (
            <>
              <span>Hide Roadmap</span>
              <ChevronUp className="h-3.5 w-3.5" />
            </>
          ) : (
            <>
              <span>View 10-Level Roadmap</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </>
          )}
        </Button>
      </div>

      {/* Expandable 10-Level Roadmap */}
      {expanded && (
        <div className="mt-4 border-t border-slate-100 pt-3 space-y-2">
          <div className="grid grid-cols-1 gap-2">
            {topics.map((t) => {
              const isTargetOrBelow = t.level_number <= targetLevel;
              const isExactTarget = t.level_number === targetLevel;

              return (
                <div
                  key={t.level_number}
                  className={cn(
                    "flex items-center justify-between rounded-lg border p-2.5 text-xs transition-colors",
                    isTargetOrBelow
                      ? "border-blue-100 bg-blue-50/40 text-slate-800"
                      : "border-slate-100 bg-slate-50/60 text-slate-400"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold font-mono",
                        isTargetOrBelow
                          ? "bg-blue-600 text-white shadow-2xs"
                          : "bg-slate-200 text-slate-500"
                      )}
                    >
                      {t.level_number}
                    </span>
                    <span
                      className={cn(
                        "font-medium",
                        isTargetOrBelow ? "text-slate-900" : "text-slate-400"
                      )}
                    >
                      {t.topic}
                    </span>
                  </div>

                  <div className="shrink-0 pl-2">
                    {isExactTarget ? (
                      <span className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-2xs">
                        <Target className="h-3 w-3" />
                        Target Level
                      </span>
                    ) : isTargetOrBelow ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-700">
                        <CheckCircle className="h-3.5 w-3.5 text-blue-600" />
                        Required
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                        <Lock className="h-3.5 w-3.5" />
                        Beyond scope
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export const SkillIntelligence: React.FC = () => {
  const { selectedCompanyId, selectedCompany, isInitialized } = useCompany();
  const navigate = useNavigate();

  // Route Guard: If selected company missing, redirect to "/"
  useEffect(() => {
    if (isInitialized && !selectedCompanyId && !selectedCompany) {
      navigate("/", { replace: true });
    }
  }, [isInitialized, selectedCompanyId, selectedCompany, navigate]);

  // Phase 2: Fetch skills from the 4 authorized skill tables via React Query hook
  const effectiveId = selectedCompanyId || selectedCompany?.company_id || 1;
  const { data: skillsData, isLoading, isError, refetch } = useCompanySkills(effectiveId);

  // Sort skills desc by required_level
  const sortedSkills = useMemo(() => {
    const list = skillsData?.skills || [];
    return [...list].sort((a, b) => b.required_level - a.required_level);
  }, [skillsData]);

  const topicsMap = skillsData?.topicsMap || {};

  if (!isInitialized) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-16 w-full rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-5">
          <div className="flex items-center gap-3.5">
            <Skeleton className="h-14 w-14 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-56" />
              <Skeleton className="h-4 w-72" />
            </div>
          </div>
          <Skeleton className="h-12 w-28 rounded-xl" />
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
          <Skeleton className="h-5 w-64" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-lg" />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-36 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50/40 py-16 px-4 text-center">
        <AlertCircle className="h-10 w-10 text-red-600 mb-3" />
        <h2 className="font-heading text-lg font-bold text-slate-900">
          Unable to Load Skill Matrices
        </h2>
        <p className="mt-1 max-w-md text-xs sm:text-sm text-slate-600">
          Failed to fetch competencies from skill tables (company_skill_levels, skill_set_master, proficiency_levels, skill_set_topics).
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          className="mt-5 gap-1.5 shadow-xs"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Retry Request
        </Button>
      </div>
    );
  }

  const short = selectedCompany?.short_json || {};
  const companyDisplayName = short.short_name || short.name || "Company";

  return (
    <div className="space-y-8">
      {/* Header: Company Logo + "{Company} Skill Intelligence" */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3.5">
          <CompanyLogo
            name={short.name || "Company"}
            websiteUrl={short.website_url}
            dbLogoUrl={short.logo_url}
            size="lg"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                {companyDisplayName} Skill Intelligence
              </h1>
              <Badge variant="outline" className="hidden sm:inline-flex">
                Assessment Matrix
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Required technical competencies mapped to Bloom's taxonomy & 10-level preparation ladders
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-center">
            <span className="block text-xs font-medium text-slate-500">
              Evaluated Skills
            </span>
            <span className="font-heading text-xl font-bold text-slate-900">
              {sortedSkills.length}
            </span>
          </div>
        </div>
      </div>

      {/* Bloom's 5-Column Legend */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-700">
            Bloom's Taxonomy Proficiency Mapping
          </h2>
          <span className="text-xs text-slate-400">5 Cognitive Levels</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {BLOOM_LEVELS.map((bloom) => (
            <div
              key={bloom.code}
              className={cn("rounded-lg border p-3 text-left space-y-1", bloom.bg)}
            >
              <div className="flex items-center justify-between">
                <span
                  className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold"
                  style={{ backgroundColor: bloom.hex, color: "#fff" }}
                >
                  {bloom.code}
                </span>
                <span className="text-[10px] font-bold font-mono opacity-80">
                  {bloom.code === "CU" && "L1–2"}
                  {bloom.code === "AP" && "L3–4"}
                  {bloom.code === "AS" && "L5–6"}
                  {bloom.code === "EV" && "L7–8"}
                  {bloom.code === "CR" && "L9–10"}
                </span>
              </div>
              <p className="font-heading text-xs font-bold text-slate-900">
                {bloom.name}
              </p>
              <p className="text-[11px] opacity-80 leading-tight">
                {bloom.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Criticality 3-Card Legend */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CRITICALITY_LEGEND.map((crit) => {
          const Icon = crit.icon;
          return (
            <div
              key={crit.label}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-bold",
                      crit.badgeClass
                    )}
                  >
                    <Icon className="h-3 w-3" />
                    {crit.label}
                  </span>
                </div>
                <span className="font-mono text-xs font-semibold text-slate-500">
                  {crit.scoreRange}
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-600 leading-normal">
                {crit.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Skill Cards (Sorted desc by required_level) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-slate-900">
            Required Competencies Ladder ({sortedSkills.length})
          </h2>
          <span className="text-xs font-medium text-slate-500">
            Sorted by Required Assessment Level (Desc)
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {sortedSkills.map((skill) => (
            <SkillCard
              key={skill.skill_set_id}
              skill={skill}
              topics={topicsMap[skill.skill_set_id] || []}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
