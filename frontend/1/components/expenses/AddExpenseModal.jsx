import { FaTimes } from "react-icons/fa";
import "./AddExpenseModal.css";
import useEscapeKey from "../../hooks/useEscapeKey";
import useFocusTrap from "../../hooks/useFocusTrap";
import { CATEGORIES } from "../../constants/categories";
import { useState, useRef, useEffect} from "react";

const todayISO = () => new Date().toISOString().split("T")[0];

// Modal form for creating a new expense. Uses native FormData rather
// than controlled inputs — reads values straight off the form on
// submit, so there's no local state to keep in sync with each field.
function AddExpenseModal({ isOpen, onClose, onSave, loading = false }) {
  useEscapeKey(isOpen, onClose);
  const [paymentMode, setPaymentMode] = useState("Other");
  const firstInputRef = useRef(null);
  const modalRef = useRef(null);

  useFocusTrap(isOpen, modalRef);

useEffect(() => {
  if (isOpen) {
    firstInputRef.current?.focus();
  }
}, [isOpen]);

  if (!isOpen) { 
    return null;
  }

  // Builds the payload from the raw <form> fields and hands it to the
  // caller's onSave (Dashboard/Expenses own the actual API call).
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const expenseData = {
      title: formData.get("title"),
      amount: Number(formData.get("amount")),
      category: formData.get("category"),
      date: formData.get("date"),
      payment_mode: paymentMode,
    };

    onSave(expenseData);
  };

  return (
    <div className="add-modal-overlay" onClick={onClose}>
      <div 
      ref={modalRef}className="add-modal" 
           role="dialog"
           aria-modal="true"
           aria-labelledby="add-expense-title"
           onClick={(e) => e.stopPropagation()}>
        <div className="add-modal-header">
          <div>
            <h2 id="add-expense-title">Add New Expense</h2>
            <p>Record a new expense</p>
          </div>
          <button
            className="modal-close"
            onClick={onClose}
            type="button"
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        <form className="add-expense-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="expense-title">Expense</label>
            <input
             ref={firstInputRef}
              id="expense-title"
              name="title"
              placeholder="e.g. Food"
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
                placeholder="0.00"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="expense-category">Category</label>
              <select
                id="expense-category"
                name="category"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select Category
                </option>
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
              defaultValue={todayISO()}
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
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? "Adding..." : "Add Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddExpenseModal;
