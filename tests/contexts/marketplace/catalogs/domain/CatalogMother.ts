import { CreateCatalogCommand } from '../../../../../src/contexts/marketplace/catalogs/application/CreateCatalogCommand';
import { Catalog } from '../../../../../src/contexts/marketplace/catalogs/domain/Catalog';
import { CatalogName } from '../../../../../src/contexts/marketplace/catalogs/domain/CatalogName';
import { CatalogId } from '../../../../../src/contexts/marketplace/shared/domain/catalogs/CatalogId';
import { CatalogIdMother } from '../../Shared/domain/catalogs/CatalogIdMother';
import { CatalogNameMother } from './CatalogNameMother';

export class CatalogMother {
  static create(id: CatalogId, name: CatalogName): Catalog {
    return new Catalog(id, name);
  }

  static fromCommand(command: CreateCatalogCommand): Catalog {
    return this.create(CatalogIdMother.create(command.id), CatalogNameMother.create(command.name));
  }

  static random(): Catalog {
    return this.create(CatalogIdMother.random(), CatalogNameMother.random());
  }
}
