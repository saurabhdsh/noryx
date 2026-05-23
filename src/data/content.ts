import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Braces,
  ChartBar,
  ClipboardCheck,
  Database,
  FileJson,
  Gauge,
  GitBranch,
  Globe,
  Layers,
  Lightbulb,
  Link2,
  Monitor,
  Play,
  Radio,
  Scan,
  Settings,
  Shield,
  Sparkles,
  Terminal,
  Webhook,
  Zap,
} from "lucide-react";

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Agents", href: "#agents" },
  { label: "Evaluators", href: "#evaluators" },
  { label: "Pricing", href: "#pricing" },
  { label: "Integrations", href: "#integrations" },
] as const;

export const TRUST_LOGOS = ["Microsoft", "AWS", "Google Cloud", "GitHub"] as const;

export const PROBLEMS = [
  { icon: Bot, text: "Agents hallucinate and drift after deploy" },
  { icon: Shield, text: "PII leaks slip past manual spot checks" },
  { icon: Settings, text: "Tool calls fail silently in production" },
  { icon: Gauge, text: "Manual testing doesn't scale with agent count" },
] as const;

export const SOLUTIONS = [
  "Register every agent in one control plane",
  "Auto-generate suites from natural language",
  "Run evaluations in CI before merge",
  "Monitor live runs with production-grade evaluators",
] as const;

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Connect agents",
    description:
      "URL, Python file, Bedrock, Copilot Studio, Azure AI Foundry, Vertex, or custom REST.",
    icon: Link2,
  },
  {
    step: 2,
    title: "Build or generate test suites",
    description: "AI-powered test case generation from your agent description.",
    icon: Sparkles,
  },
  {
    step: 3,
    title: "Execute & evaluate",
    description: "Parallel runs with configurable evaluators and pass thresholds.",
    icon: Play,
  },
  {
    step: 4,
    title: "Act on insights",
    description: "Scores, HTML reports, recommendations, Jira and GitHub integrations.",
    icon: Lightbulb,
  },
] as const;

export type FeatureCategory = "connect" | "test" | "run" | "analyze" | "ship";

export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
  size: "sm" | "md" | "lg";
  hero?: boolean;
  accent: string;
  category: FeatureCategory;
};

export const FEATURE_CATEGORIES = [
  { id: "all" as const, label: "All", icon: Layers },
  { id: "connect" as const, label: "Connect", icon: Globe },
  { id: "test" as const, label: "Test", icon: Sparkles },
  { id: "run" as const, label: "Run", icon: Zap },
  { id: "analyze" as const, label: "Analyze", icon: ChartBar },
  { id: "ship" as const, label: "Ship", icon: GitBranch },
];

