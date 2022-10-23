import { Route, Routes as RouterRoutes } from 'react-router-dom';
import { AboutPage } from 'src/modules/static-pages';
import { NotFoundPage } from 'src/shared/navigation';
import { ScheduleMakerPage } from './modules/schedule-maker/pages';

export const route = {
  home: () => `/`,
  scheduleMaker: () => `/schedule-maker`,
};

export function Routes() {
  return (
    <RouterRoutes>
      <Route path={route.home()} element={<AboutPage />} />
      <Route path={route.scheduleMaker()} element={<ScheduleMakerPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </RouterRoutes>
  );
}
