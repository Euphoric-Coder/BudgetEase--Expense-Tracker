import {
  Plus,
  DollarSign,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Star,
  Bot,
  Shield,
  PieChart,
  Bell,
  Target,
  BarChart3,
  FileText,
  Zap,
  Calendar,
  CreditCard,
} from "lucide-react";

export const features = [
  {
    title: "Smart Expense Tracking",
    description:
      "Add, edit, and categorize expenses with intelligent auto-categorization. Track spending patterns across multiple categories.",
    icon: <DollarSign className="w-6 h-6 text-blue-400" />,
  },
  {
    title: "Income Management",
    description:
      "Track multiple income sources with recurring entries. Monitor salary, freelance work, and passive income streams.",
    icon: <TrendingUp className="w-6 h-6 text-blue-400" />,
  },
  {
    title: "Budget Planning & Tracking",
    description:
      "Set monthly budgets by category and track progress in real-time. Get alerts when approaching limits.",
    icon: <Target className="w-6 h-6 text-blue-400" />,
  },
  {
    title: "Visual Analytics",
    description:
      "Dynamic charts and graphs powered by Recharts. Visualize spending patterns with category and time-based breakdowns.",
    icon: <PieChart className="w-6 h-6 text-blue-400" />,
  },
  {
    title: "Smart Reminders",
    description:
      "Never miss a bill payment with intelligent reminders. Get notified about recurring expenses and budget limits.",
    icon: <Bell className="w-6 h-6 text-blue-400" />,
  },
  {
    title: "AI Financial Advisor",
    description:
      "Get personalized financial advice powered by AI. Receive smart recommendations to optimize your spending and savings.",
    icon: <Bot className="w-6 h-6 text-blue-400" />,
  },
  {
    title: "Secure Data Protection",
    description:
      "Bank-level security with NextAuth authentication. Your financial data is encrypted and protected with industry standards.",
    icon: <Shield className="w-6 h-6 text-blue-400" />,
  },
  {
    title: "Export & Reports",
    description:
      "Generate detailed PDF reports and export data. Download monthly statements for tax preparation and record keeping.",
    icon: <FileText className="w-6 h-6 text-blue-400" />,
  },
  {
    title: "Real-time Insights",
    description:
      "Get instant insights into your financial health. Track trends, identify patterns, and make informed decisions.",
    icon: <BarChart3 className="w-6 h-6 text-blue-400" />,
  },
];

export const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Freelance Designer",
    initials: "SJ",
    quote:
      "BudgetEase has completely transformed how I manage my finances. The AI recommendations helped me save $500 last month!",
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    initials: "MC",
    quote:
      "The expense tracking is so intuitive. I love how it automatically categorizes my spending and shows me where my money goes.",
  },
  {
    name: "Emily Rodriguez",
    role: "Small Business Owner",
    initials: "ER",
    quote:
      "Managing business expenses has never been easier. The reporting features are perfect for tax season.",
  },
  {
    name: "David Wilson",
    role: "College Student",
    initials: "DW",
    quote:
      "As a student on a tight budget, BudgetEase helps me track every dollar. The budget alerts keep me on track.",
  },
  {
    name: "Lisa Park",
    role: "Marketing Manager",
    initials: "LP",
    quote:
      "The visual analytics are amazing! I can see exactly where I'm overspending and adjust my habits accordingly.",
  },
  {
    name: "James Martinez",
    role: "Entrepreneur",
    initials: "JM",
    quote:
      "The AI financial advisor is like having a personal finance expert. It gives me actionable insights to improve my financial health.",
  },
];

export const pricingPlans = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "Perfect for individuals starting their financial journey",
    features: [
      "Track up to 100 transactions/month",
      "Basic expense categorization",
      "Simple budget tracking",
      "Monthly spending reports",
      "Email support",
    ],
    popular: false,
    buttonText: "Get Started Free",
    buttonVariant: "outline",
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    description: "Ideal for serious budgeters and small business owners",
    features: [
      "Unlimited transactions",
      "Advanced analytics & insights",
      "AI-powered financial advice",
      "Custom budget categories",
      "Bill reminders & notifications",
      "PDF export & reports",
      "Priority support",
    ],
    popular: true,
    buttonText: "Most Popular",
    buttonVariant: "default",
  },
  {
    name: "Business",
    price: "$29",
    period: "per month",
    description: "Complete financial management for businesses and teams",
    features: [
      "Everything in Pro",
      "Multi-user collaboration",
      "Advanced reporting suite",
      "Tax preparation tools",
      "API access",
      "Custom integrations",
      "Dedicated account manager",
      "White-label options",
    ],
    popular: false,
    buttonText: "Go Business",
    buttonVariant: "outline",
  },
];

