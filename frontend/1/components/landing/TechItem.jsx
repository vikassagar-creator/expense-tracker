function TechItem({ icon: Icon, title }) {
  // Single icon+label pill used inside TechStack's grid.
  return (
    <div className="tech-item">
      <Icon className="tech-icon" />
      <span>{title}</span>
    </div>
  );
}

export default TechItem;
