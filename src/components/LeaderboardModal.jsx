import { useState } from 'react';

const MOCK_DAILY = [
  { rank: 1, name: 'Kathryn Murphy', score: '1,420+', avatar: '👩' },
  { rank: 2, name: 'Cody Fisher', score: '1,320', avatar: '👨' },
  { rank: 3, name: 'Albert Flores', score: '1,210', avatar: '🧑' },
  { rank: 4, name: 'Annette Black', score: '1,120', avatar: '👩' },
  { rank: 5, name: 'Darlene Robertson', score: '1,080', avatar: '👩' },
  { rank: 6, name: 'Darrell Steward', score: '950', avatar: '👨' },
];

const MOCK_GLOBAL = [
  { rank: 1, name: 'LeBron James', score: '9,420+', avatar: '🏀' },
  { rank: 2, name: 'Stephen Curry', score: '8,320', avatar: '🏀' },
  { rank: 3, name: 'Kevin Durant', score: '7,210', avatar: '🏀' },
  { rank: 4, name: 'Kawhi Leonard', score: '6,120', avatar: '🏀' },
  { rank: 5, name: 'Giannis Antetokounmpo', score: '5,080', avatar: '🏀' },
  { rank: 6, name: 'Chris Paul', score: '4,950', avatar: '🏀' },
];

export default function LeaderboardModal({ onClose }) {
  const [tab, setTab] = useState('daily');

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/35 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-[90%] max-w-2xl bg-[#F6EEEB] rounded-2xl p-6 shadow-2xl animate-[lb-pop_0.25s_ease-out]"
       
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3
            className="text-xl lg:text-2xl font-normal text-[#140601] "
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Leaderboard
          </h3>
          <button
            onClick={onClose}
            className="w-7 h-7 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-(--hero-muted) hover:bg-black/6 transition-colors text-base border-none bg-transparent cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-5">
          <button
            onClick={() => setTab('daily')}
            className={`flex-1 py-2.5 text-xs sm:text-sm lg:text-base font-bold rounded-lg border-2 border-[#ff6b2d] transition-all duration-200 cursor-pointer ${
              tab === 'daily'
                ? 'bg-[#ff6b2d] text-white'
                : 'bg-transparent text-[#ff6b2d] hover:bg-[#ff6b2d]/10'
            }`}
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            Daily top scorers
          </button>
          <button
            onClick={() => setTab('global')}
            className={`flex-1 py-2.5 text-xs sm:text-sm lg:text-base font-bold rounded-lg border-2 border-[#ff6b2d] transition-all duration-200 cursor-pointer ${
              tab === 'global'
                ? 'bg-[#ff6b2d] text-white'
                : 'bg-transparent text-[#ff6b2d] hover:bg-[#ff6b2d]/10'
            }`}
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            Global top scorers
          </button>
        </div>

        {/* List */}
        <div className="flex flex-col">
          {(tab === 'daily' ? MOCK_DAILY : MOCK_GLOBAL).map((item, i, arr) => (
            <div
              key={`${item.name}-${item.rank}`}
              className={`flex items-center justify-between py-3.5 ${i < arr.length - 1 ? 'border-b border-(--card-border)' : ''}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm sm:text-base lg:text-xl font-bold text-[#140601] min-w-6.5" style={{ fontFamily: 'var(--font-primary)' }}>
                  #{item.rank}
                </span>
                <span className="w-9 h-9 rounded-full flex items-center justify-center text-xl" style={{ background: 'var(--hero-overlay)' }}>
                  {item.avatar}
                </span>
                <span className="text-sm sm:text-base lg:text-xl font-semibold text-[#140601]" style={{ fontFamily: 'var(--font-primary)' }}>
                  {item.name}
                </span>
              </div>
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-[#ff6b2d]" style={{ fontFamily: 'var(--font-display)' }}>
                {item.score}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
