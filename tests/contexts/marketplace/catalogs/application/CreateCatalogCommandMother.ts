import { CreateCatalogCommand } from '../../../../../src/contexts/marketplace/catalogs/application/CreateCatalogCommand';
import { CatalogIdMother } from '../../shared/domain/catalogs/CatalogIdMother';
import { CatalogNameMother } from '../domain/CatalogNameMother';

export class CreateCatalogCommandMother {
  static create(id: string, name: string): CreateCatalogCommand {
    return new CreateCatalogCommand({ id, name });
  }

  static random(): CreateCatalogCommand {
    return this.create(CatalogIdMother.random().value, CatalogNameMother.random().value);
  }
}
