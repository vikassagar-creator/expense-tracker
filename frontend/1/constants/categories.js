// Single source of truth for expense categories. Import this
// everywhere instead of retyping the list, so "Other" vs "Others"
// (or any future category change) can't drift out of sync again.
export const CATEGORIES = [
  "Food",
  "Transport",
  "Entertainment",
  "Shopping",
  "Other",
];

export const CATEGORIES_WITH_ALL = ["All", ...CATEGORIES];

// ADD THIS: one color per category, reused anywhere a category badge/chip renders
export const CATEGORY_COLORS = {
  Food: "#d97757",
  Transport: "#6b8f71",
  Entertainment: "#e7b86a",
  Shopping: "#1f4d3a",
  Other: "#8c9a8b",
};

export const getCategoryColor = (category) =>
  CATEGORY_COLORS[category] || CATEGORY_COLORS.Other;
