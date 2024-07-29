import appRoutes from '../constants/routes';
import Plp from '../pages/Plp';
import Pdp from '../pages/Pdp';
import Favs from '../pages/Favs';
import Cart from '../pages/Cart';

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
  {
    path: appRoutes.cart,
    Component: Cart,
  },
];

export default routes;
