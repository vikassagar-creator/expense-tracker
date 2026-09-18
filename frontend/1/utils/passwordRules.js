// Shared password rules — used by both the registration form and
// the change-password form so the requirements never drift apart.
export const PASSWORD_RULES = [
  {
    id: "length",
    label: "At least 8 characters",
    test: (pw) => pw.length >= 8,
  },
  {
    id: "upper",
    label: "One uppercase letter",
    test: (pw) => /[A-Z]/.test(pw),
  },
  {
    id: "lower",
    label: "One lowercase letter",
    test: (pw) => /[a-z]/.test(pw),
  },
  { id: "number", label: "One number", test: (pw) => /[0-9]/.test(pw) },
  {
    id: "special",
    label: "One special character",
    test: (pw) => /[^A-Za-z0-9]/.test(pw),
  },
];

export function isPasswordValid(password) {
  return PASSWORD_RULES.every((rule) => rule.test(password));
}
