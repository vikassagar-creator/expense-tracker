import "../../styles/card.css";
function Card({ icon, title, description, className = "" }) {
    return (
        <div className={`card ${className}`}>
            {icon && <div className="card-icon">{icon}</div>}
            <h3 className="card-title">{title}</h3>
            <p className="card-description">{description}</p>
        </div>
    );
}

export default Card;