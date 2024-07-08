import appRoutes from '../constants/routes';
import Plp from '../pages/Plp';

const routes = [
  {
    path: appRoutes.home,
    Component: Plp,
  },
  {
    path: appRoutes.category,
    Component: Plp,
  },
];

export default routes;
