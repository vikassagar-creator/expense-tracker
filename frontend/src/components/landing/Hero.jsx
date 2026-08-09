import "./hero.css";
function Hero() {
  return (
    <section id="hero">
      <div className="hero">
        <h1>Take Control of Your Finances Today</h1>
        <p>Simple, intuitive expense tracking for a better financial future.</p>
        <div className="btn-container">
          <a className="btn-get-started" href="/register">
            Get Started
          </a>
          <a className="btn-learn-more" href="/learn-more">
            Learn More
          </a>
        </div>
      </div>
      
      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1617196033314-2b0d6f0f2f05"
          alt="Finance Illustration"/>
      </div>
    </section>
  );
}

export default Hero;