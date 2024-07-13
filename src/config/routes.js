import appRoutes from '../constants/routes';
import Plp from '../pages/Plp';
import Pdp from '../pages/Pdp';
import Favs from '../pages/Favs';

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
  {
    path: appRoutes.favourites,
    Component: Favs,
  },
];

export default routes;
