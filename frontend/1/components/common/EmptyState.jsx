import "./EmptyState.css";

// Shared "nothing here yet" state. `variant="compact"` shrinks the
// icon/padding for use inside smaller cards (e.g. a chart panel) —
// see ChartEmptyState.jsx, which is a thin wrapper around this with
// variant="compact" baked in.
function EmptyState({
  icon,
  title,
  message,
  actionLabel,
  onAction,
  variant = "page",
}) {
  return (
    <div
      className={`empty-state ${variant === "compact" ? "empty-state--compact" : ""}`}
    >
      <div className="empty-state-icon">{icon}</div>

      <h3>{title}</h3>

      <p>{message}</p>

      {actionLabel && onAction && (
        <button type="button" className="empty-state-action" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
