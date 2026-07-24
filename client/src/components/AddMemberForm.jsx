import { useState } from "react";


export default function AddMemberForm({ onAdd, isSubmitting }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !role.trim()) return;
    onAdd(name.trim(), role.trim());
    setName("");
    setRole("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        className="add-form__input"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        aria-label="New team member name"
      />
      <input
        className="add-form__input"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        aria-label="New team member role"
      />
      <button className="add-form__submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding…" : "Add member"}
      </button>
    </form>
  );
}
