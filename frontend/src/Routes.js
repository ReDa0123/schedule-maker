import { Route, Routes as RouterRoutes } from 'react-router-dom';

import { AboutPage } from 'src/modules/static-pages';
import { NotFoundPage } from 'src/shared/navigation';
import { ScheduleMakerPage } from './modules/schedule-maker/pages';
import { LoginPage } from './modules/auth/pages';

export const route = {
  home: () => `/`,
  scheduleMaker: () => `/schedule-maker`,
  login: () => '/login',
};

export function Routes() {
  return (
    <RouterRoutes>
      <Route path={route.home()} element={<AboutPage />} />
      <Route path={route.scheduleMaker()} element={<ScheduleMakerPage />} />
      <Route path={route.login()} element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </RouterRoutes>
  );
}
