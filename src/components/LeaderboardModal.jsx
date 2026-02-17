import { useState } from 'react';

const MOCK_SCORES = [
  { rank: 1, name: 'Kathryn Murphy', score: '1,420+', avatar: '👩' },
  { rank: 2, name: 'Cody Fisher', score: '1,420+', avatar: '👨' },
  { rank: 3, name: 'Albert Flores', score: '1,420+', avatar: '👤' },
  { rank: 4, name: 'Annette Black', score: '1,420+', avatar: '👩' },
  { rank: 5, name: 'Darlene Robertson', score: '1,420+', avatar: '👩' },
  { rank: 6, name: 'Darrell Steward', score: '1,420+', avatar: '👨' },
];

export default function LeaderboardModal({ onClose }) {
  const [tab, setTab] = useState('daily'); // daily | global

  return (
    <div className="lb-backdrop" onClick={onClose}>
      <div className="lb-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="lb-header">
          <h3 className="lb-title">Leaderboard</h3>
          <button className="lb-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="lb-tabs">
          <button
            className={`lb-tab ${tab === 'daily' ? 'lb-tab-active' : 'lb-tab-inactive'}`}
            onClick={() => setTab('daily')}
          >
            Daily top scorers
          </button>
          <button
            className={`lb-tab ${tab === 'global' ? 'lb-tab-active' : 'lb-tab-inactive'}`}
            onClick={() => setTab('global')}
          >
            Global top scorers
          </button>
        </div>

        {/* List */}
        <div className="lb-list">
          {MOCK_SCORES.map((item) => (
            <div key={item.rank} className="lb-row">
              <div className="lb-row-left">
                <span className="lb-rank">#{item.rank}</span>
                <span className="lb-avatar">{item.avatar}</span>
                <span className="lb-name">{item.name}</span>
              </div>
              <span className="lb-score">{item.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
