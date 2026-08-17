// Central registry: one place that knows what the Topbar should
// show for any given route. Add a new page here once, and every
// route automatically gets the right title/subtitle/search toggle
// — no page has to pass props to Topbar itself.

const PageConfig = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Overview of your spending and finances.",
    showSearch: true,
  },
  "/expenses": {
    title: "Expenses",
    subtitle: "Manage and track all your expenses.",
    showSearch: true,
  },
  "/budget": {
    title: "Budget",
    subtitle: "Set limits and track your progress.",
    showSearch: false,
  },
  "/categories": {
    title: "Categories",
    subtitle: "Organize how your expenses are grouped.",
    showSearch: false,
  },
  "/analytics": {
    title: "Analytics",
    subtitle: "Deeper insights into your spending habits.",
    showSearch: false,
  },
  "/reports": {
    title: "Reports",
    subtitle: "Generate and export spending reports.",
    showSearch: false,
  },
  "/profile": {
    title: "Profile",
    subtitle: "Manage your personal information.",
    showSearch: false,
  },
  "/settings": {
    title: "Settings",
    subtitle: "Configure your account preferences.",
    showSearch: false,
  },
  "/help": {
    title: "Help",
    subtitle: "Find answers and support.",
    showSearch: false,
  },
};

// Fallback for any route not listed above, so Topbar never
// renders blank/undefined if a new page gets added and someone
// forgets to register it here.
export const defaultPageConfig = {
  title: "Expense Tracker",
  subtitle: "",
  showSearch: false,
};

export default PageConfig;