import "./CTA.css";

import { Link } from "react-router-dom";

import {
    FaRocket,
    FaPlay,
    FaShieldAlt,
    FaCheckCircle,
    FaChartLine,
} from "react-icons/fa";

function CTA() {
    return (
        <section id="cta" className="cta">

            <div className="cta-container">

                <span className="cta-eyebrow">
                    READY TO TAKE CONTROL?
                </span>


                <h2>
                    Take control of your{" "}
                    <span>spending.</span>
                </h2>


                <p className="cta-description">
                    Start tracking your expenses today and make
                    smarter financial decisions for a better tomorrow.
                </p>


                <div className="cta-actions">

                    <Link
                        to="/register"
                        className="cta-primary"
                    >
                        <FaRocket />
                        Get Started Free
                    </Link>


                    <a
                        href="#dashboard-preview"
                        className="cta-secondary"
                    >
                        <FaPlay />
                        View Dashboard
                    </a>

                </div>


                <div className="cta-highlights">

                    <div className="highlight-item">

                        <div className="highlight-icon">
                            <FaShieldAlt />
                        </div>

                        <div>
                            <h5>
                                Secure & Private
                            </h5>

                            <p>
                                Your data stays protected.
                            </p>
                        </div>

                    </div>


                    <div className="highlight-item">

                        <div className="highlight-icon">
                            <FaCheckCircle />
                        </div>

                        <div>
                            <h5>
                                Easy to Use
                            </h5>

                            <p>
                                Simple and intuitive interface.
                            </p>
                        </div>

                    </div>


                    <div className="highlight-item">

                        <div className="highlight-icon">
                            <FaChartLine />
                        </div>

                        <div>
                            <h5>
                                Real-time Insights
                            </h5>

                            <p>
                                Understand your spending better.
                            </p>
                        </div>

                    </div>


                </div>

            </div>

        </section>
    );
}

export default CTA;