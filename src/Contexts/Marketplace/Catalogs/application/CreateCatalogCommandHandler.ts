import { Command } from '../../../Shared/domain/Command';
import { CommandHandler } from '../../../Shared/domain/CommandHandler';
import { CatalogId } from '../../Shared/domain/Catalogs/CatalogId';
import { CatalogName } from '../domain/CatalogName';
import { CatalogCreator } from './CatalogCreator';
import { CreateCatalogCommand } from './CreateCatalogCommand';

export class CreateCatalogCommandHandler implements CommandHandler<CreateCatalogCommand> {
  constructor(private catalogCreator: CatalogCreator) {}

  subscribedTo(): Command {
    return CreateCatalogCommand;
  }

  async handle(command: CreateCatalogCommand): Promise<void> {
    const catalogId = new CatalogId(command.id);
    const catalogName = new CatalogName(command.name);
    await this.catalogCreator.run({ catalogId, catalogName });
  }
}
