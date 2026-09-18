import { FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { IoWallet } from "react-icons/io5";

import "./Footer.css";

// Site-wide footer for the landing page (brand blurb + link columns).
// Only rendered on the public landing page, not inside the logged-in app.

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>
            <IoWallet className="footer-logo-icon" />
            Expense Tracker
          </h3>

          <p>
            Track your spending, understand your habits, and build better
            financial decisions — all in one place.
          </p>
        </div>

        <div className="footer-column">
          <h4>Product</h4>

          <a href="#hero">Home</a>

          <a href="#features">Features</a>

          <a href="#dashboard-preview">Dashboard</a>

          <a href="#cta">Get Started</a>
        </div>

        <div className="footer-column">
          <h4>Project</h4>

          <a href="#tech-stack">Tech Stack</a>

          <a
            href="https://github.com/vikassagar-creator/expense-tracker"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
        </div>

        <div className="footer-column">
          <h4>Connect</h4>

          <a
            href="https://github.com/vikassagar-creator/expense-tracker"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
            GitHub
          </a>

          <a href="mailto:bvikassagar@gmail.com">
            <SiGmail />
            Email
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Expense Tracker</p>

        <p>Built with React • FastAPI • PostgreSQL</p>
      </div>
    </footer>
  );
}

export default Footer;
