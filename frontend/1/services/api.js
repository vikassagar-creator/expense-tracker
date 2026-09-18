import axiosClient from "./axiosClient";

// Thin wrappers around axiosClient for auth + profile endpoints.
// Expense/budget/report calls are made directly with axiosClient (or
// raw fetch, in older pages) rather than through here — see
// axiosClient.js's own note about which pages haven't migrated yet.

// ---- Auth ----

async function loginUser(username, password) {
  const { data } = await axiosClient.post("/users/login", {
    username,
    password,
  });
  return data;
}

async function registerUser(username, email, password) {
  const { data } = await axiosClient.post("/users/register", {
    username,
    email,
    password,
  });
  return data;
}

// ---- Profile ----

async function getProfile() {
  const { data } = await axiosClient.get("/users/me");
  return data;
}

async function updateProfile(updates) {
  const { data } = await axiosClient.put("/users/me", updates);
  return data;
}

async function changePassword(currentPassword, newPassword) {
  const { data } = await axiosClient.post("/users/change-password", {
    current_password: currentPassword,
    new_password: newPassword,
  });
  return data;
}

export {
  axiosClient,
  loginUser,
  registerUser,
  getProfile,
  updateProfile,
  changePassword,
};
