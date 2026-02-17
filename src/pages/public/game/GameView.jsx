import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PLAYERS from '../../../data/players';

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
    <>
      <div className="absolute bottom-0 left-0 w-full h-1/2 z-0 pointer-events-none">
        <img src="/bg.png" alt="" className="w-full h-full object-cover object-[center_top] block" />
        <div className="absolute inset-0" />
      </div>
      <div className="absolute inset-0 bg-linear-to-br from-[#fcb9a0] to-[#fff7f4] dark:from-gray-800 dark:to-gray-900 opacity-70 z-0" />
    </>
  );

  const navbar = (
    <header className="relative z-30 w-full px-4 sm:px-6 md:px-8 py-3 sm:py-4">
      <div className="flex items-center justify-end max-w-275 mx-auto">
        <div className="flex items-center gap-2 sm:gap-3">
          <span 
            className="text-[10px] sm:text-[11px] font-bold tracking-[1.5px] uppercase"
            style={{ color: 'var(--hero-title-color)' }}
          >
            MODE
          </span>
          <button 
            className="relative flex items-center w-12 sm:w-14 h-6 sm:h-7 rounded-full p-0.5 transition-colors duration-300 border-none cursor-pointer"
            style={{ background: 'var(--toggle-track)' }}
            onClick={() => setDark((d) => !d)}
          >
            <span className={`absolute text-xs sm:text-sm z-20 pointer-events-none top-1/2 -translate-y-1/2 transition-all duration-300 ${dark ? 'left-7 sm:left-8' : 'left-2'}`}>
              {dark ? '🌙' : '☀️'}
            </span>
            <div className={`w-5 sm:w-5.5 h-5 sm:h-5.5 bg-white rounded-full shadow-md transition-transform duration-300 z-10 ${dark ? 'translate-x-6 sm:translate-x-7' : ''}`} />
          </button>
        </div>
      </div>
    </header>
  );

  /* ════════════════════ PLAYING ════════════════════ */
  if (phase === 'playing') {
    return (
      <section 
        className="relative w-full min-h-screen flex flex-col overflow-hidden"
        style={{ background: 'var(--bg-gradient)' }}
      >
        {bgBottom}
        {navbar}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center w-full max-w-190 mx-auto px-4 sm:px-6 pb-10 sm:pb-12 text-center">
          <div className="mx-auto mb-2 w-20 sm:w-24 md:w-28">
            <img
              src={dark ? '/topImageBlack.png' : '/topImage.png'}
              alt="Logo"
              className="w-full h-auto block mx-auto drop-shadow-lg"
            />
          </div>

          <div className="flex items-end justify-between border-b border-black/10 dark:border-white/10 pb-1.5 sm:pb-2 mb-4 sm:mb-5 w-full">
            <div className="flex flex-col">
              <span 
                className="text-[9px] sm:text-[10px] font-bold tracking-[1.2px] uppercase"
                style={{ fontFamily: 'var(--font-primary)', color: 'var(--hero-muted)' }}
              >
                CURRENT SCORE
              </span>
              <span 
                className="text-3xl sm:text-[42px] leading-none text-[#ff6b2d]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {String(score).padStart(2, '0')}
              </span>
            </div>
            <span 
              className="self-center text-xs sm:text-sm font-bold tracking-wider text-[#ff6b2d]"
              style={{ fontFamily: 'var(--font-primary)' }}
            >
              ROUND {String(round).padStart(2, '0')}/{String(ROUNDS).padStart(2, '0')}
            </span>
            <div className="flex flex-col items-end">
              <span 
                className="text-[9px] sm:text-[10px] font-bold tracking-[1.2px] uppercase"
                style={{ fontFamily: 'var(--font-primary)', color: 'var(--hero-muted)' }}
              >
                POT. POINTS
              </span>
              <span 
                className="text-3xl sm:text-[42px] leading-none text-[#ff6b2d]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {pot}
              </span>
            </div>
          </div>

          <div className="w-full max-w-150 mx-auto mb-4 sm:mb-5 rounded-xl sm:rounded-2xl overflow-hidden bg-[rgba(30,20,15,0.85)] border-2 sm:border-3 border-[rgba(80,60,40,0.5)] dark:border-[rgba(120,80,50,0.4)] shadow-2xl">
            <img 
              src={player.image} 
              alt="Guess this player" 
              className="w-full h-auto block min-h-60 sm:min-h-70 object-cover"
              style={{ background: 'linear-gradient(135deg, #3a2a1a 0%, #1a100a 100%)' }}
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-3 max-w-150 mx-auto mb-4 sm:mb-5 w-full">
            <div className="flex-1 h-3 sm:h-3.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
              <div 
                className="h-full rounded-full transition-[width] duration-100 ease-linear"
                style={{ width: `${pct}%`, background: barColor }} 
              />
            </div>
            <span 
              className="text-sm sm:text-base font-extrabold min-w-6 text-center"
              style={{ fontFamily: 'var(--font-primary)', color: barColor }}
            >
              {Math.ceil(timeLeft)}
            </span>
          </div>

          <form className="flex gap-0 max-w-130 mx-auto mb-2 sm:mb-3 rounded-lg overflow-hidden shadow-lg" onSubmit={handleSubmit}>
            <input
              className="flex-1 px-4 sm:px-5 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold tracking-wide outline-none border-2 border-transparent border-l-4 border-l-[#ff6b2d] backdrop-blur-sm transition-colors focus:border-[#ff6b2d]"
              style={{ 
                fontFamily: 'var(--font-primary)',
                color: 'var(--hero-title-color)',
                background: 'var(--card-bg)'
              }}
              type="text"
              placeholder="GUESS THE PLAYER"
              value={guess}
              onChange={(e) => {
                setGuess(e.target.value);
                guessRef.current = e.target.value;
              }}
              autoFocus
            />
            <button 
              type="submit" 
              className="px-5 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-[#ff6b2d] border-2 border-transparent border-l backdrop-blur-sm cursor-pointer transition-all duration-200 hover:bg-[#ff6b2d] hover:text-white"
              style={{ 
                fontFamily: 'var(--font-primary)',
                background: 'var(--card-bg)', 
                borderLeftColor: 'var(--card-border)' 
              }}
            >
              Submit
            </button>
          </form>
          <p 
            className="text-xs m-0"
            style={{ fontFamily: 'var(--font-primary)', color: 'var(--hero-muted)' }}
          >
            Tip: Try first name, last name or full name.
          </p>
        </div>
      </section>
    );
  }

  /* ════════════════════ RESULT ════════════════════ */
  if (phase === 'result' && result) {
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
        style={{ background: 'var(--bg-gradient)' }}
      >
        {bgBottom}
        {navbar}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-start w-full max-w-190 mx-auto px-4 sm:px-6 pt-8 sm:pt-10 pb-10 sm:pb-12 text-center">
          <div className={`w-20 h-20 sm:w-24 sm:h-24 md:w-25 md:h-25 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 ${iconClass}`}>
            {isPerfect || isPartial ? (
              <svg
                width="40"
                height="40"
                className="sm:w-12 sm:h-12"
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
                width="40"
                height="40"
                className="sm:w-12 sm:h-12"
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
          <h2 
            className="text-3xl sm:text-4xl md:text-[36px] m-0 mb-1"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--hero-title-color)' }}
          >
            {heading}
          </h2>
          <p className="m-0 mb-6 sm:mb-7">
            <span 
              className="text-xl sm:text-2xl md:text-[22px] text-[#ff6b2d]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              +{result.points}
            </span>
            <span 
              className="text-sm ml-1"
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
              className="block mb-1.5 text-xs"
              style={{ fontFamily: 'var(--font-primary)', color: 'var(--hero-muted)' }}
            >
              The player was
            </span>
            <h3 
              className="text-xl sm:text-2xl font-bold m-0 mb-1.5"
              style={{ fontFamily: 'var(--font-primary)', color: 'var(--hero-title-color)' }}
            >
              {result.player.firstName} {result.player.lastName}.
            </h3>
            <span 
              className="text-xs"
              style={{ fontFamily: 'var(--font-primary)', color: 'var(--hero-muted)' }}
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

  /* ════════════════════ GAME OVER ════════════════════ */
  return (
    <section 
      className="relative w-full min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'var(--bg-gradient)' }}
    >
      {bgBottom}
      {navbar}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-start w-full max-w-190 mx-auto px-4 sm:px-6 pt-4 pb-10 sm:pb-12 text-center">
        {/* Logo */}
        <div className="mx-auto mb-1 w-28 sm:w-32 md:w-32.5">
          <img 
            src={dark ? '/topImageBlack.png' : '/topImage.png'} 
            alt="Logo" 
            className="w-full h-auto block mx-auto drop-shadow-lg" 
          />
        </div>

        {/* Your Score heading */}
        <h2 
          className="text-3xl sm:text-4xl md:text-[40px] font-normal my-1 mb-3 sm:mb-4 tracking-wide"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <span className="text-[#ff6b2d] italic">Your </span>
          <span style={{ color: 'var(--hero-title-color)' }}>Score</span>
        </h2>

        {/* Score card */}
        <div 
          className="inline-block rounded-xl px-8 sm:px-10 py-3 sm:py-4 mb-1.5 backdrop-blur-xl"
          style={{ 
            background: 'var(--card-bg)', 
            border: '1px solid var(--card-border)' 
          }}
        >
          <span 
            className="text-4xl sm:text-5xl md:text-[52px] leading-none"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--hero-title-color)' }}
          >
            {String(score).padStart(2, '0')}
          </span>
        </div>
        <p 
          className="text-[9px] sm:text-[10px] font-bold tracking-[2px] uppercase m-0 mb-4 sm:mb-5"
          style={{ fontFamily: 'var(--font-primary)', color: 'var(--hero-muted)' }}
        >
          ACCUMULATED SKILL POINTS
        </p>

        {/* Stats row */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-140 mx-auto mb-6 sm:mb-7">
          <div 
            className="flex-1 rounded-xl px-3 sm:px-4 py-4 sm:py-4.5 text-left backdrop-blur-xl"
            style={{ 
              background: 'var(--card-bg)', 
              border: '1px solid var(--card-border)' 
            }}
          >
            <span 
              className="block text-[11px] font-semibold mb-1"
              style={{ fontFamily: 'var(--font-primary)', color: 'var(--hero-muted)' }}
            >
              Efficiency
            </span>
            <span 
              className="block text-2xl sm:text-3xl md:text-[28px] leading-none text-[#ff6b2d]"
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
              className="block text-[11px] font-semibold mb-1"
              style={{ fontFamily: 'var(--font-primary)', color: 'var(--hero-muted)' }}
            >
              Buckets
            </span>
            <span 
              className="block text-2xl sm:text-3xl md:text-[28px] leading-none text-[#ff6b2d]"
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
              className="block text-[11px] font-semibold mb-1"
              style={{ fontFamily: 'var(--font-primary)', color: 'var(--hero-muted)' }}
            >
              Tier
            </span>
            <span 
              className="block text-2xl sm:text-3xl md:text-[28px] leading-none text-[#ff6b2d]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {tier}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-120 mx-auto">
          <Link 
            to="/auth/login" 
            className="flex-1 inline-flex items-center justify-center px-4 sm:px-5 py-3 sm:py-3.5 border-none rounded-lg text-xs sm:text-sm font-bold text-white bg-[#ff6b2d] cursor-pointer no-underline transition-all duration-200 hover:bg-[#ff8a4a] hover:-translate-y-0.5"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            Log In To Save Score
          </Link>
          <button 
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 border-2 border-[#ff6b2d] rounded-lg text-xs sm:text-sm font-bold text-[#ff6b2d] bg-transparent cursor-pointer transition-all duration-200 hover:bg-[#ff6b2d] hover:text-white hover:-translate-y-0.5"
            style={{ fontFamily: 'var(--font-primary)' }}
            onClick={handlePlayAgain}
          >
            <svg width="14" height="14" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            Play Again
          </button>
        </div>
      </div>
    </section>
  );
}
