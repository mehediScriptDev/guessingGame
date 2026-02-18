export default function SharedHeroBackground({ children }) {
  return (
    <div
      /* ── Layer 1: base gradient + corner watermark ── */
      className="hero-section relative min-h-screen bg-linear-to-t from-[#fbc1ab] to-[#fff8f5] dark:from-transparent dark:to-transparent"
      style={{
        backgroundImage: "url('cornerbg.png')",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* ── Layer 2: /bg.png basketball image ── */}
      <div className="hero-bg-wrap relative">
        <img src="/bg.png" alt="" className="h-full w-full object-cover object-top" />
        <div className="fixed inset-0" />
      </div>

      {/* ── Layer 3: warm gradient overlay ── */}
      <div className="absolute inset-0 bg-linear-to-br from-[#fcb9a0] to-[#fff7f4] opacity-70"></div>

      {/* ── Content ── */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
