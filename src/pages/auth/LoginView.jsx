import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LoginView = () => {
  const [username, setUsername] = useState('');

  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');
  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: implement actual login
  };

  return (
    <section className="login-section">
      <div className="login-bg-wrap">
        <img src="/bg.png" alt="" className="login-bg-bottom" />
        <div className="login-bg-overlay" />
      </div>

      {/* Navbar */}
      <header className="login-navbar">
        <div className="login-navbar-inner">
          <div />
          <div className="login-toggle-wrap">
            <span className="login-toggle-label">MODE</span>
            <button className="login-toggle-btn" onClick={() => setDark((d) => !d)}>
              <span className="login-toggle-emoji">{dark ? '🌙' : '☀️'}</span>
              <div className={`login-toggle-knob ${dark ? 'toggled' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Login card */}
      <div className="login-content">
        <div className="login-card">
          <span className="login-badge">Player Log In</span>
          <h2 className="login-heading">Sign in to continue</h2>
          <p className="login-sub">Test your NBA Knowledge by playing.</p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-field">
              <label className="login-label">User name</label>
              <input
                type="text"
                className="login-input"
                placeholder="username@youknowball.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <button type="submit" className="login-submit">
              Log In
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginView;
