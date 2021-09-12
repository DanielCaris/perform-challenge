import { Router } from 'express';

import * as catalogsRoute from './catalogs.route';
import * as statusRoute from './status.route';

export function registerRoutes(router: Router): void {
  catalogsRoute.register(router);
  statusRoute.register(router);
}