export const FEATURES: Feature[] = [
  {
    title: "External Agent Hub",
    description:
      "Hook Python classes, REST URLs, Bedrock, Copilot Studio, Azure AI Foundry, AgentSpace, Vertex, and M365 agents.",
    icon: Globe,
    size: "lg",
    hero: true,
    accent: "from-violet-500 to-cyan-500",
    category: "connect",
  },
  {
    title: "Evaluator Engine",
    description:
      "10+ production-grade evaluators with configurable thresholds, severity, and LLM-as-judge models.",
    icon: Scan,
    size: "lg",
    hero: true,
    accent: "from-cyan-500 to-fuchsia-500",
    category: "analyze",
  },
  {
    title: "CI/CD Gates",
    description:
      "API key auth with curl, GitHub Actions, and Jenkins examples — block deploys on eval scores.",
    icon: GitBranch,
    size: "lg",
    hero: true,
    accent: "from-amber-500 to-rose-500",
    category: "ship",
  },
  {
    title: "Chatbot, Voice & IVR",
    description: "Test HTTP chatbots, voice agents, and call-center flows from one panel.",
    icon: Radio,
    size: "md",
    accent: "from-pink-500 to-violet-500",
    category: "connect",
  },
  {
    title: "Test Suite Registry",
    description: "Versioned YAML suites, inline editor, PII pattern rules, priority tags.",
    icon: Braces,
    size: "sm",
    accent: "from-indigo-500 to-blue-500",
    category: "test",
  },
  {
    title: "AI Test Generation",
    description: "Describe your agent — noryx generates comprehensive test cases automatically.",
    icon: Sparkles,
    size: "md",
    accent: "from-violet-500 to-pink-500",
    category: "test",
  },
  {
    title: "Synthetic Data Studio",
    description: "Scenarios, personas, variables, tool-call formats — scratch or CSV mode.",
    icon: Database,
    size: "sm",
    accent: "from-cyan-500 to-teal-500",
    category: "test",
  },
  {
    title: "Test Execution Engine",
    description: "Background runs, live progress, multi-suite batch execution.",
    icon: Zap,
    size: "sm",
    accent: "from-amber-500 to-orange-500",
    category: "run",
  },
  {
    title: "Live Monitoring",
    description: "Real-time run status — watch tests execute as they happen.",
    icon: Gauge,
    size: "sm",
    accent: "from-emerald-500 to-cyan-500",
    category: "run",
  },
  {
    title: "Results & Analytics",
    description: "Pass rates, per-evaluator breakdowns, drill-down per test case.",
    icon: ChartBar,
    size: "md",
    accent: "from-blue-500 to-violet-500",
    category: "analyze",
  },
  {
    title: "Smart Recommendations",
    description: "AI insights from failed evaluators — what to fix first.",
    icon: Lightbulb,
    size: "sm",
    accent: "from-yellow-500 to-amber-500",
    category: "analyze",
  },
  {
    title: "HTML & JSON Reports",
    description: "Exportable audit-ready reports for stakeholders.",
    icon: FileJson,
    size: "sm",
    accent: "from-slate-400 to-slate-600",
    category: "analyze",
  },
  {
    title: "Observability",
    description: "Telemetry dashboards — agent metrics and event streams.",
    icon: Layers,
    size: "md",
    accent: "from-purple-500 to-indigo-500",
    category: "analyze",
  },
  {
    title: "Testing Rules",
    description: "Global thresholds per evaluator — enforce org standards.",
    icon: ClipboardCheck,
    size: "sm",
    accent: "from-rose-500 to-red-500",
    category: "test",
  },
  {
    title: "Evaluation Models",
    description: "Configure LLM models per evaluator — groundedness, G-Eval, and more.",
    icon: Bot,
    size: "sm",
    accent: "from-fuchsia-500 to-violet-500",
    category: "analyze",
  },
  {
    title: "Integrations",
    description: "Jira, Rally, GitHub, and outbound webhooks.",
    icon: Webhook,
    size: "sm",
    accent: "from-green-500 to-emerald-500",
    category: "ship",
  },
  {
    title: "Desktop App",
    description: "Electron bundle for local and offline evaluation workflows.",
    icon: Monitor,
    size: "sm",
    accent: "from-zinc-400 to-zinc-600",
    category: "ship",
  },
  {
    title: "CLI",
    description: "Power users run `aitest` from the terminal.",
    icon: Terminal,
    size: "sm",
    accent: "from-neutral-400 to-neutral-600",
    category: "ship",
  },
];

export const EVALUATORS = [
  {
    name: "PII Scanner",
    description: "Detects emails, SSNs, and custom patterns before they reach users.",
    color: "#EC4899",
    pass: true,
  },
  {
    name: "Groundedness",
    description: "Scores whether responses stay anchored to retrieved context.",
    color: "#06B6D4",
    pass: true,
  },
  {
    name: "Hallucination Detector",
    description: "Flags unsupported claims and fabricated facts in agent output.",
    color: "#7C3AED",
    pass: false,
  },
  {
    name: "Citation Correctness",
    description: "Validates that cited sources match actual retrieved documents.",
    color: "#F59E0B",
    pass: true,
  },
  {
    name: "Expected Outcome",
    description: "Compares agent output against defined success criteria per test.",
    color: "#10B981",
    pass: true,
  },
  {
    name: "Tool Call Correctness",
    description: "Verifies function names, arguments, and execution order.",
    color: "#3B82F6",
    pass: true,
  },
  {
    name: "G-Eval (LLM-as-judge)",
    description: "Configurable LLM rubric scoring for nuanced quality dimensions.",
    color: "#8B5CF6",
    pass: true,
  },
  {
    name: "DAG Metric",
    description: "Directed evaluation graphs for multi-step agent workflows.",
    color: "#F97316",
    pass: true,
  },
  {
    name: "Custom PII Patterns",
    description: "Per-suite regex and entity rules for regulated industries.",
    color: "#E11D48",
    pass: true,
  },
  {
    name: "Thresholds & Severity",
    description: "Org-wide pass bars with warn, fail, and block deploy levels.",
    color: "#6366F1",
    pass: true,
  },
] as const;

export const AGENT_PLATFORMS = [
  "Microsoft Copilot Studio",
  "Amazon Bedrock Agents",
  "Azure AI Foundry",
  "Google AgentSpace",
  "Vertex AI Agent Builder",
  "M365 Agent Builder",
  "Microsoft Agent Framework",
  "Custom REST",
  "Python agents",
] as const;

