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
      className="hero-section bg-linear-to-t from-[#fbc1ab] to-[#fff8f5] dark:from-gray-800 dark:to-gray-900 relative"
      style={{
        backgroundImage: "url('cornerbg.png')",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* bg.png (layer 1) + translucent overlay (layer 2) */}
      <div className="hero-bg-wrap relative">
        <img src="/bg.png" alt="" className="h-full w-full object-cover object-top" />
        <div className="absolute inset-0 " />
      </div>
<div className='bg-linear-to-br from-[#fcb9a0] to-[#fff7f4] absolute inset-0 opacity-70' ></div>
      {/* Navbar */}
      <header className="hero-navbar z-50">
        <div className="hero-navbar-inner">
          <div />
          <div className="hero-toggle-wrapper">
            <span className="text-2xl font-display text-[#353535]">MODE</span>
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
      <div className="hero-content max-w-7xl z-50 px-4 sm:px-6 md:px-8">        <div className="hero-logo-wrapper mb-2 sm:mb-3 md:mb-4 w-24 sm:w-28 md:w-32 lg:w-36 mx-auto">
          <img
            src={dark ? '/topImageBlack.png' : '/topImage.png'}
            alt="YouKnowBall Logo"
            className="hero-logo w-full h-auto"
          />
        </div>

        <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
          <span className="hero-title-white">YOUKNOW</span>
          <span className="hero-title-orange">BALL</span>
        </h1>

        <p className="hero-subtitle text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl my-2 sm:my-2.5 md:my-3">
          The ultimate test of NBA knowledge. Guess the
          <br />
          player before time runs out.
        </p>

        <div className="hero-cards mt-3 flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6 w-full">
          <div className="hero-card hero-card-1 flex items-start gap-3 sm:gap-4 p-4 sm:p-5 md:p-6">
            <img src="/cards/target.png" alt="target" className="hero-card-icon w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28" />
            <div className="hero-card-body flex flex-col gap-0.5">
              <span className="hero-card-label text-xs sm:text-sm md:text-base">Total Rounds</span>
              <span className="hero-card-number text-2xl sm:text-3xl md:text-4xl lg:text-5xl">05</span>
              <span className="hero-card-sublabel text-sm sm:text-base md:text-lg lg:text-xl">Stages</span>
              <span className="hero-card-desc text-sm tracking-tight">
                Five intense challenges to prove you're a true fan
              </span>
            </div>
          </div>

          <div className="hero-card hero-card-2 flex items-start gap-3 sm:gap-4 p-4 sm:p-5 md:p-6">
            <img src="/cards/diamond.png" alt="diamond" className="hero-card-icon w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28" />
            <div className="hero-card-body flex flex-col gap-0.5">
              <span className="hero-card-label text-xs sm:text-sm md:text-base">Max score</span>
              <span className="hero-card-number text-2xl sm:text-3xl md:text-4xl lg:text-5xl">1000</span>
              <span className="hero-card-sublabel text-sm sm:text-base md:text-lg lg:text-xl">Per round</span>
              <span className="hero-card-desc text-sm tracking-tighter">
                Correct first name +400, correct last name +400, and +200 bonus if 6 seconds remain.
              </span>
            </div>
          </div>

          <div className="hero-card hero-card-3 flex items-start gap-3 sm:gap-4 p-4 sm:p-5 md:p-6">
            <img src="/cards/counting.png" alt="hourglass" className="hero-card-icon w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28" />
            <div className="hero-card-body flex flex-col gap-0.5">
              <span className="hero-card-label text-xs sm:text-sm md:text-base">Time limit</span>
              <span className="hero-card-number text-2xl sm:text-3xl md:text-4xl lg:text-5xl">12</span>
              <span className="hero-card-sublabel text-sm sm:text-base md:text-lg lg:text-xl">Second</span>
              <span className="hero-card-desc text-sm tracking-tight">Every second counts—faster = more points!</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="hero-cta-wrapper mt-4 sm:mt-6 md:mt-8">
          <Link to="/game" className="hero-cta-btn text-xs sm:text-sm md:text-base px-6 sm:px-10 md:px-12 py-2.5 sm:py-3 md:py-3.5">
            Enter The Arena
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
