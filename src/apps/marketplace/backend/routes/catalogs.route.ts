import { Request, Response, Router } from 'express';

import container from '../dependency-injection';

export const register = (router: Router): void => {
  const catalogPutController = container.get('Apps.marketplace.controllers.CatalogPutController');
  router.put('/catalogs/:id', (req: Request, res: Response) => catalogPutController.run(req, res));
};
