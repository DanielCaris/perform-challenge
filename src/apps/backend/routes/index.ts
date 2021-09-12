import { Router } from 'express';

import * as catalogsRoute from './catalogs.route';

export function registerRoutes(router: Router) {
  catalogsRoute.register(router);
}
