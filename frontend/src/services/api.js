const Base_URL = import.meta.env.VITE_API_URL;

function getHeaders() {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
}

async function handleResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.detail || "Something went wrong");
  }
  return data;
}

// ---- Auth ----

async function loginUser(username, password) {
  const response = await fetch(`${Base_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return handleResponse(response);
}

async function registerUser(username, email, password) {
  const response = await fetch(`${Base_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  return handleResponse(response);
}

// ---- Profile ----

async function getProfile() {
  const response = await fetch(`${Base_URL}/users/me`, getHeaders());
  return handleResponse(response);
}

async function updateProfile(updates) {
  const response = await fetch(`${Base_URL}/users/me`, {
    method: "PUT",
    ...getHeaders(),
    body: JSON.stringify(updates),
  });
  return handleResponse(response);
}

async function changePassword(currentPassword, newPassword) {
  const response = await fetch(`${Base_URL}/users/change-password`, {
    method: "POST",
    ...getHeaders(),
    body: JSON.stringify({
      current_password: currentPassword,
      new_password: newPassword,
    }),
  });
  return handleResponse(response);
}

export {
  Base_URL,
  getHeaders,
  loginUser,
  registerUser,
  getProfile,
  updateProfile,
  changePassword,
};
