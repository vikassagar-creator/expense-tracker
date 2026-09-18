import React, { useEffect, useState, useRef } from "react";
import "./Dashboard.css";
import { toast } from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import AddExpenseModal from "../components/expenses/AddExpenseModal";
import axiosClient from "../services/axiosClient";

import SummaryCards from "../components/dashboard/SummaryCards";
import SpendingCharts from "../components/dashboard/SpendingCharts";
import RecentExpenses from "../components/dashboard/RecentExpenses";
import EditExpenseModal from "../components/dashboard/EditExpenseModal";
import DeleteConfirmModal from "../components/expenses/DeleteConfirmModal";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [analytics, setAnalytics] = useState(null);
  const [budgetSummary, setBudgetSummary] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [savingExpense, setSavingExpense] = useState(false);

  const addExpenseButtonRef = useRef(null);

  const fetchExpenses = async () => {
    try {
      const { data } = await axiosClient.get("/expenses");
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const { data } = await axiosClient.get("/expenses/analytics");
      setAnalytics(data);
    } catch (error) {
      console.error("Analytics error:", error);
      toast.error("Unable to load dashboard data");
    }
  };

  const fetchBudgetSummary = async () => {
    try {
      const { data } = await axiosClient.get("/budgets/summary");
      setBudgetSummary(data);
    } catch (error) {
      console.error("Budget summary error:", error);
    }
  };

  const refreshDashboard = async () => {
    setLoading(true);

    await Promise.all([
      fetchExpenses(),
      fetchAnalytics(),
      fetchBudgetSummary(),
    ]);
    setLoading(false);
  };

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthlyCategoryData = {};

  expenses
    .filter((expense) => {
      // expense.date is a plain "YYYY-MM-DD" string (from a <input
      // type="date">). Parsing it with `new Date(expense.date)` reads
      // it as UTC midnight, then .getMonth()/.getFullYear() convert
      // back to local time — for anyone west of UTC that silently
      // shifts the date back a day, so expenses could disappear from
      // (or leak into) the wrong month here. Pulling year/month
      // straight out of the string avoids the UTC round-trip.
      const [year, month] = expense.date.split("-").map(Number);

      return month - 1 === currentMonth && year === currentYear;
    })
    .forEach((expense) => {
      monthlyCategoryData[expense.category] =
        (monthlyCategoryData[expense.category] || 0) +
        Number(expense.amount);
    });

const chartData = Object.entries(monthlyCategoryData).map(
  ([name, value]) => ({
    name,
    value,
  })
);

  const handleDelete = async (id) => {
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
      toast.success("Expenses deleted");
      await refreshDashboard();
      setDeleteTargetId(null);
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Something went wrong");
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditingExpense(null);
    setShowModal(false);
  };

  const handleSaveExpense = async (updatedExpense) => {
    try {
      await axiosClient.put(`/expenses/${updatedExpense.id}`, {
        title: updatedExpense.title,
        amount: Number(updatedExpense.amount),
        category: updatedExpense.category,
        date: updatedExpense.date,
        payment_mode: updatedExpense.payment_mode,
      });

      toast.success("Expense updated successfully");
      handleCloseModal();
      await refreshDashboard();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong");
    }
  };

  const handleAddExpense = async (expenseData) => {
    setSavingExpense(true);

    try {
      await axiosClient.post("/expenses/", expenseData);

      toast.success("Expense added");
      setShowAddModal(false);

      await refreshDashboard();
    } catch (error) {
      console.error("Add expense error:", error);
      toast.error("Something went wrong");
    } finally {
      setSavingExpense(false);
    }
  };

  useEffect(() => {
    refreshDashboard();
  }, []);

  return (
    <div className="dashboard">
      {/* TopBar (via PageConfig) already renders the "Dashboard" title
          and subtitle for this route — DashboardHeader was removed to
          avoid rendering that title twice. Only its Add Expense button
          survives, now inline here. */}
      <div className="dashboard-actions">
        <button
  ref={addExpenseButtonRef}
  className="add-expense-btn"
  onClick={() => setShowAddModal(true)}
>
  <FaPlus />
  Add Expense
</button>
      </div>

      <SummaryCards
        analytics={analytics}
        
        budgetSummary={budgetSummary}
      />

      <SpendingCharts
        chartData={chartData}
        trendData={analytics?.monthly_trend || []}
        onAddExpense={() => setShowAddModal(true)}
      />

      <RecentExpenses
        expenses={expenses}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
        onAddExpense={() => setShowAddModal(true)}
      />

      <EditExpenseModal
        expense={editingExpense}
        isOpen={showModal}
        onClose={handleCloseModal}
        onSave={handleSaveExpense}
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

      <DeleteConfirmModal
        isOpen={Boolean(deleteTargetId)}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        deleting={deleting}
      />
    </div>
  );
}

export default Dashboard;
