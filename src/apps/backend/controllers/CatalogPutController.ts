import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { CreateCatalogCommand } from '../../../contexts/marketplace/catalogs/application/CreateCatalogCommand';
import { CatalogAlreadyExists } from '../../../contexts/marketplace/catalogs/domain/CatalogAlreadyExists';
import { CommandBus } from '../../../contexts/shared/domain/CommandBus';
import { Controller } from './Controller';

export class CatalogPutController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response) {
    const id: string = req.params.id;
    const name: string = req.body.name;
    const createCatalogCommand = new CreateCatalogCommand({ id, name });

    try {
      await this.commandBus.dispatch(createCatalogCommand);
    } catch (error) {
      if (error instanceof CatalogAlreadyExists) {
        res.status(httpStatus.BAD_REQUEST).send(error.message);
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
      }
    }

    res.status(httpStatus.CREATED).send();
  }
}
