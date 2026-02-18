import ThemeToggle from './ThemeToggle';

export default function Navbar({ dark, onChange, left }) {
  return (
    <header className="hero-navbar z-50">
      <div className="hero-navbar-inner">
        <div>{left}</div>
        <div className="hero-toggle-wrapper">
          <ThemeToggle dark={dark} onChange={onChange} />
        </div>
      </div>
    </header>
  );
}
