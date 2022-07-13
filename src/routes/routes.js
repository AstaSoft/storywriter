import { paths } from "./paths";

import {
  HomePage,
  LoginPage,
  TeamsPage,
  SignUpPage,
  ActorsPage,
  MembersPage,
  ProfilePage,
  ProjectsPage,
  NotFoundPage,
  DashboardPage,
  DictionaryPage,
  TeamSettingsPage,
  TeamProjectsPage,
  PasswordResetPage,
  ProjectSettingsPage,
  PasswordRecoveryPage,
} from "../pages";

const routes = [
  {
    path: paths.login,
    exact: true,
    Component: LoginPage,
  },
  {
    path: paths.registration,
    Component: SignUpPage,
  },
  {
    path: paths.homepage,
    exact: true,
    Component: HomePage,
  },
  {
    path: paths.projects,
    exact: true,
    Component: ProjectsPage,
  },
  {
    path: paths.teams,
    exact: true,
    Component: TeamsPage,
  },
  {
    path: paths.profile,
    exact: true,
    Component: ProfilePage,
  },
  {
    path: paths.dashboard,
    exact: true,
    Component: DashboardPage,
  },
  {
    path: paths.notFound,
    Component: NotFoundPage,
  },
  {
    path: paths.passwordRecovery,
    Component: PasswordRecoveryPage,
  },
  {
    path: paths.resetPassword,
    Component: PasswordResetPage,
  },
  {
    path: paths.members,
    Component: MembersPage,
  },
  {
    path: paths.teamSettings,
    Component: TeamSettingsPage,
  },
  {
    path: paths.teamProjects,
    Component: TeamProjectsPage,
  },
  {
    path: paths.projectSettings,
    Component: ProjectSettingsPage,
  },
  {
    path: paths.actors,
    Component: ActorsPage,
  },
  {
    path: paths.dictionary,
    Component: DictionaryPage,
  },
];

export default routes;
