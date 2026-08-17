import { FaTimes } from "react-icons/fa";
import "./EditExpenseModal.css";
import { useState } from "react";

function EditExpenseModal({
    expense,
    isOpen,
    onClose,
    onSave,
}) {

    if (!isOpen || !expense) {
        return null;
    }

    const [category, setCategory] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        onSave({
            ...expense,
            title: formData.get("title"),
            amount: formData.get("amount"),
            category: formData.get("category"),
            date: formData.get("date"),
        });
    };

    return (
        <div
            className="edit-modal-overlay"
            onClick={onClose}
        >

            <div
                className="edit-modal"
                onClick={(e) =>
                    e.stopPropagation()
                }
            >

                <div className="edit-modal-header">

                    <div>
                        <h2>Edit Expense</h2>
                        <p>Update your expense details.</p>
                    </div>

                    <button
                        className="modal-close"
                        onClick={onClose}
                        type="button"
                    >
                        <FaTimes />
                    </button>

                </div>


                <form
                    className="edit-expense-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">

                        <label htmlFor="title">
                            Expense
                        </label>

                        <input
                            id="title"
                            name="title"
                            defaultValue={expense.title}
                            required
                        />

                    </div>


                    <div className="form-row">

                        <div className="form-group">

                            <label htmlFor="amount">
                                Amount
                            </label>

                            <input
                                id="amount"
                                name="amount"
                                type="number"
                                min="0"
                                step="0.01"
                                defaultValue={expense.amount}
                                required
                            />

                        </div>


                        <div className="form-group">

                           <label htmlFor="category">
  Category
</label>

<select
  id="category"
  name="category"
  defaultValue={expense.category || ""}
  required
>
  <option value="">Select Category</option>
  <option value="Food">Food</option>
  <option value="Transport">Transport</option>
  <option value="Entertainment">Entertainment</option>
  <option value="Shopping">Shopping</option>
  <option value="Other">Other</option>
</select>



                        </div>

                    </div>


                    <div className="form-group">

                        <label htmlFor="date">
                            Date
                        </label>

                        <input
                            id="date"
                            name="date"
                            type="date"
                            defaultValue={expense.date}
                            required
                        />

                    </div>


                    <div className="modal-actions">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="save-btn"
                        >
                            Save Changes
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default EditExpenseModal;