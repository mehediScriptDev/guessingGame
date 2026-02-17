import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PLAYERS from '../../../data/players';
import './game.css';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const ROUNDS = 5;
const DURATION = 15;
const MAX_PER_ROUND = 1000;

function getTier(efficiency) {
  if (efficiency >= 90) return 'GOAT';
  if (efficiency >= 70) return 'MVP';
  if (efficiency >= 50) return 'All-Star';
  if (efficiency >= 30) return 'Starter';
  if (efficiency >= 10) return 'Rookie';
  return 'Bench';
}

export default function GameView() {
  const navigate = useNavigate();

  /* ── theme ── */
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');
  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  /* ── game state ── */
  const [phase, setPhase] = useState('playing');
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState(null);
  const [order] = useState(() => shuffle(PLAYERS.map((_, i) => i)));
  const [buckets, setBuckets] = useState(0); // correct rounds

  const guessRef = useRef('');
  const doneRef = useRef(false);
  const timerRef = useRef(null);
  const timeRef = useRef(DURATION);

  const player = PLAYERS[order[(round - 1) % PLAYERS.length]];

  /* ── timer ── */
  useEffect(() => {
    if (phase !== 'playing') return;
    doneRef.current = false;
    timeRef.current = DURATION;
    setTimeLeft(DURATION);

    timerRef.current = setInterval(() => {
      timeRef.current = Math.round((timeRef.current - 0.1) * 10) / 10;
      setTimeLeft(timeRef.current);
      if (timeRef.current <= 0) {
        clearInterval(timerRef.current);
        if (!doneRef.current) {
          doneRef.current = true;
          doProcess(guessRef.current, 0);
        }
      }
    }, 100);
    return () => clearInterval(timerRef.current);
  }, [phase, round]);

  /* ── process guess ── */
  function doProcess(text, tl) {
    const g = text.trim().toLowerCase();
    const fn = player.firstName.toLowerCase();
    const ln = player.lastName.toLowerCase();
    const fOk = g.includes(fn);
    const lOk = g.includes(ln);
    const matched = (fOk ? 1 : 0) + (lOk ? 1 : 0);
    const pot = Math.round((tl / DURATION) * MAX_PER_ROUND);
    const pts = matched === 2 ? pot : matched === 1 ? Math.floor(pot / 2) : 0;
    const type = matched === 2 ? 'perfect' : matched === 1 ? 'partial' : 'incorrect';
    if (matched > 0) setBuckets((b) => b + 1);
    setResult({ type, points: pts, player });
    setScore((s) => s + pts);
    setPhase('result');
  }

  function handleSubmit(e) {
    e?.preventDefault();
    if (doneRef.current) return;
    doneRef.current = true;
    clearInterval(timerRef.current);
    doProcess(guessRef.current, timeRef.current);
  }

  function nextRound() {
    if (round >= ROUNDS) {
      setPhase('gameover');
      return;
    }
    setRound((r) => r + 1);
    setGuess('');
    guessRef.current = '';
    setResult(null);
    setPhase('playing');
  }

  function handlePlayAgain() {
    navigate(0); // reload to reset everything
  }

  /* ── derived ── */
  const pot = Math.round((timeLeft / DURATION) * MAX_PER_ROUND);
  const pct = (timeLeft / DURATION) * 100;
  const barColor = timeLeft > 10 ? '#22c55e' : timeLeft > 5 ? '#f97316' : '#ef4444';
  const maxTotal = MAX_PER_ROUND * ROUNDS;
  const efficiency = maxTotal > 0 ? Math.round((score / maxTotal) * 100) : 0;
  const tier = getTier(efficiency);

  /* ── shared pieces ── */
  const bgBottom = (
    <div className="gm-bg-wrap">
      <img src="/bg.png" alt="" className="gm-bg-bottom" />
      <div className="gm-bg-overlay" />
    </div>
  );

  const navbar = (
    <header className="gm-navbar">
      <div className="gm-navbar-inner">
        <div />
        <div className="gm-toggle-wrap">
          <span className="gm-toggle-label">MODE</span>
          <button className="gm-toggle-btn" onClick={() => setDark((d) => !d)}>
            <span className="gm-toggle-emoji">{dark ? '🌙' : '☀️'}</span>
            <div className={`gm-toggle-knob ${dark ? 'on' : ''}`} />
          </button>
        </div>
      </div>
    </header>
  );

  /* ════════════════════ PLAYING ════════════════════ */
  if (phase === 'playing') {
    return (
      <section className="gm-section">
        {bgBottom}
        {navbar}
        <div className="gm-content">
          <div className="gm-logo-wrap">
            <img
              src={dark ? '/topImageBlack.png' : '/topImage.png'}
              alt="Logo"
              className="gm-logo"
            />
          </div>

          <div className="gm-scorebar">
            <div className="gm-scorebar-left">
              <span className="gm-scorebar-label">CURRENT SCORE</span>
              <span className="gm-scorebar-value">{String(score).padStart(2, '0')}</span>
            </div>
            <span className="gm-scorebar-round">
              ROUND {String(round).padStart(2, '0')}/{String(ROUNDS).padStart(2, '0')}
            </span>
            <div className="gm-scorebar-right">
              <span className="gm-scorebar-label">POT. POINTS</span>
              <span className="gm-scorebar-value">{pot}</span>
            </div>
          </div>

          <div className="gm-image-frame">
            <img src={player.image} alt="Guess this player" className="gm-image" />
          </div>

          <div className="gm-timer">
            <div className="gm-timer-track">
              <div className="gm-timer-fill" style={{ width: `${pct}%`, background: barColor }} />
            </div>
            <span className="gm-timer-num" style={{ color: barColor }}>
              {Math.ceil(timeLeft)}
            </span>
          </div>

          <form className="gm-input-area" onSubmit={handleSubmit}>
            <input
              className="gm-input"
              type="text"
              placeholder="GUESS THE PLAYER"
              value={guess}
              onChange={(e) => {
                setGuess(e.target.value);
                guessRef.current = e.target.value;
              }}
              autoFocus
            />
            <button type="submit" className="gm-submit-btn">
              Submit
            </button>
          </form>
          <p className="gm-tip">Tip: Try first name, last name or full name.</p>
        </div>
      </section>
    );
  }

  /* ════════════════════ RESULT ════════════════════ */
  if (phase === 'result' && result) {
    const isPerfect = result.type === 'perfect';
    const isPartial = result.type === 'partial';
    const iconClass = isPerfect
      ? 'gm-icon-perfect'
      : isPartial
        ? 'gm-icon-partial'
        : 'gm-icon-wrong';
    const heading = isPerfect ? 'Perfect!' : isPartial ? 'Close!' : 'INCORRECT.';

    return (
      <section className="gm-section">
        {bgBottom}
        {navbar}
        <div className="gm-content gm-result-content">
          <div className={`gm-result-circle ${iconClass}`}>
            {isPerfect || isPartial ? (
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 7 7 7 7" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5C17 4 17 7 17 7" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </svg>
            ) : (
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
              </svg>
            )}
          </div>
          <h2 className="gm-result-heading">{heading}</h2>
          <p className="gm-result-pts">
            <span className="gm-result-pts-num">+{result.points}</span>
            <span className="gm-result-pts-label"> PTS</span>
          </p>
          <div className="gm-result-card">
            <span className="gm-result-card-sub">The player was</span>
            <h3 className="gm-result-card-name">
              {result.player.firstName} {result.player.lastName}.
            </h3>
            <span className="gm-result-card-meta">
              {result.player.team} • {result.player.era}
            </span>
          </div>
          <button className="gm-next-btn" onClick={nextRound}>
            {round >= ROUNDS ? 'See Results' : 'Next Round'}
          </button>
        </div>
      </section>
    );
  }

  /* ════════════════════ GAME OVER ════════════════════ */
  return (
    <section className="gm-section">
      {bgBottom}
      {navbar}
      <div className="gm-content gm-gameover-content">
        {/* Logo */}
        <div className="gm-logo-wrap gm-logo-wrap-lg">
          <img src={dark ? '/topImageBlack.png' : '/topImage.png'} alt="Logo" className="gm-logo" />
        </div>

        {/* Your Score heading */}
        <h2 className="gm-over-title">
          <span className="gm-over-title-your">Your </span>
          <span className="gm-over-title-score">Score</span>
        </h2>

        {/* Score card */}
        <div className="gm-over-score-card">
          <span className="gm-over-score-num">{String(score).padStart(2, '0')}</span>
        </div>
        <p className="gm-over-score-label">ACCUMULATED SKILL POINTS</p>

        {/* Stats row */}
        <div className="gm-over-stats">
          <div className="gm-over-stat">
            <span className="gm-over-stat-label">Efficiency</span>
            <span className="gm-over-stat-value">{String(efficiency).padStart(2, '0')}%</span>
          </div>
          <div className="gm-over-stat">
            <span className="gm-over-stat-label">Buckets</span>
            <span className="gm-over-stat-value">
              {String(buckets).padStart(2, '0')}/{String(ROUNDS).padStart(2, '0')}
            </span>
          </div>
          <div className="gm-over-stat">
            <span className="gm-over-stat-label">Tier</span>
            <span className="gm-over-stat-value">{tier}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="gm-over-actions">
          <Link to="/auth/login" className="gm-over-btn-primary">
            Log In To Save Score
          </Link>
          <button className="gm-over-btn-secondary" onClick={handlePlayAgain}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            Play Again
          </button>
        </div>
      </div>
    </section>
  );
}
