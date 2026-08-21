import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaFileCsv, FaFilePdf } from "react-icons/fa";

import "./Reports.css";
import formatCurrency from "../utils/formatCurrency";

function getMonthOptions() {
  const options = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    options.push({
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      label: d.toLocaleString("default", { month: "long", year: "numeric" }),
    });
  }
  return options;
}

function Reports() {
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const monthOptions = getMonthOptions();

  const [selected, setSelected] = useState(monthOptions[0]);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(null); // "csv" | "pdf" | null

  const fetchReport = async (year, month) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/reports/${year}/${month}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to load report");
      const data = await response.json();
      setReport(data);
    } catch (error) {
      console.error("Error fetching report:", error);
      toast.error("Could not load report");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport(selected.year, selected.month);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const handleSelectChange = (e) => {
    const [year, month] = e.target.value.split("-").map(Number);
    const match = monthOptions.find((m) => m.year === year && m.month === month);
    if (match) setSelected(match);
  };

  const handleDownload = async (type) => {
    setDownloading(type);
    try {
      const response = await fetch(
        `${API_URL}/reports/${selected.year}/${selected.month}/${type}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.ok) {
        if (response.status === 501) {
          toast.error("PDF export isn't set up on the server yet");
        } else {
          toast.error(`Failed to download ${type.toUpperCase()}`);
        }
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `report-${selected.year}-${String(selected.month).padStart(2, "0")}.${type}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(`Error downloading ${type}:`, error);
      toast.error(`Failed to download ${type.toUpperCase()}`);
    } finally {
      setDownloading(null);
    }
  };

  const categoryEntries = Object.entries(report?.category_breakdown || {});

  return (
    <div className="reports-page">
      <div className="reports-header">
        <div>
          <h1>Reports</h1>
          <p>Pick a month to see a breakdown or download it.</p>
        </div>

        <select
          className="reports-month-select"
          value={`${selected.year}-${selected.month}`}
          onChange={handleSelectChange}
        >
          {monthOptions.map((opt) => (
            <option key={`${opt.year}-${opt.month}`} value={`${opt.year}-${opt.month}`}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="reports-empty">Loading report...</div>
      ) : !report || report.transaction_count === 0 ? (
        <div className="reports-empty">No expenses for {selected.label || report?.label}.</div>
      ) : (
        <>
          <div className="reports-summary-card">
            <div>
              <span className="reports-summary-label">Total</span>
              <h2>{formatCurrency(report.total)}</h2>
            </div>
            <div>
              <span className="reports-summary-label">Transactions</span>
              <h2>{report.transaction_count}</h2>
            </div>
          </div>

          <div className="reports-card">
            <h3>By Category</h3>
            <div className="reports-category-list">
              {categoryEntries.map(([category, amount]) => (
                <div className="reports-category-row" key={category}>
                  <span>{category}</span>
                  <span>{formatCurrency(amount)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="reports-download-row">
            <button
              className="reports-download-btn"
              onClick={() => handleDownload("csv")}
              disabled={downloading !== null}
            >
              <FaFileCsv /> {downloading === "csv" ? "Downloading..." : "Download CSV"}
            </button>

            <button
              className="reports-download-btn reports-download-btn--pdf"
              onClick={() => handleDownload("pdf")}
              disabled={downloading !== null}
            >
              <FaFilePdf /> {downloading === "pdf" ? "Downloading..." : "Download PDF"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Reports;