export const PRICING_PLANS = [
  {
    name: "Starter",
    price: { monthly: 49, annual: 39 },
    agents: "3 agents",
    agentCount: 3,
    popular: false,
    highlights: [
      "External agents",
      "Core evaluators",
      "Email support",
      "14-day trial",
    ],
    cta: "Start trial",
    href: "/signup?plan=starter",
  },
  {
    name: "Growth",
    price: { monthly: 149, annual: 119 },
    agents: "10 agents",
    agentCount: 10,
    popular: true,
    highlights: [
      "Everything in Starter",
      "Synthetic data studio",
      "CI/CD & integrations",
      "Priority support",
    ],
    cta: "Start trial",
    href: "/signup?plan=growth",
  },
  {
    name: "Business",
    price: { monthly: 499, annual: 399 },
    agents: "50 agents",
    agentCount: 50,
    popular: false,
    highlights: [
      "Everything in Growth",
      "Observability",
      "Custom rules",
      "SSO-ready & onboarding",
    ],
    cta: "Start trial",
    href: "/signup?plan=business",
  },
  {
    name: "Enterprise",
    price: { monthly: null, annual: null },
    agents: "Unlimited",
    agentCount: null,
    popular: false,
    highlights: [
      "Custom agents & SLA",
      "SAML/SSO & audit logs",
      "VPC deployment",
      "Dedicated CSM",
    ],
    cta: "Contact sales",
    href: "/signup?plan=enterprise",
  },
] as const;

export const FAQ = [
  {
    q: "What counts as an agent?",
    a: "Each external agent you register — whether via REST URL, Python class, Bedrock agentId, or Copilot connection — counts toward your plan limit. Archived agents free up slots immediately.",
  },
  {
    q: "Can I change plans anytime?",
    a: "Yes. Upgrade instantly for more agent slots; downgrades take effect at the next billing cycle. Prorated credits apply on annual plans.",
  },
  {
    q: "What's included in the 14-day trial?",
    a: "Full Growth-tier access: 10 agent slots, all evaluators, synthetic data, and CI/CD API keys. No credit card required to start.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Stripe-powered checkout accepts major cards, ACH for annual Business+, and invoicing for Enterprise contracts.",
  },
  {
    q: "What happens if I exceed my agent limit?",
    a: "New agent registrations pause until you archive agents or upgrade. Existing agents and scheduled runs continue uninterrupted.",
  },
] as const;

export const COMPARISON = {
  rows: [
    { feature: "Production-grade evaluators", noryx: true, manual: false, generic: "partial" },
    { feature: "CI/CD deploy gates", noryx: true, manual: false, generic: false },
    { feature: "Multi-platform agent connect", noryx: true, manual: false, generic: "partial" },
    { feature: "Agent-based subscription scaling", noryx: true, manual: false, generic: false },
  ],
  columns: ["noryx", "Manual testing", "Generic LLM eval"],
} as const;

export const INTEGRATIONS_CODE = `- name: noryx Agent Eval
  run: |
    curl -X POST https://api.noryx.test/v1/execute \\
      -H "Authorization: Bearer \${{ secrets.NORYX_API_KEY }}" \\
      -H "Content-Type: application/json" \\
      -d '{"suite_id": "prod-regression", "agent_id": "support-bot"}'`;

export const TESTIMONIALS = [
  {
    quote:
      "We gate every Copilot deploy on noryx scores. Hallucination regressions dropped 73% in the first quarter.",
    author: "Priya N.",
    role: "Head of AI Platform",
    company: "Fortune 500 retail",
  },
  {
    quote:
      "Our QA team went from spreadsheet chaos to versioned YAML suites with PII rules baked in. CI runs in under 4 minutes.",
    author: "Marcus T.",
    role: "QA Lead",
    company: "FinTech scale-up",
  },
  {
    quote:
      "The evaluator breakdown tells us exactly what to fix — groundedness vs tool calls — before users ever see a bad response.",
    author: "Elena K.",
    role: "ML Engineer",
    company: "Healthcare AI",
  },
] as const;

export const STATS = [
  { value: "10+", label: "evaluators" },
  { value: "8+", label: "agent platforms" },
  { value: "<5 min", label: "to first run" },
  { value: "CI-ready", label: "API" },
] as const;

export const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Evaluators", href: "#evaluators" },
    { label: "Integrations", href: "#integrations" },
  ],
  Resources: [{ label: "Changelog", href: "/changelog" }],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;
