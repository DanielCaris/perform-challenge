import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { CatalogId } from '../../shared/domain/catalogs/CatalogId';
import { CatalogCreatedDomainEvent } from './CatalogCreatedDomainEvent';
import { CatalogName } from './CatalogName';

export class Catalog extends AggregateRoot {
  readonly id: CatalogId;
  readonly name: CatalogName;

  constructor(id: CatalogId, name: CatalogName) {
    super();
    this.id = id;
    this.name = name;
  }

  static create(id: CatalogId, name: CatalogName): Catalog {
    const catalog = new Catalog(id, name);

    catalog.record(
      new CatalogCreatedDomainEvent({
        id: catalog.id.value,
        name: catalog.name.value
      })
    );

    return catalog;
  }

  static fromPrimitives(plainData: { id: string; name: string; duration: string }): Catalog {
    return new Catalog(new CatalogId(plainData.id), new CatalogName(plainData.name));
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value
    };
  }
}
