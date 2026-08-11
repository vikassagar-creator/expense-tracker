function TechItem({ icon: Icon, title }) {
    return (
        <div className="tech-item">
            <Icon className="tech-icon" />
            <span>{title}</span>
        </div>
    );
}

export default TechItem;