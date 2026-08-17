import { FaTimes } from "react-icons/fa";
import "./AddExpenseModal.css";

const todayISO = () => new Date().toISOString().split("T")[0];

function AddExpenseModal({ isOpen, onClose, onSave, loading = false }) {
  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const expenseData = {
      title: formData.get("title"),
      amount: Number(formData.get("amount")),
      category: formData.get("category"),
      date: formData.get("date"),
    };

    onSave(expenseData);
  };

  return (
    <div className="edit-modal-overlay" onClick={onClose}>
      <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
        <div className="edit-modal-header">
          <div>
            <h2>Add New Expense</h2>
            <p>Record a new expense</p>
          </div>
          <button className="modal-close" onClick={onClose} type="button" aria-label="Close">
            <FaTimes />
          </button>
        </div>

        <form className="edit-expense-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="add-title">Expense</label>
            <input id="add-title" name="title" placeholder="e.g. Food" required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="add-amount">Amount</label>
              <input
                id="add-amount"
                name="amount"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="add-category">Category</label>
              <select id="add-category" name="category" defaultValue="" required>
                <option value="" disabled>Select Category</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Shopping">Shopping</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="add-date">Date</label>
            <input
              id="add-date"
              name="date"
              type="date"
              defaultValue={todayISO()}
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose} disabled={loading}>
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