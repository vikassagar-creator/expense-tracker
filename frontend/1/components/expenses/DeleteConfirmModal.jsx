import "./DeleteConfirmModal.css";
import useEscapeKey from "../../hooks/useEscapeKey";
import useFocusTrap from "../../hooks/useFocusTrap";
import { useRef, useEffect } from "react";

// Confirmation modal shown before permanently deleting an expense.
// Closes on Escape or on clicking the overlay, unless a delete is
// already in flight (`deleting`), to avoid closing mid-request.
function DeleteConfirmModal({ isOpen, onCancel, onConfirm, deleting }) {
  useEscapeKey(isOpen, () => {
    if (!deleting) onCancel(); 
  });
  const cancelButtonRef = useRef(null);
  const modalRef = useRef(null);

  useFocusTrap(isOpen, modalRef);

useEffect(() => {
  if (isOpen) {
    cancelButtonRef.current?.focus();
  }
}, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="delete-modal-overlay" onClick={onCancel}>
      <div 
           ref={modalRef}
           className="delete-modal"
           role="dialog"
           aria-modal="true"
           aria-labelledby="delete-expense-title"
       onClick={(e) => e.stopPropagation()}>
        <h2 id="delete-expense-title">Delete expense?</h2>
        <p>
          This will permanently remove this expense. This action can't be
          undone.
        </p>

        <div className="delete-modal-actions">
          <button
  ref={cancelButtonRef}
  type="button"
  onClick={onCancel}
>
  Cancel
</button>

          <button
            type="button"
            className="delete-modal-confirm"
            onClick={onConfirm}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
