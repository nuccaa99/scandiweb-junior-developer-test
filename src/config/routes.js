import appRoutes from '../constants/routes';
import Plp from '../pages/Plp';
import Pdp from '../pages/Pdp';

const routes = [
  {
    path: appRoutes.home,
    Component: Plp,
  },
  {
    path: appRoutes.category,
    Component: Plp,
  },
  {
    path: appRoutes.product,
    Component: Pdp,
  },
];

export default routes;
