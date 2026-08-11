import Card from "../common/Card";

import {
    FaChartPie,
    FaWallet,
    FaReceipt,
    FaLock,
    FaHistory,
    FaMobileAlt,
} from "react-icons/fa";

import "./Features.css";

const features = [
    {
        icon: FaChartPie,
        title: "Expense Analytics",
        description:
            "Visualize your spending with interactive charts and useful insights.",
    },
    {
        icon: FaWallet,
        title: "Budget Management",
        description:
            "Set spending limits and monitor your progress throughout the month.",
    },
    {
        icon: FaReceipt,
        title: "Expense Tracking",
        description:
            "Record, organize, and manage your daily expenses with ease.",
    },
    {
        icon: FaLock,
        title: "Secure Authentication",
        description:
            "JWT-based authentication helps keep your account and data protected.",
    },
    {
        icon: FaHistory,
        title: "Transaction History",
        description:
            "Review your previous expenses and transactions in one place.",
    },
    {
        icon: FaMobileAlt,
        title: "Responsive Design",
        description:
            "Access and manage your expenses comfortably across desktop and mobile.",
    },
];

function Features() {
    return (
        <section id="features" className="features">

            <div className="features-header">
                <span className="section-eyebrow">
                    FEATURES
                </span>

                <h2>
                    Everything you need to
                    <span> understand your spending.</span>
                </h2>

                <p>
                    Track, analyze, and manage your expenses with
                    simple tools designed to give you better control
                    over your finances.
                </p>
            </div>

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