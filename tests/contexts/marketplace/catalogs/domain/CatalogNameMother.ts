import { CatalogName } from '../../../../../src/contexts/marketplace/catalogs/domain/CatalogName';
import { WordMother } from '../../../shared/domain/WordMother';

export class CatalogNameMother {
  static create(value: string): CatalogName {
    return new CatalogName(value);
  }

  static random(): CatalogName {
    return this.create(WordMother.random());
  }
}
