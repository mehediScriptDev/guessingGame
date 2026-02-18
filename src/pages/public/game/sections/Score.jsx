import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

export default function Score({ score, efficiency, tier, buckets, ROUNDS, bgBottom, navbar, dark, handlePlayAgain }) {
  return (
    <section 
      className="relative w-full min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'transparent' }}
    >
      {navbar}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-start w-full max-w-5xl mx-auto px-4 sm:px-6 pt-4 pb-10 sm:pb-12 text-center">
        {/* Logo */}
        <div className="mx-auto mb-2 sm:mb-3 md:mb-4 w-24 sm:w-28  md:w-32 lg:w-36 xl:w-40">
          <img 
            src={dark ? '/topImageBlack.png' : '/topImage.png'} 
            alt="Logo" 
            className="w-full h-auto block mx-auto drop-shadow-lg" 
          />
        </div>

        {/* Your Score heading */}
        <h2 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal my-1 mb-3 sm:mb-4 tracking-wide"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <span className="text-[#ff6b2d] italic">Your </span>
          <span style={{ color: 'var(--hero-title-color)' }}>Score</span>
        </h2>

        {/* Score card */}
        <div 
          className="inline-block mt-2 rounded-xl px-8 sm:px-10 py-3 sm:py-4 mb-1.5 backdrop-blur-xl"
          style={{ 
            background: 'var(--card-bg)', 
            border: '1px solid var(--card-border)' 
          }}
        >
          <span 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-none"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--hero-title-color)' }}
          >
            {String(score).padStart(2, '0')}
          </span>
        </div>
        <p 
          className="text-[9px] sm:text-[10px] lg:text-base font-bold tracking-[2px] uppercase m-0 mb-4 sm:mb-5 text-[#0A0300B8]/72"
          style={{ fontFamily: 'var(--font-primary)' }}
        >
          ACCUMULATED SKILL POINTS
        </p>

        {/* Stats row */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-7xl mx-auto mb-6 sm:mb-7 xl:mb-10">
          <div 
            className="flex-1 rounded-xl px-3 sm:px-4 py-4 sm:py-4.5 text-left backdrop-blur-xl"
            style={{ 
              background: 'var(--card-bg)', 
              border: '1px solid var(--card-border)' 
            }}
          >
            <span 
              className="block text-[11px] lg:text-xl font-semibold mb-1"
              style={{ fontFamily: 'var(--font-primary)', color: 'var(--hero-muted)' }}
            >
              Efficiency
            </span>
            <span 
              className="block text-3xl sm:text-4xl lg:text-5xl leading-none text-[#ff6b2d]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {String(efficiency).padStart(2, '0')}%
            </span>
          </div>
          <div 
            className="flex-1 rounded-xl px-3 sm:px-4 py-4 sm:py-4.5 text-left backdrop-blur-xl"
            style={{ 
              background: 'var(--card-bg)', 
              border: '1px solid var(--card-border)' 
            }}
          >
            <span 
              className="block text-[11px] lg:text-xl font-semibold mb-1"
              style={{ fontFamily: 'var(--font-primary)', color: 'var(--hero-muted)' }}
            >
              Buckets
            </span>
            <span 
              className="block text-3xl sm:text-4xl lg:text-5xl leading-none text-[#ff6b2d]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {String(buckets).padStart(2, '0')}/{String(ROUNDS).padStart(2, '0')}
            </span>
          </div>
          <div 
            className="flex-1 rounded-xl px-3 sm:px-4 py-4 sm:py-4.5 text-left backdrop-blur-xl"
            style={{ 
              background: 'var(--card-bg)', 
              border: '1px solid var(--card-border)' 
            }}
          >
            <span 
              className="block text-[11px] lg:text-xl font-semibold mb-1"
              style={{ fontFamily: 'var(--font-primary)', color: 'var(--hero-muted)' }}
            >
              Tier
            </span>
            <span 
              className="block text-3xl sm:text-4xl lg:text-5xl leading-none text-[#ff6b2d]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {tier}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-120 mx-auto">
          <Link 
            to="/login" 
            className="flex-1 inline-flex items-center justify-center px-4 sm:px-5 py-3 sm:py-3.5 border-none rounded-lg text-xs sm:text-sm xl:text-base font-bold text-white bg-[#ff6b2d] cursor-pointer no-underline transition-all duration-200 hover:bg-[#ff8a4a] hover:-translate-y-0.5"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            Log In To Save Score
          </Link>
          <button 
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 border-2 border-[#ff6b2d] rounded-lg text-xs sm:text-sm xl:text-base font-bold text-[#ff6b2d] bg-transparent cursor-pointer transition-all duration-200 hover:bg-[#ff6b2d] hover:text-white hover:-translate-y-0.5"
            style={{ fontFamily: 'var(--font-primary)' }}
            onClick={handlePlayAgain}
          >
            <Play className="sm:w-4 sm:h-4 w-3 h-3" />
            Play Again
          </button>
        </div>
      </div>
    </section>
  );
}
