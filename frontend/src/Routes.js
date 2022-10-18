import { Route, Routes as RouterRoutes } from 'react-router-dom';

import { AboutPage } from 'src/modules/static-pages';
import { NotFoundPage } from 'src/shared/navigation';

export const route = {
  home: () => `/`,
};

export function Routes() {
  return (
    <RouterRoutes>
      <Route path={route.home()} element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </RouterRoutes>
  );
}
