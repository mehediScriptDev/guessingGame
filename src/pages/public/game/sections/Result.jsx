import { Trophy, XCircle } from 'lucide-react';

export default function Result({ result, round, ROUNDS, nextRound, bgBottom, navbar, dark }) {
  const isPerfect = result.type === 'perfect';
  const isPartial = result.type === 'partial';
  const iconClass = isPerfect
    ? 'bg-[rgba(187,247,208,0.45)] dark:bg-[rgba(34,197,94,0.15)] text-[#16a34a]'
    : isPartial
      ? 'bg-[rgba(254,215,170,0.45)] dark:bg-[rgba(249,115,22,0.15)] text-[#ea580c]'
      : 'bg-[rgba(254,202,202,0.45)] dark:bg-[rgba(239,68,68,0.15)] text-[#dc2626]';
  const heading = isPerfect ? 'Perfect!' : isPartial ? 'Close!' : 'INCORRECT.';

  return (
    <section 
      className="relative w-full min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'transparent' }}
    >
      {navbar}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-start w-full max-w-190 mx-auto px-4 sm:px-6 pb-10 sm:pb-20 text-center">
        <div className={`w-20 h-20 sm:w-24 sm:h-24 md:w-25 md:h-25 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 ${iconClass}`}>
          {isPerfect || isPartial ? (
            <Trophy size={40} className="sm:w-12 sm:h-12" />
          ) : (
            <XCircle size={40} className="sm:w-12 sm:h-12" />
          )}
        </div>
        <h2 
          className="text-3xl sm:text-4xl md:text-[36px] lg:text-5xl m-0 mb-1 sm:mb-3.5"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--hero-title-color)' }}
        >
          {heading}
        </h2>
        <p className="m-0 mb-6 sm:mb-7">
          <span 
            className="text-xl sm:text-2xl md:text-[22px] lg:text-4xl text-[#ff6b2d]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            +{result.points}
          </span>
          <span 
            className="text-sm xl:text-base ml-1"
            style={{ fontFamily: 'var(--font-primary)', color: 'var(--hero-muted)' }}
          >
            {' '}PTS
          </span>
        </p>
        <div 
          className="max-w-105 mx-auto mb-5 sm:mb-6 rounded-xl px-6 sm:px-8 py-5 sm:py-6 backdrop-blur-xl text-center"
          style={{ 
            background: 'var(--card-bg)', 
            border: '1px solid var(--card-border)' 
          }}
        >
          <span 
            className="block mb-1.5 text-xs sm:text-sm text-[#140601]"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            The player was
          </span>
          <h3 
            className="text-xl sm:text-2xl lg:text-4xl font-bold m-0 mb-1.5"
            style={{ fontFamily: 'var(--font-primary)', color: 'var(--hero-title-color)' }}
          >
            {result.player.firstName} {result.player.lastName}.
          </h3>
          <span 
            className="text-xs sm:text-sm text-[#140601]"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            {result.player.team} • {result.player.era}
          </span>
        </div>
        <button 
          className="block w-full max-w-105 mx-auto px-6 sm:px-8 py-3 sm:py-3.5 border-none rounded-lg text-sm sm:text-[15px] font-bold text-white bg-[#ff6b2d] cursor-pointer transition-all duration-200 hover:bg-[#ff8a4a] hover:-translate-y-0.5"
          style={{ fontFamily: 'var(--font-primary)' }}
          onClick={nextRound}
        >
          {round >= ROUNDS ? 'See Results' : 'Next Round'}
        </button>
      </div>
    </section>
  );
}
