import { FaTimes } from "react-icons/fa";
import "./EditExpenseModal.css";
import useEscapeKey from "../../hooks/useEscapeKey";
import useFocusTrap from "../../hooks/useFocusTrap"
import { CATEGORIES } from "../../constants/categories";
import { useState, useRef, useEffect } from "react";

// Modal form for editing an existing expense. Fields are pre-filled
// via defaultValue from the `expense` prop; like AddExpenseModal, this
// reads raw form values on submit rather than using controlled inputs.
function EditExpenseModal({ expense, isOpen, onClose, onSave }) {
  useEscapeKey(isOpen, onClose);
  const [paymentMode, setPaymentMode] = useState(expense?.payment_mode || "Other");
  const firstInputRef = useRef(null);
  const modalRef = useRef(null);

  useFocusTrap(isOpen, modalRef);

  useEffect(() => {
    if (isOpen) {
      firstInputRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen || !expense) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    onSave({
      ...expense,
      title: formData.get("title"),
      amount: Number(formData.get("amount")),
      category: formData.get("category"),
      date: formData.get("date"),
      payment_mode: paymentMode,
    });
  };

  return (
    <div className="edit-modal-overlay" onClick={onClose}>
      <div
        ref={modalRef}
        className="edit-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-expense-title"
        onClick={(e) => e.stopPropagation()}>
        <div className="edit-modal-header">
          <div>
            <h2 id="edit-expense-title">Edit Expense</h2>
            <p>Update your expense details.</p>
          </div>

          <button className="modal-close" onClick={onClose} type="button" aria-label="Close">
            <FaTimes />
          </button>
        </div>

        <form className="edit-expense-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="expense-title">Expense</label>

            <input
              ref={firstInputRef}
              id="expense-title"
              name="title"
              defaultValue={expense.title}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expense-amount">Amount</label>

              <input
                id="expense-amount"
                name="amount"
                type="number"
                min="0"
                step="0.01"
                defaultValue={expense.amount}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="expense-category">Category</label>

              <select
                id="expense-category"
                name="category"
                defaultValue={expense.category || ""}
                required
              >
                <option value="">Select Category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="expense-date">Date</label>

            <input
              id="expense-date"
              name="date"
              type="date"
              defaultValue={expense.date}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="payment-mode">Payment Mode</label>

            <select
              id="payment-mode"
              name="payment-mode"
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
            >
              <option value="UPI">UPI</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Net Banking">Net Banking</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditExpenseModal;
