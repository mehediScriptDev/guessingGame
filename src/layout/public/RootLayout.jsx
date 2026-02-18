import { Outlet } from 'react-router-dom';
import SharedHeroBackground from '../../components/SharedHeroBackground';

const RootLayout = () => {
  return (
    <SharedHeroBackground>
      <main>
        <Outlet />
      </main>
    </SharedHeroBackground>
  );
};

export default RootLayout;
