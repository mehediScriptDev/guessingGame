export default function SharedHeroBackground({ children }) {
  return (
    <div
      /* ── Layer 1: base gradient ── */
      className="hero-section relative min-h-screen bg-linear-to-t from-[#fbc1ab] to-[#fff8f5] dark:from-transparent dark:to-transparent"
    >
      {/* ── Layer 2: fixed basketball background (never scrolls) ── */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '50%',
          zIndex: 0,
          pointerEvents: 'none',
          backgroundImage: "url('/bg.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      />

      {/* ── Layer 3: warm gradient overlay (also fixed) ── */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'linear-gradient(to bottom right, #fcb9a0, #fff7f4)',
          opacity: 0.6,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* ── Content ── */}
      <div className="relative" style={{ zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
}
