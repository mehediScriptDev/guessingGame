export default function SharedHeroBackground({ children }) {
  return (
    <section
      className="hero-section relative min-h-screen bg-linear-to-t from-[#fbc1ab] to-[#fff8f5] dark:from-gray-800 dark:to-gray-900"
      style={{
        backgroundImage: "url('cornerbg.png')",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* bg.png (layer 1) +  overlay (layer 2) */}
      <div className="hero-bg-wrap relative">
        <img src="/bg.png" alt="" className="h-full w-full object-cover object-top" />
        <div className="absolute inset-0" />
      </div>
      <div className="absolute inset-0 bg-linear-to-br from-[#fcb9a0] to-[#fff7f4] opacity-70" />

      <div className="relative" style={{ zIndex: 2 }}>
        {children}
      </div>
    </section>
  );
}
