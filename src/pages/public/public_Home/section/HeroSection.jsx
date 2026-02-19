import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../../components/Navbar';

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

  const clickAudioRef = useRef(null);
  useEffect(() => {
    try {
      clickAudioRef.current = new Audio('/sounds/click.mp3');
    } catch (e) {
      clickAudioRef.current = null;
    }
  }, []);

  return (
    <section
      className="hero-section relative"
      style={{
        backgroundColor: dark ? '#0d0402' : undefined,
        backgroundImage: dark ? undefined : "url('cornerbg.png')",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* bg.png — bottom half basketball court */}
      <div className="hero-bg-wrap relative" style={{ zIndex: 0 }}>
        <img src="/bg.png" alt="" className="h-full w-full object-cover object-top" />
      </div>
      {/* darkcorner.png — rotated diamond (Figma: 2144×2144 @ 46°, top:-1993px left:-555px on 1090px frame) */}
      {dark && (
        <img
          src="/darkcorner.png"
          alt=""
          className="hero-darkcorner pointer-events-none absolute"
          style={{
            width: '140vw',
            height: '140vw',
            top: '-95vw',
            // left: '-35vw',
            // transform: 'rotate(46deg)',
            transformOrigin: 'top left',
            objectFit: 'cover',
            zIndex: 1,
          }}
        />
      )}
      {/* overlay — use shared hero overlay so dark mode color is consistent */}
      <div className="absolute inset-0 bg-linear-to-br from-[#fcb9a0] to-[#fff7f4] opacity-70 hero-bg-overlay" />
      {/* Navbar */}
      <Navbar dark={dark} onChange={setDark} />

      {/* Main content */}
      <div className="hero-content z-50 max-w-7xl px-4 sm:px-6 md:px-8">
        {' '}
        <div className="hero-logo-wrapper mx-auto mb-2 w-24 sm:mb-3 sm:w-28 md:mb-4 md:w-32 lg:w-36">
          <img
            src={dark ? '/topImageBlack.png' : '/topImage.png'}
            alt="YouKnowBall Logo"
            className="hero-logo h-auto w-full"
          />
        </div>
        <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
          <span className="hero-title-white">YOUKNOW</span>
          <span className="hero-title-orange">BALL</span>
        </h1>
        <p className={`my-2 text-sm sm:my-2.5 md:my-3 md:text-base lg:text-lg xl:text-xl ${dark ? 'text-[#FFF8F5]' : 'text-[#140601]'}`}>
          The ultimate test of NBA knowledge. Guess the
          <br />
          player before time runs out.
        </p>
        <div className="hero-cards mt-4 flex w-full flex-col gap-4 sm:flex-row sm:gap-5 md:gap-6">
          <div className="hero-card hero-card-1 flex items-start gap-3 p-4 sm:gap-4 sm:p-5 md:p-6">
            <img
              src="/cards/target.png"
              alt="target"
              className="hero-card-icon h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28"
            />
            <div className="hero-card-body flex flex-col gap-0.5">
              <span className={`hero-card-label text-sm md:text-base ${dark ? 'text-[#FFF8F5]' : 'text-[#140601]/72'}`}>
                Total Rounds
              </span>
              <span className="hero-card-number text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                05
              </span>
              <span className="hero-card-sublabel text-base md:text-lg lg:text-xl">Stages</span>
              <span className={`hero-card-desc tracking-tight text-sm xl:text-base ${dark ? 'text-[#FFF8F5]/85' : 'text-[#140601]/72'}`}>
                Five intense challenges to prove you're a true fan
              </span>
            </div>
          </div>

          <div className="hero-card hero-card-2 flex items-start gap-3 p-4 sm:gap-4 sm:p-5 md:p-6">
            <img
              src="/cards/diamond.png"
              alt="diamond"
              className="hero-card-icon h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28"
            />
            <div className="hero-card-body flex flex-col gap-0.5">
              <span className={`hero-card-label text-sm md:text-base ${dark ? 'text-[#FFF8F5]' : 'text-[#140601]/72'}`}>
                Max score
              </span>
              <span className="hero-card-number text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                1000
              </span>
              <span className="hero-card-sublabel text-base md:text-lg lg:text-xl">Per round</span>
              <span className={`hero-card-desc tracking-tighter text-sm xl:text-base ${dark ? 'text-[#FFF8F5]/85' : 'text-[#140601]/72'}`}>
                Correct first name +400, correct last name +400, and +200 bonus if 6 seconds remain.
              </span>
            </div>
          </div>

          <div className="hero-card hero-card-3 flex items-start gap-3 p-4 sm:gap-4 sm:p-5 md:p-6">
            <img
              src="/cards/counting.png"
              alt="hourglass"
              className="hero-card-icon h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28"
            />
            <div className="hero-card-body flex flex-col gap-0.5">
              <span className={`hero-card-label text-sm md:text-base ${dark ? 'text-[#FFF8F5]' : 'text-[#140601]/72'}`}>
                Time limit
              </span>
              <span className="hero-card-number text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                12
              </span>
              <span className="hero-card-sublabel text-base md:text-lg lg:text-xl">Second</span>
              <span className={`hero-card-desc tracking-tight text-sm xl:text-base ${dark ? 'text-[#FFF8F5]/85' : 'text-[#140601]/72'}`}>
                Every second counts—faster = more points!
              </span>
            </div>
          </div>
        </div>
        {/* CTA */}
        <div className="hero-cta-wrapper mt-4 sm:mt-6 md:mt-8">
          <Link
            to="/game"
            onClick={() => {
              try {
                const a = clickAudioRef.current;
                if (a) {
                  a.currentTime = 0;
                  a.play().catch(() => {});
                }
              } catch (e) {}
            }}
            className="hero-cta-btn px-6 py-2.5 text-xs sm:px-10 sm:py-3 sm:text-sm md:px-12 md:py-3.5 md:text-base shadow-2xl"
          >
            Enter The Arena
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
