import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import NotFound from '../pages/error/NotFound';

// Public Layout and Pages
import RootLayout from '../layout/public/RootLayout';
// Views
import HomeView from '../pages/public/public_Home/HomeView';
import GameView from '../pages/public/game/GameView';

// Auth Layout and Pages
import AuthLayout from '../layout/auth/AuthLayout';
// Views
import RegisterView from '../pages/auth/RegisterView';
import LoginView from '../pages/auth/LoginView';
import ResetPasswordView from '../pages/auth/ResetPasswordView';
import SetPasswordView from '../pages/auth/SetPasswordView';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        {/* Public related routes can be added here */}
        <Route index element={<HomeView />} />
      </Route>

      {/* Game – standalone full-screen page, no navbar/footer */}
      <Route path="/game" element={<GameView />} />

      <Route path="auth" element={<AuthLayout />}>
        {/* Auth related routes can be added here */}
        <Route path="login" element={<LoginView />} />
        <Route path="register" element={<RegisterView />} />
        <Route path="reset-password" element={<ResetPasswordView />} />
        <Route path="set-password" element={<SetPasswordView />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </>
  )
);

export default router;
