import "../../styles/card.css";

function Card({
    icon: Icon,
    title,
    description,
    className = "",
}) {
    return (
        <div className={`card ${className}`}>

            {Icon && (
                <div className="card-icon">
                    <Icon />
                </div>
            )}

            <h3 className="card-title">
                {title}
            </h3>

            <p className="card-description">
                {description}
            </p>

        </div>
    );
}

export default Card;