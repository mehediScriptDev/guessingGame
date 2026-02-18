import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PLAYERS from '../../../data/players';
import SharedHeroBackground from '../../../components/SharedHeroBackground';
import Navbar from '../../../components/Navbar';
import Result from './sections/Result';
import Score from './sections/Score';

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
  const perfectAudioRef = useRef(null);

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

  // initialize perfect sound once
  useEffect(() => {
    try {
      // use existing sound file (excellent.mp3) for perfect guesses
      perfectAudioRef.current = new Audio('/sounds/excellent.mp3');
    } catch (e) {
      perfectAudioRef.current = null;
    }
  }, []);

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

    // play perfect sound on perfect guess
    try {
      if (matched === 2 && perfectAudioRef.current) {
        perfectAudioRef.current.currentTime = 0;
        perfectAudioRef.current.play().catch(() => {});
      }
    } catch (e) {
      // ignore
    }
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
  // use shared Navbar for consistent placement
  const navbar = <Navbar dark={dark} onChange={setDark} />;

  /* ════════════════════ PLAYING ════════════════════ */
  if (phase === 'playing') {
    return (
      <SharedHeroBackground>
      <section 
        className="relative w-full min-h-screen flex flex-col overflow-hidden"
        style={{ background: 'transparent' }}
      >
        {navbar}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center w-full max-w-195 mx-auto px-4 sm:px-6 pb-10 sm:pb-12 text-center">
          <div className="mx-auto mb-2 w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36">
            <img
              src={dark ? '/topImageBlack.png' : '/topImage.png'}
              alt="Logo"
              className="w-full h-auto block mx-auto drop-shadow-lg"
            />
          </div>

          <div className="flex items-end justify-between border-y! border-[#14060129]/37! dark:border-white/10 pb-1.5 sm:pb-2 mb-4 sm:mb-5 w-full py-2.5">
            <div className="flex flex-col">
              <span 
                className="text-[9px] sm:text-[10px] font-bold tracking-[1.2px] uppercase text-[#140601]"
                style={{ fontFamily: 'var(--font-primary)' }}
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
              className="self-center text-xs sm:text-sm xl:text-base font-bold tracking-wider text-[#ff6b2d] rounded-lg"
              style={{ fontFamily: 'var(--font-primary)' }}
            >
              ROUND {String(round).padStart(2, '0')}/{String(ROUNDS).padStart(2, '0')}
            </span>
            <div className="flex flex-col items-end">
              <span 
                className="text-[9px] sm:text-[10px] font-bold tracking-[1.2px] uppercase text-[#140601]"
                style={{ fontFamily: 'var(--font-primary)' }}
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
              className="w-full h-auto block min-h-60 sm:max-h-75 object-cover"
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
              className="text-sm sm:text-base font-extrabold min-w-9 px-2 py-1 text-center bg-[#DEFFE9] rounded-md flex items-center justify-center"
              style={{ fontFamily: 'var(--font-primary)', color: barColor }}
            >
              {Math.ceil(timeLeft)}
            </span>
          </div>

          <form className="relative flex gap-0 max-w-130 mx-auto mb-2 sm:mb-3 rounded-xl overflow-hidden  bg-linear-to-r w-full from-[#F6662E] to-[#FCD4C4] p-0.5 lg:p-1 shadow-xl" onSubmit={handleSubmit}>
            <div className="relative flex-1">
              <input
                className="w-full pr-28 px-4 sm:px-5 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-[#140601B8] outline-none border-2 border-transparent backdrop-blur-sm transition-colors rounded-xl"
                style={{ 
                  fontFamily: 'var(--font-primary)',
                  // color: 'var(--hero-title-color)',
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
                className="absolute right-0 top-1/2 -translate-y-1/2 px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm xl:text-base font-bold text-[#FFF8F5] border-2 rounded-xl border-transparent backdrop-blur-sm cursor-pointer transition-all duration-200 bg-[#ff6b2d] hover:text-white"
                style={{ 
                  fontFamily: 'var(--font-primary)',
                  
                  borderLeftColor: 'var(--card-border)' 
                }}
              >
                Submit
              </button>
            </div>
          </form>
          <p 
            className="text-xs sm:text-base xl:text-lg text-[#140601B8] m-0"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            Tip: Try first name, last name or full name.
          </p>
        </div>
      </section>
      </SharedHeroBackground>
    );
  }

  /* ════════════════════ RESULT ════════════════════ */
  if (phase === 'result' && result) {
    return (
      <SharedHeroBackground>
        <Result 
          result={result}
          round={round}
          ROUNDS={ROUNDS}
          nextRound={nextRound}
          navbar={navbar}
          dark={dark}
        />
      </SharedHeroBackground>
    );
  }

  /* ════════════════════ GAMEOVER ════════════════════ */
  return (
    <SharedHeroBackground>
      <Score 
        score={score}
        efficiency={efficiency}
        tier={tier}
        buckets={buckets}
        ROUNDS={ROUNDS}
        navbar={navbar}
        dark={dark}
        handlePlayAgain={handlePlayAgain}
      />
    </SharedHeroBackground>
  );
}
