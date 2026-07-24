import Toggle from "./Toggle.jsx";


export default function UserRow({ user, isPending, hasError, onToggle, onRemove }) {
  const initial = user.name.charAt(0).toUpperCase();

  return (
    <tr className={`row ${user.isAvailable ? "row--available" : ""}`}>
      <td className="row__person">
        <span className="row__avatar" aria-hidden="true">
          {initial}
        </span>
        <span className="row__text">
          <span className="row__name">{user.name}</span>
          <span className="row__role">{user.role}</span>
        </span>
      </td>
      <td className="row__status">
        <Toggle
          isAvailable={user.isAvailable}
          isPending={isPending}
          hasError={hasError}
          onToggle={() => onToggle(user)}
        />
      </td>
      <td className="row__actions">
        <button
          type="button"
          className="row__remove"
          onClick={() => onRemove(user._id)}
          aria-label={`Remove ${user.name}`}
        >
          Remove
        </button>
      </td>
    </tr>
  );
}
