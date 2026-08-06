import Card from "../common/Card";
import "../../styles/globals.css";
import {
    FaChartPie,
    FaWallet,
    FaReceipt,
    FaLock,
    FaHistory,
    FaMobileAlt,
} from "react-icons/fa";
const features = [
    {
        icon: <FaChartPie />,
        title: "Analytics Dashboard",
        description: "Visualize expenses with interactive charts and insights.",
    },
    {
        icon: <FaWallet />,
        title: "Budget Management",
        description: "Set budgets and monitor your spending progress.",
    },
    {
        icon: <FaReceipt />,
        title: "Expense Tracking",
        description: "Record and organize your daily expenses.",
    },
    {
        icon: <FaLock />,
        title: "Secure Authentication",
        description: "JWT-based authentication protects your account.",
    },
    {
        icon: <FaHistory />,
        title: "Transaction History",
        description: "Browse and search your previous expenses.",
    },
    {
        icon: <FaMobileAlt />,
        title: "Responsive Design",
        description: "Optimized for desktop, tablet, and mobile.",
    },
];


function Features() {
    return (
       <section id="features">
  <h2>Features</h2>
  <p>Discover the powerful features of our expense tracker.</p>

  <div className="feature-grid">
    {features.map((feature) => (
      <Card
        key={feature.title}
        icon={feature.icon}
        title={feature.title}
        description={feature.description}
      />
    ))}
  </div>
</section>
    );
}
export default Features;