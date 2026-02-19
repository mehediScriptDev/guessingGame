import { useState, useEffect } from 'react';

export default function SharedHeroBackground({ children }) {
  // Reactively track html.theme-dark so the background updates whenever the toggle changes
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains('theme-dark')
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('theme-dark'));
    });
    observer.observe(document.documentElement, { attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="hero-section relative min-h-screen"
      style={
        isDark
          ? { backgroundColor: '#0d0402' }
          : {
              backgroundImage: "url('cornerbg.png')",
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }
      }
    >
      {/* bg.png — bottom half basketball court */}
      <div className="hero-bg-wrap relative" style={{ zIndex: 0 }}>
        <img src="/bg.png" alt="" className="h-full w-full object-cover object-top" />
      </div>

      {/* darkcorner.png — dark mode only; desktop sizes inline, mobile overrides in CSS */}
      {isDark && (
        <img
          src="/darkcorner.png"
          alt=""
          className="hero-darkcorner pointer-events-none absolute"
          style={{
            width: '140vw',
            height: '140vw',
            top: '-95vw',
            transformOrigin: 'top left',
            objectFit: 'cover',
            zIndex: 1,
          }}
        />
      )}

      {/* overlay — hero-bg-overlay class so CSS dark/light colour is consistent */}
      <div className="absolute inset-0 bg-linear-to-br from-[#fcb9a0] to-[#fff7f4] opacity-70 hero-bg-overlay" />

      <div className="relative" style={{ zIndex: 2 }}>
        {children}
      </div>
    </section>
  );
}
