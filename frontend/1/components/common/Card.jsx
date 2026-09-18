import "../../styles/card.css";

// Generic icon + title + description card, used by the landing page's
// Features section. `className` lets a caller add extra styling hooks.

function Card({ icon: Icon, title, description, className = "" }) {
  return (
    <div className={`card ${className}`}>
      {Icon && (
        <div className="card-icon">
          <Icon />
        </div>
      )}

      <h3 className="card-title">{title}</h3>

      <p className="card-description">{description}</p>
    </div>
  );
}

export default Card;
