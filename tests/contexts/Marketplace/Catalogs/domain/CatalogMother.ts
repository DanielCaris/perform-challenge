import { CreateCatalogCommand } from '../../../../../src/contexts/Marketplace/Catalogs/application/CreateCatalogCommand';
import { Catalog } from '../../../../../src/contexts/Marketplace/Catalogs/domain/Catalog';
import { CatalogName } from '../../../../../src/contexts/Marketplace/Catalogs/domain/CatalogName';
import { CatalogId } from '../../../../../src/contexts/Marketplace/Shared/domain/Catalogs/CatalogId';
import { CatalogIdMother } from '../../Shared/domain/Catalogs/CatalogIdMother';
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
