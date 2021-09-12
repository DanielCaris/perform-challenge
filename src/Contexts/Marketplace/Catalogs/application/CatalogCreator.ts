import { EventBus } from '../../../shared/domain/EventBus';
import { CatalogId } from '../../shared/domain/catalogs/CatalogId';
import { Catalog } from '../domain/Catalog';
import { CatalogName } from '../domain/CatalogName';
import { CatalogRepository } from '../domain/CatalogRepository';

type Params = {
  catalogId: CatalogId;
  catalogName: CatalogName;
};

export class CatalogCreator {
  private repository: CatalogRepository;
  private eventBus: EventBus;

  constructor(repository: CatalogRepository, eventBus: EventBus) {
    this.repository = repository;
    this.eventBus = eventBus;
  }

  async run({ catalogId, catalogName }: Params): Promise<void> {
    const catalog = Catalog.create(catalogId, catalogName);

    await this.repository.save(catalog);
    await this.eventBus.publish(catalog.pullDomainEvents());
  }
}
