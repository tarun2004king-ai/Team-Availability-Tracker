export default function Toggle({ isAvailable, isPending, hasError, onToggle }) {
  const label = isAvailable ? "Available" : "Busy";

  const stateClass = hasError
    ? "toggle--error"
    : isPending
    ? "toggle--pending"
    : isAvailable
    ? "toggle--available"
    : "toggle--busy";

  return (
    <button
      type="button"
      className={`toggle ${stateClass}`}
      onClick={onToggle}
      disabled={isPending}
      role="switch"
      aria-checked={isAvailable}
      aria-label={`Mark as ${isAvailable ? "busy" : "available"}`}
    >
      <span className="toggle__dot" aria-hidden="true" />
      <span className="toggle__label">
        {hasError ? "Retry" : isPending ? "Updating…" : label}
      </span>
    </button>
  );
}
