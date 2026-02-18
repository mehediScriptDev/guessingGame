import { useState, useEffect } from 'react';
import SharedHeroBackground from '../../components/SharedHeroBackground';
import Navbar from '../../components/Navbar';
import LeaderboardModal from '../../components/LeaderboardModal';

const LoginView = () => {
  const [username, setUsername] = useState('');

  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');
  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // mock login: show leaderboard modal for now
    setShowLeaderboard(true);
  };

  const [showLeaderboard, setShowLeaderboard] = useState(false);

  return (
    <SharedHeroBackground>
      <Navbar dark={dark} onChange={setDark} />

      {/* Login card (Tailwind utilities used instead of raw CSS classes) */}
      <div className="relative z-20 flex-1 flex items-center justify-center w-full px-4 sm:px-6 py-12 mt-10 sm:mt-28">
        <div className="w-full max-w-md bg-(--card-bg) border border-(--card-border) rounded-xl p-8 sm:p-10 shadow-2xl text-center">
          <span className="inline-block bg-[#ff6b2d] text-white rounded-md px-4 py-1 text-xs font-bold mb-4">Player Log In</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-(--hero-title-color) mb-2">Sign in to continue</h2>
          <p className="text-sm text-(--hero-muted) mb-6">Test your NBA Knowledge by playing.</p>

          <form onSubmit={handleSubmit} className="w-full text-left">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-(--hero-title-color) mb-2">User name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md bg-transparent placeholder:[var(--hero-muted)] focus:border-[#ff6b2d] outline-none"
                placeholder="username@youknowball.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <button type="submit" className="w-full bg-[#ff6b2d] hover:bg-[#ff8a4a] text-white font-bold py-3 rounded-md transition-transform duration-200 hover:-translate-y-0.5">
              Log In
            </button>
          </form>
        </div>
      </div>
      {showLeaderboard && (
        <LeaderboardModal onClose={() => setShowLeaderboard(false)} />
      )}
    </SharedHeroBackground>
  );
};

export default LoginView;
