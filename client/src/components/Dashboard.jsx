import { useEffect, useState } from "react";
import { fetchUsers, setAvailability, createUser, deleteUser } from "../api/userApi.js";
import UserRow from "./UserRow.jsx";
import StatsBar from "./StatsBar.jsx";
import AddMemberForm from "./AddMemberForm.jsx";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("loading"); // "loading" | "ready" | "error"
  const [pendingIds, setPendingIds] = useState(new Set());
  const [errorIds, setErrorIds] = useState(new Set());
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetchUsers()
      .then((data) => {
        if (!cancelled) {
          setUsers(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  /**
   * Toggle handler: the heart of the state-sync requirement.
   * 1. Flip the value in local state right away (optimistic).
   * 2. PATCH the server.
   * 3. On success, reconcile with whatever the server actually saved.
   * 4. On failure, roll back and flag that row's error state.
   */
  async function handleToggle(user) {
    const nextValue = !user.isAvailable;

    setUsers((prev) =>
      prev.map((u) => (u._id === user._id ? { ...u, isAvailable: nextValue } : u))
    );
    setPendingIds((prev) => new Set(prev).add(user._id));
    setErrorIds((prev) => {
      const next = new Set(prev);
      next.delete(user._id);
      return next;
    });

    try {
      const saved = await setAvailability(user._id, nextValue);
      setUsers((prev) => prev.map((u) => (u._id === user._id ? saved : u)));
    } catch {
      // Roll back to the value before the click.
      setUsers((prev) =>
        prev.map((u) => (u._id === user._id ? { ...u, isAvailable: user.isAvailable } : u))
      );
      setErrorIds((prev) => new Set(prev).add(user._id));
    } finally {
      setPendingIds((prev) => {
        const next = new Set(prev);
        next.delete(user._id);
        return next;
      });
    }
  }

  async function handleAdd(name, role) {
    setIsAdding(true);
    try {
      const created = await createUser(name, role);
      setUsers((prev) => [...prev, created]);
    } catch {
      // Adding is non-destructive to existing rows, so a lightweight
      // console warning is enough here rather than a global error banner.
      console.warn("Failed to add team member");
    } finally {
      setIsAdding(false);
    }
  }

  async function handleRemove(id) {
    const prevUsers = users;
    setUsers((prev) => prev.filter((u) => u._id !== id));
    try {
      await deleteUser(id);
    } catch {
      setUsers(prevUsers); // restore the row if the delete didn't actually happen
    }
  }

  if (status === "loading") {
    return <div className="state-message">Loading team roster…</div>;
  }

  if (status === "error") {
    return (
      <div className="state-message state-message--error">
        Couldn't reach the server. Confirm the API is running on the URL set in
        <code> client/.env</code>.
      </div>
    );
  }

  return (
    <div className="dashboard">
      <StatsBar users={users} />

      <div className="table-card">
        <table className="table">
          <thead>
            <tr>
              <th>Team member</th>
              <th>Status</th>
              <th className="table__actions-head" aria-hidden="true"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserRow
                key={user._id}
                user={user}
                isPending={pendingIds.has(user._id)}
                hasError={errorIds.has(user._id)}
                onToggle={handleToggle}
                onRemove={handleRemove}
              />
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="state-message">No team members yet — add the first one below.</div>
        )}
      </div>

      <AddMemberForm onAdd={handleAdd} isSubmitting={isAdding} />
    </div>
  );
}
