import { Route, Routes as RouterRoutes } from 'react-router-dom';

import { AboutPage } from 'src/modules/static-pages';
import { NotFoundPage } from 'src/shared/navigation';
import { ScheduleMakerPage } from './modules/schedule-maker/pages';
import { LoginPage, SignUpPage } from './modules/auth/pages';
import { TournamentsListPage } from './modules/tournaments-list/pages';
import TournamentCreatorPage from './modules/tournament-creator/pages/TournamentCreatorPage';

export const route = {
  home: () => `/`,
  scheduleMaker: ({ id }) => `/schedule-maker/${id}`,
  scheduleMakerEdit: ({ id }) => `/schedule-maker/edit/${id}`,
  tournamentsList: () => 'tournaments-list',
  login: () => '/login',
  signUp: () => '/sign-up',
  tournamentCreator: () => '/tournament-creator',
};

export function Routes() {
  return (
    <RouterRoutes>
      <Route path={route.home()} element={<AboutPage />} />
      <Route
        path={route.scheduleMaker({ id: ':tournamentId' })}
        element={<ScheduleMakerPage />}
      />
      <Route
        path={route.scheduleMakerEdit({ id: ':tournamentId' })}
        element={<ScheduleMakerPage edit />}
      />
      <Route path={route.login()} element={<LoginPage />} />
      <Route path={route.signUp()} element={<SignUpPage />} />
      <Route path={route.tournamentsList()} element={<TournamentsListPage />} />
      <Route
        path={route.tournamentCreator()}
        element={<TournamentCreatorPage />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </RouterRoutes>
  );
}
