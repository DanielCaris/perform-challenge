import { CatalogId } from '../../../../../../src/contexts/Marketplace/Shared/domain/Catalogs/CatalogId';
import { UuidMother } from '../../../../Shared/domain/UuidMother';

export class CatalogIdMother {
  static create(value: string): CatalogId {
    return new CatalogId(value);
  }

  static creator() {
    return () => CatalogIdMother.random();
  }

  static random(): CatalogId {
    return this.create(UuidMother.random());
  }
}
