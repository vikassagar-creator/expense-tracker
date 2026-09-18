// Central registry: one place that knows what the Topbar should
// show for any given route. Add a new page here once, and every
// route automatically gets the right title/subtitle — no page has
// to pass props to Topbar itself.

const PageConfig = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Overview of your spending and finances.",
  },
  "/expenses": {
    title: "Expenses",
    subtitle: "Manage and track all your expenses.",
  },
  "/budget": {
    title: "Budget",
    subtitle: "Set limits and track your progress.",
  },
  "/categories": {
    title: "Categories",
    subtitle: "Organize how your expenses are grouped.",
  },
  "/analytics": {
    title: "Analytics",
    subtitle: "Deeper insights into your spending habits.",
  },
  "/reports": {
    title: "Reports",
    subtitle: "Generate and export spending reports.",
  },
  "/profile": {
    title: "Profile",
    subtitle: "Manage your personal information.",
  },
  "/settings": {
    title: "Settings",
    subtitle: "Configure your account preferences.",
  },
  "/help": {
    title: "Help",
    subtitle: "Find answers and support.",
  },
};

// Fallback for any route not listed above, so Topbar never
// renders blank/undefined if a new page gets added and someone
// forgets to register it here.
export const defaultPageConfig = {
  title: "Expense Tracker",
  subtitle: "",
};

export default PageConfig;
