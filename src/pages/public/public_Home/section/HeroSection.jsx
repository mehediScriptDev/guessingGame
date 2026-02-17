import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [dark, setDark] = useState(() => {
    const pref = localStorage.getItem('theme');
    if (pref) return pref === 'dark';
    return false;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add('theme-dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('theme-dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <section
      className="hero-section bg-linear-to-t from-[#fbc1ab] to-[#fff8f5] dark:from-gray-800 dark:to-gray-900"
      style={{
        backgroundImage: "url('cornerbg.png')",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* bg.png (layer 1) + translucent overlay (layer 2) */}
      <div className="hero-bg-wrap relative">
        <img src="/bg.png" alt="" className="h-full w-full object-cover object-top" />
        <div className="absolute inset-0 bg-[#FFF7F4CC]/80" />
      </div>

      {/* Navbar */}
      <header className="hero-navbar">
        <div className="hero-navbar-inner">
          <div />
          <div className="hero-toggle-wrapper">
            <span className="hero-toggle-label">MODE</span>
            <button
              aria-label="Toggle theme"
              onClick={() => setDark((d) => !d)}
              className="hero-toggle-btn"
            >
              <span className="hero-toggle-emoji">{dark ? '🌙' : '☀️'}</span>
              <div className={`hero-toggle-knob ${dark ? 'toggled' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="hero-content">
        <div className="hero-logo-wrapper">
          <img
            src={dark ? '/topImageBlack.png' : '/topImage.png'}
            alt="YouKnowBall Logo"
            className="hero-logo"
          />
        </div>

        <h1 className="hero-title">
          <span className="hero-title-white">YOUKNOW</span>
          <span className="hero-title-orange">BALL</span>
        </h1>

        <p className="hero-subtitle">
          The ultimate test of NBA knowledge. Guess the
          <br />
          player before time runs out.
        </p>

        <div className="hero-cards">
          <div className="hero-card hero-card-1">
            <img src="/cards/target.png" alt="target" className="hero-card-icon" />
            <div className="hero-card-body">
              <span className="hero-card-label">Total Rounds</span>
              <span className="hero-card-number">05</span>
              <span className="hero-card-sublabel">Stages</span>
              <span className="hero-card-desc">
                Five intense challenges to prove you're a true fan
              </span>
            </div>
          </div>

          <div className="hero-card hero-card-2">
            <img src="/cards/diamond.png" alt="diamond" className="hero-card-icon" />
            <div className="hero-card-body">
              <span className="hero-card-label">Max score</span>
              <span className="hero-card-number">1000</span>
              <span className="hero-card-sublabel">Per round</span>
              <span className="hero-card-desc">
                Correct first name +400, correct last name +400, and +200 bonus if 6 seconds remain.
              </span>
            </div>
          </div>

          <div className="hero-card hero-card-3">
            <img src="/cards/counting.png" alt="hourglass" className="hero-card-icon" />
            <div className="hero-card-body">
              <span className="hero-card-label">Time limit</span>
              <span className="hero-card-number">12</span>
              <span className="hero-card-sublabel">Second</span>
              <span className="hero-card-desc">Every second counts—faster = more points!</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="hero-cta-wrapper">
          <Link to="/game" className="hero-cta-btn">
            Enter The Arena
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
