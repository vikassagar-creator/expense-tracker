import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaFileCsv, FaFilePdf } from "react-icons/fa";

import "./Reports.css";
import formatCurrency from "../utils/formatCurrency";
import ErrorState from "../components/common/ErrorState";
import axiosClient from "../services/axiosClient";

// Builds the last 12 months as {year, month, label} options for the
// month picker, most recent first.
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

// Monthly report page: category breakdown for a selected month, plus
// CSV/PDF export. Re-fetches the report whenever `selected` changes.
function Reports() {

  const monthOptions = getMonthOptions();

  const [selected, setSelected] = useState(monthOptions[0]);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [downloading, setDownloading] = useState(null); // "csv" | "pdf" | null

  const fetchReport = async (year, month) => {
  setLoading(true);
  setError(false);

  try {
    const response = await axiosClient.get(`/reports/${year}/${month}`);
    setReport(response.data);
  } catch (error) {
    console.error("Error fetching report:", error);
    toast.error("Could not load report");
    setError(true);
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
    const match = monthOptions.find(
      (m) => m.year === year && m.month === month,
    );
    if (match) setSelected(match);
  };

  // Triggers a file download for the given report format by fetching
  // the file as a blob and clicking a throwaway <a download> link —
  // the standard way to force a browser download from a fetch response.
  const handleDownload = async (type) => {
  setDownloading(type);

  try {
    const response = await axiosClient.get(
      `/reports/${selected.year}/${selected.month}/${type}`,
      {
        responseType: "blob",
        validateStatus: (status) => status >= 200 && status < 600,
      },
    );

    if (response.status !== 200) {
      if (response.status === 501) {
        toast.error("PDF export isn't set up on the server yet");
      } else {
        toast.error(`Failed to download ${type.toUpperCase()}`);
      }
      return;
    }

    const blob = response.data;
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
      {/* TopBar (via PageConfig) already renders "Reports" + subtitle
          for this route — this row now only holds the month select. */}
      <div className="reports-actions">
        <select
  className="reports-month-select"
  value={`${selected.year}-${selected.month}`}
  onChange={handleSelectChange}
  aria-label="Select report month"
>
          {monthOptions.map((opt) => (
            <option
              key={`${opt.year}-${opt.month}`}
              value={`${opt.year}-${opt.month}`}
            >
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="reports-empty">Loading report...</div>
      ) : error ? (
        <ErrorState
          message="We couldn't load this report."
          onRetry={() => fetchReport(selected.year, selected.month)}
        />
      ) : !report || report.transaction_count === 0 ? (
        <div className="reports-empty">
          No expenses for {selected.label || report?.label}.
        </div>
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
              <FaFileCsv />{" "}
              {downloading === "csv" ? "Downloading..." : "Download CSV"}
            </button>

            <button
              className="reports-download-btn reports-download-btn--pdf"
              onClick={() => handleDownload("pdf")}
              disabled={downloading !== null}
            >
              <FaFilePdf />{" "}
              {downloading === "pdf" ? "Downloading..." : "Download PDF"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Reports;
