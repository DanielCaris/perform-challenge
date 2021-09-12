import { CatalogId } from '../../../../../../src/contexts/marketplace/shared/domain/catalogs/CatalogId';
import { UuidMother } from '../../../../shared/domain/UuidMother';

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
