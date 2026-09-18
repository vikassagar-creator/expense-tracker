import { LuTriangleAlert } from "react-icons/lu";
import "./ErrorState.css";

// Shared "something went wrong, try again" state — the counterpart to
// EmptyState.jsx, for actual fetch failures rather than empty data.
// Always shows a Retry button since there's no reason to show this
// without one.
function ErrorState({
  title = "Something went wrong",
  message = "Please try again.",
  onRetry,
}) {
  return (
    <div className="error-state">
      <div className="error-state-icon">
        <LuTriangleAlert />
      </div>

      <h3>{title}</h3>

      <p>{message}</p>

      {onRetry && (
        <button type="button" className="error-state-action" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorState;