export const budgetBenefits = [
  "Track <strong>unlimited transactions</strong> across multiple accounts and categories",
  "Get <strong>AI-powered insights</strong> to optimize your spending and increase savings",
  "Set <strong>smart budgets</strong> with automatic alerts when approaching limits",
  "Visualize your finances with <strong>interactive charts</strong> and spending analytics",
  "Never miss payments with <strong>intelligent bill reminders</strong> and notifications",
  "Export detailed <strong>PDF reports</strong> for tax preparation and financial planning",
  "Secure <strong>bank-level encryption</strong> protects your sensitive financial data",
  "Access your budget from <strong>any device</strong> with responsive web design",
];

export const categories = [
  {
    name: "Personal Finance",
    description: "Individual expense tracking and budget management",
    icon: "💰",
    users: 15000,
    features: ["Expense Tracking", "Budget Planning", "Savings Goals"],
  },
  {
    name: "Business Finance",
    description: "Small business expense management and reporting",
    icon: "🏢",
    users: 3500,
    features: ["Business Expenses", "Tax Reporting", "Team Collaboration"],
  },
  {
    name: "Investment Tracking",
    description: "Monitor investment performance and portfolio growth",
    icon: "📈",
    users: 8200,
    features: ["Portfolio Tracking", "Performance Analytics", "Goal Setting"],
  },
  {
    name: "Bill Management",
    description: "Automated bill tracking and payment reminders",
    icon: "📋",
    users: 12000,
    features: ["Bill Reminders", "Payment Tracking", "Due Date Alerts"],
  },
  {
    name: "Savings Goals",
    description: "Set and track progress toward financial goals",
    icon: "🎯",
    users: 9800,
    features: ["Goal Setting", "Progress Tracking", "Milestone Rewards"],
  },
  {
    name: "Analytics & Reports",
    description: "Comprehensive financial insights and reporting",
    icon: "📊",
    users: 11500,
    features: ["Spending Analytics", "Trend Analysis", "Custom Reports"],
  },
];

export const stats = [
  {
    number: "50,000+",
    label: "Active Users",
    description: "Trust BudgetEase with their finances",
  },
  {
    number: "$2.5M+",
    label: "Money Tracked",
    description: "Total transactions managed",
  },
  {
    number: "25%",
    label: "Average Savings",
    description: "Users save on average",
  },
  {
    number: "99.9%",
    label: "Uptime",
    description: "Reliable financial tracking",
  },
];

export const platformFeatures = [
  {
    title: "For Individuals",
    description: "Personal finance management made simple",
    features: [
      "Track daily expenses",
      "Set monthly budgets",
      "Monitor spending patterns",
      "Receive smart alerts",
      "Export financial reports",
      "AI spending insights",
      "Goal tracking",
    ],
    color: "from-blue-500/10 to-blue-600/5",
    icon: "👤",
  },
  {
    title: "For Families",
    description: "Collaborative budgeting for households",
    features: [
      "Shared family budgets",
      "Multiple user accounts",
      "Child spending tracking",
      "Family financial goals",
      "Allowance management",
      "Expense approval system",
      "Family reports",
    ],
    color: "from-purple-500/10 to-purple-600/5",
    icon: "👨‍👩‍👧‍👦",
  },
  {
    title: "For Businesses",
    description: "Professional expense management for teams",
    features: [
      "Team expense tracking",
      "Business category management",
      "Tax preparation tools",
      "Employee reimbursements",
      "Advanced reporting",
      "API integrations",
      "Multi-currency support",
    ],
    color: "from-green-500/10 to-green-600/5",
    icon: "🏢",
  },
  {
    title: "For Investors",
    description: "Investment tracking and portfolio management",
    features: [
      "Portfolio performance tracking",
      "Investment goal setting",
      "Market trend analysis",
      "Dividend tracking",
      "Asset allocation insights",
      "Risk assessment",
      "Investment reports",
    ],
    color: "from-orange-500/10 to-orange-600/5",
    icon: "📈",
  },
];
