import { FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import "../../styles/footer.css";
function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <h3>Expense Tracker</h3>
                    <p>Track your expenses effortlessly.</p>
                </div>
                <div className="footer-links">
                    <h3>Quick Links
                    </h3>
                    <a href="#hero">Home</a>
                    <a href="#features">Features</a>
                    <a href="#tech-stack">Tech Stack</a>
                    <a href="#cta">Get Started</a>
                </div>
                <div className="footer-social">
                    <h3>Connect with Us</h3>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        <FaGithub /> GitHub
                    </a>
                    <a href="https://bvikassagar@gmail.com" target="_blank" rel="noopener noreferrer">
                        <SiGmail /> Gmail
                    </a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>Built with React • FastAPI • PostgreSQL</p>
                <p>© {new Date().getFullYear()} ExpenseTracker. All rights reserved.</p>
            </div>
        </footer>
    );
}
export default Footer;