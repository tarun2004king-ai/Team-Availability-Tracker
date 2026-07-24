export default function StatsBar({ users }) {
  const total = users.length;
  const available = users.filter((u) => u.isAvailable).length;
  const busy = total - available;

  return (
    <div className="stats">
      <div className="stats__item">
        <span className="stats__value">{total}</span>
        <span className="stats__label">Team members</span>
      </div>
      <div className="stats__divider" aria-hidden="true" />
      <div className="stats__item">
        <span className="stats__value stats__value--available">{available}</span>
        <span className="stats__label">Available</span>
      </div>
      <div className="stats__divider" aria-hidden="true" />
      <div className="stats__item">
        <span className="stats__value stats__value--busy">{busy}</span>
        <span className="stats__label">Busy</span>
      </div>
    </div>
  );
}
