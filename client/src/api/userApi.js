const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";


export async function fetchUsers() {
  const res = await fetch(`${API_URL}/users`);
  if (!res.ok) throw new Error("Could not load the team list");
  return res.json();
}

export async function setAvailability(id, isAvailable) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isAvailable }),
  });
  if (!res.ok) throw new Error("Could not update availability");
  return res.json();
}

export async function createUser(name, role) {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, role }),
  });
  if (!res.ok) throw new Error("Could not add team member");
  return res.json();
}

export async function deleteUser(id) {
  const res = await fetch(`${API_URL}/users/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Could not remove team member");
  return res.json();
}
