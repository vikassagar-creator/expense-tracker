import Card from "../common/Card";
import "../../styles/globals.css";

import { FaReact, FaPython, FaGitAlt, FaGithub, FaCss3Alt, FaKey } from "react-icons/fa";
import {
  SiFastapi,
  SiPostgresql,
  SiSqlalchemy,
  SiVite,
} from "react-icons/si";

const techStack = [
  
  {
    category: "Frontend",
    technologies: [
      {
        icon: <FaReact />,
        title: "React",
        description: "Component-based UI library.",
      },
      {
        icon: <SiVite />,
        title: "Vite",
        description: "Fast development and build tool.",
      },
      {
        icon: <FaCss3Alt />,
        title: "CSS3",
        description: "Responsive styling and layouts.",
      },
    ],
  },
  {
    category: "Backend",
    technologies: [
      {
        icon: <FaPython />,
        title: "Python",
        description: "Application logic.",
      },
      {
        icon: <SiFastapi />,
        title: "FastAPI",
        description: "REST API framework.",
      },
      {
        icon: <FaKey />,
        title: "JWT",
        description: "Secure authentication.",
      },
    ],
  },
  {
    category: "Database",
    technologies: [
      {
        icon: <SiPostgresql />,
        title: "PostgreSQL",
        description: "Relational database.",
      },
      {
        icon: <SiSqlalchemy />,
        title: "SQLAlchemy",
        description: "Python ORM.",
      },
    ],
  },
  {
    category: "Tools",
    technologies: [
      {
        icon: <FaGitAlt />,
        title: "Git",
        description: "Version control.",
      },
      {
        icon: <FaGithub />,
        title: "GitHub",
        description: "Code hosting and collaboration.",
      },
    ],
  },
];


function TechStack() {
    
        return (
  <section id="tech-stack">
    <h2>Tech Stack</h2>
    <p>Technologies used to build the application.</p>

    {techStack.map((group) => (
      <div key={group.category} className="tech-category">
        <h3>{group.category}</h3>

        <div className="tech-grid">
          {group.technologies.map((tech) => (
            <Card
              key={tech.title}
              icon={tech.icon}
              title={tech.title}
              description={tech.description}
            />
          ))}
        </div>
      </div>
    ))}
  </section>
);
}
export default TechStack;