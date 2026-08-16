import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { toast } from "react-hot-toast";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import AddExpenseModal from "../components/expenses/AddExpenseModal";

import SummaryCards from "../components/dashboard/SummaryCards";
import SpendingCharts from "../components/dashboard/SpendingCharts";
import RecentExpenses from "../components/dashboard/RecentExpenses";
import EditExpenseModal from "../components/dashboard/EditExpenseModal";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [analytics, setAnalytics] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [savingExpense, setSavingExpense] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  console.log("API URL:", API_URL);

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
      return;
    }

    const data = await response.json();

    console.log("Expenses fetched successfully:", data);

    setExpenses(data);

  } catch (error) {
    console.error("Error fetching expenses:", error);
  }
};

  const fetchAnalytics = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${API_URL}/expenses/analytics`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error(
        "Analytics fetch failed:",
        response.status,
        response.statusText
      );
      return;
    }

    const data = await response.json();

    console.log("ANALYTICS RESPONSE:", data);

    setAnalytics(data);

  } catch (error) {
    console.error("Analytics error:", error);
    toast.error("Unable to load dashboard data");
  }
};

  const refreshDashboard = async () => {
    setLoading(true);

    await Promise.all([
      fetchExpenses(),
      fetchAnalytics(),
    ]);
    setLoading(false);
  };

  const chartData = analytics?.category_breakdown
    ? Object.entries(analytics.category_breakdown).map(([name, value]) => ({
      name,
      value,
    }))
    : [];

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
      // Remove the deleted expense from the state
      if(!response.ok) {
        toast.error("Failed to delete expense");
        return;
      }

      toast.success("Expenses deleted")
      await refreshDashboard();

    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Something went wrong")
    }
  };

  const handleUpdateExpense = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!editingExpense.title.trim()) {
        toast.error("Title is required");
        return;
      }

      if (!editingExpense.amount || Number(editingExpense.amount) <= 0) {
        toast.error("Enter a valid amount");
        return;
      }
      const response = await fetch(
        `${API_URL}/expenses/${editingExpense.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            title: editingExpense.title,
            amount: editingExpense.amount,
            category: editingExpense.category,
            date: editingExpense.date,
          }),
},
      );

      if (response.ok) {
        // Update the state with the edited expense
        toast.success("Expense updated")

        await refreshDashboard();
        
        setEditingExpense(null);
        setShowModal(false);
      } else {
        console.error("Error updating expense:", response.statusText);
        
      }
    } catch (error) {
      console.error("Error updating expense:", error);
      toast.error("Unable to update")
    }
  };

  const handleEdit = (expense) =>{
    setEditingExpense(expense);
    setShowModal(true);
};
  
  const handleCloseModal = () => {
  setEditingExpense(null);
  setShowModal(false);
};

  

const handleSaveExpense = async (updatedExpense) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${API_URL}/expenses/${updatedExpense.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: updatedExpense.title,
          amount: Number(updatedExpense.amount),
          category: updatedExpense.category,
          date: updatedExpense.date,
        }),
      }
    );

    if (!response.ok) {
      toast.error("Failed to update expense");
      return;
    }

    toast.success("Expense updated successfully");

    handleCloseModal();

    // Important: update table + cards + charts
    await refreshDashboard();

  } catch (error) {
    console.error("Update error:", error);
    toast.error("Something went wrong");
  }
};

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
    if (!response.ok) throw new Error("Failed to add expense");
    toast.success("Expense added");
    setShowAddModal(false);
    fetchExpenses(); // your existing refetch function
  } catch (err) {
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

            <DashboardHeader onAddExpense={() => setShowAddModal(true)} />

            <SummaryCards
                analytics={analytics}
                expenses={expenses}
            />

            <SpendingCharts
                chartData={chartData}
            />

           <RecentExpenses
        expenses={expenses}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

     <EditExpenseModal
      expense={editingExpense}
      isOpen={showModal}
      onClose={handleCloseModal}
      onSave={handleSaveExpense}
    />

    <AddExpenseModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddExpense}
        loading={savingExpense}
        onAdded={fetchExpenses}  // whatever your existing refetch function is called
      />

    </div>
  );
}

export default Dashboard;