import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import "./Help.css";

// Static FAQ list — add/remove/reorder questions by editing this
// array; the accordion UI below handles everything automatically.
const FAQS = [
  {
    q: "How do I add a new expense?",
    a: "Go to the Dashboard or Expenses page and click 'Add Expense'. Fill in the title, amount, category, and date, then save.",
  },
  {
    q: "Can I edit or delete an expense after adding it?",
    a: "Yes. On the Expenses page, use the edit and delete icons next to each expense. Deleting asks you to confirm first so you don't lose anything by accident.",
  },
  {
    q: "How do budgets work?",
    a: "Set an overall monthly budget and/or per-category budgets on the Budget page. Your progress updates automatically based on what you've spent this month.",
  },
  {
    q: "Where can I download a report of my spending?",
    a: "The Reports page lets you pick any month and download a CSV or PDF summary of your expenses for that period.",
  },
  {
    q: "How do I change my password?",
    a: "Go to Profile, and use the Change Password section near the bottom of the page.",
  },
  {
    q: "Is my data private?",
    a: "Yes. Every expense, budget, and report is tied to your account and only accessible after logging in.",
  },
];

function Help() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="help-page">
      {/* TopBar (via PageConfig) already renders "Help" + subtitle
          for this route — removed the duplicate header. */}
      <div className="help-faq-list">
        {FAQS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              className={`help-faq-item ${isOpen ? "help-faq-item--open" : ""}`}
              key={item.q}
            >
              <button
                className="help-faq-question"
                onClick={() => toggle(index)}
              >
                <span>{item.q}</span>
                <FaChevronDown className="help-faq-icon" />
              </button>

              {isOpen && <p className="help-faq-answer">{item.a}</p>}
            </div>
          );
        })}
      </div>

      <div className="help-contact-card">
        <h3>Still need help?</h3>
        <p>Reach out and we'll get back to you as soon as we can.</p>
        
        <a className="help-contact-link" href="mailto:bvikassagar@gmail.com">
          bvikassagar@gmail.com
        </a>
      </div>
    </div>
  );
}

export default Help;
