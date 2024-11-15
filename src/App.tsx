import './App.css'

function App() {
  return (
    <div className="landing-page">
      <header className="hero">
        <div className="overlay">
          <h1>Nature's Beauty</h1>
          <h2>This is ENV VARIABLE: {import.meta.env.VITE_ENV}</h2>
          <p>Experience the serene beauty of nature through stunning photography.</p>
          <button className="cta-button">Explore Gallery</button>
        </div>
      </header>
      <section className="features">
        <h2>Why Love Nature?</h2>
        <div className="features-container">
          <div className="feature">
            <h3>Breathtaking Views</h3>
            <p>Capture the most stunning landscapes and feel connected to nature.</p>
          </div>
          <div className="feature">
            <h3>Peaceful Atmosphere</h3>
            <p>Embrace the calm and serenity that only nature can offer.</p>
          </div>
          <div className="feature">
            <h3>Inspiration Everywhere</h3>
            <p>Find creativity and inspiration in the beauty around you.</p>
          </div>
        </div>
      </section>
      <footer className="footer">
        <p>© 2024 Nature's Beauty | All rights reserved</p>
      </footer>
    </div>
  )
}

export default App
