export const DASHBOARD_NAV = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard", tKey: "nav.dashboard" },
  { label: "Automobile Lab", href: "/dashboard/automobile", icon: "Car", tKey: "nav.automobile" },
  { label: "Civil Lab", href: "/dashboard/civil", icon: "Building2", tKey: "nav.civil" },
  { label: "Physics Lab", href: "/dashboard/physics", icon: "Zap", tKey: "nav.physics" },
  { label: "Chemistry Lab", href: "/dashboard/chemistry", icon: "FlaskConical", tKey: "nav.chemistry" },
  { label: "Electronics Lab", href: "/dashboard/electronics", icon: "Cpu", tKey: "nav.electronics" },
  { label: "AI Tutor", href: "/dashboard/ai-tutor", icon: "Bot", tKey: "nav.ai_tutor" },

  { label: "Profile", href: "/dashboard/profile", icon: "UserCircle", tKey: "nav.profile" },
];

export const STATS = [
  { value: "50,000+", label: "Active Students" },
  { value: "200+", label: "Lab Experiments" },
  { value: "15+", label: "Universities" },
  { value: "99.9%", label: "Uptime" },
];

export const FEATURES = [
  {
    id: "automobile",
    title: "Automobile Virtual Lab",
    description: "Interactive 3D engine exploration, gearbox simulation, fuel system visualization, and brake system training.",
    icon: "Car",
    experiments: ["3D Engine Explorer", "Gearbox Simulation", "Fuel System", "Brake Training"],
  },
  {
    id: "electronics",
    title: "Electronics Lab",
    description: "Circuit builder with drag and drop, Ohm's law calculator, series/parallel, and fault detection.",
    icon: "Cpu",
    experiments: ["Circuit Builder", "Series & Parallel", "Ohm's Calculator", "Fault Detection"],
  },
  {
    id: "civil",
    title: "Civil Engineering Lab",
    description: "Building structure simulator, concrete mix calculator, beam load testing, and quantity survey tools.",
    icon: "Building2",
    experiments: ["Structure Simulator", "Concrete Mix Calc", "Beam Load Testing", "Quantity Survey"],
  },
  {
    id: "physics",
    title: "Physics Virtual Lab",
    description: "Ohm's law simulator, circuit builder, motion experiments, and electricity simulations.",
    icon: "Zap",
    experiments: ["Ohm's Law", "Circuit Builder", "Motion Lab", "Force Analysis"],
  },
  {
    id: "chemistry",
    title: "Chemistry Virtual Lab",
    description: "Virtual chemical reactions, pH testing, titration simulator, and interactive periodic table.",
    icon: "FlaskConical",
    experiments: ["Virtual Reactions", "pH Testing", "Titration", "Periodic Table"],
  },
  {
    id: "ai",
    title: "AI Study Assistant",
    description: "Ask engineering questions, explain concepts, generate notes, solve problems, and create quizzes.",
    icon: "Bot",
    experiments: ["Q&A Assistant", "Concept Explainer", "Note Generator", "Quiz Creator"],
  },
];

export const TESTIMONIALS = [
  {
    name: "Aravind Kumar",
    role: "Automobile Engineering Student",
    university: "Anna University",
    content: "TechLab 360 completely transformed how I study engine mechanics. The 3D simulations are incredibly detailed and the AI tutor explains concepts so clearly!",
    avatar: "AK",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Civil Engineering Student",
    university: "IIT Madras",
    content: "The beam load testing simulator helped me ace my structural analysis exam. I practiced for hours without needing real equipment. Absolutely brilliant!",
    avatar: "PS",
    rating: 5,
  },
  {
    name: "Mohammed Rafiq",
    role: "Physics Teacher",
    university: "Chennai Polytechnic",
    content: "My students' scores improved by 40% after using TechLab 360. The circuit builder makes learning Ohm's law engaging and fun for everyone.",
    avatar: "MR",
    rating: 5,
  },
];

export const ACHIEVEMENTS = [
  { id: "first-lab", label: "First Lab", icon: "🔬", description: "Completed your first experiment", unlocked: true },
  { id: "ohms-master", label: "Ohm's Master", icon: "⚡", description: "Mastered Ohm's Law simulator", unlocked: true },
  { id: "engine-expert", label: "Engine Expert", icon: "🔧", description: "Explored all engine components", unlocked: true },
  { id: "chemistry-wizard", label: "Chem Wizard", icon: "🧪", description: "Completed 10 chemical reactions", unlocked: false },
  { id: "civil-architect", label: "Civil Architect", icon: "🏗️", description: "Designed 5 building structures", unlocked: false },
  { id: "ai-power-user", label: "AI Power User", icon: "🤖", description: "Asked 50 AI questions", unlocked: false },
];
