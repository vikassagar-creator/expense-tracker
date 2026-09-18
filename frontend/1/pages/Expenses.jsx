import React, { useEffect, useState, useRef } from "react";
import "./Expenses.css";
import { toast } from "react-hot-toast";


import AddExpenseModal from "../components/expenses/AddExpenseModal";
import ExpenseTable from "../components/expenses/ExpenseTable";
import ExpensesToolbar from "../components/expenses/ExpenseToolbar";
import EditExpenseModal from "../components/dashboard/EditExpenseModal";
import DeleteConfirmModal from "../components/expenses/DeleteConfirmModal";
import axiosClient from "../services/axiosClient";

function Expenses() {

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add expense modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [savingExpense, setSavingExpense] = useState(false);
  
  const addExpenseButtonRef = useRef(null);

  // Edit expense
  const [editingExpense, setEditingExpense] = useState(null);
  const editButtonRef = useRef(null);

  // Delete expense
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortBy, setSortBy] = useState("date_desc");


  // =========================
  // FETCH EXPENSES
  // =========================

  const fetchExpenses = async () => {
  try {
    const response = await axiosClient.get("/expenses");

    const sortedExpenses = [...response.data].sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    );

    setExpenses(sortedExpenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    toast.error("Unable to load expenses");
  } finally {
    setLoading(false);
  }
};

  // ========================
  // HANDLE SAVE EXPENSE
  //=========================
  const handleSaveExpense = async (updatedExpense) => {
  try {
    const payload = {
      title: updatedExpense.title,
      amount: Number(updatedExpense.amount),
      category: updatedExpense.category,
      date: updatedExpense.date,
      payment_mode: updatedExpense.payment_mode,
    };

    await axiosClient.put(
      `/expenses/${updatedExpense.id}`,
      payload,
    );

    toast.success("Expense updated successfully");

    setEditingExpense(null);

    await fetchExpenses();
  } catch (error) {
    console.error("Update error:", error);

    const detail = error.response?.data?.detail;

    toast.error(
      detail ? JSON.stringify(detail) : "Failed to update expense",
    );
  }
};

  // =========================
  // ADD EXPENSE
  // =========================

  const handleAddExpense = async (expenseData) => {
  setSavingExpense(true);

  try {
    await axiosClient.post("/expenses/", expenseData);

    toast.success("Expense added successfully");

    setShowAddModal(false);

    await fetchExpenses();
  } catch (error) {
    console.error("Error adding expense:", error);

    const detail = error.response?.data?.detail;

    toast.error(detail || "Failed to add expense");
  } finally {
    setSavingExpense(false);
  }
};

  // =========================
  // EDIT
  // =========================

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = (id) => {
    setDeleteTargetId(id);
  };

  const cancelDelete = () => {
    if (deleting) return;
    setDeleteTargetId(null);
  };

  const confirmDelete = async () => {
  if (!deleteTargetId) return;

  setDeleting(true);

  try {
    await axiosClient.delete(`/expenses/${deleteTargetId}`);

    toast.success("Expense deleted");

    await fetchExpenses();
    setDeleteTargetId(null);
  } catch (error) {
    console.error("Error deleting expense:", error);
    toast.error("Failed to delete expense");
  } finally {
    setDeleting(false);
  }
};

  // =========================
  // FILTER EXPENSES
  // =========================

  const filteredExpenses = expenses
    .filter((expense) => {
      const matchesSearch = expense.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        filterCategory === "All" || expense.category === filterCategory;

      const matchesDateFrom = !dateFrom || expense.date >= dateFrom;

      const matchesDateTo = !dateTo || expense.date <= dateTo;

      return (
        matchesSearch && matchesCategory && matchesDateFrom && matchesDateTo
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date_asc":
          return a.date.localeCompare(b.date);
        case "amount_desc":
          return b.amount - a.amount;
        case "amount_asc":
          return a.amount - b.amount;
        case "date_desc":
        default:
          return b.date.localeCompare(a.date);
      }
    });

  // True whenever a search/category/date filter is actively narrowing
  // the list, so ExpenseTable can tell "no expenses match your filter"
  // apart from "you have no expenses at all" in its empty state.
  const hasActiveFilters = Boolean(
    search || filterCategory !== "All" || dateFrom || dateTo,
  );

  const clearFilters = () => {
    setSearch("");
    setFilterCategory("All");
    setDateFrom("");
    setDateTo("");
  };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="expenses-page">
      <ExpensesToolbar
        search={search}
        onSearchChange={setSearch}

        category={filterCategory}
        onCategoryChange={setFilterCategory}

        dateFrom={dateFrom}
        onDateFromChange={setDateFrom}
        dateTo={dateTo}
        onDateToChange={setDateTo}

        sortBy={sortBy}
        onSortByChange={setSortBy}

        onAddExpense={() => setShowAddModal(true)}
        addExpenseButtonRef={addExpenseButtonRef}
      />

      <ExpenseTable
        expenses={filteredExpenses}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
        hasFilters={hasActiveFilters}
        onAddExpense={() => setShowAddModal(true)}
        onClearFilters={clearFilters}
      />

      <AddExpenseModal
        isOpen={showAddModal}
        onClose={() => { 
          setShowAddModal(false);
        addExpenseButtonRef.current?.focus();
      }}
        onSave={handleAddExpense}
        loading={savingExpense}
      />

      <EditExpenseModal
        isOpen={Boolean(editingExpense)}
        expense={editingExpense}
        onClose={() => {
          setEditingExpense(false);
          editButtonRef.current?.focus();
        }}
        onSave={handleSaveExpense}
/>

      <DeleteConfirmModal
        isOpen={Boolean(deleteTargetId)}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        deleting={deleting}
      />
    </div>
  );
}

export default Expenses;
