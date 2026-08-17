import React, { useEffect, useState } from "react";
import "./Expenses.css";
import { toast } from "react-hot-toast";

import ExpenseHeader from "../components/expenses/ExpenseHeader";
import AddExpenseModal from "../components/expenses/AddExpenseModal";
import ExpenseTable from "../components/expenses/ExpenseTable";
import ExpensesToolbar from "../components/expenses/ExpenseToolbar";
import EditExpenseModal from "../components/dashboard/EditExpenseModal"

function Expenses() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add expense modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [savingExpense, setSavingExpense] = useState(false);

  // Edit expense
  const [editingExpense, setEditingExpense] = useState(null);

  // Filters
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");


  // =========================
  // FETCH EXPENSES
  // =========================

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/expenses`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error(
          "Error fetching expenses:",
          response.status,
          response.statusText
        );

        toast.error("Unable to load expenses");
        return;
      }

      const data = await response.json();

      const sortedExpenses = [...data].sort(
  (a, b) => new Date(b.date) - new Date(a.date)
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
    const token = localStorage.getItem("token");

    const payload = {
      title: updatedExpense.title,
      amount: Number(updatedExpense.amount),
      category: updatedExpense.category,
      date: updatedExpense.date,
    };

    console.log("UPDATE PAYLOAD:", payload);

    const response = await fetch(
      `${API_URL}/expenses/${updatedExpense.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();

      console.error("UPDATE ERROR:", errorData);

      toast.error(
        errorData.detail
          ? JSON.stringify(errorData.detail)
          : "Failed to update expense"
      );

      return;
    }

    toast.success("Expense updated successfully");

    setEditingExpense(null);

    await fetchExpenses();

  } catch (error) {
    console.error("Update error:", error);
    toast.error("Something went wrong");
  }
};


  // =========================
  // ADD EXPENSE
  // =========================

  const handleAddExpense = async (expenseData) => {
    setSavingExpense(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/expenses/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expenseData),
      });

      if (!response.ok) {
        const data = await response.json();

        toast.error(data.detail || "Failed to add expense");
        return;
      }

      toast.success("Expense added successfully");

      setShowAddModal(false);

      // Refresh table
      await fetchExpenses();

    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Something went wrong");
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

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/expenses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        toast.error("Failed to delete expense");
        return;
      }

      toast.success("Expense deleted");

      // Refresh table
      await fetchExpenses();

    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Something went wrong");
    }
  };


  // =========================
  // FILTER EXPENSES
  // =========================

  const filteredExpenses = expenses.filter((expense) => {

    const matchesSearch =
      expense.title
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      filterCategory === "All" ||
      expense.category === filterCategory;

    return matchesSearch && matchesCategory;
  });


  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    fetchExpenses();
  }, []);


  return (
    <div className="expenses-page">

      <ExpenseHeader
        onAddExpense={() => setShowAddModal(true)}
      />

      <ExpensesToolbar
        search={search}
        onSearchChange={setSearch}

        category={filterCategory}
        onCategoryChange={setFilterCategory}

        onAddExpense={() => setShowAddModal(true)}
      />

      <ExpenseTable
        expenses={filteredExpenses}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      <AddExpenseModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddExpense}
        loading={savingExpense}
      />

      <EditExpenseModal
      expense={editingExpense}
      isOpen={Boolean(editingExpense)}
      onClose={()=>setEditingExpense(null)}
      onSave={handleSaveExpense}
      />

    </div>
  );
}

export default Expenses;