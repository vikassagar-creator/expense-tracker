import "./TechStack.css";

import {
    FaReact,
    FaPython,
    FaGitAlt,
    FaGithub,
    FaCss3Alt,
    FaKey,
} from "react-icons/fa";

import {
    SiFastapi,
    SiPostgresql,
    SiSqlalchemy,
    SiVite,
    SiBootstrap,
} from "react-icons/si";

import TechItem from "./TechItem";

const techStack = [
    {
        category: "Frontend",
        technologies: [
            {
                icon: FaReact,
                title: "React",
            },
            {
                icon: SiVite,
                title: "Vite",
            },
            {
                icon: SiBootstrap,
                title: "Bootstrap",
            },
            {
                icon: FaCss3Alt,
                title: "CSS3",
            },
        ],
    },

    {
        category: "Backend",
        technologies: [
            {
                icon: FaPython,
                title: "Python",
            },
            {
                icon: SiFastapi,
                title: "FastAPI",
            },
            {
                icon: FaKey,
                title: "JWT",
            },
        ],
    },

    {
        category: "Database",
        technologies: [
            {
                icon: SiPostgresql,
                title: "PostgreSQL",
            },
            {
                icon: SiSqlalchemy,
                title: "SQLAlchemy",
            },
        ],
    },

    {
        category: "Tools",
        technologies: [
            {
                icon: FaGitAlt,
                title: "Git",
            },
            {
                icon: FaGithub,
                title: "GitHub",
            },
        ],
    },
];

function TechStack() {
    return (
        <section id="tech-stack" className="tech-stack">

            <div className="tech-stack-header">

                <span className="section-eyebrow">
                    BUILT WITH MODERN TECHNOLOGY
                </span>

                <h2>
                    Built with the tools that power{" "}
                    <span>Expense Tracker.</span>
                </h2>

                <p>
                    A full-stack application built with modern technologies
                    for a fast, secure, and maintainable experience.
                </p>

            </div>


            <div className="tech-categories">

                {techStack.map((group) => (

                    <div
                        key={group.category}
                        className="tech-category"
                    >

                        <h3>{group.category}</h3>

                        <div className="tech-grid">

                            {group.technologies.map((tech) => (

                                <TechItem
                                    key={tech.title}
                                    icon={tech.icon}
                                    title={tech.title}
                                />

                            ))}

                        </div>

                    </div>

                ))}

            </div>

        </section>
    );
}

export default TechStack;