import EmptyState from "./EmptyState";

// Thin wrapper around EmptyState with the compact variant baked in,
// for use inside chart cards. Previously this was a byte-for-byte
// duplicate of EmptyState.jsx with no actual visual distinction —
// now it just forwards props with variant="compact" fixed.
function ChartEmptyState(props) {
  return <EmptyState {...props} variant="compact" />;
}

export default ChartEmptyState;
