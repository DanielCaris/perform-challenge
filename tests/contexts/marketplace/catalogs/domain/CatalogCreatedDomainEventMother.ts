import { Catalog } from '../../../../../src/contexts/marketplace/catalogs/domain/Catalog';
import { CatalogCreatedDomainEvent } from '../../../../../src/contexts/marketplace/catalogs/domain/CatalogCreatedDomainEvent';

export class CatalogCreatedDomainEventMother {
  static create({
    id,
    eventId,
    name,
    occurredOn
  }: {
    id: string;
    eventId?: string;
    duration: string;
    name: string;
    occurredOn?: Date;
  }): CatalogCreatedDomainEvent {
    return new CatalogCreatedDomainEvent({
      id,
      eventId,
      name,
      occurredOn
    });
  }

  static fromCatalog(catalog: Catalog): CatalogCreatedDomainEvent {
    return new CatalogCreatedDomainEvent({
      id: catalog.id.value,
      name: catalog.name.value
    });
  }
}
